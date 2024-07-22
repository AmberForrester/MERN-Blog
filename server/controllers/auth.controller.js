import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req,res, next) => {
    
    const {username, email, password} = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
       next(errorHandler(400, 'All fields are required!'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json('Signup Successfull!')


    } catch(err) {
        next(err);
    }
};

// Create the Sign IN API: 

// User will give an email and password, and we want to authenticate whether those emails and passwords given are valid in the database. 
export const signin = async (req, res, next) => {
    
    const {email, password} = req.body; // Get the email and password from the req.body.

    // Check if the email and password exist and/or empty + give our errorHandler created custom error to pass a message to the user with appropriate error code. 
    // 400 Bad Request - Client Error
    if (!email || !password || email === '' || password === '') {

        next(errorHandler(400, 'All fields are required!'));
    }

    try {
        // If we find the User by email, 
        const validUser = await User.findOne({email});

        // Check if they are a valid user + give our errorHandler created custom error to pass a message to the user with appropriate error code. 
        // 404 Not Found
        if (!validUser) {

           return next(errorHandler(404,'Sorry, this User was not found!'));
        }

        // Check is the password is valid + match it to the same password that is set in the database. 
        // Converting the password that the user has given to bcrypt format, then comparing the two encrypted passwords and if they match = successful authorization.

// 'password': What the user has given + 'validUser.password': Stored DB password.
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if(!validPassword) {
            return next(errorHandler(400, 'Invalid Credentials!'));
        }

        // Create a JWT -> install `npm i jsonwebtoken` in Terminal + add `import jwt from 'jsonwebtoken';` at the top.

        // Token created and JWT sign validated the special object from the DB _id of the user and the secret key that we gave afer we created it in our .env file = creates a unique key to every single user
        const token = jwt.sign({id: validUser._id},
            process.env.JWT_SECRET,
        );

        // Hide the encrypted password from the user.
        // Using the spread operator to give everything else to the user as rest except the password.
        const {password:pass, ...rest} = validUser._doc;

        // Respond with a successfull status code.
        res
        .status(200)
        .cookie('access_token', token, {httpOnly:true})
        .json(rest);

    } catch(error) {
        next(error);
    }

};