import Header from "./Header"
import { useSelector } from "react-redux";
import { BsStarFill , BsStarHalf } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import {FaTrash} from "react-icons/fa";
import { ToastContainer , toast } from "react-toastify";


const Saved = () => {
    const state = useSelector((state) => state);
    const darkMode = (state.mode === "dark");
    const userId = state.user.userId;

    const [savedBooks , setSavedBooks] = useState([]);
    const [deleteResponse , setDeleteResponse] = useState({});


    console.log(userId.userId);
    const ratingStars = 3.5;
    const completeStars = parseInt(ratingStars);
    const starsArray = [];
    for (let i = 0 ; i<completeStars ; i++){
        starsArray.push(<BsStarFill/>)
    }
    const LastStar = () => {
        if ((ratingStars - completeStars) < 0.1){
            return null
        }
        if ((ratingStars - completeStars) <= 0.5){
            return <BsStarHalf/>
        }
        return <BsStarFill/>
    }
 
    //----------------------------------------------------------------------------------------------------------

    const deleteWantBook = async (isbn) =>{
        const response = await fetch(
            `http://localhost:3001/api/v1/readers/wantbooks/${userId}`,
            {
                method:"DELETE",
                headers: { "Content-Type": "application/json" ,"Authorization":`Bearer ${state.token}`},
                body: JSON.stringify({isbn:isbn}),
            }
        )
        const result = await response.json();
        setDeleteResponse(result);
    }

    const handleDelete = async (isbn) => {
        await deleteWantBook(isbn);
        if(deleteResponse.status === "success"){
            toast.success("The Book Was Deleted Successfully !");
        }
    }

    //----------------------------------------------------------------------------------------------------------

    const getSavedBooks = async () => {
        const response = await fetch(
            `http://localhost:3001/api/v1/readers/wantbooks/${userId}`,
            {
                method:"GET",
                headers: { "Content-Type": "application/json" ,"Authorization":`Bearer ${state.token}`},
            }
        )
        const result = await response.json();
        setSavedBooks(result.data.books)
    }

    useEffect(() => {
        getSavedBooks()
    },[])

    if (savedBooks.length > 0){
        console.log(savedBooks);
    }

    //----------------------------------------------------------------------------------------------------------

    const booksCollection = [];
    for (let i = 0 ; i < savedBooks.length ; i++) {
        const book = savedBooks[i];
        booksCollection.push(
            <div
            className={`w-[28vh] flex flex-col gap-3 items-center px-2 pt-2 pb-3
            rounded-xl shadow-xl ease-in-out duration-300
            ${darkMode ? "hover:bg-slate-700" : " hover:bg-slate-300"}
            cursor-pointer
            `}
            >
                <img 
                src={`https://covers.openlibrary.org/b/ISBN/${book.isbn}.jpg`}
                className={`w-2/3 rounded-sm shadow-md`}  
                alt="" />
                <div>
                <h1 
                className={`text-sm font-medium
                ${darkMode ? "text-blue-200 hover:text-blue-400" : "text-blue-600 hover:text-blue-800"}
                ease-in-out duration-300
                `}
                >{book.title}</h1>
                <div
                className="w-1/2 flex justify-around text-yellow-400 text-xl"
                >
                    {
                        starsArray.map((star) => star)
                    }
                    <LastStar/>
                </div>
                <div className="w-full flex justify-end text-red-500">
                    <button
                    onClick={async () => {await handleDelete(book.isbn)}}
                    >
                        <FaTrash />
                    </button>
                </div>  
                </div>
                <ToastContainer/>
            </div>
        )
    }

    const [isAddHidden , setIssAddHidden] = useState(true);

    return(
    <section
        className="sm:w-4/6 h-full absolute right-0 w-11/12
        p-7 ">
        <Header title="Saved"/>
        <section
        className="flex flex-col gap-5">
            <h1
            className={`text-2xl font-medium
            ${darkMode ? "text-gray-200" : "text-gray-800"}
            `}
            >Your Collection:</h1>
            <a href={`/users/:id/explore`}>
            <div
            className={`
            grid mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4
            gap-4 gap-y-7
            `}
            >
                {booksCollection.map((book) =>{ return book })}
                <div
                className={`
                w-[28vh] flex gap-3 items-center justify-center px-2 pt-2 pb-3
                rounded-xl shadow-xl 
                ${darkMode ? "bg-slate-600 hover:bg-slate-700" : "bg-slate-300 hover:bg-slate-400"}
                cursor-pointer h-[42vh]
                `}
                onMouseOver={() => setIssAddHidden(false)}
                onMouseLeave={() => setIssAddHidden(true)}
                >
                    <div
                    className={`flex flex-col text-3xl gap-4 items-center
                    justify-center
                    ${darkMode ? "text-gray-200" :"text-gray-800"}
                    ease-in-out duration-300`}
                    >
                        <AiOutlinePlus/>
                        <span 
                        className={`text-xl flex flex-col items-center
                        justify-center text-center ease-in-out duration-300
                        ${isAddHidden ? "opacity-0 translate-y-full":"opacity-100 translate-y-0"}
                        `}
                        >Add another Book ?</span>
                    </div>
                </div>
            </div>
            </a>
            <div
            className="w-full h-[50px]"
            ></div>
        </section>
    </section>
    )}

export default Saved;