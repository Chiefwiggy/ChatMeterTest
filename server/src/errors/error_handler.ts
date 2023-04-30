import { NextFunction } from "express";
import mongoose, {Error} from "mongoose";

const ErrorHandler = (err: any, req: any, res: any, next: any) => {
    if (err instanceof mongoose.Error) {
        if (err instanceof mongoose.Error.ValidationError) {
            const errors: {[key: string]: string} = {};
            for (const field in err.errors) {
              errors[field] = err.errors[field].message;
            }
            res.status(400).json({errors});
        }
    }
    else if (err.code === 11000) {
        const [key] = Object.keys(err.keyPattern || {});
        const value = err.keyValue?.[key];
        const message = `A document with '${key}=${value}' already exists.`;
        res.status(409).json({ message });
    } else {
        res.status(500).json({ message: 'Something went wrong.', err: err });
    }
}

export default ErrorHandler;