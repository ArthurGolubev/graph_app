import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { Neo4jGraphQL } from "@neo4j/graphql";
// const { ApolloServer, gql } = require("apollo-server");
import neo4j from "neo4j-driver";

console.log('123')

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
  // "bolt://standalone-with-storage-class:7687",
  "neo4j://standalone-with-storage-class.default.svc.cluster.local:7687",
  neo4j.auth.basic("neo4j", "dc3F2UnWefN2YO")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then((schema) => {
  const server = new ApolloServer({
      schema,
  });

  startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({url}) => {
    console.log(`🚀  Server ready at: ${url}`);
  })


})
// const typeDefs = `#graphql
//     type Book {
//         title: String
//         author: String
//     }

//     type Query {
//         books: [Book]
//     }
// `;

// const books = [
//     {
//       title: 'The Awakening',
//       author: 'Kate Chopin',
//     },
//     {
//       title: 'City of Glass',
//       author: 'Paul Auster',
//     },
//   ];


// const resolvers = {
//     Query: {
//       books: () => books,
//     },
//   };


// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });
  
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: 4000 },
//   });
  
// console.log(`🚀  Server ready at: ${url}`);