import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePasswords = (password, hash) =>
  bcrypt.compare(password, hash);

export const hashPassword = (password) => bcrypt.hash(password, 5);

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, userName: user.userName },
    process.env.JWT_SECRET
  );

  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) res.status(401).send('Unauthorized');

  const [, token] = bearer.split(' ');
  if (!token) {
    res.status(401).send('Not a valid token');
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
    return;
  } catch (error) {
    console.log(error);
    res.status(401).send('Not a valid token');
    return;
  }
};
