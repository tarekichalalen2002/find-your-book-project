import React, { useState } from 'react'
import axios from 'axios'

const AddAuthorForm = ({ setShowAddAuthorForm, setNewAuthorAdded }) => {
  const [author, setAuthor] = useState({
    "firstName": "",
    "lastName": "",
    "OLID": ""
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setAuthor((prevAuthor) => {
      return {
        ...prevAuthor,
        [name]: value
      }
    })
  }

  const AddNewAuthor = async (data) => {
    await axios.post('http://localhost:3001/api/v1/authors', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      console.log(res.data);
      setAuthor({
        "firstName": "",
        "lastName": "",
        "OLID": ""
      });
      setShowAddAuthorForm(false);
      setNewAuthorAdded(prevValue => !prevValue)
    }
    ).catch((err) => {
      console.log(err);

    }
  )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', author.firstName + ' ' + author.lastName)
    formData.append('key', author.OLID)
    await AddNewAuthor(formData)
  }

  return (
    <section className='flex flex-col items-start justify-center max-w-xl w-full mx-auto pt-6 pb-10'>
        <div className=' flex justify-between items-center w-full'>
            <h1 className='text-2xl font-semibold text-blue-950'>Add New Author!</h1>
            <span className=' text-lg font-medium cursor-pointer' onClick={() => setShowAddAuthorForm(false)}>Hide</span>
        </div>
        <br />
        <form action="" className=" grid grid-cols-12 place-items-center justify-center gap-3 w-full" onSubmit={handleSubmit} encType='application/json'>
        <div className=' sm:col-span-6 col-span-12 flex flex-col w-full'>
          <label className=' text-base font-medium text-gray-600 ml-1 mb-1' htmlFor="firstName">firstName</label>
          <input className=' px-3 py-1.5 outline-none border-[2px] border-solid border-gray-400 rounded-xl bg-gray-100' type="text" name='firstName' placeholder='FirstName...' onChange={handleChange} value={author.firstName} required/>
        </div>
        <div className=' sm:col-span-6 col-span-12 flex flex-col w-full'>
          <label className=' text-base font-medium text-gray-600 ml-1 mb-1' htmlFor="lastName">LastName</label>
          <input className=' px-3 py-1.5 outline-none border-[2px] border-solid border-gray-400 rounded-xl bg-gray-100' type="text" name='lastName' placeholder='LastName...' onChange={handleChange} value={author.lastName} required/>
        </div>
        
        <div className="col-span-12 flex flex-col w-full">
          <label className=' text-base font-medium text-gray-600 ml-1 mb-1' htmlFor="OLID">OLID</label>
          <input className=' px-3 py-1.5 outline-none border-[2px] border-solid border-gray-400 rounded-xl bg-gray-100' type="text" name='OLID' placeholder='OLID...' onChange={handleChange} value={author.OLID} required/>
        </div>
        <button type='submit' className=' text-lg text-white bg-emerald-600 font-semibold w-full px-3 py-1 rounded-full col-span-12'>Add Author</button>
      </form>
    </section>
  )
}

export default AddAuthorForm