/*
 * @Author: 方木<guo.sun@hipac.cn>
 * @Date: 2023-04-20 10:28:32
 * @LastEditors: 方木<guo.sun@hipac.cn>
 * @LastEditTime: 2023-04-20 10:35:04
 * @Description: 请添加注释
 */
import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' }
];

app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

app.get('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.post('/users', (req: Request, res: Response) => {
  const user: User = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.status(201).json(user);
});

app.put('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    const user: User = req.body;
    user.id = id;
    users[index] = user;
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.delete('/users/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    res.json({ message: 'User deleted successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
