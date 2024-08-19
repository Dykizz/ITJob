import { Menu } from "antd";
import { DashboardOutlined,UsergroupDeleteOutlined , SnippetsOutlined , FileOutlined,LockOutlined, PlusOutlined, UnorderedListOutlined, StockOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom";

const menu = [
    {
        key: '1',
        label : <Link to = '/admin'>Tổng quan</Link> ,
        icon : <DashboardOutlined />,
    },
    {
        key: '2',
        label: 'Thông tin công ty',
        icon: <UsergroupDeleteOutlined />
    },
    {
        key: '3',
        label: 'Quản lý việc làm',
        icon: <UnorderedListOutlined />
    },{
        key: '4',
        label: 'Quản lý CV',
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