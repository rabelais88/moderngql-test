import { GraphQLServer, PubSub } from "graphql-yoga";
// if it's not graphql-yoga, use this
// import { PubSub } from 'graphql-subscriptions';
// https://github.com/apollographql/graphql-subscriptions
import mongoose from "mongoose";
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import PostSample from './resolvers/PostSample';
import Subscription from './resolvers/Subscription';

import ModelComment from './models/Comment';
import ModelPost from './models/Post';
import ModelUser from "./models/User";
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';

mongoose.connect("mongodb://localhost:27017/test", {
  useCreateIndex: true,
  useNewUrlParser: true
});

const pubsub = new PubSub()

// Resolvers
const resolvers = {
  Query,
  Mutation,
  PostSample,
  Subscription,
  Post,
  Comment,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
      User: ModelUser,
      Post: ModelPost,
      Comment: ModelComment,
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
