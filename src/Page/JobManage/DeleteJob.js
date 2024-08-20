import { Button, notification } from "antd";
import { DeleteOutlined } from '@ant-design/icons'
import { deleteJob } from "../../Services/jobService";
function DeleteJob({ id , onReload }) {
    const [api, contextHolder] = notification.useNotification();
    const handleDelete = async () => {
        const respone = await deleteJob(id);
        if (respone) {
            
            api.open({
                message: 'Hệ thống đã nhận xử lý xóa',
                type:  'info',
                description: 'Vui lòng đợi trong giây lát...',
                duration: 2
            });
            setTimeout(()=>{onReload()},2000);
            
        } else {
            api.open({
                message: 'Xóa không thành công!',
                type: 'error',
                description: 'Lỗi hệ thống .Không xóa được job này!',
                duration: 2
            })
        }

    }
    return (
        <>
            {contextHolder}
            <Button
                icon={<DeleteOutlined style={{ color: 'red' }} />} 
                onClick={handleDelete}
            />
        </>

    )
}
export default DeleteJob;