import { Children } from 'react'
import LayoutDefault from '../Components/LayoutDefault'
import Home from '../Page/Home'
import Login from '../Page/Login'
import Register from '../Page/Register'
import Search from '../Page/Search'
import JobDetail from '../Page/JobDetail'
export const routers = [
    {
        path: '/',
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path : 'login',
                element : <Login/>
            },
            {
                path : 'register',
                element : <Register/>
            },
            {
                path : 'search',
                element : <Search/>
            },
            {
                path : 'job/:id',
                element : <JobDetail/>
            }

        ]
    }
]