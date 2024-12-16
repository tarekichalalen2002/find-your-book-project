import React from 'react'
import { BiTrash } from 'react-icons/bi'

const AuthorCard = ({ author, setItemToDelete, setOpen }) => {

  return (
    <div className=' flex items-center justify-between px-4 rounded-xl py-2 bg-gray-200'>
        <div className=' flex items-center gap-1.5'>
            <img src="/profile.jpg" alt="" loading='lazy' className=' w-10 h-10 rounded-full' />
            <h3 className=' text-lg font-medium text-blue-950 tracking-wider'>{author?.name}</h3>
        </div>
        <button type='button' className=' bg-gray-700 p-2 text-red-500 rounded-full' onClick={() => {setOpen(true); setItemToDelete(author?.key)}}>
            <BiTrash className=' text-lg' />
        </button>
    </div>
  )
}

export default AuthorCard