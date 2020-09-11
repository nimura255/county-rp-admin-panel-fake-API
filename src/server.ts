import fs from 'fs';
import bodyParser from 'body-parser';
import jsonServer from 'json-server';

type User = {
  login: string;
  password: string;
}

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const userdb = JSON.parse(fs.readFileSync('users.json', { encoding: 'utf-8' }));

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

function isAuthenticated({ login, password }: User) {
  const userIndex = userdb.users.findIndex((user: User) => (
    user.login === login && user.password === password)
  );

  return userIndex !== -1;
}

server.post('/auth/login', (req, res) => {
  console.log(req.body);
  const { login, password }: User = req.body;
  if (isAuthenticated({ login, password }) === false) {
    const status = 401;
    const message = 'Incorrect username or password';
    res.status(status).json({ status, message });
    return;
  }

  res.status(200).json({});
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  try {
    next()
  } catch (err) {
    const status = 401
    const message = 'Error'
    res.status(status).json({ status, message })
  }
});

server.use(router)

server.listen(8000, () => {
  console.log('Run Auth API Server on port 8000')
})
