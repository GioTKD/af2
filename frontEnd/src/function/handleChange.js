export function handleChange(option,type,objInfo){


    let values=[];
    option.map((value)=>{
        return values.push(parseInt(value.value));
        
    })
    
    objInfo[type]=values;
    //console.log(values);
    if(values.length===0)
        objInfo[type]=undefined;
        console.log("qua")
    return objInfo;

}