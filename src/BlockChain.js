const SHA1 = require('crypto-js/sha1');

class Block{
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }
    calculateHash(){
        return SHA1(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data).toString());
    }

}

class BlockChain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block( 0, "01/01/2017",'Genesis block', "0")
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            console.log(currentBlock.hash.words)
            console.log(currentBlock.calculateHash().words)
            debugger
            if (currentBlock.hash.words !== currentBlock.calculateHash().words){
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
            return true;
        }

    }
}

let eskilCoin = new BlockChain()
eskilCoin.addBlock(new Block(1,"10/07/2017",{amount: 4}));
eskilCoin.addBlock(new Block(2,"12/07/2017",{amount: 6}));

console.log("Is Chain Valid? " + eskilCoin.isChainValid())

//console.log(JSON.stringify(eskilCoin,null, 4))

