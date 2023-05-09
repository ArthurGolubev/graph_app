import * as React from 'react'
import { createHashRouter } from "react-router-dom"
import { App } from './app/App'
import { Graph } from './app/graph/Graph'

export const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/graph",
                element: <Graph />
            }
        ]
    }
])