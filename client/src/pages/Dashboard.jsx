import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';



const Dashboard = () => {

  const location = useLocation();

  const [tab, setTab] = useState('');

  // Constantly provide an update everytime the user visits. 
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search); // Using JS Constructor 

    // The url in browser - http://localhost:5173/dashboard?tab=profile
    const tabFromUrl = urlParams.get('tab');

    // If the Tab from the url has some value - then set the tab. 
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  // console.log(tab); - See this in action. Change the url to: http://localhost:5173/dashboard?tab=stats and you should see stats in the console F12 inspect in your browser. 


  return (

    <div className='min-h-screen flex flex-col md:flex-row'>

      <div className='md:w56'>
        {/* Sidebar */}
        <DashSidebar />
        </div>      

        {/* Profile Section: If the tab state is equal to profile -> then you have to render a component  */}
        {tab === 'profile' && <DashProfile/>}

        {/* posts... */}
        {tab === 'posts' && <DashPosts/>}

        {/* users... */}
        {tab === 'users' && <DashUsers/>}
      


    </div>

   )
};

export default Dashboard;