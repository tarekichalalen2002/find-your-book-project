import Sidebar from "../../components/Sidebar";
import Saved from "../../components/Saved";

const SavedPage = () => {
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
            <Saved/>
        </div>
    </div>
    )
}

export default SavedPage;