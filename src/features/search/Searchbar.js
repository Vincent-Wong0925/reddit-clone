import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Searchbar.css';
import {
    loadSearchResult,
    selectSearchResult,
    isLodingResult,
    failedToLoadResult,
  } from './searchSlice';

function Searchbar() {
    const dispatch = useDispatch();

    const [term, setTerm] = useState('');

    function handleTermChange(e) {
        setTerm(e.target.value);
    }

    function handleSearch(e) {
        dispatch(loadSearchResult(term));
    }

    return (
        <div className="search-div">
            <h1>Reddit Clone</h1>
            <div className="search-container">
                <input type='text' 
                    className="searchbar" 
                    placeholder="Search Reddit"
                    onChange={handleTermChange}
                    value={term} />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
}

export default Searchbar;