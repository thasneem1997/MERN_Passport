const express=require('express');
const connectDB=require('./confiq/db');
const passport=require('passport');
const app = express();
connectDB();//connect db
app.use(express.json({extended:false}));//intailizing middleware
app.use(passport.initialize());//intailizing passport
require('./confiq/passport')
app.use('/api/auth', require('./routes/auth'));
const PORT=process.env.PORT||5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
