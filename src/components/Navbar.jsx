import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <div className='sticky'>
            <div className='flex items-center p-3 space-x-6 border shadow-md text-blue-600 font-bold '>
                <img className='w-[30px]' src="./movieLogo.svg" alt="logo" />
                <span><Link to="/">Movies</Link></span>
                <span><Link to="/watchlist">WatchList</Link></span>
            </div>
        </div>
    )
}

export default Navbar