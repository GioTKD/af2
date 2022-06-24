import { UserNav } from "../../../component/Navbar/homeNav"
import { getPrinters } from "../../../data/data";
import '../Myprinters.css'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect} from "react";
import { useState } from "react";
import OnBoarding from "../../../SmartContracts/OnBoarding/OnBoarding";
import Select from 'react-select';

export default function Modify(){

    const [NamePrinter,SetNamePrinter] = useState("");
    const [Nozzles,SetNozzles] = useState(0);
    const [Soluble,SetSoluble] = useState(true);
    const navigate=useNavigate();
    let {id}  = useParams();
    console.log(id)

    const[materia,Setmateria] = useState({});


    const material=[
        {value:"0" , label:"ABS"},
        {value:"1",label:"PLA"},
        {value:"2",label:"PETG"}]

    const food = [
        {value:"0", label:"Si"},
        {value:"1",label:"No"}]

    const solub = [
        {value:"0", label:"Si"},
        {value:"1",label:"No"}]

    

    async function DataChange(){
    /*    console.log(NamePrinter)
        console.log(Nozzles)
        console.log(Soluble)
    */}

    async function onClickSol(){
        SetSoluble(!Soluble)
    }

    async function LoadPrinterMaker(){
        const onboarding = new OnBoarding();
        var printer = await onboarding.getPrinter(id);
/*        SetNamePrinter(printer.name)
        SetNozzles(printer.nozzles)
        SetSoluble(printer.soluble)
        */
       console.log(printer)    
    return printer;
    }

    useEffect(()=>{
        LoadPrinterMaker();
        console.log(id)
        console.log(NamePrinter)
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
            <p>Name : {/*id*/}</p>
            <input type="text" placeholder="Name" onChange={(event)=> SetNamePrinter(event.target.value)}/>
        </label>

        <label>
        <p>NozzlesMounted :{/*Nozzles*/}</p>
        <p><input type="number" placeholder="nozzles"onChange={(event)=> SetNozzles(event.target.value)}/></p>
        </label>

        <label>
        <p>Materiale solubile</p>
        
        <div style={{
                        width:"200px",
                        margin:"auto"}}>
        <Select 
                    options={solub}
                    getOptionValue={(option)=>option.value}
                    onChange={(option)=>{(Setmateria({...materia,"soluble": option.value}));
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
                    getOptionValue={(option)=>option.value}
                    onChange={(option)=>{(Setmateria({...materia,"FoodSafety": option.value}));
                    console.log(option);}}/>
                    </div>
        </label>

        <label>
            <p> Mount Material</p>
        </label>
        <div style={{
                        width:"200px",
                        margin:"auto"}}>
        <Select  
                    options={material}
                    getOptionValue={(option)=>option.value}
                    onChange={(option)=>{;
                    console.log(option);}}/>
                    </div>

        <button className="printerButton">Modify</button>
            </div>
        </div>
        </div>
    )
}