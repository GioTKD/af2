import {  useState } from 'react';
import OnBoarding from '../../SmartContracts/OnBoarding/OnBoarding';
import { HomeNav } from '../../component/Navbar/homeNav';
import Select from 'react-select';
import './LoadPrinter.css';
import {UserNav} from "../../component/Navbar/homeNav" 
import { useEffect } from 'react';


export default function LoadPrinter(){

    const [error,setError]=useState(false)
    const [errorMessage,SetErrorMessage]=useState('');
    let  printerData={"soluble":true,"foodSaety":true,"material":[]};
    const [section,setSection]=useState(1);
    const [address, setAddress] = useState("");
    const [name,Setname] = useState("");
    const [materiale,SetMateriale] =useState([]);
    const [nozzles,SetNozzles] = useState(0);
    const [printTemp,SetPrintTemp] = useState(0);
    const [BedTemp,SetBedTemp] = useState(0);
    const [volume,SetVolume] = useState(0);
    const [soluble,SetSolub] = useState(false);
    const [FoodSafety,SetFood] = useState(false);
    const[OneVal,SetOneVal] = useState(0);

    const material=[
        {value:"0" , label:"ABS"},
        {value:"1",label:"PLA"},
        {value:"2",label:"PETG"}]

    const nozzle = [
        {value:"0", label:"1mm"},
        {value:"1", label:"2mm"},
        {value:"2", label:"3mm"},
        {value:"3", label:"4mm"},
        {value:"4", label:"5mm"},
        {value:"5", label:"6mm"}
    ]

    //PRENDO SOLO 1 ELEMENTO
    const MountedNozzles = [
        {value:"0", label:"1mm"},
        {value:"1", label:"2mm"},
        {value:"2", label:"3mm"},
        {value:"3", label:"4mm"},
        {value:"4", label:"5mm"},
        {value:"5", label:"6mm"}
    ]

    let onBoarding=new OnBoarding();


            /*if(window.ethereum){
                const accounts=await window.ethereum.request({ method: "eth_requestAccounts"} )
                if(accounts.length>0)
                    navigate('/')
                else
                    window.ethereum.request({ method: "eth_requestAccounts"} )*/

    const handleChange=(option)=>{
        let values=[]
        option.map((value)=>{
            values.push(parseInt(value.value));
            
        })
        SetMateriale(values);
        if(values.length===0)
            printerData['material']=undefined;
        console.log(printerData['material']);
        

    }


    const handleSubmit= async(event)=>{
        event.preventDefault();
        let result=false;
        if(result){
            console.log("webekbj")
            return}
        else {
            let printerobj = {address : address, name: name, materiale: materiale, nozzles:nozzles, printTemp:printTemp, BedTemp: BedTemp, volume:volume, soluble: soluble, FoodSafety: FoodSafety}
            console.log(printerobj)
            await onBoarding.addPrinter(printerobj);
        }

    }

    const checkError=async(printerData)=>{

        if(printerData['name'].match( /^[a-zA-Z0-9]+$/g)==null){
            setError(true);
            SetErrorMessage("The inserted character are not valid");
            return true;
        }
        else if(printerData['address'].length<10){
            setError(true);
            SetErrorMessage("Invalid address");   
            return true;
            //ALTRI CHECK SU ADDRESS PROVVISORIO
        }
        else return false;

    
    }      
    
    
useEffect(() => {
    console.log(OneVal)
  },[])
  


    return (

        <div>
            <div className='sign'>
            <UserNav/>
            <h1>Add printer</h1>
            <div className='SignIn'>
            <form  onSubmit={handleSubmit}>
            
            <div className="sectionPage" style={{display:section===1?('block'):('none')}}>
                <label>
                    <p>Address</p>
                    <input type="text" name="address" onChange={(event) =>{setAddress(event.target.value)}} autoComplete="off" required minLength="4" maxLength="90"></input>
                </label><br/>

                <label>
                    <p>Name</p>
                    <input type="text" name="username" onChange={event =>{ Setname(event.target.value)}} autoComplete="off" required minLength="4" maxLength="10"></input>
                </label><br/>
                <label>
                <p>Material</p>
                    <div style={{
                        width:"200px",
                        margin:"auto"}}>
                   <Select  isMulti 
                    options={material}
                    getOptionValue={(option)=>option.value}
                    onChange={(option)=>{handleChange(option);
                    console.log(option);}}/>
                    </div>
                </label><br/>
                </div>

                <div className="sectionPage" style={{display:section===2?('block'):('none')}}>
                <label>
                <p>Nozzles</p>
                <div style={{
                        width:"200px",
                        margin:"auto"}}>
                   <Select  isMulti 
                    options={nozzle}
                    getOptionValue={(option)=>option.value}
                    onChange={(option)=>{handleChange(option);
                    console.log(option);}}/>
                    </div>
</label><br/>
                <label>
                <p>Nozzles mounted</p>
                <div style={{
                        width:"200px",
                        margin:"auto"}}>
                        <Select onChange={(e)=>{SetOneVal(e)}}
                        options ={MountedNozzles}
                        />
                    </div>
                   {/* <input type="number" id="tentacles" name="tentacles"
                        min="1" max="10" onChange={event => {printerData["nozzlesMount"]=event.target.value
                        }}/>*/} 

                </label><br/>

                <label>
                <p>Print Temperature</p>
                <input type="number" id="tentacles" name="tentacles"
                    min="1" max="10" onChange={event => {SetPrintTemp(event.target.value)}}/>
                </label><br/>
                </div>

                <div className="sectionPage" style={{display:section===3?('block'):('none')}}>
                <label>
                <p>Bed Temperature</p>
                <input type="number" id="tentacles" name="tentacles"
                    min="1" max="10" onChange={event => {SetBedTemp(event.target.value)}}/>
                </label><br/>

                <label>
                <p>Volume</p>
                <input type="number" id="tentacles" name="tentacles"
                    min="1" max="10" onChange={event => {SetVolume(event.target.value)}}/>

                </label><br/>

                <label>
                <p>soluble</p>
                    <select name="soluble" id="soluble" onClick={(e)=>SetSolub(e.target.value)}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                </label><br/>

                <label>
                <p>Food Safety</p>
                    <select name="food" id="food" onClick={(e)=>SetFood(e.target.value)}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                </label><br/>
                </div>
                { error && <p className='error'>{errorMessage}</p>}
                
                <div className='elementInsertion'>
                {                   
                                    
                                    section>1
                                        &&
                                    
                <button className="next1" type='button' onClick={()=>setSection((prev)=>prev-1)}>Indietro</button>
                                       
                }
                {                       section!==3
                                            &&
                     <button className="next1" type='button'style={{marginLeft:section===1?('130px'):('auto')}} 
                        onClick={()=>setSection((prev)=>prev+1)}>Avanti</button>
                }

                {section===3 && <button className="next1" type='submit'>Aggiungi</button>}
                </div>


            </form>
            </div>

        </div>
        </div>


    )
}