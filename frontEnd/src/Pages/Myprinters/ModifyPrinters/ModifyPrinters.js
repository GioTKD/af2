import { UserNav } from "../../../component/Navbar/homeNav"
import { getPrinters } from "../../../data/data";
import '../Myprinters.css'
import { useNavigate } from "react-router-dom";
import { useEffect} from "react";
import { useState } from "react";

export default function ModifyPrinters(){
    //const printers = getPrinters();
    const navigate = useNavigate();
    const [printers,setPrinters]=useState(getPrinters());


    const goModifyPrinters= () =>{
        navigate("/Modify")
    }

    return(
        <div>
            <UserNav/>
        
        <div className="printerTable">
            <h1>Modify Printers</h1>
            <table className="myPrinters">
                    <tbody>
                    <tr>
                        <th>Address</th>
                        <th>Name</th>
                        <th>NozzlesMounted</th>
                        <th>Soluble</th>
                        <th>Modify</th>
                    </tr> 
                    {printers.printers.map((val,key)=>
                    <tr key={key}>
                        <td key={val.address}>{val.address}</td>
                        <td key={val.name}>{val.name}<br /><input type="text" placeholder="Modify Name"/>
                        </td>
                        <td key ={val.nozzlesMounted}>{val.nozzlesMounted} <button key={"button"+val.name} className="printerButton">Change</button></td>
                        <td key ={val.soluble}>{val.soluble}
                        </td>
                        <td key={"button"+val.name}><button key={"button"+val.address} className="printerButton" onClick={()=>goModifyPrinters()}>Modify</button></td>
                    </tr>)}
                   </tbody> 
                </table>
            </div>
        </div>
    )
}