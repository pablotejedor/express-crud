import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req, res) => {
const user = await prisma.user.create({
    data: {
      userName: req.body.userName,
      password: await hashPassword(req.body.password),
    },
  });

  res.json({ token: createJWT(user) });
};

export const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      userName: req.body.userName,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401).send('Wrong username / password');
    return;
  }

  res.json({ token: createJWT(user) });
};