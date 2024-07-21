import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs';
import Header from './components/Header';
import FooterCom from './components/Footer';


const App = () => {
  return (

    <BrowserRouter>

      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
      </Routes>

      <FooterCom/>

    </BrowserRouter>
  );
};

export default App;