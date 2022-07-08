import Web3Istance from "../Web3";
import OnBoardingABI from '../../ABIs/OnBoarding.json'
import { ethers } from "ethers";

export default class OnBoarding extends Web3Istance{
    constructor(){
        super();
        let ABIScheduling = OnBoardingABI.abi;
        let ContractNetworks = OnBoardingABI.networks;
        let contractAddress=ContractNetworks[Object.keys(ContractNetworks)[Object.keys(ContractNetworks).length - 1]].address;
        this.contract=new this.web3.eth.Contract(ABIScheduling,contractAddress);
        //console.log(`Indirizzo Contratto ----- `+ contractAddress);  
        }
    
//address,name,materialSupported,nozzles,mountedNozzles,printTemp,bedTemp,volume,soluble,foodSafety
        async addPrinter(printerInfo){
            let account=await this.checkIfWalletIsConnected();
            await this.contract.methods.addPrinter(
                printerInfo.address,
                this.utils.fromAscii(printerInfo.name),
                printerInfo.materiale,
                [0,1,2], 
                parseInt(printerInfo.nozzles),
                parseInt(printerInfo.printTemp),
                parseInt(printerInfo.BedTemp),
                parseInt(printerInfo.volume),
                printerInfo.soluble,
                printerInfo.FoodSafety).send({from:account,gas:4600000}) 
        }

        async getPrinters(){
            let account = await this.checkIfWalletIsConnected();
            let result=await this.contract.methods.getMakerPrinters().call({from:account});
           console.log(account)
           console.log(result)
            return result;
        }
        
        async RemovePrinter(index){
            let account = await this.checkIfWalletIsConnected();
            await this.contract.methods.RemovePrinter(index).send({from:account})
        }

        async getPrinter(index){
            let account = await this.checkIfWalletIsConnected();
            let result = await this.contract.methods.getMakerPrinter(index).call({from:account});
            return result;
        }

        async addMaterial(material){
            let account = await this.checkIfWalletIsConnected();
            console.log(account)

           let result = await this.contract.methods.addMaterials(
                this.utils.asciiToHex(material.name),
                material.materiale,
                material.colors,
                material.quantityKG,
                material.printTemp,
                material.bedTemp).send({from:account,gas:4600000});
                console.log(result)
           }

        async ModifyPrinter(index,printerData){
            let account = await this.checkIfWalletIsConnected();
            let printer =await this.contract.methods.ModifyPrinter(index,
                printerData.soluble,
                printerData.foodSafety,
                parseInt(printerData.mountedNozzles),
                ).send({from:account});
            return printer;
        }

        async updateMaterial(name, type, color, quantityKG, printTemp,bedTemp){
            let account = await this.checkIfWalletIsConnected();
            await this.contract.methods.updateMaterial(this.utils.asciiToHex(name), type, color, quantityKG, printTemp,bedTemp).send({from:account});

        }

        async removeMaterial(name, type){
            let account = await this.checkIfWalletIsConnected();
            console.log(this.utils.toUtf8(name))
            await this.contract.methods.removeMaterial(name,type).send({from:account,gas:4600000})
        }

        async mountMaterial(name, type, printer){
            let account = await this.checkIfWalletIsConnected();
            let res = await this.contract.methods.mountMaterial(
                this.web3.utils.fromAscii(name),
                type,
                printer).send({from:account,gas:4600000});
                console.log(res)
                return res;
        }

        async getMaterials(){
            let account = await this.checkIfWalletIsConnected();
            let result = await this.contract.methods.getMaterials().call({from:account});
           console.log(account)
           console.log(result)
            return result;
        }

        async getMaterial(name,type){
            let account = await this.checkIfWalletIsConnected();
            let result = await this.contract.methods.getMaterial(
                name,
                type
            ).call({from:account});
            return result;

        }

        async CheckMaterial(name){
            let account = await this.checkIfWalletIsConnected();
            let result =  await this.contract.methods.checkMaterial(this.utils.asciiToHex(name)).call({from:account});

            return result
        }

        async GetMaterialsName(){
            let account = await this.checkIfWalletIsConnected();
            let result = await this.contract.methods.getMaterialsName().call({from:account})
            result.forEach(element => {
                console.log(this.utils.toUtf8(element))
            });
        }

}