import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Header from "./Header";
import { BsStarFill , BsStarHalf } from "react-icons/bs";


const SearchResults = () =>{
    const state = useSelector((state) => state);
    const darkMode = (state.mode === "dark");
    const {query} = useParams();
    const [searchResults , setSearchResults] = useState([]);

    const Stars = (ratingStars) => {
        const starsArray = [];
        const completeStars = parseInt(ratingStars);
        for (let i = 0 ; i<completeStars ; i++){
            starsArray.push(<BsStarFill/>)
        }
        var LastStar = null;

        if ( 0.1 < (ratingStars - completeStars) <= 0.5){
            LastStar =  <BsStarHalf/>
        }
        else if ((ratingStars - completeStars) > 0.5) {
            LastStar = <BsStarFill/>
        }
        starsArray.push(LastStar);
        return starsArray;
    }


    const getResults = async () => {
        const response = await fetch(
            `http://localhost:3001/api/v1/books/search`,
            {
                method:"POST",
                headers:{ "Content-Type": "application/json" ,"Authorization":`Bearer ${state.token}`},
                body: JSON.stringify({phrase:query}),
            }
        )
        const results = await response.json();
        setSearchResults(results.data.books);
    }

    useEffect(() => {
        getResults();
    },[query])

    const Books = [];

    if(searchResults.length > 0){
        console.log(searchResults);
        for (let i = 0; i < searchResults.length; i++) {
            const book = searchResults[i];
            const stars = Stars(book[2]);
            Books.push(
                <a href={`/books/${book[0]}`}
                className="w-full"
                > 
                    <div
                    className={`flex flex-row gap-5 p-3 w-full ease-in-out duration-300
                    ${darkMode ? "hover:bg-slate-600":"hover:bg-slate-300"}
                    cursor-pointer
                    `}
                    >
                        <img src={`https://covers.openlibrary.org/b/ISBN/${book[0]}.jpg`} 
                        className="w-[15vh] h-[20vh] rounded-sm shadow-lg cursor-pointer"
                        />
                        <div 
                        className="flex flex-col"
                        >
                            <h3
                            className="cursor-pointer"
                            >{book[1]}</h3>
                            <br/>
                            <div className="flex flex-row gap-1 text-yellow-500">
                                {stars.map((star) => {return star})}
                            </div>
                        </div>
                    </div>
                </a>
            )
        }
    }



    return(
        <section
        className="sm:w-4/6 h-full absolute right-0 w-11/12
        p-7 ">
        <Header title="Search Results"/>

        <div
        
        >
            <h1
            className="text-2xl font-medium "
            >Results for {"'"+query+"' :"}</h1>
            {Books.length > 0 && (
                <div
                className="flex flex-col gap-4 items-start w-full"
                >
                    {Books.map((book) => {return book})}
                </div>
            )}

        </div>
        <div
        className="w-full h-[40px]"
        ></div>

        </section>
    )
}

export default SearchResults;