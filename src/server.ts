import fs from 'fs';
import bodyParser from 'body-parser';
import jsonServer from 'json-server';
import { PlayerRouter } from './player';
import { AuthRouter } from './auth';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const maindb = JSON.parse(fs.readFileSync('db.json', { encoding: 'utf-8' }));
const userdb = JSON.parse(fs.readFileSync('users.json', { encoding: 'utf-8' }));

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const authRouter = new AuthRouter(server, userdb);
const playerRouter = new PlayerRouter(server, maindb);
authRouter.route();
playerRouter.route();


server.use(router)


server.listen(8000, () => {
  console.log('Run Auth API Server on port 8000')
})
