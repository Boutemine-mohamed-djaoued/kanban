import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { board } from "../models/board.mjs";
import { column } from "../models/column.mjs";
import { user } from "../models/user.mjs";
import {subtask} from "../models/subtask.mjs";
import { boardValidationSchema } from "../util/validationSchemas.mjs";
const router = Router();

router.post("/", checkSchema(boardValidationSchema), async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send("invalid");
  try {
    const data = matchedData(req);
    let columnIds = [];
    for (let name of data.columns) {
      const newColumn = new column({ name });
      await newColumn.save();
      columnIds.push(newColumn._id);
    }
    data.columns = columnIds;
    const newBoard = new board(data);
    await newBoard.save();
    await user.findByIdAndUpdate(req.user._id, { $push: { boards: newBoard._id } });
    res.status(201).send("created successufly");
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const userData = await user.findById(req.user._id).populate({
      path: "boards",
      populate: {
        path: "columns",
        populate: {
          path: "tasks",
          populate :{
            path : "subtasks",
            model: "subtask"
          }
        },
      },
    });
    res.status(200).json(userData.boards);
  } catch (err) {
    console.log(err);
    res.status(400).send("failed");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const boardId = req.params.id;

    const boardData = await board.findById(boardId).populate({
      path: "columns",
      populate: {
        path: "tasks",
        model: "task",
      },
    });

    if (!boardData) {
      return res.status(404).send("Board not found");
    }
    res.status(200).json(boardData);
  } catch (err) {
    console.error("Error fetching board data:", err);
    res.status(500).send("Server error");
  }
});

export default router;
