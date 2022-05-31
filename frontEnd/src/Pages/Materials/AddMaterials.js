import React from 'react'
import './AddMaterial.css'
import OnBoarding from '../../SmartContracts/OnBoarding/OnBoarding'
import { UserNav } from '../../component/Navbar/homeNav'
import { useState } from 'react'
import Select from 'react-select'
import { getMaterial, getColor } from '../../data/data'


export default function AddMaterials(route) {

  const [materiale,SetMateriale] =useState([]);
  const [colors,SetColor] = useState([]);
  const [Name,Setname] = useState("");
  const [quantityKG,SetquantityKG] = useState(0);
  const [printTemp,SetprintTemp] = useState(0);
  const [bedTemp,SetBedTemp] = useState(0);
  const [section,setSection]=useState(1);
  

  let onBoarding = new OnBoarding();


  
  const material=getMaterial()
    
  const color= getColor();

    const handleChangeMats=(option)=>{
      let values=[]
      option.map((value)=>{
          values.push(parseInt(value.value));
          
      })
      SetMateriale(values);
      console.log(values)
  }

  const handleChangeColor=(option)=>{
    let values=[]
    option.map((value)=>{
        values.push(parseInt(value.value));
        
    })
    SetColor(values);
    console.log(values)
}

const handleSubmit = async(event)=>{
  event.preventDefault();
  let matobj = {name: Name, materiale: materiale, colors: colors,quantityKG: quantityKG, printTemp: printTemp, bedTemp: bedTemp}
  console.log(matobj)
  await onBoarding.addMaterial(matobj)
  }


  return (
    <div>
        <div className='sign'>
            <UserNav/>

            <div className="SignIn" >
              <h1>Add Materials</h1>
              <div className='sectionPage' style={{display:(section===1)?('block'):('none')}}>

              <label>
                    <p>Name</p>
                    <input type="text" onChange={event =>{Setname(event.target.value)}}></input>
                </label><br/>

                <label>
                  <p>Material Type</p>
                  <div style={{
                    width:"200px",
                    margin:"auto"}}>
                      <Select isMulti
                      options={material}
                      getOptionValue={(option)=>option.value}
                      onChange={(option)=>{handleChangeMats(option);
                      }}
                      />
                  </div>
                </label>

                <label>
                  <p>Color</p>
                  <div style={{
                    width:"200px",
                    margin:"auto"}}>
                      <Select isMulti 
                      options={color}
                      getOptionValue={(option)=>option.value}
                      onChange={(option)=>{handleChangeColor(option);
                      }}
                      />

                  </div>
                </label>
              </div>

              <div className='sectionPage' style={{display:(section===2)?('block'):('none')}}>
                <label>
                  <p>Quantity KG</p>
                  <input type="number" onChange={event => {SetquantityKG(event.target.value)}}></input>
                </label>

                <label>
                  <p>Print Temp</p>
                  <input type="number" onChange={event => {SetprintTemp(event.target.value)}}></input>
                </label>

                <label>
                  <p>Bed Temp</p>
                  <input type="number" onChange={event => {SetBedTemp(event.target.value)}}></input>
                </label><br/>
                <button className='next1' onClick={handleSubmit} >Add Material</button>
                </div>

                <div className='elementInsertion'>
                  {
                    section>1
                    &&
                    <button className="next1" type='button' onClick={()=>setSection((prev)=>prev-1)}>Indietro</button>                  }
                  {
                    section==1
                    &&
                    <button className="next1" type='button'style={{marginLeft:section===1?('130px'):('auto')}} 
                        onClick={()=>setSection((prev)=>prev+1)}>Avanti</button>
                  }
                </div>

            </div>

        </div>
        <div>
            
        </div>
    </div>
  )
}
