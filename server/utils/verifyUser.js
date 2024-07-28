// Responsible for user authentication. 

import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token; // Based on the name given to the cookie creation within auth.controller.js -> "access_token". Grab the cookie from the browser and put it into this token. 
    // The very next step is to install the cookie parser in your back end , server side to allow us to grab the cookie from the browser. 

    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
       
        if (err) {
            return next(errorHandler(401, "Unauthorized"));
        }

        req.user = user;
        next();
    });
};