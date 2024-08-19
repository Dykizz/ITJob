import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import { MenuUnfoldOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Actions/company';
function Header(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { collapse, setCollapse, token } = props;
    const statusLogin = useSelector(state => state.companyReducer);
    const logo = 'https://www.hawaexpo.com/wp-content/uploads/2023/12/Logo-Phutai-845c4f16cbf4176c322ae40fa3d3c24e.jpg';
    const logoFold = 'https://static.vecteezy.com/system/resources/previews/011/564/015/original/pt-logo-pt-design-blue-and-red-pt-letter-pt-letter-logo-design-initial-letter-pt-linked-circle-uppercase-monogram-logo-vector.jpg'
    const methodLogin = () => {
        navigate('/login');
    }
    const methodRegister = () => {
        navigate('/register');
    }
    const methodLogout = ()=>{
        dispatch(logout());
        navigate('/')
    }
    return (
        <header className='layout-default__header'>
            <div className={"layout-default__header-logo" + (collapse ? ' layout-default__header-logoCollapse' : '')}
                onClick={() => { navigate('/') }}
            >
                <img className='img-logo' src={collapse ? logoFold : logo} alt='logo' />

            </div>
            <div className={'layout-default__header-nav' + (token ? ' layout-default__header-navMenu' : '')}>
                {
                    token && <div className='header__nav-left'>
                        <MenuUnfoldOutlined onClick={() => setCollapse(!collapse)} />
                    </div>
                }
                <div className="header__nav-right">
                    
                        {token ? <Button type='primary'>Trang chủ</Button> : <Button onClick={methodRegister} type='primary'> Đăng kí </Button>}
                        {token ? <Button danger onClick={methodLogout}>Đăng xuất</Button> : <Button onClick={methodLogin} > Đăng nhập </Button>}

                </div>
            </div>
        </header>
    )
}
export default Header;