import './LayoutDefault.scss'
import Header from '../Header'
import Footer from '../Footer'
import Main from '../Main'
import { Layout } from 'antd';
import { useState } from 'react';
import MenuSider from '../MenuSider'
import { getCookie } from '../../helpers/cookie'
import { useSelector } from 'react-redux';
const { Sider , Content } = Layout;
function LayoutDefault(){
    const [collapse,setCollapse] = useState(false);
    const statusLogin = useSelector(state => state.companyReducer);
    const token = getCookie("token") || '';
    return (
        <>{
            token ?
            
            <Layout style={{minHeight: '100vh', backgroundColor: 'white'}}>
                <Sider width={200} className='sider'  collapsed = {collapse} theme='light'>
                    <MenuSider/>
                </Sider>
                <Layout className={'layoutContent' + (collapse ? ' layoutContent-collapse' : '')}>
                    <Header token = {token} collapse = {collapse} setCollapse = {setCollapse}/>
                    <Content  className='content'>
                        <Main />
                    </Content>
                    <Footer/>
                </Layout>
                
            </Layout>:
            <div>
                <Header token = {token} collapse = {collapse} setCollapse = {setCollapse}/>
                <div className='content'>
                    <Main />
                </div>
                <Footer/>
            </div>
        }
        </>
    
    );
}
export default LayoutDefault;