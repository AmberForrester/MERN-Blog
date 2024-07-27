import { Link, useNavigate } from 'react-router-dom';
import {Label, TextInput, Button, Spinner, Alert} from 'flowbite-react';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth';


const SignIn = () => {

  // Track the form data and the changes.
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const {loading, error:errorMessage} = useSelector((state) => state.user);

  // Define the function that if everything is successful we navigate the user to the sign in page within line 61-64.
  const navigate = useNavigate();

  // Creating the function for the onChange = {handleChange} for the input fields.
  // Call the event = (e) by default 
  const handleChange = (e) => {
    // Whatever the form data has existing + e.target. by id with the e.target.value, trimming the extra white space if accidently included.  
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  };

  // Creating an async function for the onSubmit = {handleSubmit} for the submission of the data to our database from the form.
  const handleSubmit = async (e) => {
    // Prevent refreshing of browser when Submit button is pressed.
    e.preventDefault();
    
    
    // If username, email, or password is not provided - return an error message to the user.
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill in all fields.'));
    }

    try {

      dispatch(signInStart());

      // With an await function using fetch to call the API.
      const res = await fetch('/api/auth/signin', {
        // What is the method for our signup API ex.ThunderClient usage.
        // Works with the proxy created in vite.config.js to target port 3000.
        method: 'POST', 

        // Send the data as json.
        headers: {
          'Content-Type': 'application/json'
        },

        // Pass the data to the API as a json string.
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      //console.log(data); Check if working.
      
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
       
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } 
      
      catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  //console.log(formData); Check if submitted formdata is present.

  return (
    <div className='min-h-screen mt-40'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10'>
        {/* Left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-6xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-700 rounded-lg text-white'>
              SignIn
            </span>
            Here
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. Sign in with your email, password, or with Google to comment and request a blog topic you would like to see.
          </p>
        </div>

        {/* Right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
            <div>
              <Label value='Email:' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>

            <div>
              <Label value='Password:' />
              <TextInput
                type='password'
                placeholder='Enter password here.'
                id='password'
                onChange={handleChange}
              />
            </div>

            <Button
              className='bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-700 rounded-lg text-white w-full h-12 focus:outline-none no-outline' outline
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            <OAuth />
          </form>

          <div className='flex gap-2 text-sm mt-3'>
            <span>Don&apos;t have an account yet?</span>
            <Link to='/signup' className='text-cyan-500'>
              Sign Up
            </Link>
          </div>

          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;