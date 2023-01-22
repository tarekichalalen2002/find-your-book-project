import { useSelector } from "react-redux";
import {AiOutlineUser } from "react-icons/ai";
import {BiBookBookmark} from "react-icons/bi"
import {GiFeather} from "react-icons/gi"
import {TfiStatsUp} from "react-icons/tfi"
import { useState } from "react";
import AdminHeader from "./AdminHeader";

const AdminHome = () => {
    const state = useSelector((state) => state);
    const darkMode = (state.mode === "dark");

    const [statesHidden , setStatesHidden] = useState(true);
    const [usersHidden , setUsersHidden] = useState(true);
    const [booksHidden , setBooksHidden] = useState(true);
    const [authorsHidden , setAuthorsHidden] = useState(true);


    return (
        <section
        className={`
        flex flex-col items-center px-10 pt-4
        ${darkMode ? "text-gray-200" : "text-gray-800"}
        `}
        >
            <AdminHeader/>
            <div
            className="w-full grid mobile:grid-cols-1 laptop:grid-cols-2 gap-5
            mt-12
            "
            >
                
                <a href="/admin/stats"><div 
                className={`w-full min-h-[20vh] h-auto rounded-lg shadow-lg border
                border-slate-500 cursor-pointer flex flex-row gap-4
                ease-in-out duration-300
                ${darkMode ? "hover:bg-slate-900": "hover:bg-slate-300"}
                `}
                onMouseOver={() => setStatesHidden(false)}
                onMouseLeave={() => setStatesHidden(true)}
                >
                    <div
                    className="w-1/3 h-full text-[18vh]
                    p-1
                    "
                    >
                        <TfiStatsUp/>
                    </div>
                    <div
                    className={` w-2/3 ease-in-out duration-300
                    text-base py-3
                    ${statesHidden ? "opacity-0 translate-x-[-15vh]": "opacity-100 translate-x-0"}
                    `}
                    >
                        <h1>See statistics about your application, behaviour of users, books & authors
                            <br/>See if your recomendation system has worked !
                        </h1>
                    </div>
                </div></a>
                <a href="/admin/users"><div
                className={`w-full min-h-[20vh] h-auto rounded-lg shadow-lg border
                border-slate-500 cursor-pointer flex flex-row gap-4
                ease-in-out duration-300
                ${darkMode ? "hover:bg-slate-900": "hover:bg-slate-300"}
                `}
                onMouseOver={() => setUsersHidden(false)}
                onMouseLeave={() => setUsersHidden(true)}
                >
                    <div
                    className="w-1/3 h-full text-[18vh]
                    p-1
                    ">
                        <AiOutlineUser/>
                    </div>
                    <div
                    className={` w-2/3 ease-in-out duration-300
                    text-base py-3
                    ${usersHidden ? "opacity-0 translate-x-[-15vh]": "opacity-100 translate-x-0"}
                    `}
                    >
                        <h1>See all the users 
                        </h1>
                    </div>
                </div></a>
                <a href="/admin/add-book"><div
                className={`w-full min-h-[20vh] h-auto rounded-lg shadow-lg border
                border-slate-500 cursor-pointer flex flex-row gap-4
                ease-in-out duration-300
                ${darkMode ? "hover:bg-slate-900": "hover:bg-slate-300"}
                `}
                onMouseOver={() => setBooksHidden(false)}
                onMouseLeave={() => setBooksHidden(true)}
                >
                    <div
                    className="w-1/3 h-full text-[18vh]
                    p-1
                    ">
                        <BiBookBookmark/>
                    </div>
                    <div
                    className={` w-2/3 ease-in-out duration-300
                    text-base py-3
                    ${booksHidden ? "opacity-0 translate-x-[-15vh]": "opacity-100 translate-x-0"}
                    `}
                    >
                        <h1>Add other books and other categories
                        </h1>
                    </div>
                </div></a>
                <a href="/admin/add-author"><div
                className={`w-full min-h-[20vh] h-auto rounded-lg shadow-lg border
                border-slate-500 cursor-pointer flex flex-row gap-4
                ease-in-out duration-300
                ${darkMode ? "hover:bg-slate-900": "hover:bg-slate-300"}
                `}
                onMouseOver={() => setAuthorsHidden(false)}
                onMouseLeave={() => setAuthorsHidden(true)}
                >
                    <div
                    className="w-1/3 h-full text-[18vh]
                    p-1
                    ">
                        <GiFeather/>
                    </div>
                    <div
                    className={` w-2/3 ease-in-out duration-300
                    text-base py-3
                    ${authorsHidden ? "opacity-0 translate-x-[-15vh]": "opacity-100 translate-x-0"}
                    `}
                    >
                        <h1>See all the authors 
                            <br/>Add other authors
                        </h1>
                    </div>
                </div></a>
            </div>
        </section>
    )
}
export default AdminHome;