import {Formik} from "formik";
import * as yup from "yup";
import {setLogin} from "../state"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import {CgDanger} from "react-icons/cg"


const loginSchema = yup.object().shape({
    email:yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})
const initialValuesLogin = {
    email : "",
    password : "",
}


const AdminLoginForm = () => {

    const [invalidEmail ,setInvalidEmail] = useState(false);
    const [invalidPassword , setInvalidPassword] = useState(false);
    const [internalServerError , setInternelServerError]= useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector((state) => state);
    const darkMode = (state.mode === "dark");

    const login = async (values , onSubmitProps) => {
        const loggedInResponse = await fetch("http://localhost:3001/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
    });
        const loggedIn = await loggedInResponse.json();
        console.log(loggedIn);
        if (loggedInResponse.status === 201){
            
            onSubmitProps.resetForm();
            console.log(loggedIn);
            dispatch(
                setLogin({
                    user:loggedIn.user,
                    token:loggedIn.token,
                })
            );
            navigate(`/admin/home`)
        }
        else{
            if (loggedIn.msg =="invalid email") {
                setInvalidEmail(true);
            }
            else if(loggedIn.msg == "invalid password"){
                setInvalidPassword(true)
            }
            else if(loggedInResponse.status === 500){
                setInternelServerError(true);
            }
        }
    };

    const handleFormSubmit = async (values,onSubmitProps) => {
        
        await login(values , onSubmitProps);
    }


    return(
        <div
        className={`
        ${darkMode ? "text-gray-200" : "text-gray-800 bg-slate-300"}
        p-10 w-3/4 sm:w-1/2 rounded-lg shadow-lg self-center
        border border-gray-400
        `}
        >
            <h1
            className="text-3xl text-center p-4 mb-4"
            >Sign in As Admin</h1>
            <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
            >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <div
                    className="grid gap-7"
                    >
                        <div>
                        <input 
                        className={`text-gray-800 p-3
                        shadow-inner rounded-md border
                        hover:border-slate-500 w-full
                        ${invalidEmail && "border-red-600"} 
                        `}
                        placeholder="Enter Your Email . . ."
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        onClick={() => setInvalidEmail(false)}
                        />
                        <h1 
                        className={`mt-2 text-red-600
                        flex items-center gap-1
                        ${invalidEmail ? "" : "hidden"}
                        `}
                        ><CgDanger/> invalid email</h1></div>
                        <div>
                        <input 
                        className={`text-gray-800 p-3
                        shadow-inner rounded-md border hover:border 
                        hover:border-slate-500 w-full
                        ${invalidPassword && "border-red-600"}
                        `}
                        placeholder="Enter Your Password . . ."
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        name="password"
                        error={Boolean(touched.password) && Boolean(errors.password)}
                        onClick={() => setInvalidPassword(false)}
                        />
                        <h1 
                        className={`mt-2 text-red-600
                        flex items-center gap-1
                        ${invalidPassword ? "" : "hidden"}
                        `}
                        ><CgDanger/> invalid password</h1>
                        </div>


                        <button
                        type="submit"
                        className={`bg-blue-700 p-2 rounded-md shadow-lg
                        w-full hover:bg-blue-800 ease-in-out duration-300
                        text-gray-200 `}
                        >
                            LOGIN
                        </button>
                        <h1
                        className={`text-center`}
                        onClick={() => {
                            resetForm();
                        }}
                        >
                            You Are Not The Admin ? <a href="/" className="text-blue-600 underline hover:text-blue-700">Click here.</a>
                        </h1>
                    </div>
                </form>
            )}

            </Formik>
            <div
            className={
                `text-red-600 font-medium
                ${internalServerError ? "":"hidden"} 
                `
            }
            >
                <h4
                className="text-center"
                >Sorry ! Internal Server Error</h4>
            </div>
        </div>
    )
}

export default AdminLoginForm