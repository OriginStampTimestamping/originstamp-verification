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

1. Determine the SHA-256 of your original
There are numerous programs and libraries to calculate the SHA-256 of a file, such as [MD5FILE.COM](https://md5file.com/calculator). Simply drag and drop or select your file, to retrieve the SHA-256 of your file.



## Contributors
If you want to contribute something, then send us your pull request with your desired changes!

Thomas Hepp
