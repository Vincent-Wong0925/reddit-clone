import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDom from 'react-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReddit } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './Searchbar.css';
import {
    loadSearchResult,
    selectSearchResult,
    isLoadingResult,
    failedToLoadResult,
  } from '../post/postSlice';

function Searchbar() {
    const dispatch = useDispatch();

    const [term, setTerm] = useState('');

    function handleTermChange(e) {
        setTerm(e.target.value);
    }

    function handleSearch(e) {
        if (term.length === 0) {
            return;
        }
        dispatch(loadSearchResult(term));
        setTerm('');
    }

    return (
        <div className="search-div">
            <div className="website-title">
                <FontAwesomeIcon className="blue reddit-icon" icon={faReddit} />
                <h1><span className="blue">Reddit</span> Clone</h1>
            </div>
            <div className="search-container">
                <input type='text' 
                    className="searchbar" 
                    placeholder="Search Reddit"
                    onChange={handleTermChange}
                    value={term} />
                <button className="search-button" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </div>
    );
}

export default Searchbar;