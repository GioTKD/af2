import React, { useEffect, useState } from 'react'
import { UserNav } from '../../component/Navbar/homeNav'
import OnBoarding from '../../SmartContracts/OnBoarding/OnBoarding'
import './MountMaterial.css'
import Select from 'react-select'
import { useParams } from 'react-router-dom'

export default function MountMaterial() {

    const[Name,SetName] = useState("");
    const[printer,setPrinter]= useState(0);
    const[material,setMaterial]=useState([]);
    let {id}  = useParams();
    const materiale=[
        {value:"0" , label:"ABS"},
        {value:"1",label:"PLA"},
        {value:"2",label:"PETG"}]  
        
        const handleChangeMats=(option)=>{
          let values=[]
          option.map((value)=>{
              values.push(parseInt(value.value));
              
          })
          setMaterial(values);
         // console.log(values)
      }
      
      const handleSubmit = async(event)=>{
        event.preventDefault();
        let matobj = {Name: Name, material: material, printer: printer}
        console.log(matobj)
      }

      useEffect(() => {
        console.log(id)
      },[])
      


  return (
    <div>
    <div className='sign'>
        <UserNav/>
        <h1>Mount Material</h1>
    </div>

      <div className='SignIn'>
        <label>
          <p>Name</p>
          <input type="text" onChange={(event)=> SetName(event.target.value)}></input>
        </label>

        <label>
          <p>Material Type</p>
          <div style={{
                    width:"200px",
                    margin:"auto"}}>
                      <Select isMulti
                      options={materiale}
                      getOptionValue={(option)=>option.value}
                      onChange={(option)=>{handleChangeMats(option);
                      }}
                      />
                  </div>
        </label><br />
        <button className='next1' onClick={handleSubmit}>Add Material</button>

      </div>

    </div>
  )
}
