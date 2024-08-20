import { Button, Card, Row, Form, Col ,Input} from "antd";
import { getCompanyById } from "../../Services/companyService";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
const { TextArea } = Input;

function InforCompany(){
    const id = getCookie("id");
    const [form] = Form.useForm(); // Create a form instance
    const [company, setCompany] = useState();

    const buttonEdit = <Button>Chỉnh sửa</Button>;
    const rules = [{required : true , message : 'Thông tin này bắt buộc phải có'}];

    useEffect(() => {
        const fetchData = async () => {
            const response = await getCompanyById(id);

            if (response) {
                setCompany(response);
                form.setFieldsValue(response); // Set form values after data is fetched
            }
        }
        fetchData();
    }, [id, form]);

    return (
        <>  
            <Card title='Thông tin công ty' extra={buttonEdit}>
                <Form 
                    form={form} // Pass the form instance to the Form component
                    name="formInforCompany"
                    layout="vertical"
                >
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <Form.Item name='companyName' label='Tên công ty' rules={rules}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col md={12} lg={8}>
                            <Form.Item name='email' label='Email' rules={rules}>
                                <Input type="email"/>
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
                        <Col span={24}>
                            <Form.Item name='description' label='Mô tả ngắn'>
                                <TextArea rows={3}/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name='detail' label='Mô tả chi tiết'>
                                <TextArea rows={10}/>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Button type="primary" htmlType="submit">Cập nhật</Button>
                        </Col>
                        <Col>
                            <Button>Hủy</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    );
}

export default InforCompany;
