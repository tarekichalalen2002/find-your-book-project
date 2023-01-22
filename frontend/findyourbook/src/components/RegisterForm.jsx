import {Formik} from "formik";
import * as yup from "yup";
import {setLogin} from "../state"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import {CgDanger} from "react-icons/cg"
import Dropzone from "react-dropzone"


const registerSchema = yup.object().shape({
    email:yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    firstName: yup.string(),//.required("required"),
    lastName: yup.string(), //.required("required"),
    bio : yup.string(),
})
const initialValuesRegistre = {
    email : "",
    password : "",
    firstName:"",
    lastName:"",
    bio:"",
}


const RegisterForm = () => {

    const [invalidEmail ,setInvalidEmail] = useState(false);

    const navigate = useNavigate();
    const state = useSelector((state) => state);
    const darkMode = (state.mode === "dark");

    const register = async (values , onSubmitProps) => {
        const formData = {
            email : values.email,
            password : values.password,
            firstName: values.firstName,
            lastName:values.lastName,
            bio: values.bio,
        };
        console.log(formData);
        const savedUserResponse = await fetch(
            "http://localhost:3001/api/v1/register",
            {
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            }
        );
        const savedUser = await savedUserResponse.json();
        if (savedUserResponse.status === 201){
            onSubmitProps.resetForm();
            navigate("/");
        }
        else{
            if (savedUser.msg.code === "Neo.ClientError.Schema.ConstraintValidationFailed"){
                setInvalidEmail(true);
            }
        }
    };

    const handleFormSubmit = async (values,onSubmitProps) => {
        
        await register(values , onSubmitProps);
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
            >Register</h1>
            <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesRegistre}
            validationSchema={registerSchema}
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
                            shadow-inner rounded-md border hover:border 
                            hover:border-slate-500 w-full
                            `}
                            placeholder="Enter Your First Name . . ."
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstName}
                            name="firstName"
                            error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                            />
                        </div>

                        <div>
                            <input 
                            className={`text-gray-800 p-3
                            shadow-inner rounded-md border hover:border 
                            hover:border-slate-500 w-full
                            `}
                            placeholder="Enter Your Last Name . . ."
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="lastName"
                            value={values.lastName}
                            name="lastName"
                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                            />
                        </div>
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
                            `}
                            placeholder="Enter Your Password . . ."
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            />
                            </div>

                            <div>
                            <textarea 
                            className={`text-gray-800 p-3
                            shadow-inner rounded-md border hover:border 
                            hover:border-slate-500 w-full
                            `}
                            placeholder="Enter Something About You . . ."
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.bio}
                            name="bio"
                            error={Boolean(touched.bio) && Boolean(errors.bio)}
                            />
                            </div>

                            <button
                            type="submit"
                            className={`bg-blue-700 p-2 rounded-md shadow-lg
                            w-full hover:bg-blue-800 ease-in-out duration-300
                            text-gray-200 `}
                            >
                                REGISTER
                            </button>
                            <h1
                            className={`text-center`}
                            onClick={() => {
                                resetForm();
                            }}
                            >
                                Do you have an account ? <a href="/" className="text-blue-600 underline hover:text-blue-700">Sign in here.</a>
                            </h1>
                    </div>
                </form>
            )}

            </Formik>

        </div>
    )
}

export default RegisterForm