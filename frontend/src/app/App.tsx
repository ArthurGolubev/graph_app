import * as React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './navbar/Navbar'

export const App = ( ) => {
    return <div>
        <Navbar />
        <div>
            <Outlet />
        </div>
    </div>
}