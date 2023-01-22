import {BrowserRouter as Router,Navigate ,Routes,Route} from "react-router-dom"
import { useSelector } from "react-redux";
import LoginPage from "./scenes/LoginPage/LoginPage"
import ExplorePage from './scenes/Dashboard/ExplorePage';
import HomePage from "./scenes/Dashboard/HomePage";
import GlobalStatisticsPage from "./scenes/Dashboard/GlobalStatisticsPage";
import SavedPage from "./scenes/Dashboard/SavedPage";
import PersonalStatisticsPage from "./scenes/Dashboard/PersonalStatisticsPage";
import PreferencesPage from "./scenes/Dashboard/PreferencesPage";
import BookPage from "./scenes/Dashboard/BookPage";
import RegisterPage from "./scenes/RegisterPage/RegisterPage"
import {useEffect} from "react";
import AuthorPage from "./scenes/Dashboard/AuthorPage"
import AdminLogin from "./scenes/LoginPage/AdminLoginPage";
import AdminHomePage from "./scenes/Admin/HomePage";
import AdminStatisticsPage from "./scenes/Admin/StatisticsPage";
import AdminUsersPage from "./scenes/Admin/UsersPage";
import AdminAddBookPage from "./scenes/Admin/AddBookPage";
import AdminAddAuthorPage from "./scenes/Admin/AddAuthorPage";
import SearchResultsPage from "./scenes/Dashboard/SearchResultsPage";

function App() {
  const state = useSelector((state) => state);
  const darkMode = (state.mode === "dark");
  useEffect(() => {
    darkMode ? document.body.style.backgroundColor = "#1e293b" : document.body.style.backgroundColor = "#f1f5f9";
  }, [darkMode]);
  return (
    <div
    
    >
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/admin" element={<AdminLogin/>} />
          <Route path="/admin/home" element={<AdminHomePage/>}/>
          <Route path="/admin/stats" element={<AdminStatisticsPage/>}/>
          <Route path="/admin/users" element={<AdminUsersPage/>}/>
          <Route path="/admin/add-book" element={<AdminAddBookPage/>} />
          <Route path="/admin/add-author" element={<AdminAddAuthorPage/>} />

          <Route path='/users/:id/explore' element={<ExplorePage/>} />
          <Route path="/authors/:id" element={<AuthorPage/>} />
          <Route path="/users/:id/home" element={<HomePage/>}/>
          <Route path="/users/:id/globalStatistics" element={<GlobalStatisticsPage/>}/>
          <Route path="/users/:id/personalStatistics" element={<PersonalStatisticsPage/>}/>
          <Route path="/users/:id/saved" element={<SavedPage/>}/>
          <Route path="/users/:id/preferences" element={<PreferencesPage/>}/>
          <Route path="/books/:id" element={<BookPage/>} />
          <Route path="/search/:query" element={<SearchResultsPage/>}/>
          
        </Routes>
      </Router>
    </div>
  )
}

export default App;
