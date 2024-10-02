import { Router } from "express";
import userRouter from "./user.mjs";
import boardRouter from "./board.mjs";
import columnRouter from "./column.mjs";
import taskRouter from "./task.mjs";
const router = Router();

router.use("/user", userRouter);
const logedInMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send("Not Authorized");
  }
  next();
};
router.use(logedInMiddleware);

router.use("/board", boardRouter);
router.use("/column", columnRouter);
router.use("/task", taskRouter);
export default router;
