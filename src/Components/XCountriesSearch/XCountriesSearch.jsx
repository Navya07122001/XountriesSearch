import React, { useEffect, useState ,useRef} from 'react'
import axios from 'axios';
import styles from './XCountriesSearch.module.css'
const XCountriesSearch = () => {
    const [data,setData]=useState([]);
    const [filtereddata,setFiltereddata]=useState([])
    const [searchval,setSearchval]=useState('')
   
    const handleSearch=(e)=>{
        setSearchval(e.target.value)
        
    };
    const fetchData=async(val='')=>{
        try{
         const response=await axios.get("https://restcountries.com/v3.1/all")
         
         const data1= response.data;
         if(val){
         const res= data1.filter((ele)=>(ele.name.common.toLowerCase().includes(val.toLowerCase())))
         setFiltereddata(res)
         }
         setData(data1);
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
    <form style={{height:"50px",background:'grey',alignContent:'center',textAlign:'center'}}>
    <input type="text" onChange={handleSearch} value={searchval} style={{width:'50%',height:'70%'}}/>
    </form>
    <div className={styles.container}>
    
    {
        filtereddata.length>0 ?
            filtereddata.map((item)=>{
                return (
                    <div  key={item.cca3} className={styles.countryCard}>
                <div style={{border:'1px solid black',borderRadius:"5px",padding:"10px", margin:"10px",height:"110px",width:"120px"}}>
                  <img src={item.flags.svg} alt={item.name.common} className={styles.flag} />
                  <div style={{fontSize:"13px",fontWeight:600}}>{item.name.common}</div>
                </div>
                </div> )
            })
        

        :
        data.map((item)=>{
            return (
                <div  key={item.cca3} className={styles.countryCard}>
            <div style={{border:'1px solid black',borderRadius:"5px",padding:"10px", margin:"10px",height:"110px",width:"120px"}}>
              <img src={item.flags.svg} alt={item.name.common} className={styles.flag} />
              <div style={{fontSize:"13px",fontWeight:600}}>{item.name.common}</div>
            </div>
            </div> )
        })
    
    }
   
    </div>
    </>
  )
}

export default XCountriesSearch;