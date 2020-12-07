import React,{useState,useCallback} from 'react'
import logo from '../../assets/images/nav_logo.png';
import search from '../../assets/Button/search.png';
import noti from '../../assets/Button/noti.png';

import axios from 'axios';
import SearcBar from './Search/SearchBar';

import './MainLogo.css';

function MainLogo() {
    const [openSearch,setOpenSearch] = useState(false);
    const [result,setResult] = useState([]);

    const searchOpen =useCallback(() => {
        setOpenSearch(!openSearch)
    },[openSearch])

    const onSearch = useCallback((e) => {
         console.log(e.target.value)  
         const nickname = e.target.value;   
         axios.get(`/user/userSearch/${nickname}`)
         .then(({data})=>{
            setResult(data)
         })
    },[])
    return (
        <>
        {openSearch?
        <SearcBar search={search} searchOpen={searchOpen} result={result} onSearch={onSearch} />:
        <div>
            <div className="top">
                <div className="top_logo">
                    <img src={logo} />
                </div>
                {openSearch?<input type="text" name="search" onChange={onSearch} />:''}
                <div className="top_feature">
                    <img src={search} onClick={searchOpen}/>
                    <img src={noti} />
                </div>
            </div>    
        </div>
        }
        </>
    )
}

export default MainLogo
