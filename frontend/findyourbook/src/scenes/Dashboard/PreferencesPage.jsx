import Sidebar from "../../components/Sidebar";
import Preferences from "../../components/Preferences";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PreferencesPage = () => {
    const state = useSelector((state) => state);
    const darkMode = (state.mode === "dark");
    return(
    
    <div
    className={`flex justify-center
    `}>
        <div 
        className={`bg-slate-100
        flex justify-center shadow-xl rounded
        w-full
        relative
        h-auto
        items-centere`}
        >
            <Sidebar/>
            <Preferences/>
        </div>
    </div>
    )
}

export default PreferencesPage;