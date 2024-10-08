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
import InforCompany from '../Page/InforCompany'
import JobManage from '../Page/JobManage'
import CVManage from '../Page/CVManage'
import InforCv from '../Page/CVManage/InforCv'
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
                },
                {
                    path : 'infor-company',
                    element : <InforCompany/>
                },
                {
                    path : 'job-manage',
                    element : <JobManage/>
                },
                {
                    path : 'job/:id',
                    element : <JobDetail/>
                },
                {
                    path : 'cv-manage',
                    element : <CVManage/>
                },
                {
                    path: 'infor-cv/:id',
                    element : <InforCv/>
                }
                
            ]
        }
    ]
    return routers;
}