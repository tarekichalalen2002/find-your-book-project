import Home from "../../components/Home";
import Sidebar from "../../components/Sidebar";

const HomePage = () => {
    return(
    <div className="flex justify-center">
        <div 
        className="
        bg-slate-100 flex justify-center shadow-xl rounded
        w-full
        relative
        h-auto
        items-centere
        "
        >
            <Sidebar/>
            <Home/>
        </div>
    </div>
    )
}

export default HomePage;