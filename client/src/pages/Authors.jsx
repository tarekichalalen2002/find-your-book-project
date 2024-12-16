import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import TopPageBar from '../components/topPageBar'
import AddAuthorForm from '../components/AddAuthorForm'
import axios from 'axios'

const Authors = () => {
    const [AllAuthors, setAllAuthors] = useState([])
    const [loading, setLoading] = useState(false)
    const [showAddAuthorForm, setShowAddAuthorForm] = useState(false)
    const [newAuthorAdded, setNewAuthorAdded] = useState(false)

    const onAddAuthorClocked = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
            });
        }, 1000)
        setShowAddAuthorForm(true)
    }

    useEffect(() => {
        const getAllAuthors = async () => {
            await axios.get('http://localhost:3001/api/v1/authors')
            .then(response => {
                setAllAuthors(response.data.data.authors)
                console.log(response.data.data.authors) ;
            })
            .catch(err => {
                console.log(err)
            })
        }
        getAllAuthors()
    }, [newAuthorAdded])

  return (
    <main className=' flex flex-col items-center justify-center w-full pt-14'>
        <TopPageBar content='Authors' buttonContent='Add Author' onAddAuthorClocked={onAddAuthorClocked}/>
        <br />
        
        <Pagination
            items={AllAuthors} 
            forBooks={false}
        />
        {!loading && showAddAuthorForm ? <AddAuthorForm setShowAddAuthorForm={setShowAddAuthorForm} setNewAuthorAdded={setNewAuthorAdded} /> : !showAddAuthorForm ? <div></div> : <p className=' flex items-center justify-center min-h-screen h-full'>Loading...</p>}
    </main>
  )
}

export default Authors