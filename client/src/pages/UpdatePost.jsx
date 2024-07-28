import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase.js';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const UpdatePost = () => {

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const { currentUser } = useSelector((state) => state.user); 
  
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    try {
        const fetchPost = async () => {
            const res = await fetch(`/api/post/getposts?postId=${postId}`)
            const data = await res.json();

            if (!res.ok) {
                console.log(data.message);
                setPublishError(data.message);
                return;
            }

            if (res.ok) {
                setPublishError(null);
                setFormData(data.posts[0]);
            }
        };

        fetchPost();
    } catch (error) {
        console.log(error.message);
    }

  }, [postId]);




  const handleImageUpload = async () => {
    
    try {
      if (!file) {
        setImageUploadError('Please select an image to upload.');
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
      }, (error) => {
        setImageUploadError('Image upload failed.');
        setImageUploadProgress(null);
        console.log(error);
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
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
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
        navigate(`/post/${data.slug}`);
      }

    } catch (error) {
      setPublishError('Something went wrong while trying to update your blog post.');
    }
  };



  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update a Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            value={formData.title}
          />
          <Select
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            value={formData.category}
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
                    value={formData.content}
                />

                <Button
                    type='submit'
                    size='sm'
                    className='bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-700 rounded-lg text-white no-outline' outline>Update Blog Post
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

export default UpdatePost;