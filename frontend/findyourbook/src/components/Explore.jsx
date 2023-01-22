import Header from "./Header"
import { BsChevronDoubleLeft, BsStarFill , BsStarHalf } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import {BsChevronDoubleRight} from "react-icons/bs";

const Explore = () => {
    const state = useSelector((state) => state);
    const darkMode = (state.mode === "dark");

    //books covers API
    // https://covers.openlibrary.org/b/ISBN/$value_of_ISBN-L.jpg

    const [globalRecommendation , setGlobalRecommendation] = useState([])
    const [tastRecommendation , setTastRecommendation] = useState([])
    const [friendsTastRecommendation , setFriendsTastRecommendation] = useState([])
    const [authorsRecommendation , setAuthorsRecommendation] = useState([]);
    const [viewMoreGlobal , setViewMoreGlobal] = useState(0);
    const [viewMoreTast , setViewMoreTast] = useState(0);
    const [viewMoreAuthors , setViewMoreAuthors] = useState(0);
    const [viewMoreFriendsTast , setViewMoreFriendsTast] = useState(0);
    const [seeMoreGlobalHovered ,setSeeMoreGlobalHovered] = useState(false);
    const [seeMoreTastHovered ,setSeeMoreTastHovered] = useState(false);
    const [seeMoreFriendsTastHovered ,setSeeMoreFriendsTastHovered] = useState(false);
    const [seeMoreAuthorsHovered ,setSeeMoreAuthorsHovered] = useState(false);


    const getGlobalRecommandation = async () => {
        const response = await fetch(
            `http://localhost:3001/api/v1/recommendations/global/${state.user.userId}`,
            {
                method:"POST",
                headers: { "Content-Type": "application/json" ,"Authorization":`Bearer ${state.token}`},
                body: JSON.stringify({viewMore:viewMoreGlobal}),
            }
        )    
        const data = await response.json()
        setGlobalRecommendation(data.data.books)
    }

    const getTastRecommandation = async () => {
        const response = await fetch(
            `http://localhost:3001/api/v1/recommendations/readertastes/${state.user.userId}`,
            {
                method:"POST",
                headers: { "Content-Type": "application/json" ,"Authorization":`Bearer ${state.token}`},
                body: JSON.stringify({viewMore:viewMoreTast}),
            }
        )    
        const data = await response.json()
        setTastRecommendation(data.data.books)
    }

    const getFriendsTastRecommandation = async () => {
        const response = await fetch(
            `http://localhost:3001/api/v1/recommendations/friendtastes/${state.user.userId}`,
            {
                method:"POST",
                headers: { "Content-Type": "application/json" ,"Authorization":`Bearer ${state.token}`},
                body: JSON.stringify({viewMore:viewMoreFriendsTast}),
            }
        )    
        const data = await response.json()
        setFriendsTastRecommendation(data.data.books)
    }

    const getAuthorsRecomendation = async () => {
        const response = await fetch(
            `http://localhost:3001/api/v1/recommendations/readerauthors/${state.user.userId}`,
            {
                method:"POST",
                headers: { "Content-Type": "application/json" ,"Authorization":`Bearer ${state.token}`},
                body: JSON.stringify({viewMore:viewMoreAuthors}),
            }  
        )
        const data = await response.json()
        setAuthorsRecommendation(data.data.books)
    }

    useEffect(() => {
        getGlobalRecommandation();
    },[viewMoreGlobal]);
    useEffect(()=> {
        getTastRecommandation();
    },[viewMoreTast]);
    useEffect(()=> {
        getFriendsTastRecommandation();
    },[viewMoreFriendsTast])
    useEffect(() => {
        getAuthorsRecomendation();
    },[viewMoreAuthors]);


    
    console.log("Hello",authorsRecommendation);

    const Stars = (ratingStars) => {
        const starsArray = [];
        const completeStars = parseInt(ratingStars);
        for (let i = 0 ; i<completeStars ; i++){
            starsArray.push(<BsStarFill/>)
        }
        var LastStar = null;
    
        if ((ratingStars - completeStars) <= 0.5){
            LastStar =  <BsStarHalf/>
        }
        else {
            LastStar = <BsStarFill/>
        }
        starsArray.push(LastStar);
        return starsArray;
    }


    const exploreBooks = [];
    const tastBooks = [];
    const friendsTastBooks = [];
    const authorsBooks = [];

    {/*-----------------------------------------------------------------------------------------------------------*/}

    if (globalRecommendation.length>0) {
        for (let i=0 ; i <globalRecommendation.length ; i++){
            const starsArray = Stars(globalRecommendation[i][2]);
            
            exploreBooks.push(
                <div 
                    className={`w-[25vh] shadow-xl rounded-lg placeholder-opacity-80 
                    ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-300" }
                    hover:placeholder-opacity-100 flex flex-col items-center pt-2 justify-between gap-5 pb-7
                    ease-in-out duration-300 
                    `}
                    >
                    <a href={`/books/${globalRecommendation[i][0]}`}>
                        <img
                        src={`https://covers.openlibrary.org/b/ISBN/${globalRecommendation[i][0]}.jpg`}
                        className="w-[16vh] h-5/6 rounded-sm shadow-sm h-10/12"
                        />
                    </a>
                    <div
                    className="flex flex-col gap-2 items-start w-[20vh] overflow-hidden"
                    >
                        <a href={`/books/${globalRecommendation[i][0]}`}
                        className=""
                        >
                            <h3
                            className={`text-sm font-semibold 
                            ${darkMode ? "text-blue-200 hover:text-blue-400" : "text-blue-700 hover:text-blue-900"}
                            ease-in-out duration-300 h-auto
                            max-w-[3/4]
                            `}
                            >{globalRecommendation[i][1]}</h3>
                        </a>
                        <div
                        className="text-base flex justify-around text-yellow-400"
                        >
                            {
                                starsArray.map((star) => star)
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }

    {/*-------------------------------------------------------------------------------------------------------*/}
    

    if (tastRecommendation.length>0) {
        for (let i=0 ; i <tastRecommendation.length ; i++){
            const starsArray = Stars(tastRecommendation[i][2]);
            
            tastBooks.push(
                <div 
                    className={`w-[25vh] shadow-xl rounded-lg placeholder-opacity-80 
                    ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-300" }
                    hover:placeholder-opacity-100 flex flex-col items-center pt-2 justify-between gap-5 pb-7
                    ease-in-out duration-300 
                    `}
                    >
                    <a href={`/books/${tastRecommendation[i][0]}`}>
                        <img
                        src={`https://covers.openlibrary.org/b/ISBN/${tastRecommendation[i][0]}.jpg`}
                        className="w-[16vh] h-5/6 rounded-sm shadow-sm h-10/12"
                        />
                    </a>
                    <div
                    className="flex flex-col gap-2 items-start w-[20vh] overflow-hidden"
                    >
                        <a href={`/books/${tastRecommendation[i][0]}`}
                        className=""
                        >
                            <h3
                            className={`text-sm font-semibold 
                            ${darkMode ? "text-blue-200 hover:text-blue-400" : "text-blue-700 hover:text-blue-900"}
                            ease-in-out duration-300 h-auto
                            max-w-[3/4]
                            `}
                            >{tastRecommendation[i][1]}</h3>
                        </a>
                        <div
                        className="text-base flex justify-around text-yellow-400"
                        >
                            {
                                starsArray.map((star) => star)
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }

    {/*----------------------------------------------------------------------------------------------------------------------*/}
    

    if (friendsTastRecommendation.length>0) {
        for (let i=0 ; i <friendsTastRecommendation.length ; i++){
            const starsArray = Stars(friendsTastRecommendation[i][2]);
            
            friendsTastBooks.push(
                <div 
                    className={`w-[25vh] shadow-xl rounded-lg placeholder-opacity-80 
                    ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-300" }
                    hover:placeholder-opacity-100 flex flex-col items-center pt-2 justify-between gap-5 pb-7
                    ease-in-out duration-300 
                    `}
                    >
                    <a href={`/books/${friendsTastRecommendation[i][0]}`}>
                        <img
                        src={`https://covers.openlibrary.org/b/ISBN/${friendsTastRecommendation[i][0]}.jpg`}
                        className="w-[16vh] h-5/6 rounded-sm shadow-sm h-10/12"
                        />
                    </a>
                    <div
                    className="flex flex-col gap-2 items-start w-[20vh] overflow-hidden"
                    >
                        <a href={`/books/${friendsTastRecommendation[i][0]}`}
                        className=""
                        >
                            <h3
                            className={`text-sm font-semibold 
                            ${darkMode ? "text-blue-200 hover:text-blue-400" : "text-blue-700 hover:text-blue-900"}
                            ease-in-out duration-300 h-auto
                            max-w-[3/4]
                            `}
                            >{friendsTastRecommendation[i][1]}</h3>
                        </a>
                        <div
                        className="text-base flex justify-around text-yellow-400"
                        >
                            {
                                starsArray.map((star) => star)
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }

{/*----------------------------------------------------------------------------------------------------------------------*/}

    if (authorsRecommendation.length>0) {
        for (let i=0 ; i <authorsRecommendation.length ; i++){
            const starsArray = Stars(authorsRecommendation[i][2]);
            
            authorsBooks.push(
                <div 
                    className={`w-[25vh] shadow-xl rounded-lg placeholder-opacity-80 
                    ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-300" }
                    hover:placeholder-opacity-100 flex flex-col items-center pt-2 justify-between gap-5 pb-7
                    ease-in-out duration-300 
                    `}
                    >
                    <a href={`/books/${authorsRecommendation[i][0]}`}>
                        <img
                        src={`https://covers.openlibrary.org/b/ISBN/${authorsRecommendation[i][0]}.jpg`}
                        className="w-[16vh] h-5/6 rounded-sm shadow-sm h-10/12"
                        />
                    </a>
                    <div
                    className="flex flex-col gap-2 items-start w-[20vh] overflow-hidden"
                    >
                        <a href={`/books/${authorsRecommendation[i][0]}`}
                        className=""
                        >
                            <h3
                            className={`text-sm font-semibold 
                            ${darkMode ? "text-blue-200 hover:text-blue-400" : "text-blue-700 hover:text-blue-900"}
                            ease-in-out duration-300 h-auto
                            max-w-[3/4]
                            `}
                            >{authorsRecommendation[i][1]}</h3>
                        </a>
                        <div
                        className="text-base flex justify-around text-yellow-400"
                        >
                            {
                                starsArray.map((star) => star)
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }
    

    return(
    <section
        className={`
        sm:w-4/6 h-full absolute right-0 w-11/12
        p-7 pb-9
        ${darkMode ? "text-gray-200" : "text-gray-800"}
        `}>
    <Header title="Explore"/>
        <section className="flex flex-col gap-48">
            <section className="w-full px-5 min-h-[35vh] h-5">

{/*---------------------------------------------------------------------------------------------------------------------------*/}

                <h1
                className={`text-xl font-semibold 
                ${darkMode ? "text-gray-200" : "text-gray-700"}
                mb-3`}
                >Books For You:</h1>
                <div
                className={`w-full 
                
                min-h-[48vh] grid grid-flow-col
                p-3 gap-3 rounded-lg shadow-xl overflow-auto hover:overflow-x-scroll whitespace-nowrap
                scroll-smooth pb-6`}
                >
                    {/* return button */}
                    {viewMoreGlobal>0 && (
                        <div 
                    className={`w-[15vh] h-[28vh] self-center rounded-lg shadow-lg cursor-pointer 
                    ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-300"} ease-in-out duration-200 flex items-center
                    `}
                    onMouseOver={() => setSeeMoreGlobalHovered(true)}
                    onMouseLeave={() => setSeeMoreGlobalHovered(false)}
                    onClick={() => {
                        setViewMoreGlobal(viewMoreGlobal-1)
                    }}
                    >
                        <span
                        className={`ease-in-out duration-200 text-2xl
                        ${seeMoreGlobalHovered ? "translate-x-0":"translate-x-[5vh]"}
                        `}
                        ><BsChevronDoubleLeft/></span>
                        <h4
                        className={`ease-in-out duration-200 
                        ${seeMoreGlobalHovered ? "opacity-100" : "opacity-0"}
                        `}
                        >Before</h4>
                        
                    </div>
                    )}
                    

                    {/* BOOKS SCROLL BAR */}
                    {exploreBooks.map((book)=>{return book})}    
                    {/* SEE MORE BUTTON */}


                    {exploreBooks.length >0 && viewMoreGlobal < 2 && (
                        <div 
                        className={`w-[15vh] h-[28vh] self-center rounded-lg shadow-lg cursor-pointer 
                        ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-300"} ease-in-out duration-200 flex items-center
                        `}
                        onMouseOver={() => setSeeMoreGlobalHovered(true)}
                        onMouseLeave={() => setSeeMoreGlobalHovered(false)}
                        onClick={() => {
                            setViewMoreGlobal(viewMoreGlobal+1)
                        }}
                        >
                            <h4
                            className={`ease-in-out duration-200 
                            ${seeMoreGlobalHovered ? "opacity-100" : "opacity-0"}
                            `}
                            >See More</h4>
                            <span
                            className={`ease-in-out duration-200 text-2xl
                            ${seeMoreGlobalHovered ? "translate-x-0":"translate-x-[-5vh]"}
                            `}
                            ><BsChevronDoubleRight/></span>
                        </div>
                    )}


                </div>
            </section>

{/*---------------------------------------------------------------------------------------------------------------------------*/}

            <section className="w-full px-5 min-h-[35vh] h-5 block">
            <h1
                className={`text-xl font-semibold 
                ${darkMode ? "text-gray-200" : "text-gray-700"}
                mb-3`}
                >Your tastes:</h1>
                <div
                className={`w-full 
                min-h-[48vh] grid grid-flow-col
                p-3 gap-3 rounded-lg shadow-xl overflow-auto hover:overflow-x-scroll whitespace-nowrap
                scroll-smooth pb-6`}
                >
                    {/* return button */}
                    {viewMoreTast>0 && (
                        <div 
                    className={`w-[15vh] h-[28vh] self-center rounded-lg shadow-lg cursor-pointer 
                    ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-300"} ease-in-out duration-200 flex items-center
                    `}
                    onMouseOver={() => setSeeMoreTastHovered(true)}
                    onMouseLeave={() => setSeeMoreTastHovered(false)}
                    onClick={() => {
                        setViewMoreTast(viewMoreTast-1)
                    }}
                    >
                        <span
                        className={`ease-in-out duration-200 text-2xl
                        ${seeMoreTastHovered ? "translate-x-0":"translate-x-[5vh]"}
                        `}
                        ><BsChevronDoubleLeft/></span>
                        <h4
                        className={`ease-in-out duration-200 
                        ${seeMoreTastHovered ? "opacity-100" : "opacity-0"}
                        `}
                        >Before</h4>
                        
                    </div>
                    )}
                    

                    {/* BOOKS SCROLL BAR */}
                    {tastBooks.map((book)=>{return book})}    
                    {/* SEE MORE BUTTON */}

                    {tastBooks.length >0 && viewMoreTast<2 && (
                        <div 
                        className={`w-[15vh] h-[28vh] self-center rounded-lg shadow-lg cursor-pointer 
                        ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-300"} ease-in-out duration-200 flex items-center
                        `}
                        onMouseOver={() => setSeeMoreTastHovered(true)}
                        onMouseLeave={() => setSeeMoreTastHovered(false)}
                        onClick={() => {
                            setViewMoreTast(viewMoreTast+1)
                        }}
                        >
                            <h4
                            className={`ease-in-out duration-200 
                            ${seeMoreTastHovered ? "opacity-100" : "opacity-0"}
                            `}
                            >See More</h4>
                            <span
                            className={`ease-in-out duration-200 text-2xl
                            ${seeMoreTastHovered ? "translate-x-0":"translate-x-[-5vh]"}
                            `}
                            ><BsChevronDoubleRight/></span>
                        </div>
                    )}
                    {tastRecommendation.length ==0 && (
                        <div
                        className="h-full w-full flex items-center"
                        >
                            <h3
                            className="text-gray-500 w-[30vh] text-center"
                            >No Books for Your Tast ! You Should Be Actif to Customize Your Experience </h3>
                        </div>
                    )}

                </div>
                <div
            className="w-full h-[50px] mt-5"
            >
                
            </div>
            </section>

{/*---------------------------------------------------------------------------------------------------------------------------*/}

            <section className="w-full px-5 min-h-[35vh] h-5 block">
            <h1
                className={`text-xl font-semibold 
                ${darkMode ? "text-gray-200" : "text-gray-700"}
                mb-3`}
                >Your Friends Taste:</h1>
                <div
                className={`w-full 
                min-h-[48vh] grid grid-flow-col
                p-3 gap-3 rounded-lg shadow-xl overflow-auto hover:overflow-x-scroll whitespace-nowrap
                scroll-smooth pb-6`}
                >
                    {/* return button */}
                    {viewMoreFriendsTast>0 && (
                        <div 
                    className={`w-[15vh] h-[28vh] self-center rounded-lg shadow-lg cursor-pointer 
                    ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-300"} ease-in-out duration-200 flex items-center
                    `}
                    onMouseOver={() => setSeeMoreFriendsTastHovered(true)}
                    onMouseLeave={() => setSeeMoreFriendsTastHovered(false)}
                    onClick={() => {
                        setViewMoreFriendsTast(viewMoreFriendsTast-1)
                    }}
                    >
                        <span
                        className={`ease-in-out duration-200 text-2xl
                        ${seeMoreFriendsTastHovered ? "translate-x-0":"translate-x-[5vh]"}
                        `}
                        ><BsChevronDoubleLeft/></span>
                        <h4
                        className={`ease-in-out duration-200 
                        ${seeMoreFriendsTastHovered ? "opacity-100" : "opacity-0"}
                        `}
                        >Before</h4>
                        
                    </div>
                    )}
                    

                    {/* BOOKS SCROLL BAR */}
                    {friendsTastBooks.map((book)=>{return book})}    
                    {/* SEE MORE BUTTON */}

                    {friendsTastBooks.length >0 && viewMoreFriendsTast<2 && (
                        <div 
                        className={`w-[15vh] h-[28vh] self-center rounded-lg shadow-lg cursor-pointer 
                        ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-300"} ease-in-out duration-200 flex items-center
                        `}
                        onMouseOver={() => setSeeMoreFriendsTastHovered(true)}
                        onMouseLeave={() => setSeeMoreFriendsTastHovered(false)}
                        onClick={() => {
                            setViewMoreFriendsTast(viewMoreFriendsTast+1)
                        }}
                        >
                            <h4
                            className={`ease-in-out duration-200 
                            ${seeMoreFriendsTastHovered ? "opacity-100" : "opacity-0"}
                            `}
                            >See More</h4>
                            <span
                            className={`ease-in-out duration-200 text-2xl
                            ${seeMoreFriendsTastHovered ? "translate-x-0":"translate-x-[-5vh]"}
                            `}
                            ><BsChevronDoubleRight/></span>
                        </div>
                    )}
                    {friendsTastRecommendation.length ==0 && (
                        <div
                        className="h-full w-full flex items-center"
                        >
                            <h3
                            className="text-gray-500 w-[30vh] text-center"
                            >No Books Found</h3>
                        </div>
                    )}

                </div>
                <div
            className="w-full h-[50px] mt-5"
            >
                
            </div>
            </section>

{/*---------------------------------------------------------------------------------------------------------------------------*/}

            <section className="w-full px-5 min-h-[35vh] h-5 block">
            <h1
                className={`text-xl font-semibold 
                ${darkMode ? "text-gray-200" : "text-gray-700"}
                mb-3`}
                >What Wrote Your Favorite Authors :</h1>
                <div
                className={`w-full 
                min-h-[48vh] grid grid-flow-col
                p-3 gap-3 rounded-lg shadow-xl overflow-auto hover:overflow-x-scroll whitespace-nowrap
                scroll-smooth pb-6`}
                >
                    {/* return button */}
                    {viewMoreAuthors>0 && (
                        <div 
                    className={`w-[15vh] h-[28vh] self-center rounded-lg shadow-lg cursor-pointer 
                    ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-300"} ease-in-out duration-200 flex items-center
                    `}
                    onMouseOver={() => setSeeMoreAuthorsHovered(true)}
                    onMouseLeave={() => setSeeMoreAuthorsHovered(false)}
                    onClick={() => {
                        setViewMoreAuthors(viewMoreAuthors-1)
                    }}
                    >
                        <span
                        className={`ease-in-out duration-200 text-2xl
                        ${seeMoreAuthorsHovered ? "translate-x-0":"translate-x-[5vh]"}
                        `}
                        ><BsChevronDoubleLeft/></span>
                        <h4
                        className={`ease-in-out duration-200 
                        ${seeMoreAuthorsHovered ? "opacity-100" : "opacity-0"}
                        `}
                        >Before</h4>
                        
                    </div>
                    )}
                    

                    {/* BOOKS SCROLL BAR */}
                    {authorsBooks.map((book)=>{return book})}    
                    {/* SEE MORE BUTTON */}

                    {authorsBooks.length >0 && viewMoreAuthors<2 && (
                        <div 
                        className={`w-[15vh] h-[28vh] self-center rounded-lg shadow-lg cursor-pointer 
                        ${darkMode ? "hover:bg-slate-700" : "hover:bg-slate-300"} ease-in-out duration-200 flex items-center
                        `}
                        onMouseOver={() => setSeeMoreTastHovered(true)}
                        onMouseLeave={() => setSeeMoreTastHovered(false)}
                        onClick={() => {
                            setViewMoreAuthors(viewMoreAuthors+1)
                        }}
                        >
                            <h4
                            className={`ease-in-out duration-200 
                            ${seeMoreTastHovered ? "opacity-100" : "opacity-0"}
                            `}
                            >See More</h4>
                            <span
                            className={`ease-in-out duration-200 text-2xl
                            ${seeMoreTastHovered ? "translate-x-0":"translate-x-[-5vh]"}
                            `}
                            ><BsChevronDoubleRight/></span>
                        </div>
                    )}
                    {authorsRecommendation.length ==0 && (
                        <div
                        className="h-full w-full flex items-center"
                        >
                            <h3
                            className="text-gray-500 w-[30vh] text-center"
                            >Like Your Favorite Authors To Costumize Your Experience</h3>
                        </div>
                    )}

                </div>
                <div
            className="w-full h-[50px] mt-5"
            >
                
            </div>
            </section>

        </section>
    </section>
    )
}

export default Explore;