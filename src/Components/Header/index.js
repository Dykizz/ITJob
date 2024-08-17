import { Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom';

function Header(){
    const navigate = useNavigate();
    const methodLogin = ()=>{
        navigate('/login');
    }
    const methodRegister = ()=>{
        navigate('/register');
    }
    return (
        <header className = 'layout-default__header'> 
            <div className="layout-default__header-logo">
                <Link to = '/' style={{textDecoration : 'none' , color : 'black'}}>IT Job</Link>
            </div>
            <div className="layout-default__header-buttons">
                <Button onClick={methodLogin}> Đăng nhập </Button>
                <Button onClick={methodRegister} type='primary'> Đăng kí </Button>
            </div>
        </header>
    )
}
export default Header;