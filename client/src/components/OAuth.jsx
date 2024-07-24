import { Button } from "flowbite-react";
import {AiFillGoogleCircle} from 'react-icons/ai';

const OAuth = () => {
  return (
    <Button 
    type='button' 
    className='px-2 py-1 bg-teal-400 from-red-600 via-yellow-500 to-green-600 to-blue-600 rounded-lg text-white'
    outline>
        <AiFillGoogleCircle/>
        
        Sign In with Google

    </Button>
  )
}

export default OAuth