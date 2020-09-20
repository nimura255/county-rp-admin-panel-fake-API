import { Application } from 'express';
import { IPlayer, IRouter, IFilterByResponse } from './types';

export class PlayerRouter implements IRouter {
  server: Application;
  maindb: any;
  
  constructor(server: Application, maindb: any) {
    this.server = server;
    this.maindb = maindb;
  }

  route() {
    this.getPlayerFilterBy();
  }

  getPlayerFilterBy() {
    this.server.get('/Player', (req, res) => {
      const page = Number(req.query.page as string);
      const login: string = String(req.query.login);

      const unfilteredPlayers = this.maindb.Player;
      const players = login ? this.filterPlayers(unfilteredPlayers, login) : unfilteredPlayers;
      
      const totalCount = players.length;
      const maxPage = Math.ceil(totalCount / 10);
  
      const pageLeftIndex = 10 * (page - 1);
      const pageRightIndex = 10 * page;
      const pageOfPlayers = players.slice(pageLeftIndex, pageRightIndex);
    
      if (page > maxPage) {
        const status = 401;
        const message = 'Incorrect page';
        res.status(status).json({ status, message });
        return;
      }

      const responseBody: IFilterByResponse = {
        items: pageOfPlayers,
        allAmount: totalCount,
        page,
        maxPage
      }
    
      res.status(200).json(responseBody);
    });
  }

  filterPlayers(players: IPlayer[], login: string) {
    return players.filter((player: IPlayer) => (
      player.login.toLowerCase().includes(login.toLowerCase()))
    )
  }
}
