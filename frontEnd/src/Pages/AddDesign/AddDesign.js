import React, { useState } from 'react'
import { UserNav } from '../../component/Navbar/homeNav'
import './AddDesign.css'
import { revealVote } from '../../data/data'
import Select from 'react-select'
import VotingSystem from '../../SmartContracts/VotingSystem/VotingSystem'
import { useEffect } from 'react'
import StlRenderer from './StlRenderer';
import UploadSTL from './UploadStl'

export default function AddDesign(){

    const stating=[
        {value:"0", label:"none"},
        {value:"1", label:"first"},
        {value:"2", label:"second"}
    ]

    const [filehash,SetHash] = useState();
    const [design,setDesign] = useState({});
    const [selectedFile, onChangeFile] = useState('undefined');
    const [taup,Settaup] = useState();
    const[taur,settaur] = useState();
    const [StlLoaded,SetStlLoaded] = useState(false);


    const voting = new VotingSystem();


/*
    <Select isMulti
                      options={material}
                      getOptionValue={(option)=>option.value}
                      onChange={(option)=>{handleChangeMats(option);
                      }}
                      />
*/

const handleSubmit = async(event)=>{
    event.preventDefault();
    let stateobj = {filehash: filehash, taur: taur, taup: taup}
    console.log(stateobj)
    let res = await voting.announce(filehash);
    let result = await voting.getNumDesignes();

    }

useEffect(()=>{
    
async function getDesign(){
    let design = await voting.getDesigne(0);
    let res = await voting.getNumDesignes();
    let test = await voting.getDesigns();
    console.log(test)
    console.log(design);

}
getDesign();
  },[])

  return (
    <div className='sign'>
        <UserNav/>

        <h1>Add Design</h1>
        <div className='SignIn'>
            
            <label>
                <p>FileHash</p>
                <input type="text" placeholder='filehash' onChange={(event)=> SetHash(event.target.value)}/>
            </label>
<br/>
            <label>
                <input type="number" placeholder='taur' onChange={(e)=> settaur(e)}/>
            </label>
<br/>
            <label>
                <input type="number" placeholder='taup' onChange={(e)=> Settaup(e)}/>
            </label>

                <br/>
            <label>
                <p>Select STL File</p>
                <UploadSTL changeFile={(val) => {onChangeFile(val); SetStlLoaded(true)}}/>
                
                {StlLoaded && <StlRenderer file={selectedFile}/>}
                </label>
           <button className="printerButton" onClick={handleSubmit}>Add Design</button>

        </div>

    </div>
  )
}
