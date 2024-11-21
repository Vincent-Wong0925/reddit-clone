import React from "react";
import { useState } from "react";
import './Searchbar.css';

function Searchbar() {
    const [term, setTerm] = useState();

    function handleTermChange(e) {
        setTerm(e.target.value);
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
                <button className="search-button">Search</button>
            </div>
        </div>
    );
}

export default Searchbar;