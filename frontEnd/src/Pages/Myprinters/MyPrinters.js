import { UserNav } from "../../component/Navbar/homeNav"
import './Myprinters.css'
import { useNavigate, useParams } from "react-router-dom";
import { useEffect} from "react";
import { useState } from "react";
import OnBoarding from "../../SmartContracts/OnBoarding/OnBoarding";
import Web3 from "web3"

export default function MyPrinters(){

    const [printers,setPrinters] = useState([])
    const navigate=useNavigate();
    const[printerName,SetPrinterName] = useState();
    const[printerTemp,setPrinterTemp] = useState();  
    const [PrintersList,SetPrintersList] = useState([]); 


    async function LoadPrinterMaker(){
        const onboarding = new OnBoarding();
        var printer = await onboarding.getPrinter();
        setPrinters(printer)
        return printer[0];
    }

    useEffect(()=>{
      //  console.log(LoadPrinterMaker())
    },[])


    let result = "ciao";



    useEffect(()=>{
        async function getPrinters(){
            const onboarding = new OnBoarding();
            const web3 = new Web3()
            var printer = await onboarding.getPrinters();
            console.log("ciao")
            console.log(printer)
           result= printer.map((value,key)=>{
               
            const handleSubmit = async(event)=>{
                event.preventDefault();
                const onboarding = new OnBoarding();
                await onboarding.RemovePrinter(key)
                window.location.reload()
            }

                
                return (<tr key={key}>
                            <td key={value.name} >{web3.utils.toUtf8(value.name)}</td>
                            <td key={value.mountedNozzles+"volume"}>{value.mountedNozzles}</td>
                            <td key={value.soluble+ "temp"}>{value.soluble}</td>
                            <td><button className="next1" onClick={()=>navigate(`/myprinters/Modify/${key}`)}>Modify</button></td>
                            <td><button className="next1" onClick={handleSubmit}>Remove Printer</button></td>
                </tr>)
            })
            /*const PrintersList = printer.map(printer=>{
                <p><h3>PRINTER</h3><br />Nome: <br />{printer.name}<br />Address : {printer.printerAddress}<br /> Materiali supportati: {printer.supportedMaterial}<br />nozzles : {printer.nozzles}<br />nozzlesMounted : {printer.mountedNozzles}<br />printTemperature : {printer.maxPrintTemperature}<br />maxBedTemperature: {printer.maxBedTemperature}<br />nozzles : {printer.nozzles}<br />Soluble :{printer.soluble}<br />Supported Material: {printer.supportedMaterial}<br />Volume : {printer.volume}</p>
           })*/
           console.log(result)
           SetPrintersList(result);
        }
        getPrinters();
        },[])

    return(
        <div>
             <UserNav/>
            <div className="printerTable">
            <h1>My printers</h1>
            
            <table className="myPrinters">
                
                <tbody>
                <tr>
                    <th>Name</th>
                    <th>NozzlesMounted</th>
                    <th>Soluble</th>
                    <th>Modify</th>
                    <th>Remove</th>
                </tr>     
            {PrintersList}
            </tbody>
            </table>
            </div>
        <div className='SignIn' style={{border:'0px'}}>
        <button className='next1' onClick={()=>navigate('/addprinter')}>Add Printer</button>
        </div>
        </div>
    )
}
