import { GraphQLServer } from "graphql-yoga";
import mongoose from "mongoose";
import User from "./User";

mongoose.connect("mongodb://localhost:27017/test", {
  useCreateIndex: true,
  useNewUrlParser: true
});

// Type definitions (schema)
// grades will always have array, even when the result is empty([])
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
        me: User!
        greeting(name: String): String!
        grades: [Int]!
        add(numbers: [Int!]!): Int!
        posts: [Post]!
        users: [User]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        author: Author!
    }

    type Author {
        id: ID!
        name: String!
    }

    type Mutation {
        createUser(name: String!, age: Int!, email: String!): User!
    }

`;

// Resolvers
const resolvers = {
  Query: {
    hello() {
      return "This is my first query!";
    },
    name() {
      return "Andrew Mead";
    },
    location() {
      return "Philadelphia";
    },
    bio() {
      return "I live in Philly and teach on Udemy!";
    },
    me() {
      return {
        id: "12345",
        name: "max",
        email: "abc@def.com",
        age: 32
      };
    },
    greeting(parent, args, ctx, info) {
      const { name } = args;
      return `hello ${name}`;
    },
    grades() {
      return new Array(10).fill(0).map(e => Math.round(Math.random() * 100));
    },
    add(parent, args, ctx, info) {
      const { numbers } = args;
      return numbers.reduce((ac, cv) => ac + cv, 0);
    },
    posts(parent, args, ctx, info) {
      return [
        {
          id: "abcee",
          title: "great book",
          author: "1a"
        }
      ];
    },
    users(parent, args, ctx, info) {
        return User.find();
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      const authors = [
        {
          id: "1a",
          name: "johnson"
        }
      ];
      return authors.find(author => author.id === parent.author);
    }
  },
  Mutation: {
    async createUser(root, args, ctx, info) {
        const { name, age, email } = args;
        await User.create({ name, age, email });
        return await User.findOne({ email });
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

const port = 3500;

const opts = {
  port
};

server.start(opts, () => {
  console.log(`The server is up! at ${port}`);
});
