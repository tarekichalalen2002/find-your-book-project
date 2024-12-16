import axios from 'axios'
import React, { useState } from 'react'

const AddGenre = ({ seShowAddGenreForm, setNewGenreAdded }) => {
    const [genre, setGenre] = useState("")

    const handleChange = (e) => {
        setGenre(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const addNewGenre = async (data) => {
            await axios.post('http://localhost:3001/api/v1/genres', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response.data)
                setGenre("")
                seShowAddGenreForm(false)
                setNewGenreAdded(prevValue => !prevValue)
            })
            .catch((err) => {
                console.log(err)
                })       
        }

        const formData = new FormData()
        formData.append('name', genre)
        addNewGenre(formData)
    }

  return (
    <section className='flex flex-col items-start justify-center max-w-lg w-full mx-auto pt-6 pb-10'>
        <div className=' flex justify-between items-center w-full'>
            <h1 className='text-2xl font-semibold text-blue-950'>Add New Genre!</h1>
            <span className=' text-lg font-medium cursor-pointer' onClick={() => seShowAddGenreForm(false)}>Hide</span>
        </div>
        <br />
        <form action="" className=" grid grid-cols-12 place-items-center justify-center gap-3 w-full" onSubmit={handleSubmit} encType='application/json'>
            <div className="col-span-12 flex flex-col w-full">
            <label className=' text-base font-medium text-gray-600 ml-1 mb-1' htmlFor="genre">genre</label>
            <input className=' px-3 py-1.5 outline-none border-[2px] border-solid border-gray-400 rounded-xl bg-gray-100' type="text" name='genre' placeholder='genre...' onChange={handleChange} value={genre} required/>
            </div>
            <button type='submit' className=' text-lg text-white bg-emerald-600 font-semibold w-full px-3 py-1 rounded-full col-span-12'>Add genre</button>
        </form>
    </section>
  )
}

export default AddGenre