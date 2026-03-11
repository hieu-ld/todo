import express from 'express';
import taskRoute from './routes/tasksRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';



dotenv.config();
const PORT = process.env.PORT || 5001;  //khi env không có port thì mặc định sẽ dùng cổng 5001
const __dirname = path.resolve(); //lưu đường dẫn tuyệt đối đến thư mục hiện tại

const app = express();

//middleware
app.use(express.json());

if (process.NODE_ENV !== "production") {
    app.use(cors({origin: "http://localhost:5173"}));
}

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("/{*path}", (req, res) => res.sendFile(path.join(__dirname, "../frontend/dist/index.html")));
}

// sử dụng routes
app.use("/api/tasks",taskRoute);

// kết nối db, khi connect thành công thì server mới chạy
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
});