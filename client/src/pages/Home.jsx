import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (

    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p>
          Here you will find a variety of blog posts and resources on topics such as Full Stack Development, programming languages, and so much more!
        </p>
        <p>
          Thank you for being here!
        </p>
        <Link
          to='/search'
          className='text-sm sm:text-sm text-blue-500 font-bold hover:underline'
        >
          Search Blog Posts 
        </Link>
      </div>
      <div className='p-3 bg-white dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='justify-center flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-blue-500 hover:underline text-center'
            >
              Search Blog Posts Here
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}