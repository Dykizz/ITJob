import { Modal, Form, Col, Row, Input, Select, InputNumber, Switch, Button, notification } from "antd";
import { createJob } from "../../Services/jobService";
import { getCookie } from "../../helpers/cookie";
const { TextArea } = Input;
function CreateJob({onCancel , visible, listCity ,listTags, onReload}){
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const rules = [{ required: true, message: 'Thông tin này không được thiếu' }];

    const handleSubmit = async () => {
        try {
            // Lấy toàn bộ giá trị hiện tại của form, ngay cả khi không thay đổi
            let jobNew = form.getFieldsValue();
            // Kiểm tra các giá trị của form theo rules
            await form.validateFields();
            const time = new Date();
            jobNew = {
                ...jobNew,
                idCompany : getCookie("id"),
                companyName : getCookie("companyName"),
                createAt : time.toLocaleString()
            }
            const response = await createJob(jobNew);
            if (response) {
                api.open({
                    message: 'Tạo job thành công !',
                    type: 'success',
                    description: 'Bạn đã tạo job mới thành công!',
                    duration: 2
                });
                onCancel();
                 // Đóng modal sau khi thành công
                onReload();
            } else {
                throw new Error('Tạo job không thành công!');
            }
        } catch (error) {
            api.open({
                message: 'Tạo job không thành công!',
                type: 'error',
                description: 'Lỗi tạo job không thành công. Vui lòng kiểm tra lại!',
                duration: 2
            });
        }
    };

    return (
        <Modal
            width={800}
            title='Tạo việc làm'
            open={visible}
            onCancel={()=>{form.resetFields(); onCancel()} }
            footer={null}
        >
            {contextHolder}
            <Form
                name="formCreateJob"
                layout="vertical"
                form={form}
                onFinish={handleSubmit}
            >
                <Row gutter={[15, 15]}>
                    <Col span={24}>
                        <Form.Item name='name' label="Tên Job" rules={rules} >
                            <Input autoComplete="off" />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item name='tags' label="Tags" rules={rules}>
                            <Select mode='multiple' options={listTags}></Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name='salary' label="Mức lương" rules={rules}>
                            <InputNumber addonAfter='$' style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='city' label="Thành phố" rules={rules}>
                            <Select mode='multiple' options={listCity}></Select>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='description' label="Mô tả">
                            <TextArea rows={7} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item name='status' label="Trạng thái">
                            <Switch />
                        </Form.Item>
                    </Col>
                </Row>
                <Row dir="rtl" gutter={20}>
                    <Col span={3}>
                        <Button style={{ width: '100%' }} onClick={onCancel}>Hủy</Button>
                    </Col>
                    <Col span={3}>
                        <Button type="primary" style={{ width: '100%' }} htmlType="submit">Lưu</Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
export default CreateJob;