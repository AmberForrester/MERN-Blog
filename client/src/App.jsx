import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs';
import Header from './components/Header';
import FooterCom from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';


const App = () => {
  return (

    <BrowserRouter>
      <ScrollToTop/>

      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path="/search" element={<Search/>}/>
        
        {/* Protected routes for logged-in users */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Admin-only protected routes */}
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost/>} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>

        {/* Blog and Post routes */}
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/post/:postSlug' element={<PostPage/>}/>
      </Routes>

      <FooterCom/>
    </BrowserRouter>
  );
};

export default App;