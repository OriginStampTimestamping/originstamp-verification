# OriginStamp Verificator
OriginStamp is a timestamp service that uses the Bitcoin Blockchain (and soon other chains) to create tamper-proof data for your data. Instead of backing up your data, OriginStamp embeds a cryptographic fingerprint in the blockchain. It is de facto impossible to deduce the content of your data from your fingerprint. Therefore, the data remains in your company and is not publicly accessible. All you need to do is send this fingerprint to OriginStamp via the interface. The integration of the RESTful API is very simple and convenient and allows all data to be easily tagged with a tamper-proof time stamp.

This publicly accessible tool will be used to verify the timestamps in the future to show that the process is reproducible and open.

# Prerequisites
- [Node JS v.10.8.0](https://nodejs.org/en/download/current/)
After installing node js, you might have to restart your computer.

- Angular CLI 

`npm install -g @angular/cli`


# Getting started

## Running the application

`ng serve`

## Building the application

`node --max-old-space-size=8192 ./node_modules/@angular/cli/bin/ng build --prod --aot`

# How to manually verify a timestamp?
To verify a timestamp independently of OriginStamp, you need the following information:
- the unchanged original file
- the proof provided by [OriginStamp](https://originstamp.com)

1. **Determine the SHA-256 of your original file.**
There are numerous programs and libraries to calculate the SHA-256 of a file, such as [MD5FILE.COM](https://md5file.com/calculator). Simply drag and drop or select your file, to retrieve the SHA-256 of your file.

2. **Validate your proof**.
First, it must be verified that the hash of the original is part of the evidence. To do this, the proof can be opened with a conventional editor and its content can be searched for the hash.
If the hash cannot be found, either the file was manipulated or the wrong evidence was selected.

3. **Determine the private key**. 
In the past we have already developed two different methods to generate time stamps. Both are presented below.
   1. **Seed File**. The format of the seed file looks like: `c5e1c9d2.. 8827dfd.. c7555fe.. `
     In order to determine the private key, you have to calculate the SHA-256 of the seed file content.

       **private key**=SHA-256(seed)=SHA-256( `c5e1c9d2.. 8827dfd.. c7555fe..` )

       For the calculaton, we can recommend [online tools](https://passwordsgenerator.net/sha256-hash-generator/), which allow the calculation in the browser without downloading any third party software.

   2. **Merkle Tree File**. The merkle tree is a tree structure, that allows to organize the seed more efficient than a plain-text seed file. 
   The merkle tree proof looks like:
   `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<node value="4eac8a92f8846ea801669b5834aa733e5345cc5e90875152ea6b9f38c724701e" type="key">
	<left value="d6b3978d4e419a8adda17ae12ff1c706334bac52b3f7f976083ceb64e46b0604" type="mesh"/>
	<right value="77f0c81a31788a9ec4f141cc5b5443fbcfc76aece2edcc9e884e4b1b47230826" type="mesh">
		<left value="47e47c96302eeba62ed443dd0c89b3411bbddd2c1ff6bdfb1f833fa11e060b85" type="mesh">
			<left value="a8eb9f308b08397df77443697de4959c156fd4c68c489995163285dbd3eedaef" type="mesh"/>
			<right value="ab95adaee8eb02219d556082a7f4fb70d19b8000097848112eb85b1d2fca8f67" type="hash"/>
		</left>
		<right value="da764431f596d02c72aeabcc1daa23caad0352e72a51776ebe76ecf51979d507" type="mesh"/></right>
</node>`
        
   ![Sample](https://groups.google.com/group/originstamp/attach/49fe6696c1f2d/merkle_tree_verification.png?part=0.1&authuser=0&view=1)
   
   	For the verification, we start on the lowest level of the tree.
   	
        Lets assume:
       
        Hash C = a8eb9f308b08397df77443697de4959c156fd4c68c489995163285dbd3eedaef
       
        Hash D = ab95adaee8eb02219d556082a7f4fb70d19b8000097848112eb85b1d2fca8f67
       
        Hash CD = SHA-256(Hash C + Hash D) = SHA-256(a8eb9f308b08397df77443697de4959c156fd4c68c489995163285dbd3eedaefab95adaee8eb02219d556082a7f4fb70d19b8000097848112eb85b1d2fca8f67) = 47e47c96302eeba62ed443dd0c89b3411bbddd2c1ff6bdfb1f833fa11e060b85
	
This step is performed for all levels of the tree until the hash of the root has been calculated. If the hash of the root is identical as proof, it is conforming and verified. The top hash corresponds to the private key we embedded in the blockchain through a transaction. For a more detailled explanation of the Merkle tree, we want to refer to [Wikipedia](https://en.wikipedia.org/wiki/Merkle_tree)
       

4. **Determine the Bitcoin address**. Having determined the private key in the previous step, we can use this private key for a new Bitcoin address. The detailled steps to calculate the uncompressed Bitcoin address can be found [here](https://gobittest.appspot.com/Address).

5. **Check the transactions**. By using a blockexplorer, such as [blockchain.info](https://blockchain.info), you can search for the previously calculated Bitcoin address. The first transaction for this address testifies to the proof of existence. **The timestamp of the file corresponds to the block time of the first transaction.**


## Contributors
If you want to contribute something, then send us your pull request with your desired changes!

* [Thomas Hepp](https://www.linkedin.com/in/thomas-hepp-b5aab7121/)
