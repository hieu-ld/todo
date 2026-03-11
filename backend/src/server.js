import express from 'express';
import taskRoute from './routes/tasksRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5001;  //khi env không có port thì mặc định sẽ dùng cổng 5001

const app = express();

//middleware
app.use(express.json());
app.use(cors({origin: "http://localhost:5173"}));

// sử dụng routes
app.use("/api/tasks",taskRoute);

// kết nối db, khi connect thành công thì server mới chạy
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
});