import express from "express";
import csurf from "csurf";
import cookieParser from "cookie-parser";
import cors from 'cors';


import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const SECRET_COOKIE = 'ULTRASECRET'

const csrfProtection = csurf({
  cookie: {
    // key: '_csrf', 
    // path: '/',
    signed: true
  },
})

const app = express();
app.use(cors());
app.use(cookieParser(SECRET_COOKIE));

app.get('/', csrfProtection, (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken())
  res.sendFile(path.join(__dirname,'index.html'));
})

app.post('/process-form', csrfProtection, (req, res) => {
  res.json({success: true})
})

app.listen(3000,()=>{
  console.log('Running at http://0.0.0.0:3000');
})
