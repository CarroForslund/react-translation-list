import React, { useRef } from 'react';

function SearchForm(props){
    const searchInput = useRef();
    return (
        <div className="search">
            <div className="row">
                <label htmlFor="search">Search translation</label>
                <input 
                ref={searchInput}
                name="search" 
                type="text" 
                placeholder="Type here" 
                onChange={props.search}
                onMouseOver={() => searchInput.current.focus()}
                onMouseOut={() => searchInput.current.blur()}
                />
            </div>
        </div>
    );
}

export default SearchForm;