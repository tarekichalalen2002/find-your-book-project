import PersonalStatistics from "../../components/PersonalStatistics";
import Sidebar from "../../components/Sidebar";

const PersonalStatisticsPage = () => {
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
                <PersonalStatistics/>
            </div>
        </div>
       )
}

export default PersonalStatisticsPage;