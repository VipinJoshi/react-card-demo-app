import React from 'react';
import './Search.css'

function Search({
    onChange
}) { 
    return <div className="searchArea" >
        <input className="searchInput" type="text" placeholder="Search"  onChange={onChange}></input>
    </div>
}

export default Search;