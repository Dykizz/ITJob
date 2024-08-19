import { Row, Form, Input, Col, Button, Card } from 'antd'
function Register(){
    const rules = [{ required: true, message: "Bắt buộc nhập thông tin này" }];
    const [form] = Form.useForm();
    const handleLogin = (account) => {
        console.log(account)
    }
    return (
        <>
            <div className='layout-default__register'>
                <Card title="Đăng kí tài khoản">
                    <Form
                        onFinish={handleLogin}
                        form={form}
                        name='formRegister'
                        layout='vertical'

                    >
                        <Row gutter={20}>
                            <Col span={24}>
                                <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Email" name="email" rules={rules}>
                                    <Input type='email' />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Mật khẩu" name="password" rules={rules}>
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Button type='primary' htmlType='submit'>Đăng kí</Button>
                            </Col>

                        </Row>
                    </Form>
                </Card>
            </div>
        </>
    )
}
export default Register;