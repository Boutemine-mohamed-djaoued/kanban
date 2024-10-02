import { Router } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import passport from "passport";
import { user } from "../models/user.mjs";
import "../strategies/localStrategy.mjs";
import { hashPassword } from "../util/helper.mjs";
import { userValidationSchema } from "../util/validationSchemas.mjs";
const router = Router();

router.post("/login", passport.authenticate("local"), async (req, res) => {
  res.status(200).send({ message: "login" });
});
router.post("/register", checkSchema(userValidationSchema), async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send("invalid");
  try {
    const data = matchedData(req);
    data.password = await hashPassword(data.password);
    const newUser = new user(data);
    await newUser.save();
    res.status(201).send("register successfully");
  } catch (err) {
    console.log(err);
    res.status(401).send("failed to register");
  }
});
export default router;
