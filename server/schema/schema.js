import {clients, projects} from '../sampleData.js';
import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from "graphql";
import {ClientType, ProjectType} from "./types.js";
import Client from "../models/Client.js";
import Project from "../models/Project.js";

//Define the QUERIES parameters to be able to query the database
const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    //get all the clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve() {
        return Client.find();
      }
    },
    //getSingle Client
    client: {
      type: ClientType,
      args: {id: {type: GraphQLID}}, //to get a single client
      resolve(parent, args) {
        // for now this is the find()method >> later the mongoose query happens here;
        return Client.find(args.id);
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return Project.find();
      },
      //getSingle Project

    },
    project: {
      type: ProjectType,
      args: {id: {type: GraphQLID}}, //to get a single project
      resolve(parent, args) {
        // for now this is the find()method >> later the mongoose query happens here;
        return Project.findById(args.id);
      }
    }
  }
})

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLNonNull(GraphQLString)},
        phone: {type: GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone
        });

        return client.save();

      }
    },
    deleteClient: {
      type: ClientType,
      args: {id: {type: GraphQLNonNull(GraphQLString)}},
      resolve(parent, args) {
        return Client.findByIdAndDelete(args.id);
      }
    },
    addProject: {
      type: ProjectType,
      args: {
        name: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLNonNull(GraphQLString)},
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            description: {
              type: GraphQLNonNull(GraphQLString)
            },
            values: {
              "new": {value: 'Not Started'},
              'progress': {value: 'In Progress'},
              'completed': {value: 'Completed'}
            }
          }),
          defaultValue: 'Not Started',
        },
        clientId: {type: GraphQLNonNull(GraphQLID)},
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        return project.save();
      }
    },
    deleteProject: {
      type: ProjectType,
      args: {id: {type: GraphQLNonNull(GraphQLID)}},
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      }
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: {type: GraphQLNonNull(GraphQLID)},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatusUpdate', //has to be unique value
            description: {
              type: GraphQLNonNull(GraphQLString)
            },
            values: {
              "new": {value: 'Not Started'},
              'progress': {value: 'In Progress'},
              'completed': {value: 'Completed'}
            }
          }),
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(args.id, {
          name: args.name,
          description: args.description,
          status: args.status,
        }, {new: true});
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
export default schema;