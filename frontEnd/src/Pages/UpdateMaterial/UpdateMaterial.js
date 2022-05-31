import React, { useState } from 'react'
import './UpdateMaterial.css'
import OnBoarding from '../../SmartContracts/OnBoarding/OnBoarding'
import { UserNav } from '../../component/Navbar/homeNav'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Select from 'react-select';
import Web3 from 'web3'


export default function UpdateMaterial() {

  let {id} = useParams()

const[name,Setname] = useState("");
const[type,Settype] = useState([0]);
const[quantityKG,SetquantityKG] = useState(0);
const[printTemp,SetprintTemp] = useState(0);
const[bedTemp,SetBedTemp] = useState(0);
const[colore,SetColor] = useState([0]);

const[check,Setcheck] = useState(true);

const [Material,SetMaterial] = useState([]);

const web3 = new Web3();

const handleChange=(option)=>{
  let values=[]
  option.map((value)=>{
      values.push(parseInt(value.value));
      
  })
  Settype(values);
}



useEffect(() => {
  //console.log(id)
  async function getMat(){
  const onboard = new OnBoarding();
  var mate = await onboard.getMaterials()
  //let mats = mate[id]
  //console.log(mats)
  console.log(mate)
  SetMaterial({name: web3.utils.hexToUtf8(mate[id][name])})
  console.log(Material)
  }
  getMat();
},[])

const material=[
  {value:"0" , label:"ABS"},
  {value:"1",label:"PLA"},
  {value:"2",label:"PETG"}]  
  
  const color=[
    {value:"0", label:"NONE"},
    {value:"1", label:"BLACK"},
    {value:"2", label:"WHITE"},
    {value:"3", label:"BROWN"},
    {value:"4",label:"GRAY"},
    {value:"5", label:"YELLOW"},
    {value:"6", label:"ORANGE"},
    {value:"7", label:"RED"},
    {value:"8", label:"PINK"},
    {value:"9", label:"PURPLE"},
    {value:"10", label:"BLU"},
    {value:"11", label:"GREEN"}]



async function UpdateMats(){
  const onboarding = new OnBoarding();
  console.log(name)
  var mats = await onboarding.updateMaterial(Web3.utils.hexToAscii(Material[0]),type,colore,quantityKG,printTemp,bedTemp);
  console.log(mats)

}

async function checkMaterial(){
  const onboarding = new OnBoarding();
  Setcheck(await onboarding.CheckMaterial(name))
  console.log(check)
}


  return (
    <div className='sign'>
        <UserNav/>
        <h1>UpdateMaterial</h1>
        <div className='SignIn'>

          <p>Name : {Material['name']}</p>
          <p>Material Type</p>
          <div style={{
                        width:"200px",
                        margin:"auto"}}>
                   <Select  isMulti 
                    options={material}
                    getOptionValue={(option)=>option.value}
                    onChange={(option)=>{handleChange(option);
                    console.log(option);}}/>
                    </div>
          <p>Color</p>
          <div style={{
                    width:"200px",
                    margin:"auto"}}>
                      <Select isMulti 
                      options={color}
                      getOptionValue={(option)=>option.value}
                      />

                  </div>
          <p>QuantityKg</p>  
          <input type="number" placeholder={Material[3]+ " KG"} onChange={(event)=>{SetquantityKG(event.target.value)}}></input>
          <p>PrintTemp</p>
          <input type="number" placeholder={Material[4]+ " °C"} onChange={(event)=>{SetprintTemp(event.target.value)}}></input>
          <p>bedTemp</p>
          <input type="number" placeholder={Material[5]+" °C"} onChange={(event)=>{SetBedTemp(event.target.value)}}></input><br/>
          <button className='next1' onClick={(UpdateMats)}>Update Material</button>
        </div>
    </div>
  )
}

