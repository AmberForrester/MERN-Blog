import {Avatar, Button, Dropdown, Navbar} from 'flowbite-react';
import {useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice.js';

const Header = () => {

  const path = useLocation().pathname;

  const dispatch = useDispatch();

  const {currentUser} = useSelector((state) => state.user);

  const { theme } = useSelector((state) => state.theme);



  useEffect(() => {}); // Search query goes here.



  const getActiveClass = (currentPath) => {
    return path === currentPath ? 'text-blue-500 font-bold' : 'text-gray-700 dark:text-gray-300';
  };


  return (
    <div className={theme === 'dark' ? 'dark' : ''}>

      <Navbar className='border-b-2 flex items-center justify-between'>
              <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl    font-semibold dark:text-white'>
                  <span className='px-2 py-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-700 rounded-lg text-white'>Amber&apos;s</span>
                  Blog
              </Link>

                  <form className='hidden lg:flex items-center relative'>
                    <input
                      type='text'
                      placeholder='Search...'
                      className='px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 dark:text-white'/>
                    <button
                      type='submit'
                      className='absolute right-0 p-2 mr-2'>
                      <AiOutlineSearch className='text-gray-600 dark:text-gray-300'/>
                    </button>
                  </form>

                    <div className='flex space-x-4 md:order-2'>
                      <Button className='w-12 h-12 lg:hidden items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none no-outline' pill>
                        <AiOutlineSearch className='text-gray-600 dark:text-gray-300'/>
                      </Button>

                      <Button className='w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none no-outline'
                      pill onClick={() => dispatch(toggleTheme())}>
                      { theme === 'light' ?  <FaMoon/> : <FaSun/> }
                      </Button>

                      {currentUser ? (
                        
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                              <Avatar alt='user' img={currentUser.profilePicture} rounded />
                            }
                        >

                          <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className="block text-sm font-medium truncate">{currentUser.email}</span>  
                          </Dropdown.Header>
                          
                          <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                          </Link>
                          <Dropdown.Divider/>

                            <Dropdown.Item>Sign Out</Dropdown.Item>
                          </Dropdown>

                          ): (

                            <Link to='/signin'>
                          <Button className='bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-700 rounded-lg text-white no-outline' outline>
                              Sign In
                          </Button>
                      </Link>
                      )}

                      

                        <Navbar.Toggle/>
                    </div>


                    <div className='w-full md:block md:w-auto'>
                      <Navbar.Collapse>
                        <Navbar.Link as={'div'} className={getActiveClass('/')}>
                              <Link to='/'>Home</Link>
                        </Navbar.Link>

                        <Navbar.Link as={'div'} className={getActiveClass('/about')}>
                              <Link to='/about'>About</Link>
                        </Navbar.Link>

                        <Navbar.Link as={'div'} className={getActiveClass('/blogs')}>
                              <Link to='/blogs'>Blogs</Link>
                        </Navbar.Link>
                      </Navbar.Collapse>  
                    </div>

        </Navbar>

    </div>
    
    
);
}

export default Header;