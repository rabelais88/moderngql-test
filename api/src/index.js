import { GraphQLServer, PubSub } from "graphql-yoga";
// if it's not graphql-yoga, use this
// import { PubSub } from 'graphql-subscriptions';
// https://github.com/apollographql/graphql-subscriptions
import mongoose from "mongoose";
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import PostSample from './resolvers/PostSample';
import Subscription from './resolvers/Subscription';

import ModelComment from './models/Comment';
import ModelPost from './models/Post';
import ModelUser from "./models/User";
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';

// setting up auth
const secretKey = '1234aaa';
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
}

const sampleUser = {
  name: 'kim',
  age: 26
}

passport.use(new Strategy(jwtOpts, (jwtPayload, done) => {
  console.log(jwtPayload)
  // error => done(err, false)
  // success => done(null, user)
  // user not found => done(null, false)
  done(null, sampleUser);
}));

// other settings

mongoose.connect("mongodb://localhost:27017/test", {
  useCreateIndex: true,
  useNewUrlParser: true
});

const pubsub = new PubSub()

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
      jwt,
      sampleUser,
      secretKey
  }
});

const authMiddleware = (req, res, next) => passport.authenticate('jwt', { session: false }, (err, user, info) => {
  if (user) {
    req.user = user;
  }
  next()
})(req, res, next);

server.express.use(authMiddleware);

const port = 3500;

const opts = {
  port
};

server.start(opts, () => {
  console.log(`The server is up! at ${port}`);
});
