import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const port = process.env.PORT || 5001;
import {graphqlHTTP} from 'express-graphql';
import schema from './schema/schema.js';
import {connectDB} from "./config/db.js";


const app = express();

connectDB();
app.use(cors());
//graphql code here
app.use('/graphql', graphqlHTTP({
  schema: schema,
  //we want to use for testing the graphiql ci only in development mode
  graphiql: process.env.NODE_ENV === 'development'
}))


app.listen(port, () => {
  console.log(`listening on ${port}`)
})