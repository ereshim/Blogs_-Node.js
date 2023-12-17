import express from "express";
import multer from "multer";
import cors from 'cors'

import mongoose from "mongoose";
import { registerValidation , loginValidation, postCreateValidation} from "./validations.js";

import {PostController, UserController} from './controllers/index.js'


import {chekAuth,handleValidationErrors} from "./utils/index.js";




const app = express();

const storage = multer.diskStorage({
    destination:(_,__,cb)=>{
        cb(null,'uploads')
    },
    filename:(_,file ,cb)=>{
        cb(null,file.originalname)
    },
})

const upload = multer({storage})

mongoose
  .connect(
    "mongodb+srv://admin:qwerty1234@ereshim2003.i6so4rf.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB active"))
  .catch((err) => {
    console.log("DB error", err);
  });

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post("/auth/register", registerValidation,handleValidationErrors, UserController.register);
app.post("/auth/login",loginValidation,handleValidationErrors, UserController.login);
app.get("/auth/me", chekAuth, UserController.getMe);

app.post("/posts/",chekAuth, postCreateValidation,handleValidationErrors, PostController.create);
app.post('/uploads',chekAuth, upload.single('image'),(req,res)=>{
    res.json({
        url:`/uploads/${req.file.originalname}`
    })
})

app.get("/posts",  PostController.getAll);
app.get("/posts/:id",  PostController.getOne);
app.delete("/posts/:id", chekAuth,handleValidationErrors, PostController.remuve);
app.patch("/posts/:id", chekAuth, PostController.update);



app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server Active");
});
