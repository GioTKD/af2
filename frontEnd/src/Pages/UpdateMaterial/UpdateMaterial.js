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
  const web3 = new Web3();
  var mate = await onboard.getMaterials();
  console.log(mate[0].name)
  console.log(id)
  //var mats = await onboard.getMaterial(id)
  //let mats = mate[id]
  //console.log(mats)
  SetMaterial({name:web3.utils.hexToUtf8(mate[parseInt(id)].name)})
  SetquantityKG(mate[id].quantityKG)
  SetprintTemp(mate[id].printTemperature)
  SetBedTemp(mate[id].bedTemperature)
  SetColor(mate[id].color)
  Settype(mate[id].mType)
  }
  getMat();
  console.log(Material.color)
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
  console.log(Material.name)
  console.log(type)
  console.log(colore)
  console.log(quantityKG)
  console.log(printTemp)
  var mats = await onboarding.updateMaterial(Material.name,type,colore,quantityKG,printTemp,bedTemp);
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
                   placeholder={type ? (material[type].label): 0}
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
                      placeholder={colore ? (material[colore].label) : 0}
                      options={color}
                      getOptionValue={(option)=>option.value}
                      />

                  </div>
          <p>QuantityKg</p>  
          <input type="number" placeholder={quantityKG+ " KG"} onChange={(event)=>{SetquantityKG(event.target.value)}}></input>
          <p>PrintTemp</p>
          <input type="number" placeholder={printTemp+ " °C"} onChange={(event)=>{SetprintTemp(event.target.value)}}></input>
          <p>bedTemp</p>
          <input type="number" placeholder={bedTemp+" °C"} onChange={(event)=>{SetBedTemp(event.target.value)}}></input><br/>
          <button className='next1' onClick={(UpdateMats)}>Update Material</button>
        </div>
    </div>
  )
}

