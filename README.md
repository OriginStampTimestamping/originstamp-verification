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

## Building the application

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
⋅⋅a. **Seed File**
The format of the seed file looks like:

`c5e1c9d28827dfdf7fc75556663da8509d36a880ea8e188536fc902c9fd9835a d9cfe7b4c0c76a85593af093753251b78507db3bfda1dea938d00eb5c61b44e7 `
⋅⋅b. **Merkle Tree File**
For a more detailled explanation of the Merkle tree, we want to refer to [Wikipedia](https://en.wikipedia.org/wiki/Merkle_tree)

## Contributors
If you want to contribute something, then send us your pull request with your desired changes!

Thomas Hepp
