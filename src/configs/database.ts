import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbUrl = `mongodb+srv://${dbUsername}:${dbPassword}@portfolio-db.flctjrn.mongodb.net/?retryWrites=true&w=majority`;

class Database {
  private uri: string;
  private options: ConnectOptions;

  constructor() {
    this.uri = dbUrl;
    this.options = {
      bufferCommands: true
    };
  }

  public connect(): void {
    mongoose
      .connect(this.uri, this.options)
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch(error => {
        console.error(`Error connecting to MongoDB: ${error}`);
      });
  }

  public disconnect(): void {
    mongoose
      .disconnect()
      .then(() => {
        console.log('Disconnected to MongoDB');
      })
      .catch(error => {
        console.error(`Error disconnecting from MongoDB: ${error}`);
      });
  }
}

export default Database;
