import GlobalStatistics from "../../components/GlobalStatistics";
import Sidebar from "../../components/Sidebar";

const GlobalStatisticsPage = () => {
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
            <GlobalStatistics/>
        </div>
    </div>
    )
}

export default GlobalStatisticsPage;