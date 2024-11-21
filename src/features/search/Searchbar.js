import React from "react";
import './Searchbar.css';

function Searchbar() {

    return (
        <div className="search-div">
            <h1>Reddit Clone</h1>
            <div className="search-container">
                <input type='text' className="searchbar" />
                <button className="search-button">Search</button>
            </div>
        </div>
    );
}

export default Searchbar;