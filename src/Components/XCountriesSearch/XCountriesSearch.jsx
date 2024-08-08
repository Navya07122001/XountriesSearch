import React, { useEffect, useState ,useRef} from 'react'
import axios from 'axios';
import styles from './XCountriesSearch.module.css'
const XCountriesSearch = () => {
    const [data,setData]=useState([]);
    const [searchval,setSearchval]=useState('')
   
    const handleSearch=(e)=>{
        setSearchval(e.target.value)
        
    };
    const fetchData=async(val='')=>{
        try{
         const response=await axios.get("https://restcountries.com/v3.1/all")
         
         const data1= response.data;
         const res= data1.filter((ele)=>(ele.name.common.toLowerCase().includes(val.toLowerCase())))
          
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
             debouncedSearch(searchval);
        }
        else{
            fetchData();
        }
    },[searchval])
  return (
    <>
    <div style={{height:"50px",background:'grey',alignContent:'center',textAlign:'center'}}>
    <input type="text" onChange={handleSearch} value={searchval} style={{width:'50%',height:'70%'}}/>
    </div>
    
    <div className={styles.countryCard}>
    {
        data.map((item)=>{
            return (
            <div style={{border:'1px solid black',borderRadius:"5px",padding:"10px", margin:"10px",height:"110px",width:"120px"}}>
              <img src={item.flags.png} alt="img" style={{height:"65px",width:"65px"}}/>
              <div style={{fontSize:"13px",fontWeight:600}}>{item.name.common}</div>
            </div> )
        })
    }
    </div>
    </>
  )
}

export default XCountriesSearch;