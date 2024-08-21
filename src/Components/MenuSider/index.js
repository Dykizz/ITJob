import { Menu } from "antd";
import { DashboardOutlined,UsergroupDeleteOutlined , SnippetsOutlined , UnorderedListOutlined, StockOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";

const menu = [
    {
        key: '1',
        label : <Link to = '/admin'>Tổng quan</Link> ,
        icon : <DashboardOutlined />,
    },
    {
        key: '2',
        label: <Link to ='/infor-company'>Thông tin công ty</Link>,
        icon: <UsergroupDeleteOutlined />
    },
    {
        key: '3',
        label: <Link to ='/job-manage'>Quản lý việc làm</Link>,
        icon: <UnorderedListOutlined />
    },{
        key: '4',
        label: <Link to = 'cv-manage'>Quản lý CV</Link>,
        icon: <SnippetsOutlined />
    }
      
]
function MenuSider() {
    return (
        <Menu
            mode="inline"
            // defaultSelectedKeys={['1-1']}
            // openKeys={['1']}
            // onOpenChange={onOpenChange}
            items={menu}
        />
    );
}

export default MenuSider;