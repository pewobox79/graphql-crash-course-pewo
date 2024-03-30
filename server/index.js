import express from 'express';
import 'dotenv/config';

const port = process.env.PORT || 5001;
import {graphqlHTTP} from 'express-graphql';
import schema from './schema/schema.js';

const app = express();

//graphql code here
app.use('/graphql', graphqlHTTP({
  schema: schema,
  //we want to use for testing the graphiql ci only in development mode
  graphiql: process.env.NODE_ENV === 'development'
}))


app.listen(port, () => {
  console.log(`listening on ${port}`)
})