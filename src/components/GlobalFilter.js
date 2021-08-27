import React from 'react'

function GlobalFilter({filter,setFilter}) {
    return (
        <span>
            Search:{''}
            <input 
                vallue={filter||''}
                onChange={(e)=>setFilter(e.target.value)}
            />
        </span>
    )
}

export default GlobalFilter
