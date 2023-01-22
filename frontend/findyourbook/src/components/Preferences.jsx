import Header from "./Header"
import {MdDarkMode , MdOutlineLightMode} from "react-icons/md"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../state";

const Preferences = () => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.mode)
    const [darkMode , setDarkMode] = useState(mode === "dark");
    const ModeIcone = () => {
        if (darkMode){
            return <MdDarkMode />
        }
        return <MdOutlineLightMode />
    }
    return(
    <div
    className={`
    w-full h-full
    `}
    >
    <section
    className={`
    sm:w-4/6 h-full absolute right-0 w-11/12
    p-7
    `}>
        <Header title="Prefernces"/>
        <div 
        className="w-full flex flex-col items-start p-2
        "
        >
            <div
            className={`flex flex-row gap-4 items-center
            ${darkMode ? "text-gray-200" :"text-gray-800"} 
            `}
            >
                <h1
                className="text-xl 
                "
                >Dark Mode: </h1>
                <div
                className={`w-[16vh] rounded-xl shadow-inner
                text-3xl  px-2 py-1 ease-in-out duration-300
                flex flex-row ${darkMode ? "bg-slate-400 justify-end text-slate-200" : 
                "bg-slate-200 justify-start text-slate-700"}`} 
                onClick={() => {
                    dispatch((setMode()))
                    setDarkMode(!darkMode)  
                }}
                >
                    <div
                    className={`w-1/3  rounded-full ease-in-out duration-300
                    ${darkMode ? "bg-slate-500" : "bg-slate-100"}`}
                    ><ModeIcone /></div>
                </div>
            </div>
        </div>
    </section>
    </div>
    )}

export default Preferences;