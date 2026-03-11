import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("Connect thành công.");
    } catch (error) {
        console.error("Connect thất bại.", error);
        process.exit(1);    //thoát kết nối khi gặp lỗi, còn số 0 là thoát khi kết nối thành công
    }
}