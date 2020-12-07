import React from 'react'
import './SearchBar.css';

const SearchBar = ({search,searchOpen,result,openSearch,onSearch}) => {
    return (
        <>
        <div className="searchbar_container">
            <img src={search} />
            <input type="text" placeholder="검색..." onChange={onSearch} />
            <div>
                <button onClick={searchOpen}>취소</button>
            </div>
        </div>
        <div className="search_content">
            {result.map((v)=>(
                <ul>
                    <li>{v.userProfileImage !== null?<img src={v.userProfileImage.src} width="100px" height="100px" />:""}</li>
                    <li>{v.nickname}</li>
                </ul>
            ))}
        </div>
        </>
    )
}

export default SearchBar
