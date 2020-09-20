import { Application } from "express";
import { IUser, IRouter } from './types';

export class AuthRouter implements IRouter {
  userdb: any;
  server: Application;

  constructor(server: Application, userdb: any) {
    this.userdb = userdb;
    this.server = server;
  }

  route() {
    this.login();
    this.errorCheck();
  }

  login() {
    this.server.post('/auth/login', (req, res) => {
      console.log(req.body);
      const { login, password }: IUser = req.body;
      
      if (!this.isAuthenticated({ login, password })) {
        const status = 401;
        const message = 'Incorrect username or password';
        res.status(status).json({ status, message });
        return;
      }
    
      res.status(200).json({});
    });
  }

  isAuthenticated({ login, password }: IUser) {
    const userIndex = this.userdb.users.findIndex((user: IUser) => (
      user.login === login && user.password === password)
    );
  
    return userIndex !== -1;
  }

  errorCheck() {
    this.server.use(/^(?!\/auth).*$/, (_, res, next) => {
      try {
        next()
      } catch (err) {
        const status = 401
        const message = 'Error'
        res.status(status).json({ status, message })
      }
    });
  }
}
