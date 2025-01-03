const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const MONGO_URI =
  "mongodb+srv://karthiknaidukonchada35:oAwXMiFpPGg9axb0@cluster0.fvqab.mongodb.net/todo_app";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  status: { type: String, enum: ["todo", "doing", "done"], default: "todo" },
});

const Task = mongoose.model("Task", taskSchema);

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { task, status } = req.body;

    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }

    const newTask = new Task({ task, status });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: "Error adding task" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Error updating task" });
  }
});

app.delete("/tasks/id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
