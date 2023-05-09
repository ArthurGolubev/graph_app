import * as ReactDOM from "react-dom/client"
import * as React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, from } from '@apollo/client'
import { RouterProvider } from 'react-router-dom'
import { router } from "./Router"
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap-icons/font/bootstrap-icons.css"


const root = ReactDOM.createRoot(document.querySelector("#root"))


const createApolloClient = () => {

    return new ApolloClient({
        uri: "http://10.152.183.209/graphql/",
        cache: new InMemoryCache({})
    })
}




root.render(
    <ApolloProvider client={createApolloClient()}>
        <RouterProvider router={router} />
    </ApolloProvider>
)