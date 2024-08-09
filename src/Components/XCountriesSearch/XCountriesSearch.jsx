import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './XCountriesSearch.css';

const XCountriesSearch = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchval, setSearchval] = useState('');

    const handleSearch = (e) => {
        setSearchval(e.target.value);
    };

    const fetchData = async (val = '') => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const data1 = response.data;

            if (val) {
                const res = data1.filter((ele) =>
                    ele.name.common.toLowerCase().includes(val.toLowerCase())
                );
                setFilteredData(res);
                return;
            }

            setData(data1);
            setFilteredData(data1);
        } catch (e) {
            console.error('Error fetching data: ', e);
        }
    };

    const debounce = (fn, delay) => {
        let timerid;
        return function (...args) {
            if (timerid) {
                clearTimeout(timerid);
            }
            timerid = setTimeout(() => fn(...args), delay);
        };
    };

    const debouncedSearch = useRef(debounce(fetchData, 1000)).current;

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (searchval) {
            debouncedSearch(searchval);
        } else {
            setFilteredData(data); // Show all data when the search input is cleared
        }
    }, [searchval, data]);

    return (
        <>
            <form style={{ height: '50px', background: 'grey', alignContent: 'center', textAlign: 'center' }}>
                <input
                    type="text"
                    onChange={handleSearch}
                    value={searchval}
                    style={{ width: '50%', height: '70%' }}
                />
            </form>
            <div className="container">
                {
                    filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <div key={item.cca3} className="countryCard">
                                <div style={{ border: '1px solid black', borderRadius: '5px', padding: '10px', margin: '10px', height: '110px', width: '120px' }}>
                                    <img src={item.flags.svg} alt={item.name.common} className="flag" />
                                    <div style={{ fontSize: '13px', fontWeight: 600 }}>{item.name.common}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        searchval && <p></p>
                    )
                }
            </div>
        </>
    );
};

export default XCountriesSearch;
