import React from 'react'
import AddButton from './AddButton'

const TopPageBar = ({ content, buttonContent, path, onAddAuthorClocked }) => {
  return (
    <div className=' flex items-center justify-between w-full pt-6'>
        <h3 className=' text-2xl font-semibold text-blue-950'>{content}</h3>
        <AddButton content={buttonContent} path={path} onAddAuthorClocked={onAddAuthorClocked}/>
    </div>
  )
}

export default TopPageBar