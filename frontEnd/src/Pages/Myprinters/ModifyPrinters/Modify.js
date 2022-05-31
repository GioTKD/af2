import { UserNav } from "../../../component/Navbar/homeNav"
import { getPrinters } from "../../../data/data";
import '../Myprinters.css'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect} from "react";
import { useState } from "react";
import OnBoarding from "../../../SmartContracts/OnBoarding/OnBoarding";

export default function Modify(){

    const [NamePrinter,SetNamePrinter] = useState("");
    const [Nozzles,SetNozzles] = useState(0);
    const [Soluble,SetSoluble] = useState(true);
    const navigate=useNavigate();
    let {id}  = useParams();
    console.log(id)


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


    return(
        <div>
            <UserNav/>
            <div className="printerTable">
            <h1>Modify Printer</h1>
            <div className="SignIn">
                
        <label>
            <p>Name : {id}</p>
            <input type="text" placeholder="Name" onChange={(event)=> SetNamePrinter(event.target.value)}/>
        </label>

        <label>
        <p>NozzlesMounted :{Nozzles}</p>
        <p><input type="number" placeholder="nozzles"onChange={(event)=> SetNozzles(event.target.value)}/></p>
        </label>

        <label>
        <p>Soluble: {Soluble.toString()}</p>
        <button className="printerButton" value={Soluble} onChange={e => SetSoluble(e.target.value)} onClick={onClickSol}>{Soluble.toString()}</button>
        </label>

        <label>
            <p> Mount Material</p>
        </label>
            <button className="printerButton" onClick={()=> navigate(`./MountMaterial`)}>Mount Material</button>

        <button className="printerButton">Modify</button>
            </div>
        </div>
        </div>
    )
}