import {GraphQLID, GraphQLObjectType, GraphQLString} from "graphql";
import {clients} from "../sampleData.js";
import Project from "../models/Project.js";
import Client from "../models/Client.js";

export const ClientType = new GraphQLObjectType({
  //client type => conventional the type is in uppercase
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

export const ProjectType = new GraphQLObjectType({
  //define the  name of the type:
  name: 'Project',

  //define the fields you need
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    status: {type: GraphQLString},
    clientId: {type: GraphQLID},
    client: {
      type: ClientType,
      resolve(parent, args) {
      // for now this is the find()method >> later the mongoose query happens here;
      return Client.findById(parent.clientId);
    }}
  })
})