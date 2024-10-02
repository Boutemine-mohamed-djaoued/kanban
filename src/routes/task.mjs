import Router from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { column } from "../models/column.mjs";
import { subtask } from "../models/subtask.mjs";
import { task } from "../models/task.mjs";
import { taskValidationSchema } from "../util/validationSchemas.mjs";
const router = Router();

export const addTask = async (columnId, taskId) => {
  try {
    await column.findByIdAndUpdate(columnId, { $push: { tasks: taskId } });
  } catch (err) {
    console.log(err);
  }
};
export const addSubtask = async (taskId, subtaskId) => {
  try {
    await task.findByIdAndUpdate(taskId, { $push: { subtasks: subtaskId } });
  } catch (err) {
    console.log(err);
  }
};

router.post("/", checkSchema(taskValidationSchema), async (req, res) => {
  console.log(req.body);
  let result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send("invalid");
  try {
    const subtaksIds = [];
    const data = matchedData(req);
    const { title, description, columnId, subtasks } = data;
    if (subtask.length > 0) {
      for (let myTitle of subtasks) {
        const newSubtask = new subtask({ title: myTitle });
        await newSubtask.save();
        subtaksIds.push(newSubtask._id);
      }
    }
    const newTask = new task({ title, description, subtasks: subtaksIds });
    await newTask.save();
    await addTask(columnId, newTask._id);
    res.status(201).send("column created successufly");
  } catch (err) {
    console.log(err);
    res.status(401).send("failed");
  }
});
router.put("/subtasks/:subtaskId", async (req, res) => {
  const { subtaskId } = req.params;
  try {
    const mySubtask = await subtask.findById(subtaskId);
    if (!mySubtask) return res.status(404).send("subtask not found");
    mySubtask.done = !mySubtask.done;
    await mySubtask.save();
    res.status(200).send("subtask changed");
  } catch (err) {
    console.log(err);
    res.status(400).send("failed");
  }
});

export default router;
