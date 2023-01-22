import Sidebar from "../../components/Sidebar";
import Explore from "../../components/Explore";

const ExplorePage = () => {
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
            <Explore/>
        </div>
    </div>
    )
}

export default ExplorePage;