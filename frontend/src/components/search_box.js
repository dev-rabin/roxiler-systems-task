import React from 'react'

const SearchBox = ({search, onChange}) => {
    return (
        <>
            <div className=' text-center m-8 w-2/3'>
                <input type="search" 
                name="search"
                value={search} 
                onChange={(e)=> onChange(e.target.value)}
                placeholder='Search' 
                className=' bg-gray-800 text-white outline-none rounded-md p-2 w-1/4' />
            </div>
        </>
    )
}

export default SearchBox;
