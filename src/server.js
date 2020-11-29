import '@babel/polyfill';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import glue from 'schemaglue';
import db from './database';

require('dotenv').config({ path: 'keys.env' });

const isDev = process.env.NODE_ENV === 'production';
const { schema, resolver } = glue('./src/graphql');
const app = express();

const corsOptions = {
  origin: 'http://localhost:4000/',
  credentials: true,
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
  playground: !isDev,
});

server.applyMiddleware({ app, cors: corsOptions });

db();

app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));