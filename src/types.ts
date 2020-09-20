export interface IPlayer {
  login: string;
}

export interface IUser {
  login: string;
  password: string;
}

export interface IRouter {
  route: () => void;
}

export interface IFilterByResponse {
  items: [];
  allAmount: number;
  page: number;
  maxPage: number;
}