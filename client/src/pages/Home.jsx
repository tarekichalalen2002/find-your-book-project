import React, { useEffect, useState } from 'react'
import TopPageBar from '../components/topPageBar'
import Pagination from '../components/Pagination'
import axios from 'axios'

const Home = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const getBooks = async () => {
            await axios.get('http://localhost:3001/api/v1/books')
            .then(response => {
                setBooks(response.data.data.books)
                console.log(response.data.data.books);
            }
            )
            .catch(error => {
                console.error('Error fetching data:', error)
            }
            )
        }
        getBooks()
    }, [])

  return (
    <main className=' flex flex-col items-center justify-center w-full pt-14'>
        <TopPageBar content='Books' buttonContent='Add Book' path={'/add-book'}/>
        <br />
        <Pagination 
            items={books}
            forBooks={true}
        />
    </main>
  )
}

export default Home