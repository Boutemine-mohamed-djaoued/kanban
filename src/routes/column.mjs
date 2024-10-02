import Router from "express";
import { user } from "../models/user.mjs";
import { board } from "../models/board.mjs";
import { column } from "../models/column.mjs";
import { columnValidationSchema } from "../util/validationSchemas.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
const router = Router();

export const addColumn = async (boardId, columnId) => {
  try {
    await board.findByIdAndUpdate(boardId, { $push: { columns: columnId } });
  } catch (err) {
    console.log(err);
  }
};

router.post("/", checkSchema(columnValidationSchema), async (req, res) => {
  let result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send("invalid");
  try {
    const data = matchedData(req);
    const newColumn = new column({ name: data.name });
    await newColumn.save();
    await addColumn(data.boardId, newColumn._id);
    res.status(201).send("column created successufly");
  } catch (err) {
    console.log(err);
    res.status(401).send("failed");
  }
});

export default router;
