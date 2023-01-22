import Book from "../../components/Book";
import Sidebar from "../../components/Sidebar";


const BookPage = () => {
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
            <Book/>
        </div>
    </div>
    )
}

export default BookPage;