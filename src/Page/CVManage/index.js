import { Button, Table, Tag } from 'antd'
import { useEffect, useState } from 'react';
import { getCookie } from '../../helpers/cookie';
import { getJobById } from '../../Services/jobService';
import { EyeOutlined, EditOutlined } from '@ant-design/icons'
import { getCVbyCompanyId } from '../../Services/cvService';
import { useNavigate } from 'react-router-dom';
import DeleteCv from './DeleteCv';
function CVManage(){
    const id = getCookie("id");
    const [listCV,setListCV] = useState([]);
    const [reload,setReload] = useState(false);
    const navigate = useNavigate();
    const onReload = ()=>{
        setReload(!reload);
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await getCVbyCompanyId(id);
            if (response.length > 0) {
                const updatedResponse = await Promise.all(response.map(async (cv) => {
                    const inforJob = await getJobById(cv.idJob);
                    return { ...cv, inforJob };
                }));
                setListCV(updatedResponse);
            }else setListCV([]);
            
        };
        fetchData();
    }, [reload]);
    const colums = [
        {
            title: 'Tên Job',
            key: '1',
            render: (_, {inforJob})=>(<strong>{inforJob?.name}</strong>)
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: '2',
            
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: '3'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: '4'
        },
        {
            title: 'Ngày gửi',
            dataIndex: 'createAt',
            key: '5',
        },
        {
            title : 'Trạng thái',
            key: '6',
            render : (_,{statusRead})=>(<Tag color={statusRead ? 'green' : 'gray'}>{statusRead ? 'Đã đọc' : 'Chưa đọc'}</Tag>)

        },
        {
            title: 'Hành động',
            key: '7',
            render : (_,record) =>(
               <>
                    <Button icon= {<EyeOutlined/>} onClick={()=>{navigate(`/infor-cv/${record.id}`)}}/>
                    <DeleteCv id = {record.id} onReload={onReload}/>
               </>
            )
            
        }
    ]

    return (
        <>
            <h2>Danh sách CV </h2>
            <Table className='border' rowKey='id' dataSource={listCV} columns={colums} />
        </>
    );
}
export default CVManage;