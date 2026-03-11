import Task from "../models/Task.js";


// read:
const getAllTasks = async (req, res) => {
    const {filter = 'today'} = req.query;
    const now = new Date();
    let startDate;

    switch (filter) {
        case 'today': {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        }
        case "week": {
            const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
            break;
        }
        case "month": {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        }
        case "all":
        default: {
            startDate = null;
        }
    }

    const query = startDate ? { createdAt: { $gte: startDate } } : {};

    try {
        const result = await Task.aggregate([
            { $match: query },
            {
                $facet: {
                    tasks: [{ $sort: { createdAt: -1 }}],
                    activeCount: [{$match: {status: "active"}}, {$count: "count"}],
                    completedCount: [{$match: {status: "completed"}}, {$count: "count"}],
                }
            }
        ]);

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;   //lấy item đầu tiên, activeCount là 1 mảng nên lấy item đầu tiên, nếu item đầu tiên là undefined thì giá trị mặc định là 0
        const completedCount = result[0].completedCount[0]?.count || 0;

        res.status(200).json({ tasks, activeCount, completedCount });
    } catch (error) {
        console.error("Lỗi khi gọi getAllTasks", error);    //lỗi trả về log server cho dev xem
        res.status(500).json({ error: "Lỗi hệ thống" });    //lỗi trả về cho người dùng xem
    }
};

// create:
const createTask = async (req, res) => {
    try {
        const {title} = req.body;   //kỹ thuật destructuring: lấy title mà user gửi lên object req.body
        const task = new Task({title}); //truyền title vào model task
        const newTask = await task.save();  //save task mới xuống db
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Lỗi khi gọi createTask", error);
        res.status(500).json({ error: "Lỗi hệ thống" });
    }
};

// update:
const updateTask = async (req, res) => {
    try {
        const {title, status, completedAt} = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,  //lay id tu url
            {title, status, completedAt},   //cac doi tuong muon update tu req.body
            {new: true}     //tra ve gia tri sau khi update
        ); //tim va update theo id

        
        if (!updatedTask) {
            return res.status(404).json({ error: "Task không tồn tại" });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Lỗi khi gọi updateTask", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

// delete:
const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if(!deletedTask) {
            return res.status(404).json({ error: "Task không tồn tại" });
        }
        res.status(200).json(deletedTask);
    } catch (error) {
        console.error("Lỗi khi gọi del Task", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};