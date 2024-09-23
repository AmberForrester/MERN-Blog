import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  console.log(sidebarData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData(prevSidebarData => ({
        ...prevSidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      }));
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData(prevSidebarData => ({
      ...prevSidebarData,
      [id]: value || (id === 'sort' ? 'desc' : '')
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-200'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex   items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
              required
            >
                    <option value='uncategorized'>Select a category</option>
                    <option value='projectmanagement'>Project Management for Software Development</option>
                    <option value='fullstackdevelopment'>Introduction to Full Stack Development</option>
                    <option value='developertools'>Developer Tools</option>
                    <option value='documentation'>Documentation</option>
                    <option value='github'>GitHub</option>
                    <option value='visualstudiocode'>Visual Studio Code</option>
                    <option value='frontend'>Frontend - HTML & CSS</option>
                    <option value='javascript'>JavaScript</option>
                    <option value='react.js'>React</option>
                    <option value='router'>Router</option>
                    <option value='virtualization'>Virtualization</option>
                    <option value='mongodb'>MongoDB</option>
                    <option value='express'>Express</option>
                    <option value='node.js'>Node.js</option>
                    <option value='mernstack'>MERN Stack</option>
                    <option value='angular'>Angular</option>
                    <option value='meanstack'>MEAN Stack</option>
                    <option value='api'>API&apos;s</option>
                    <option value='thunderclient'>Thunder Client</option>
                    <option value='middleware'>Middleware</option>
                    <option value='jwt'>JSON Web Tokens</option>
                    <option value='tailwindcss'>TailwindCSS</option>
                    <option value='redux'>Redux</option>
                    <option value='express'>Express</option>
                    <option value='nextjs'>Next.js</option>
                    <option value='python'>Python</option>
                    <option value='flask'>Flask</option>
                    <option value='django'>Django Framework</option>
                    <option value='student'>Student Tips & Tricks</option>
                    <option value='chatgpt'>Chat GPT</option>
                    <option value='fsdlife'>Day In The Life Of A Full Stack Developer</option>
            </Select>
          </div>
          <Button type='submit' className='bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-700 rounded-lg text-white no-outline' outline>
            Apply Filters
          </Button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-200 p-3 mt-5 '>
          Search results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found.</p>
          )}
          {loading && <p className='text-xl text-gray-200'>Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-blue-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}