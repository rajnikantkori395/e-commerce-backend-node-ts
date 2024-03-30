import express from 'express';
import { Request, Response } from 'express';
import { signup, signin, signout } from "../controllers/authControllers";

const router = express.Router();

// Route for user signup
router.post('/signup', async (req: Request, res: Response) => {
  await signup(req, res);
});

// Route for user signin
router.post('/signin', async (req: Request, res: Response) => {
  await signin(req, res);
});

// Route for user signout
router.post('/signout', async (req: Request, res: Response) => {
  await signout(req, res);
});

export default router;
