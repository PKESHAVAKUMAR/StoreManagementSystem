import express, { Application, json } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./Routes";
import ProductRoute from "./Routes/ProductRoute";
import itemRoutes from './Routes/itemRoutes';

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }

  private config(app: Application): void {
    // const corsOptions: CorsOptions = {
    //   origin: "http://localhost:8081"
    // };
    app.use(json());
    app.use('/api', ProductRoute);
    app.use('/api/items', itemRoutes);

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
