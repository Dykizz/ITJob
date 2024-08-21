import { Row, Form, Input, Col, Button, Card, notification } from 'antd'
import { login } from '../../Actions/company';
import { loginCompany } from '../../Services/companyService'
import { setCookie } from '../../helpers/cookie';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
function Login() {
    const rules = [{ required: true, message: "Bắt buộc nhập thông tin này" }];
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const [api,contextHoler] = notification.useNotification();
    const handleLogin = async (account) => {
        const result = await loginCompany(account.email,account.password);
        if (result){
            setCookie("companyName",result.companyName,0.1);
            setCookie("email",result.email,0.1);
            setCookie("token",result.token,0.1);
            setCookie("id",result.id,0.1);
            dispatch(login());
            navigate('/admin')
        }else{
            api.open({
                message : "Đăng nhập không thành công",
                type : 'error',
                description : "Email hoặc mật khẩu không chính xác!",
                duration : 2
            })
        }
    }
    return (
        <>
            <div className='layout-default__login'>
                <Card title="Đăng nhập tài khoản">
                    <Form
                        onFinish={handleLogin}
                        form={form}
                        name='formLogin'
                        layout='vertical'

                    >
                        <Row gutter={20}>
                            <Col span={24}>
                                <Form.Item label="Email" name="email" rules={rules}>
                                    <Input type='email' />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Mật khẩu" name="password" rules={rules}>
                                    <Input.Password />
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Button type='primary' htmlType='submit'>Đăng nhập</Button>
                            </Col>

                        </Row>
                    </Form>
                </Card>
            </div>
        </>
    )
}
export default Login;