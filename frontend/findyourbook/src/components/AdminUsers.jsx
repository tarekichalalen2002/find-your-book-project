import AdminHeader from "./AdminHeader";
import { useSelector } from "react-redux";
import {AiOutlineSearch} from "react-icons/ai";
import {BiLike} from "react-icons/bi";
import {RiUserFollowLine} from "react-icons/ri";
import {TbBook} from "react-icons/tb";
import React from 'react';



const AdminUsers = () => {
    const state = useSelector((state) => state);
    const darkMode = (state.mode === "dark");
    const data = [
        {fname:"tarek" , lname:"ichalalen" , likes:34 , followers:52 , read:46},
        {fname:"tarek" , lname:"ichalalen" , likes:34 , followers:52 , read:46},
        {fname:"tarek" , lname:"ichalalen" , likes:34 , followers:52 , read:46},
        {fname:"tarek" , lname:"ichalalen" , likes:34 , followers:52 , read:46},
        {fname:"tarek" , lname:"ichalalen" , likes:34 , followers:52 , read:46},
        {fname:"tarek" , lname:"ichalalen" , likes:34 , followers:52 , read:46},
    ]

    const Users = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        Users.push(
            <div
            className={`flex pl-7 w-full rounded-md shadow-md py-3 max-h-[12vh] items-center
            ${darkMode ? "hover:bg-slate-600":"hover:bg-slate-300"}
            ease-in-out duration-300 cursor-pointer
            justify-between
            p-3
            `}
            >
                <div
                className={`
                flex flex-row items-center gap-3
                `}
                >
                    <img
                    src="data:image/jpeg;base64,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"
                    className="rounded-full w-[8vh] h-[7vh]"
                    />
                    <h4
                    className="font-medium"
                    >{element.fname} {element.lname}</h4>
                </div>

                <div
                className={`flex flex-row items-center text-base
                laptop:gap-[15vh]
                gap-6
                `}
                >
                    <div
                    className="flex flex-row items-center gap-1"
                    >
                        {element.likes} 
                        <span className="text-xl"><BiLike /></span>
                    </div>
                    <div
                    className="flex flex-row items-center gap-1"
                    >
                        {element.followers} <span className="text-xl"><RiUserFollowLine /></span>
                    </div>
                    <div
                    className="flex flex-row items-center gap-1"
                    >
                        {element.read} <span className="text-xl"><TbBook /></span>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <section
        className={`
        ${darkMode ? "text-gray-200" : "text-gray-800"}
        `}
        >
            <AdminHeader/>
            <section
            className={`
            p-5 laptop:px-10 px-6 h-full
            flex flex-col gap-5
            `}  
            >
                <h1
                className={`font-semibold text-3xl text-center`}
                >Users</h1>
                
                <div>
                <div
                className="w-full p-4 flex justify-center"
                >
                    <div className="w-2/3 flex flex-row gap-0
                    
                    ">
                    <button
                    className="p-2 text-3xl bg-slate-300
                    h-[8vh] rounded-lg
                    "
                    >
                        <AiOutlineSearch/>
                    </button>
                    <input 
                    className="self-center w-full p-2 rounded-lg
                    inner-shadow border-2 border-slate-400
                    h-[8vh]
                    "
                    placeholder={`Search in users`}
                    />
                    </div>
                </div>
                    {Users.map((user) => {return user})}
                </div>
            </section>
        </section>
    )
}

export default AdminUsers;