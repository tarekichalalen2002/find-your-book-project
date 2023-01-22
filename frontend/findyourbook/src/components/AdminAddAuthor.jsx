import AdminHeader from "./AdminHeader";
import { useSelector } from "react-redux";
import { useState } from "react";
import {AiOutlineSearch} from "react-icons/ai";
import {AiOutlineHeart} from "react-icons/ai";
import {TbBook} from "react-icons/tb";
import {FaTrash} from "react-icons/fa";
import {TiDeleteOutline} from "react-icons/ti";
import {BiMessageSquareAdd} from "react-icons/bi";
import {BsChevronDoubleDown} from "react-icons/bs";
import { Formik ,Form , Field } from "formik";
import * as yup from "yup"


const authorSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    OLID: yup.string().required("required"),
})

const initialValues = {
    firstName:"",
    lastName:"",
    OLID:"",
}
 
const AdminAddAuthor = () => {
    const state = useSelector((state) => state);
    const darkMode = (state.mode === "dark");
    const [popupTriggered , setPopupTriggered] = useState(false);
    const [seeMoreHovered , setSeeMoreHovered] = useState(false);
    const [addAuthorForm , setAddAuthorForm] = useState(false);


    const triggerPopup = () => {
        setPopupTriggered(true);

    }
    const data = [
        {fname:"Fedor" , lname:"Dostoivski" , booksNumber:11 , likes:338},
        {fname:"Fedor" , lname:"Dostoivski" , booksNumber:11 , likes:338},
        {fname:"Fedor" , lname:"Dostoivski" , booksNumber:11 , likes:338},
        {fname:"Fedor" , lname:"Dostoivski" , booksNumber:11 , likes:338},
        {fname:"Fedor" , lname:"Dostoivski" , booksNumber:11 , likes:338},
        {fname:"Fedor" , lname:"Dostoivski" , booksNumber:11 , likes:338},
        {fname:"Fedor" , lname:"Dostoivski" , booksNumber:11 , likes:338},
        {fname:"Fedor" , lname:"Dostoivski" , booksNumber:11 , likes:338},
    ]

    const Authors = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        Authors.push(
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
                        <span className="text-xl"><AiOutlineHeart /></span>
                    </div>
                    <div
                    className="flex flex-row items-center gap-1"
                    >
                        {element.booksNumber} <span className="text-xl"><TbBook /></span>
                    </div>
                    <div
                    className="flex flex-row items-center gap-1"
                    >
                        <span className="text-xl hover:text-red-500 ease-in-out duration-200"
                        onClick={()=> triggerPopup()}
                        ><FaTrash /></span>
                    </div>
                </div>

            </div>
        )
    }

    //----------------------------------------------------------------------------------------------------------

    const handleFormSubmit = (values , onSubmitProps) => {
        console.log(values);
    }

    //----------------------------------------------------------------------------------------------------------
    
    return (
        <section
        className={`
        ${darkMode ? "text-gray-200" : "text-gray-800"}
        `}>
        <AdminHeader/>
        {!addAuthorForm && (
            <section>
                
                {popupTriggered && (
                    <section
                    className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 
                    flex felx-row justify-center items-center
                    "
                    >
                        <div
                        className="w-[65vh] h-[50vh] bg-slate-200 top-1/3
                        inner-shadow rounded-md p-5 z-40
                        font-medium 
                        text-gray-800
                        "
                        >
                            <div
                            className="flex flex-row justify-end w-full"
                            >
                                <button
                                className="text-3xl hover:text-red-500 ease-in-out duration-200"
                                onClick={() => setPopupTriggered(false)}
                                >
                                    <TiDeleteOutline/>
                                </button>
                            </div>
                            <br/>
                            <h4
                            className="text-xl"
                            >Confirm that you want to delete this element.</h4>
                            <br/><br/>
                            <h4
                            className="text-xl"
                            >Do you realy want to delete ?</h4>
                            <br/><br/>
                            <div
                            className="w-full flex justify-center"
                            >
                                
                                <button
                                className="bg-red-500 p-2 w-[11vh]
                                rounded text-gray-300
                                "
                                onClick={() => setPopupTriggered(false)}
                                >Delete</button>
                            </div>
                        </div>
                    </section>
                    )}
    
                    {/*=========================================================================================*/}
                <section
                className="p-5 py-6 flex flex-col items-center"
                >
                    
                    <h1
                    className="text-3xl font-medium"
                    >Authors</h1>
                    
                    <div
                    className="w-full p-4 grid grid-cols-2"
                    >
                        <div className="w-full flex flex-row gap-0
                        
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
                        <div
                        className="w-full flex flex-row justify-end px-5"
                        >
                            <button
                            className="font-medium text-base bg-emerald-500 px-3 rounded-lg shadow-xl 
                            flex flex-row gap-2 items-center
                            "
                            onClick={() => setAddAuthorForm(true)}
                            >
                            <span
                            className="text-2xl"
                            ><BiMessageSquareAdd/></span> Add Author
                            </button>
                        </div>
                    </div>
    
                    <div className="w-full">
                        {Authors.map((author) => {return author})}
                        
                            <div
                            className={`flex pl-7 w-full rounded-md shadow-md py-3 items-center
                            ${darkMode ? "hover:bg-slate-600":"hover:bg-slate-300"}
                            ease-in-out duration-300 cursor-pointer justify-center
                            p-3 h-[14vh]
                            `}
                            onMouseOver={()=> setSeeMoreHovered(true)}
                            onMouseLeave={() => setSeeMoreHovered(false)}
                            >
                                <div
                                    className={`
                                    flex flex-row items-center justify-center gap-2
                                    `}
                                    >
                                    <div
                                    className="flex flex-col gap-2 items-center"
                                    >
                                        <h5 
                                        className="text-xl font-medium"
                                        >View More</h5>
                                        <div 
                                        className={`text-3xl ease-in-out duration-300
                                        ${seeMoreHovered ? "translate-y-0" : "translate-y-[-2vh]"} 
                                        `}
                                        
                                        >
                                            <BsChevronDoubleDown/>
                                        </div>
                                    </div>
    
                                </div>
                        </div>
                    </div>
    
                </section>
            </section>
        )}

        {addAuthorForm && (
            <section>
                <h1 
                className={`text-2xl text-center font-medium mt-6`}
                >Add an Author </h1>

                <section>
                <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={authorSchema}
                >
                    <Form
                    className="flex flex-col items-center gap-7 w-full p-10"
                    >
                        <div
                        className="flex flex-col gap-7 sm:grid sm:grid-cols-1 w-full"
                        >
                            <div
                            className="flex flex-row items-center gap-2"
                            >
                                <label htmlFo="firstName"
                                className="w-1/6"
                                >First Name: </label>
                                <Field
                                type="text"
                                name="firstName"
                                className={`p-2 
                                ${darkMode ? "text-gray-200 bg-slate-800":"text-gray-800 bg-slate-100"} 
                                rounded-lg shadow-inner border-4 border-slate-600 w-full`}
                                placeholder="The First Name of The Author . . ."
                                />
                            </div>

                            <div
                            className="flex flex-row items-center gap-2"
                            >
                                <label htmlFor="lastName"
                                className="w-1/6"
                                >Last Name: </label>
                                <Field
                                type="text"
                                name="lastName"
                                className={`p-2 
                                ${darkMode ? "text-gray-200 bg-slate-800":"text-gray-800 bg-slate-100"} 
                                rounded-lg shadow-inner border-4 border-slate-600 w-full`}
                                placeholder="The Last Name of The Author . . ."
                                />
                            </div>

                            <div
                            className="flex flex-row items-center gap-2"
                            >
                                <label htmlFor="OLID"
                                className="w-1/6"
                                >OLID : </label>
                                <Field
                                type="text"
                                name="OLID"
                                className={`p-2 
                                ${darkMode ? "text-gray-200 bg-slate-800":"text-gray-800 bg-slate-100"} 
                                rounded-lg shadow-inner border-4 border-slate-600 w-full`}
                                placeholder="The ID of The Author From the Open Library API . . ."
                                />
                            </div>
                            <div
                            className="w-full"
                            >
                            <button
                            type="submit"
                            className="bg-blue-600 rounded-lg shadow-lg p-1
                            hover:bg-blue-700 text-gray-200
                            w-1/2 py-2 self-center
                            "
                            >
                                SUBMIT
                            </button>
                            </div>

                        </div>
                    </Form>

                </Formik>

                </section>
            </section>
        )}
        </section>

    )
} 

export default AdminAddAuthor;