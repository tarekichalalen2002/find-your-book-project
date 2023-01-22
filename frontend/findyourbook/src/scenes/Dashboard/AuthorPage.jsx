import Author from "../../components/Author";
import Sidebar from "../../components/Sidebar";


const AuthorPage = () => {
    return(
    <div
    className="flex justify-center">
        <div 
        className="
        bg-slate-100 flex justify-center shadow-xl rounded
        w-full
        relative
        h-auto
        items-centere"
        >
            <Sidebar/>
            <Author/>
        </div>
    </div>
    )
}

export default AuthorPage;