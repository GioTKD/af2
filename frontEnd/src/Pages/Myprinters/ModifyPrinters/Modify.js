import { UserNav } from "../../../component/Navbar/homeNav"
import { getPrinters } from "../../../data/data";
import '../Myprinters.css'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect} from "react";
import { useState } from "react";
import OnBoarding from "../../../SmartContracts/OnBoarding/OnBoarding";
import Select from 'react-select';
import Web3 from "web3";

export default function Modify(){

    const [NamePrinter,SetNamePrinter] = useState("");
    const [Nozzles,SetNozzles] = useState(0);
    const [Soluble,SetSoluble] = useState(0);
    const [foods,Setfood] = useState(0)
    const navigate=useNavigate();
    const [materials,SetMaterials] = useState({});
    const[SelectMats,SetSelectMats] = useState([{}]);
    const [ print,Setprint] = useState({});
    let {id}  = useParams(); 

    const[materia,Setmateria] = useState({});
    let web3 = new Web3();

    const material=[
        {value:"0" , label:"ABS"},
        {value:"1",label:"PLA"},
        {value:"2",label:"PETG"}]

    const food = [
        {value:"1", label:"Si"},
        {value:"0",label:"No"}]

    const solub = [
        {value:"1", label:"Si"},
        {value:"0",label:"No"}]


    async function LoadPrinterMaker(){
        const onboarding = new OnBoarding();
        var printer = await onboarding.getPrinter(id);
        SetNozzles(printer.mountedNozzles)
        SetSoluble(printer.soluble === false ? 0 : 1)
        Setprint({...print,mountedNozzles:printer.mountedNozzles,soluble:printer.soluble,foodSafety:printer.foodSafety})
        Setfood(printer.foodSafety)    
    return printer;
    }

    async function ModifyPrinter(){
        const onBoarding = new OnBoarding();
        Setprint({...print, soluble: Soluble,foodSafety: foods,/*mountedNozzles:Nozzles,*/ type: materials});
        console.log(print)

        var printer = await onBoarding.ModifyPrinter(
            id,
            print
        )
        return printer;
    }

    async function getMaterials(){
        const onboard = new OnBoarding();
        var materials = await onboard.getMaterials();
        materials.forEach((val,index) => {
            SetMaterials(
                [...materials,{name: web3.utils.toAscii(val.name), type: val.mType,color: val.color,quantityKG: val.quantityKG, printTemp: val.printTemperature, bedTemp: val.bedTemperature}]
            )
            SetSelectMats(
                [...SelectMats,{value: index.toString(),label : web3.utils.toAscii(val.name) }]
            )
        });
        
    }

    useEffect(()=>{
        LoadPrinterMaker();
        getMaterials();
    },[])


    /*const handleChange = (option,type)=>{
        let values=[]
        switch(type){
            case "food" : 
        }
        option.map((value)=>{
            values.push(parseInt(value.value));
            
        })
        SetMateriale(values);
        if(values.length===0)
            printerData['material']=undefined;
        console.log(printerData['material']);
        

    }*/

    return(
        <div>
            <UserNav/>
            <div className="printerTable">
            <h1>Modify Printer</h1>
            <div className="SignIn">
                

        <label>
        <p>NozzlesMounted :{Nozzles}</p>
        <p><input type="number" placeholder="nozzles"onChange={(event)=> Setprint({...print,mountedNozzles:event.target.value})}/></p>
        </label>

        <label>
        <p>Materiale solubile</p>
        
        <div style={{
                        width:"200px",
                        margin:"auto"}}>
        <Select 
                    options={solub}
                    placeholder={Soluble ? (solub[Soluble].label) : "No"}
                    getOptionValue={(option)=>option.value}
                    onChange={(option)=>{(Setprint({...print,"soluble": Boolean(parseInt(option.value))}));
                    console.log(option);}}/>
                    </div>
        </label>

        <label>
        <p>Food Safety</p>
        
        <div style={{
                        width:"200px",
                        margin:"auto"}}>
        <Select  
                    options={food}
                    //placeholder={foods ? (food[foods].label) : "No"}
                    getOptionValue={(option)=>option.value}
                    onChange={(option)=>{(Setprint({...print,"foodSafety": Boolean(parseInt(option.value))}));
                    console.log(option.value);}}/>
                    </div>  
        </label>

        <label>
            <p> Mount Material</p>
        </label>
        <div style={{
                        width:"200px",
                        margin:"auto"}}>
        <Select  
                    options={SelectMats}
                    getOptionValue={(option)=>option.value}
                    onChange={(option)=>{
                    Setprint({...print,'MaterialDetails':materials.find(x => x.name == option.label)})
                    console.log(print);}}/>
                    </div>

        <button className="printerButton" onClick={ModifyPrinter}>Modify</button>
            </div>
        </div>
        </div>
    )
}