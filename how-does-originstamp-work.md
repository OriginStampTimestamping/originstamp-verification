# How does OriginStamp work?
In short, OriginStamp uses blockchain technology to provide a tamper-proof timestamp irrefutably proving the existence of any digital content at a given time.

## Preparation of digital content
First of all, the object the existence of which is to be proven needs to be represented in a fixed digital format, e.g. a digital photo/video, a PDF scan, or just a plain text file with contents `My secret`. Let `file` denote this digital representation from now on In order to provide independence of third parties, OriginStamp does _not_ provide a backup solutuion, i.e. it is up to the user to make sure that this `file` will be available in the future if its existence needs to be proven.

## Hashing
The OriginStamp client _locally_ calculates a so-called `hash` of the `file`. A hash, more precisely cryptographically secure hash, is a short number which can be trivially obtained from a `file` (e.g. `sha256("My secret") = 4ffe33264b72e6973eed98070f1118182380ddf287e813ce06d34b04e78824ed`), while it is computationally infeasible (realistically "impossible") to either reconstruct that `file` from its `hash` nor _any_ other file with exactly the same `hash` (As an oversimplified example consider the digit sum of 51, being 6. This could also be yielded by e.g. 42, thus it is impossible to reconstruct 51, while a more realistic hash also makes it basically impossible to even obtain the 42 to obtain a "hash" of 6).

It is crucial that this hash is calculated locally, since the actual contents of `file` are potentially confidential and shall not be transmitted to any other party including OriginStamp. Only the `hash` is transmitted to OriginStamp.

While the procedure described below (#REF) can be used to commit an individual `hash` to a blockchain (also without involving OriginStamp), this can yield high financial costs depending on the amount of proofs required. As an example consider a surveillance camera feed, one frame each minute shall be submitted for proof, 24/7. This yields about half a million hashes per year. Even in April 2019 the cost of a single Bitcoin transaction is around 1$, while it did cost more than 35$ in January 2018. It is therefore highly desirably to reduce the costs for such an ongoing timestamping procedure.

## Merkle Tree
The solution lies in so-called Merkle Trees. Since hashes are also just digital content, the concatenation of two hashes can be hashed again to obtain a new hash. Two hashes obtained by this procedure can be concatenated and hashed again to combine four file-hashes and so on. Thus, an _arbitrary_ amount of hashes can be combined into a _single_ hash. In other words, the cost-factor of hashes per second can be reduced to timestamps per second.

For the camera example above this cannot be directly used: While combining a year's feed into a single hash would reduce the cost by a factor of half a million, this would also mean only one proof per year, defying the purpose of one hash per minute. However, if the camera's feed of one hash per minute is combined with a million _other_ sources of one hash per minute and the costs are shared, the total costs can be _halved_ even further while still benefiting from the one proof per second. This is where OriginStamp comes into play, providing a service to combine the user's hashes with those of others in order to significantly reduce the user's expenses of continuous timestamps.

## Blockchain technology
Now how can a timestamp be generated from such a `hash`? The answer is a blockchain. This is a digital chain of blocks, where each regularly published block encodes so-called transactions (which ultimately also encode the `hash` to be timestamped), and each block depends on its predecessor in a way such that forgery of this publication history becomes impossible (once again using cryptographically secure hashes). Since such a blockchain must be publicly accessible via the internet, the one missing piece of the puzzle is the question how "the internet" can agree upon the correct blocks to be confirmed without requiring trust in a third party.

There are various concepts (e.g. proof of work, proof of stakes) that boil down to participants of the blockchain's network getting rewarded with digital tokens (e.g. bitcoin) for investing resources (time, computational power, more tokens) into keeping the blockchain in a uniquely agreed-upon state. The very ownership of those tokens is tracked by this blockchain, thus it is in their (both future and past) owners' interest to maintain this uncorrupted state.


## Public key cryptography
Transfer of these tokens' ownership is denoted by said transactions, and said ownership requires means of authorization of these transactions. This is achieved via public key cryptography: The Token owner computationally generates a so-called `private key` and from that a `public key`. The `private key` is comparable to a classical signet ring or a bank note's security features such as holograms, whereas the `public key` corresponds to instructions on how to verify the authenticity of a wax seal or banknote without revealing how to forge them.

Just like the classical analogues it is nearly impossible to obtain the `private key` from the `public key` while the `public key` is straight-forward to be obtained from the `private key` by design (as an additional benefit, an arbitrary amount of these purely digital pairs of private and public key can be generated at will, thus providing means of anonymity). The blockchain participants involve their `public keys` (via software of course, not manually) in confirming blocks in a way such that the token ownership can be confirmed via the `public key` but transferal of ownership requires a signature via the `private key`. Since such a transferal is tracked in the blockchain itself, transactions that attempt to double-spend tokens can simply be detected and rejected by the network. Since the `public key` is used to identify ownership it is basically equivalent to an `address` and also called such.

## Hash to private key
The final gap concerns how to put a `hash` into a blockchain. To that end, a deterministic way to create a private key from a `hash` is used and a transaction involving the corresponding public key is submitted to the blockchain. Now a bullet-proof chain from the original `file` to a tamper-proof timestamp in the blockchain is completed:

1. Obtain the `hash` from a `file`.
1. (Optional but severely cutting costs) Combine this `hash` and many others via a Merkle Tree into a new `hash`.
1. Create a `private key` from that `hash`, and from that a `public key` / `address`.
1. Submit a transaction involving this `address`. **Note:** Proving the timestamp later on includes revealing (means to obtain) the `private key`, which in turn permits claiming ownership of any tokens still not transferred away from this `address`. Therefore two transactions are recommended: One to transfer tokens _to_ the `address` and another one to transfer them _away_ again.
1. Once the transaction is properly confirmed by the blockchain network (e.g. after six blocks in bitcoin, which takes about one hour) the timestamp is irrevocably embedded in the blockchain and can be disclosed at will.

## OriginStamp's services
As indicated above, OriginStamp provides the means to distribute timestamping costs across its users, thus making high frequency timestamps affordable. Both complete apps for occasional / private use and an API for regular / commercial use are available.