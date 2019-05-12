import { GraphQLServer, PubSub } from "graphql-yoga";
// if it's not graphql-yoga, use this
// import { PubSub } from 'graphql-subscriptions';
// https://github.com/apollographql/graphql-subscriptions
import mongoose from "mongoose";
import User from "./models/User";
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Post from './resolvers/Post';
import Subscription from './resolvers/Subscription';

mongoose.connect("mongodb://localhost:27017/test", {
  useCreateIndex: true,
  useNewUrlParser: true
});

const pubsub = new PubSub()

// Resolvers
const resolvers = {
  Query,
  Mutation,
  Post,
  Subscription,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
      User,
      pubsub,
  }
});

const port = 3500;

const opts = {
  port
};

server.start(opts, () => {
  console.log(`The server is up! at ${port}`);
});
