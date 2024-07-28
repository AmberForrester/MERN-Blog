import { FileInput, Select, TextInput, Button, Alert } from 'flowbite-react';
import { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';

const CreatePost = () => {

  const [file, setFile] = useState(null);

  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);


    const [formData, setFormData] = useState({});
    //console.log(formData); - See the formData in action within the console of your browser using F12 or right click inspect. 

    const [publishError, setPublishError] = useState(null);

    const navigate = useNavigate();



    const handleImageUpload = async () => {
    
      try {
        if (!file) {
          setImageUploadError('Please select an image to upload');
          return;
        }
  
        setImageUploadError(null);
  
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + file.name;
  
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        }, () => {
          setImageUploadError('Image upload failed.');
          setImageUploadProgress(null);
        }, () => {
         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({...formData, image: downloadURL});
         });
        }
        );
        
      } catch (error) {
        setImageUploadError('Image upload failed.');
        setImageUploadProgress(null);
        console.log(error);
      }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('/api/post/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
          });
    
          const data = await res.json();
    
          if (!res.ok) {
            setPublishError(data.message);
            return;
          }
    
          if (res.ok) {
            setPublishError(null);
            navigate(`/post/${data.slug}`); // When blog is created, we want to redirect it to its specific page using it's URL.
          }
    
        } catch (error) {
          setPublishError('Something went wrong while trying to publish your new blog post.');
        }
      };




  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Create New Blog Post</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput 
                type='text'
                placeholder='Title'
                required
                id='title'
                className='flex-1'
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                />

                <Select 
                onChange={(e) => setFormData({...formData, category: e.target.value})}>
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

                <div className='flex gap-4 items-center justify-between'>
                    <FileInput
                    type='file'
                    accept='image/*'
                    onChange= {(e) => setFile(e.target.files[0])}  
                    />

                    <Button
                    type='button'
                    size='sm'
                    className='bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-700 rounded-lg text-white no-outline' outline
                    onClick={() => handleImageUpload()}>
                      
                      {imageUploadProgress ? (
                <div className="w-16 h-16">
                    <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                  </div>
                ) : (
                  "Upload Image"
                  )}
                    </Button>  
                </div>

                {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        
                {formData.image && (
                  <img 
                    src={formData.image}
                    alt="upload"
                    className="w-full h-90 object-cover" 
                  />
                )}

                <ReactQuill 
                    theme='snow'
                    className='h-72 mb-12'
                    required
                    onChange={(value) => {
                        setFormData({...formData, content: value});
                    }}
                />

                <Button
                    type='submit'
                    size='sm'
                    className='bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-700 rounded-lg text-white no-outline' outline>Publish Blog Post
                    </Button>  

                    {publishError && (
                    <Alert className='mt-5' color='failure'>
                    {publishError}
                    </Alert>
                 )}

        </form>
    </div>
  )
};

export default CreatePost;