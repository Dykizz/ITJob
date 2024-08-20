import { Button, Card, Row, Form, Col, Input, InputNumber, notification } from "antd";
import { editCompany, getCompanyById } from "../../Services/companyService";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { compose } from "redux";
const { TextArea } = Input;

function InforCompany() {
    const id = getCookie("id");
    const [form] = Form.useForm(); // Create a form instance
    const [company, setCompany] = useState();
    const [disabled, setDisabled] = useState(true);
    const [api, contextHolder] = notification.useNotification();

    const rules = [{ required: true, message: 'Thông tin này bắt buộc phải có' }];
    const buttonEdit = <Button onClick={() => { setDisabled(false) }}>Chỉnh sửa</Button>;
    useEffect(() => {
        const fetchData = async () => {
            const response = await getCompanyById(id);
            if (response) {
                setCompany(response);
                form.setFieldsValue(response);
            }
        }
        fetchData();
    }, [id, form]);
    const handleSubmit = async (company) => {
        const respone = await editCompany(company, id);
        if (respone) {
            const companyNew = respone;
            setCompany(companyNew);
            form.setFieldsValue(companyNew);
            setDisabled(true);
            api.open({
                message: 'Cập nhật thành công!',
                type: 'success',
                description: 'Bạn đã cập nhật thông tin thành công!',
                duration: 2
            })
        } else {
            api.open({
                message: 'Cập nhật không thành công!',
                type: 'error',
                description: 'Hiện đang có lỗi . Hệ thống không thể cập nhật thông tin này, vui lòng kiểm tra lại!',
                duration: 2
            });
        }
    }
    const handleCancel = () => {
        form.setFieldsValue(company);
        setDisabled(true);
    }
    return (
        <>
            {contextHolder}
            <Card title='Thông tin công ty' extra={buttonEdit}>
                <Form
                    onFinish={handleSubmit}
                    form={form}
                    name="formInforCompany"
                    layout="vertical"
                    disabled={disabled}
                >
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <Form.Item name='companyName' label='Tên công ty' rules={rules}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={12} lg={8}>
                            <Form.Item name='email' label='Email' rules={rules}>
                                <Input type="email" />
                            </Form.Item>
                        </Col>
                        <Col md={12} lg={8}>
                            <Form.Item name='phone' label='Số điện thoại'>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col md={24} lg={8}>
                            <Form.Item name='address' label='Địa chỉ'>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name='quantityPeople' label='Số lượng nhân sự'>
                                <InputNumber min={1} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name='workingTime' label='Thời gian làm việc'>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name='description' label='Mô tả ngắn'>
                                <TextArea rows={3} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name='detail' label='Mô tả chi tiết'>
                                <TextArea rows={10} />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Button type="primary" htmlType="submit">Cập nhật</Button>
                        </Col>
                        <Col>
                            <Button onClick={handleCancel}>Hủy</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    );
}

export default InforCompany;
