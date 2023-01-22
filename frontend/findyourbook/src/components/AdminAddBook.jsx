import AdminHeader from "./AdminHeader";
import { useSelector } from "react-redux";
import { Formik ,Form , Field } from "formik";
import * as yup from "yup"
import { useState , useEffect } from "react";
import {BsArrowReturnLeft} from "react-icons/bs"


const bookShema = yup.object().shape({
    isbn: yup.string().required("required"),
    title: yup.string().required("required"),
    description: yup.string().required("required"),
    page_count: yup.string().required("required"),
    book_Genre: yup.array().of(yup.string()),
    book_author01: yup.string().required("required"),
    book_author02: yup.string(),
    book_author03: yup.string(),
});

const categorySchema = yup.object().shape({
    categorieName: yup.string().required("required")
})

const categoryInitialValue={
    categorieName:""
}

const initialValues={
    isbn:"",
    title:"",
    description:"",
    page_count:"",
    book_Genre:[],
    book_author01:"",
    book_author02:"",
    book_author03:"",
}
const AdminAddBook = () => {
    const state = useSelector((state) => state);
    const darkMode = (state.mode === "dark");
    
    const [authors ,setAuthors] = useState(null);
    const [categories , setCategories] = useState(null);

    const getAllAuthors = async () =>{
        const response = await fetch(
            "http://localhost:3001/api/v1/authors",
            {
                method:"GET",
                headers: { "Content-Type": "application/json" ,"Authorization":`Bearer ${state.token}`},
            }
        )
        const data = await response.json();
        setAuthors(data)
    }

    const getAllCategories = async () => {
        const response = await fetch(
            "http://localhost:3001/api/v1/genres",
            {
                method:"GET",
                headers: { "Content-Type": "application/json" ,"Authorization":`Bearer ${state.token}`},
            }
        )
        const data = await response.json();
        setCategories(data.data.genres)
    }

    useEffect(() => {
        getAllAuthors();
        getAllCategories();
    },[])
    const authorsOptions = []; 
    const categoriesOptions = [];
    if(authors){
        for (let i = 0; i < authors.data.authors.length; i++) {
            authorsOptions.push(
                <option value={authors.data.authors[i].key} >
                    {authors.data.authors[i].name}
                </option>
            )
        }
    }
    if(categories){
        for (let i = 0; i < categories.length; i++){
            categoriesOptions.push(
                <label>
                    <Field type="checkbox" value={categories[i].name}/>
                    {categories[i].name}
                </label>
            )
        }
    }
    const [addCatHidden ,setAddCatHidden]=useState(true);
    const [otherAuthHidden ,setOtherAuthHidden] = useState(true);
    
    const addBook = async (values , onSubmitProps) => {
        console.log(values);
    }

    const addCat = async (values ,onSubmitProps) => {
        console.log(values);
    }
    const handleAddCat = async (values , onSubmitProps) => {
        await addCat(values,onSubmitProps);
    }

    const handleFormSubmit = async (values , onSubmitProps) => {
        await addBook(values , onSubmitProps);
    }
    return (
        <section
        className={`
        ${darkMode ? "text-gray-200" : "text-gray-800"}
        `}
        >
            <AdminHeader/>
            <section
            className="p-10 flex flex-col gap-8 items-center w-full
            "
            >
                
                {addCatHidden && (
                <>
                    <h1
                    className="text-3xl font-medium"
                    >Add a New Book</h1>
                    <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={bookShema}
                    >
                        
                        <Form
                        className="flex flex-col items-center gap-7 w-full p-10"
                        >
                            <div
                            className="flex flex-col gap-7 sm:grid sm:grid-cols-2 w-full"
                            >
                            <div 
                            className="flex flex-row items-center gap-2"
                            >
                                <label htmlFor="title"
                                className="w-1/6"
                                >Title: </label>
                                <Field
                                type="text"
                                name="title"
                                className={`p-2 
                                ${darkMode ? "text-gray-200 bg-slate-800":"text-gray-800 bg-slate-100"} 
                                rounded-lg shadow-inner border-4 border-slate-600 w-full`}
                                placeholder="Title of the book . . ."
                                />
                            </div>
    
                            <div
                             className="flex flex-row items-center gap-2"
                            >
                                <label htmlFor="isbn"
                                className="w-1/6"
                                >ISBN: </label>
                                <Field
                                type="text"
                                name="isbn"
                                className={`p-2 
                                ${darkMode ? "text-gray-200 bg-slate-800":"text-gray-800 bg-slate-100"} 
                                rounded-lg shadow-inner border-4 border-slate-600 w-full`}
                                placeholder="ISBN code . . ."
                                />
                            </div>
    
                            <div
                            className="flex flex-row items-center gap-2"
                            >
                                <label htmlFor="page_count"
                                className="w-1/6"
                                >n° of Pages: </label>
                                <Field
                                type="number"
                                name="page_count"
                                className={`p-2 
                                ${darkMode ? "text-gray-200 bg-slate-800":"text-gray-800 bg-slate-100"} 
                                rounded-lg shadow-inner border-4 border-slate-600 w-full`}
                                placeholder="Number of pages . . ."
                                />

                            
                            </div>
                            
                            <div
                            className="flex flex-row items-center gap-2"
                            >
                                <label htmlFor="book_author01"
                                className="w-1/6"
                                >Author: </label>
                                <Field as="select" name="book_author01"
                                className={`p-2 
                                ${darkMode ? "text-gray-200 bg-slate-800":"text-gray-800 bg-slate-100"} 
                                rounded-lg shadow-inner border-4 border-slate-600 w-full
                                ease-in-out duration-200
                                `}
                                >
                                    {authorsOptions.map((author) => {return author})}
                                </Field>
                               
                                
                            </div>
                            </div>
                            {otherAuthHidden ?  (
                                <div
                                className=""
                                >
                                    <h3
                                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                                    onClick={() => setOtherAuthHidden(false)}
                                    >Other Authors ?</h3>
                                </div>
                            ): (
                            <div
                            className="flex flex-col gap-7 sm:grid sm:grid-cols-2 w-full"
                            >
                                <div
                            className="flex flex-row items-center gap-2"
                            >
                                <label htmlFor="book_author02"
                                className="w-1/6"
                                >Author n°2: </label>
                                <Field as="select" name="book_author02"
                                className={`p-2 
                                ${darkMode ? "text-gray-200 bg-slate-800":"text-gray-800 bg-slate-100"} 
                                rounded-lg shadow-inner border-4 border-slate-600 w-full`}
                                >
                                    {authorsOptions.map((author) => {return author})}
                                </Field>
                            </div>
                            <div
                            className="flex flex-row items-center gap-2"
                            >
                                <label htmlFor="book_author03"
                                className="w-1/6"
                                >Author n°3: </label>
                                <Field as="select" name="book_author03"
                                className={`p-2
                                ${darkMode ? "text-gray-200 bg-slate-800":"text-gray-800 bg-slate-100"} 
                                rounded-lg shadow-inner border-4 border-slate-600 w-full`}
                                >
                                    {authorsOptions.map((author) => {return author})}
                                </Field>
                            </div>
                            </div>
                            )}
                            
    
                            <div
                            className="flex flex-col gap-7 sm:grid sm:grid-cols-2 w-full"
                            >
                            <div
                            className="flex flex-col gap-2"
                            >
                                <label htmlFor="book_author01"
                                className="w-1/6"
                                >Description: </label>
                                <Field 
                                as="textarea"
                                name="description"
                                className={`p-2 
                                ${darkMode ? "text-gray-200 bg-slate-800":"text-gray-800 bg-slate-100"} 
                                rounded-lg shadow-inner border-4 border-slate-600 w-full`}
                                placeholder="About this Book"
                                />
                            </div>
                            <div 
                            className={`flex flex-col gap-5 overflow-y-scroll max-h-[18vh]`}
                            >
                                <div className="label">
                                    What is the category of the book? (check all that apply)
                                </div>
                                <div
                                className={`grid tablet:grid-cols-3 grid-cols-1 gap-3`}
                                >
                                    {categoriesOptions.map((option) => {return option})}
                                </div>
                                <button
                                className={`
                                rounded-lg  w-[18vh] p-1
                                h-[7vh] relative
                                text-sm self-center text-gray-200
                                ${addCatHidden ? "bg-emerald-500 hover:bg-emerald-600" :"bg-red-400 hover:bg-red-500"}
                                `}
                                type="button"
                                onClick={() => setAddCatHidden(!addCatHidden)}
                                >{addCatHidden ? "Add other category" :"Cancel"}</button>
                                
                            </div>
                            </div>

                            <button
                            type="submit"
                            className="bg-blue-600 rounded-lg shadow-lg p-1
                            hover:bg-blue-700 text-gray-200
                            w-1/2 self-center py-2
                            "
                            >
                                SUBMIT
                            </button>

                        </Form>
                        
                    </Formik>
                    </>
                )}
                {!addCatHidden && (
                    <Formik
                    onSubmit={handleAddCat}
                    validationSchema={categorySchema}
                    initialValues={categoryInitialValue}
                    >
                        <Form
                        className="absolute
                        flex flex-col gap-5 w-full p-10
                        "
                        >
                            <button
                            type="button"
                            onClick={() => setAddCatHidden(!addCatHidden)}
                            className={`text-2xl bg-red-500 w-[7vh] felx justify-center
                            p-2 sm:ml-6 rounded-lg shadow-lg hover:bg-red-600 font-bold
                            text-gray-200
                            `}
                            ><span className="text-center"><BsArrowReturnLeft/></span></button>
                            <h1
                            className="text-2xl font-medium self-center mb-5"
                            >Add Another Category</h1>
                            <div
                            className="flex flex-row items-center gap-2 sm:w-1/2 sm:self-center"
                            >
                                <label htmlFor="book_author01"
                                className="w-1/6 text-xl"
                                >Title: </label>
                                <Field type="text"
                                name="categorieName"
                                className={`p-2 
                                ${darkMode ? "text-gray-200 bg-slate-800":"text-gray-800 bg-slate-100"} 
                                rounded-lg shadow-inner border-4 border-slate-600 w-full `}
                                placeholder="The Name of the new category"
                                />
                            </div>
                            <button
                            type="submit"
                            className="bg-blue-600 self-center hover:bg-blue-700 rounded-lg shadow-lg
                            text-gray-200 text-xl font-medium p-1 w-1/2 sm:w-1/4
                            "
                            >
                               Confirm
                            </button>
                        </Form>
                    </Formik>
                    )}
            </section>
        </section>
    )
}

export default AdminAddBook;