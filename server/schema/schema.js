import {clients, projects} from '../sampleData.js';

import {GraphQLID, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";

//client type => conventional the type is in uppercase
const ClientType = new GraphQLObjectType({
  //define the  name of the type:
  name: 'Client',

  //define the fields you need
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    phone: {type: GraphQLString},
  })
})

//Define the query parameters to be able to query the database
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    client: {
      type: ClientType,
      args: {id: {type: GraphQLID}}, //to get a single client
      resolve(parent, args) {
        // for now this is the find()method >> later the mongoose query happens here;
        return clients.find(client => client.id === args.id);
      }
    }
  }
})

const schema =  new GraphQLSchema({
  query: Query,
});
export default schema;