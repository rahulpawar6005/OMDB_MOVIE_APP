import React from 'react'

const Banner = () => {
    return (
        <div style={{ backgroundImage: `url(https://wallpapercave.com/wp/wp2997089.jpg)` }} className=' flex items-center justify-center w-full h-[75vh] bg-no-repeat bg-cover bg-center relative'>
            <div className='text-white absolute bottom-0 text-center w-full p-3 bg-gray-700/65 '>
                Avengers Infinity War
            </div>
        </div>
    )
}

export default Banner