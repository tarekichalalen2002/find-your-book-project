import React from 'react'
import { BiMessageSquareAdd } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const AddButton = ({ content, path, onAddAuthorClocked }) => {
    const Navigate = useNavigate()
  return (
    <button
        className="font-medium text-sm bg-emerald-600 text-white px-2.5 rounded-lg shadow-xl 
        flex gap-2 items-center py-1.5
        "
        onClick={() => {path ? Navigate(path) : onAddAuthorClocked()}}
        >
        <span
        className="text-xl"
        ><BiMessageSquareAdd/></span> {content}
    </button>
  )
}

export default AddButton