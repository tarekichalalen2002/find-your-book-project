import SearchResults from "../../components/SearchResults";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";

const SearchResultsPage = () => {
    const state = useSelector((state) => state);
    const darkMode = (state.mode === "dark");
    return(
        <div
        className={`flex justify-center
        ${darkMode ? "text-gray-200" :"text-gray-800"}
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
                <SearchResults/>
            </div>
        </div>
        )
}

export default SearchResultsPage;