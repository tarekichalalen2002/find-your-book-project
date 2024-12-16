import React, { useEffect, useState } from 'react'
import Select from "react-select";
import TopPageBar from '../components/topPageBar';
import AddGenre from '../components/AddGenre';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBookForm = () => {

  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ShowAddGenreForm, setShowAddGenreForm] = useState(false);
  const [newGenreAdded, setNewGenreAdded] = useState(false);

  const [newBook, setNewBook] = useState({
    title: "",
    isbn: "",
    book_authors: [], // Updated structure
    book_genres: [],
    page_count: "",
    description: "",
    publisher: { name: "", date: "" },
  });

  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  const handlePublisherChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      publisher: { ...prevBook.publisher, [name]: value },
    }));
  };

  const onAddGenreClicked = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 1000);
    setShowAddGenreForm(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresResponse, authorsResponse] = await Promise.all([
          axios.get("http://localhost:3001/api/v1/genres"),
          axios.get("http://localhost:3001/api/v1/authors"),
        ]);
        setGenres(genresResponse.data.data.genres);
        setAuthors(authorsResponse.data.data.authors);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [newGenreAdded]);

  const genreList = genres.map((genre) => ({
    value: genre.name,
    label: genre.name,
  }));
  const authorList = authors.map((author) => ({
    value: author,
    label: author.name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedAuthors = newBook.book_authors.map((author) => ({
      author: { key: author.value.key, name: author.value.name },
      has_written: { date: new Date().toISOString().split("T")[0] }, 
    }));

    const payload = {
      title: newBook.title,
      isbn: newBook.isbn,
      book_authors: formattedAuthors,
      book_Genres: newBook.book_genres,
      page_count: parseInt(newBook.page_count, 10),
      description: newBook.description,
      publisher: {
        name: newBook.publisher.name,
        date: newBook.publisher.date,
      },
    };

    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/books",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(res.data);
      setNewBook({
        title: "",
        isbn: "",
        book_authors: [],
        book_genres: [],
        page_count: "",
        description: "",
        publisher: { name: "", date: "" },
      });
      Navigate("/");
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };


  return (
    <section className={`${!ShowAddGenreForm ? 'h-screen': 'h-full'} my-10 flex flex-col items-start justify-center`}>
        <TopPageBar 
          content="Add New Book!"
          buttonContent="Add Genre"
          onAddAuthorClocked={onAddGenreClicked}
        />
        <br />
        <form action="" className=" grid grid-cols-12 place-items-center justify-center gap-1.5 w-full" onSubmit={handleSubmit} encType='application/json'>
        <div className=' sm:col-span-6 col-span-12 flex flex-col w-full'>
          <label className=' text-base font-medium text-gray-600 ml-1 mb-1' htmlFor="title">Title</label>
          <input className=' px-3 py-1.5 outline-none border-[2px] border-solid border-gray-400 rounded-xl bg-gray-100' type="text" name="title" placeholder=' Book title' onChange={handleChange} value={newBook.title} required/>
        </div>
        <div className=' sm:col-span-6 col-span-12 flex flex-col w-full'>
          <label className=' text-base font-medium text-gray-600 ml-1 mb-1' htmlFor="isbn">ISBN</label>
          <input className=' px-3 py-1.5 outline-none border-[2px] border-solid border-gray-400 rounded-xl bg-gray-100' type="text" name='isbn' placeholder='ISBN...' onChange={handleChange} value={newBook.isbn} required/>
        </div>
        <div className=' sm:col-span-6 col-span-12 flex flex-col w-full'>
          <label className=' text-base font-medium text-gray-600 ml-1 mb-1' htmlFor="Author">Author (s)</label>
          <Select
            isMulti
            options={authorList}
            placeholder="Select Author (s)..."
            onChange={(selectedOption) => {
              setNewBook(
                (prevBook) => {
                  return {
                    ...prevBook,
                    book_authors: selectedOption.map((option) => option.value),
                  };
                }
              );
              }
            }
            styles={{
              control: (base) => ({
                ...base,
                minHeight: 40,
                borderRadius: "8px",
                borderColor: "#9CA3AF",
                borderWidth: 2,
                backgroundColor: "#f0f0f0",
                zIndex: 0,

              }),
            }}
            required
          />
        </div>
        <div className=" sm:col-span-6 col-span-12 flex flex-col w-full">
          <label className=' text-base font-medium text-gray-600 ml-1 mb-1' htmlFor="Genre">Genre (s)</label>
          <Select
            isMulti
            options={genreList}
            placeholder="Select Genre (s)..."
            onChange={(selectedOption) => {
              setNewBook(
                (prevBook) => {
                  return {
                    ...prevBook,
                    book_genres: selectedOption.map((option) => option.value),
                  };
                }
              );
              }
            }
            styles={{
              control: (base) => ({
                ...base,
                minHeight: 40,
                borderRadius: "8px",
                borderColor: "#9CA3AF",
                borderWidth: 2,
                backgroundColor: "#f0f0f0",
                zIndex: 0,
              }),
            }}
            required
          />
        </div>
        <div className=" sm:col-span-6 col-span-12 flex flex-col w-full">
          <label className=' text-base font-medium text-gray-600 ml-1 mb-1' htmlFor="page_count">Pages</label>
          <input className=' px-3 py-1.5 outline-none border-[2px] border-solid border-gray-400 rounded-xl bg-gray-100' type="number" name='page_count' placeholder='Pages Count' onChange={handleChange} value={newBook.page_count} required/>
        </div>
        <div className="sm:col-span-6 col-span-12 flex flex-col w-full">
          <label className='text-base font-medium text-gray-600 ml-1 mb-1'>Publisher Name</label>
          <input
            type="text"
            name="name"
            className='px-3 py-1.5 outline-none border-[2px] border-solid border-gray-400 rounded-xl bg-gray-100'
            placeholder="Publisher Name"
            onChange={handlePublisherChange}
            value={newBook.publisher.name}
            required
          />
        </div>
        <div className="sm:col-span-6 col-span-12 flex flex-col w-full">
          <label className=' text-base font-medium text-gray-600 ml-1 mb-1'>Publisher Date</label>
          <input
            type="date"
            name="date"
            className='px-3 py-1.5 outline-none border-[2px] border-solid border-gray-400 rounded-xl bg-gray-100'
            onChange={handlePublisherChange}
            value={newBook.publisher.date}
            required
          />
        </div>
        <div className=' col-span-12 flex flex-col w-full'>
          <label className=' text-base font-medium text-gray-600 ml-1 mb-1 ' htmlFor="description">Description</label>
          <textarea className='h-20 overflow-y-auto px-3 py-1.5 outline-none border-[2px] border-solid border-gray-400 rounded-xl bg-gray-100' name="description"  placeholder='Book Description' onChange={handleChange} value={newBook.description} required/>
        </div>
        <button type='submit' className=' text-lg text-white bg-emerald-600 font-semibold w-full px-3 py-1 rounded-full col-span-12 mt-1.5'>Add Book</button>
      </form>
      {!loading && ShowAddGenreForm ? <AddGenre setNewGenreAdded={setNewGenreAdded} seShowAddGenreForm={setShowAddGenreForm} /> : !ShowAddGenreForm ? <div></div> : <p className=' flex items-center justify-center min-h-screen h-full'>Loading...</p>}
    </section>
  )
}

export default AddBookForm