import { Children } from 'react'
import LayoutDefault from '../Components/LayoutDefault'
import Home from '../Page/Home'
import Login from '../Page/Login'
import Register from '../Page/Register'
import Search from '../Page/Search'
import JobDetail from '../Page/JobDetail'
import Company from '../Page/Company'
import CompanyDetail from '../Page/CompanyDetail'
import { getCookie } from '../helpers/cookie'
import DashBoard from '../Page/DashBoard'
import { useSelector } from 'react-redux'
export const Routers =()=>{
    const token = getCookie("token") || '';
    const statusLogin = useSelector(state => state.companyReducer);
    const routers = [
        {
            path: '/',
            element: <LayoutDefault />,
            children: !token ? [
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
                },
                {
                    path : 'company',
                    element : <Company/>
                },
                {
                    path : 'company/:id',
                    element : <CompanyDetail/>
                }
            ] : [
                {
                    path : 'admin',
                    element : <DashBoard/>
                }
            ]
        }
    ]
    return routers;
}