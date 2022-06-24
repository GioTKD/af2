import Web3Istance from "../Web3";
import VotingSystemABI from '../../ABIs/VotingSystem.json'

export default class VotingSystem extends Web3Istance{
    constructor(){
        super();
        let ABIScheduling = VotingSystemABI.abi;
        let ContractNetworks = VotingSystemABI.networks;
        let contractAddress = ContractNetworks[Object.keys(ContractNetworks)[Object.keys(ContractNetworks).length-1]].address;
        this.contract = new this.web3.eth.Contract(ABIScheduling,contractAddress);
       // console.log(this.contract)
        //console.log(`Indirizzo Contratto----- `+ contractAddress)
    }

    async announce(Design){
        let account=await this.checkIfWalletIsConnected();
        console.log(account)
        let result = await this.contract.methods.announce(
            this.utils.fromAscii(Design.filehash),
            2,
            5,
            5,
            5).send({from:account,gas:4600000})
            return result;
    }

    async getDesigns(){
        let account = await this.checkIfWalletIsConnected();
        let result = await this.contract.methods.getDesignes().call({from:account});
        console.log(result)
        return result;
    }

    async getNumDesignes(){
        let account = await this.checkIfWalletIsConnected();
        let result = await this.contract.methods.getNumDesignes().call({from:account});
        console.log(result)
        return result;
    }

    async getDesigne(index){
        let account = await this.checkIfWalletIsConnected();
        console.log(account)
        let result = await this.contract.methods.getDesigne(index).call({from:account});
        return result;
    }

    async getDesignes(){
        let account = await this.checkIfWalletIsConnected();
        let result = await this.contract.methods.getDesignes().call({from:account});
        console.log(result);
        return result;
    }
}