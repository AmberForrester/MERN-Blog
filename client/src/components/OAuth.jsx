import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from "react-redux";
import { SignInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";


const OAuth = () => {

    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const HandleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: 'select_account'}); // Everytime I press the HandleGoogleClick button I want to pop up happen. 

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ // Use objects seen in console after google login to grab this data to send to our API call + save in the DB.
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                 }),
            });

            // Convert the response to json, dispatch the signin was successful and navigate user that signed in to the home page. 
            const data = await res.json();
            if (res.ok) {
                dispatch(SignInSuccess(data));
                navigate('/')
            }

        } catch (err) {
            console.log(err);
        }
    };

  return (
    <Button 
    type='button' color='gray' className='rounded-lg' outline onClick={HandleGoogleClick}>
        <FcGoogle className="w-6 h-6 mr-2"/>
        Continue with Google
    </Button>
  )
};

export default OAuth;