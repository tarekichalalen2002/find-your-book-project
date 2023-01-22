import {AiOutlineSearch} from "react-icons/ai";
import { useSelector } from "react-redux";

const AdminHeader = () =>{
    const state = useSelector((state) => state);
    const darkMode = (state.mode === "dark");
    return(
        <div
            className={`w-full flex items-center justify-between rounded-lg shadow-lg p-7
            `}
            >
                <a href="/admin/home"><h1
                className={`text-3xl w-1/2 font-semibold`}
                >Admin Dashborad</h1></a>
                <div className="sm:w-1/3 flex flex-row-reverse gap-0">
                    <input 
                    className="p-2 w-full rounded-lg shadow-inner border border-slate-500"
                    placeholder={` Search for books , authors , Readers . . .`}
                    type="text"
                    />
                    <button
                    className={`p-2 text-2xl rounded-lg 
                     shadow-inner
                    ${darkMode ? "bg-slate-600 text-slate-300": "bg-slate-300 text-slate-700"}
                    `}
                    >
                        <AiOutlineSearch/>
                    </button>
                </div>
            </div>
    )
}

export default AdminHeader;