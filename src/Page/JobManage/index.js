import { Button, Table, Tag } from 'antd'
import { useEffect, useState } from 'react';
import { getCookie } from '../../helpers/cookie';
import { getJobbyCompanyId } from '../../Services/jobService';
import { EyeOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import EditJob from './EditJob';
import { getListCity } from '../../Services/cityService';
import { getTags } from '../../Services/tagsService';
import { PlusOutlined } from '@ant-design/icons'
import CreateJob from './CreateJob';
import DeleteJob from './DeleteJob';
function JobManage() {
    const id = getCookie("id");
    const [jobs, setJobs] = useState([]);
    const [editingJob, setEditingJob] = useState(null); 
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const navigate = useNavigate();
    const [listTags,setListTags] = useState([]);
    const [listCity,setListCity] = useState([]);
    const [reload,setReload] = useState(false);
    const onReload =()=>{
        setReload(!reload);
    }
    useEffect(() => {
        const fetchJob = async () => {
            const respone = await getJobbyCompanyId(id);
            if (respone) setJobs(respone);
            else setJobs([]);
            const listCity = await getListCity();
            const listTags = await getTags();
            if (listCity) setListCity(listCity);
            if (listTags) setListTags(listTags);
        }
        fetchJob();
    }, [reload]);
    const colums = [
        {
            title: 'Tên Job',
            dataIndex: 'name',
            key: '1',
            render: (_, {name})=>(<strong>{name}</strong>)
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: '2',
            render: (_, { tags }) => (
                <>
                    {
                        tags.map(tag => (<Tag key={tag} color='blue'>{tag}</Tag>))
                    }
                </>
            )
        },
        {
            title: 'Mức lương',
            dataIndex: 'salary',
            key: '3',
            render: (_, { salary }) => (<strong>{salary} $</strong>)
        },
        {
            title: 'Thời gian',
            dataIndex: 'createAt',
            key: '4'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: '5',
            render: (_, { status }) => (
                status ? <Tag color='green'>Đang bật</Tag> : <Tag color='gray'>Đang tắt</Tag>
            )
        },
        {
            title: 'Hành động',
            render: (_, record) => (
                <>
                    <Button
                        onClick={() => {
                            navigate(`/job/${record.id}`)
                        }}
                        icon={<EyeOutlined />} />
                    <Button
                        onClick={() => {
                            setEditingJob(record);
                            setShowEditModal(true);
                        }}
                        icon={<EditOutlined style={{ color: 'blue' }} />} />
                    <DeleteJob id = {record.id} onReload = {onReload}/>

                </>
            )
        }
    ]

    return (
        <>
            <h2>Danh sách việc làm </h2>
            <Button className='mb-10' icon ={<PlusOutlined />} onClick={()=>{setShowCreateModal(true)}}>Tạo việc làm mới</Button>
            <Table className='border' rowKey='id' dataSource={jobs} columns={colums} />
            {
                editingJob && <EditJob 
                    listCity ={listCity} 
                    listTags ={listTags} 
                    job = {editingJob} 
                    visible = {showEditModal} 
                    onReload = {onReload}
                    onCancel = {()=>{setShowEditModal(false)}}/>
            }
            <CreateJob 
                listCity={listCity}
                listTags={listTags}
                visible={showCreateModal}
                onReload={onReload}
                onCancel={()=>{setShowCreateModal(false)}}
            />
        </>
    );
}
export default JobManage;