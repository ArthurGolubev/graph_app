import { ApolloServer } from '@apollo/server';

import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const app = express()
const httpServer = http.createServer(app);


const typeDefs = `#graphql
    type Movie {
        title: String
        actors: [Actor!]! @relationship(type: "ACTED_IN", direction: IN)
    }

    type Actor {
        name: String
        movies: [Movie!]! @relationship(type: "ACTED_IN", direction: OUT)
    }
    
    
`;

const driver = neo4j.driver(
  "neo4j://standalone-with-storage-class.default.svc.cluster.local:7687",
  neo4j.auth.basic("neo4j", "dc3F2UnWefN2YO")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const schema = await neoSchema.getSchema()
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start()

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
)
app.use(express.static('/gra/frontend/dist'))
app.get('/', (req, res, next) => res.sendFile('/gra/frontend/index.html'))


await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`)

