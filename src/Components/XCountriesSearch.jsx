import React, { useEffect, useState ,useRef} from 'react'
import axios from 'axios';

const XCountriesSearch = () => {
    const [data,setData]=useState([]);
    const [searchval,setSearchval]=useState('')
    const [filterdata,setFilterdata]=useState([])
    const ref=useRef();
    const handleSearch=(e)=>{
        setSearchval(e.target.value)
        
    }
    const fetchData=async(val)=>{
    
        try{
         const response=await axios.get("https://xcountries-backend.azurewebsites.net/all")
         const data1=await response.data;
           if(!val)
           {
            setData(data1)
            return
           }
            const res=await data1.filter((ele)=>(ele.name.toLowerCase().includes(val.toLowerCase())))
            console.log(res)
         setData(res);
         
         
        
        }
        catch(e){
            console.error("Error fetching data: ")
        }
    }
   const debounce=(fn,delay)=>
    {

        let timerid;
        return function(...args){
         
            if(timerid)
            {
                clearTimeout(timerid)
            }
            timerid=setTimeout(()=>fn(...args),delay);
        }
    }
    const debouncedSearch=useRef(debounce(fetchData,1000)).current;
   
    useEffect(()=>{
        fetchData();
    },[])
    useEffect(()=>{
       
        if(searchval)
        {
            
            debouncedSearch(searchval)
        }
    },[searchval])
  return (
    <>
    <div style={{height:"50px",background:'grey',alignContent:'center',textAlign:'center'}}>
    <input type="text" onChange={handleSearch} style={{width:'50%',height:'70%'}}/>
    </div>
    
    <div style={{display:"flex",flexWrap:'wrap',alignItems:'center',justifyContent:'space-between',textAlign:"center"}}>
    {
        data.map((item)=>{
            return (
            <div style={{border:'1px solid black',borderRadius:"5px",padding:"10px", margin:"10px",height:"110px",width:"120px"}}>
              <img src={item.flag} alt="img" style={{height:"65px",width:"65px"}}/>
              <div style={{fontSize:"13px",fontWeight:600}}>{item.name}</div>
            </div> )
        })
    }
    </div>
    </>
  )
}

export default XCountriesSearch;