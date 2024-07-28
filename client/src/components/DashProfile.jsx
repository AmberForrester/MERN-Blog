import { Button, TextInput, Alert, Modal } from 'flowbite-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { app } from '../firebase';
import { Link } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  signOutSuccess
} from '../redux/user/userSlice.js';

import { HiOutlineExclamationCircle } from 'react-icons/hi';



const DashProfile = () => {

  const {currentUser, loading } = useSelector((state) => state.user);
  // console.log(currentUser); - View state properties.


  const filePickerRef = useRef();

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(null);

  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  //Track what's happening in our state on the DashProfile page. 
  const [formData, setFormData] = useState({});

  const [showModal, setShowModal] = useState(false);


  const dispatch = useDispatch();



  // Allow firebase function so we can upload CUSTOM images on the cloud to update the profile picture. 
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = useCallback(async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 3MB)");
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploadProgress(null);
        setImageFileUploading(false);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploadProgress(null);
          setImageFileUploading(false);
        });
      }
    );
  }, [imageFile, formData]);

  useEffect(() => {
    if (imageFile) {
      console.log('Image file detected, starting upload...');
      uploadImage();
    }
  }, [imageFile, uploadImage]);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value }); // Preserve other states when other things are only changed liked username, email, password or image.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes have been made.");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("Please wait for the image to upload.");
      return;
    }

    try {
      dispatch(updateStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.text(); // Get the response as text
        console.error('Server Error:', errorData); // Log the raw error response
        dispatch(updateFailure(errorData));
        setUpdateUserError("An error occurred while updating the profile.");

      } else {

        const data = await res.json();
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Profile updated successfully!");
      }
      
    } catch (error) {
      console.error('Fetch Error:', error); // Log the fetch error
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };



  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteFailure(data.message));
      } else {
        dispatch(deleteSuccess(data));
      }

    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };


  const handleSignOut = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }

    } catch (error) {
      console.log(error.message);
    }
  };
    


  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2"'>

            <input 
              type='file' 
              accept='image/*'
              onChange={handleImageChange}
              ref={filePickerRef}
              hidden/>

                <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
                onClick={() => filePickerRef.current.click()}>

                  {imageFileUploadProgress && (
                    <CircularProgressbar
                      value={imageFileUploadProgress || 0}
                      text={`${imageFileUploadProgress}%`}
                      strokeWidth={5}
                      styles={{
                        root: {
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        },
                        path: {
                          store: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                        },
                      }}
                    />
                  )}

                  <img src={imageFileUrl || currentUser.profilePicture}
                   alt='profile picture' 
                   className='rounded-full w-full h-full border-2 border-[lightgray] object-cover'/>
                </div>

                {imageFileUploadError && (
                  <Alert color="failure">{imageFileUploadError}</Alert>
                )}

          <div className="flex flex-col gap-3 mt-8">
            <TextInput
              type="text"
              id="username"
              placeholder="Username"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />
            <TextInput
              type="text"
              id="email"
              placeholder="Email"
              defaultValue={currentUser.email}
              onChange={handleChange}
            />
            <TextInput
              type="text"
              id="password"
              placeholder="Change your password"
              onChange={handleChange}
            />
            
            <Button type='submit' className='bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-700 rounded-lg text-white no-outline' outline disabled={loading || imageFileUploading }>

             {loading ? "Loading..." : "Update"}
            
            </Button>



             {currentUser.isAdmin && (
              <Link to={'/create-post'}>
                <Button type='button' className='w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-700 rounded-lg text-white no-outline' outline >Create New Blog Post</Button>
              </Link>
             )}
      
          </div>
        </form>

            <div className='text-cyan-500 flex justify-between mt-1 mb-2'>
              <span className='cursor-pointer' onClick={() => setShowModal(true)}>Delete</span>
              <span className='text-indigo-700 cursor-pointer' onClick={handleSignOut}>Sign out</span>
            </div>

            {updateUserSuccess && <Alert color="success">{updateUserSuccess}</Alert>}

            {updateUserError && <Alert color="failure">{updateUserError}</Alert>}

            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              popup
              size="md"
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                  <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete your account?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={handleDeleteUser}>
                      Yes, I am sure.
                    </Button>
                    <Button color="gray" onClick={() => setShowModal(false)}>
                      No, please cancel deletion.
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
    </div>
  )
};

export default DashProfile;