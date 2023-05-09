import { gql } from "@apollo/client"

export const GET_GRAPH = gql`#graphql
    query Query {
        movies {
            title
            actors {
                name
            }
        }
    }
` 