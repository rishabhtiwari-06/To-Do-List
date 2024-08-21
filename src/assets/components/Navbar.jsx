import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-blue-600 text-white p-4 sticky top-0 '>
        <div className="logo">
            <span className='font-bold text-3xl'>Rishab Tasks</span>
        </div>
        <ul className='flex gap-12'>
            <li className='cursor-pointer hover:font-bold'>Home</li>
            <li className='cursor-pointer hover:font-bold'>Contact</li>  
        </ul>
    </nav>
  )
}

export default Navbar