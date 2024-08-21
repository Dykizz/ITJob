import { Row, Form, Input, Col, Button, Card, notification } from 'antd'
import { checkExistEmail, checkExistPhone, createCompany, randomToken } from '../../Services/companyService';
import { useNavigate } from 'react-router-dom';
function Register(){
    const rules = [{ required: true, message: "Bắt buộc nhập thông tin này" }];
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [api,contextHolder] = notification.useNotification();
    const handleLogin = async (account) => {
        const phone = account.phone ;
        const email = account.email ;
        const existEmail = await checkExistEmail(email);
        if (existEmail){
            api.open({
                message : 'Cảnh báo!',
                type : 'warning',
                description : 'Email này đã được đăng kí!',
                duration : 2
            });
            return;
        } 
        const existPhone = await checkExistPhone(phone);
        if (existPhone){
            api.open({
                message : 'Cảnh báo!',
                type : 'warning',
                description : 'Số điện thoại này đã được đăng kí!',
                duration : 2
            });
            return;
        }
        const token = randomToken();
        account = {...account , token : token};
        const respone = await createCompany(account);
        if (respone){
            api.open({
                message : 'Đăng kí thành công!',
                type : 'success',
                description : 'Chúc mừng bạn đăng kí tài khoản thành công. Hãy đến trang đăng nhập!',
                duration : 2
            });
            setTimeout(()=>{
                navigate('/login')
            },1500);
        }else{
            api.open({
                message : 'Đăng kí không thành công!',
                type : 'error',
                description : 'Không đăng kí được tài khoản. Vui lòng xem lại thông tin!',
                duration : 2
            });
        }

    }
    return (
        <>
            {contextHolder}
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
                                <Form.Item label="Tên công ty" name="companyName" rules={rules} >
                                    <Input autoComplete='off' />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Email" name="email" rules={rules}>
                                    <Input type='email' />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Số điện thoại" name="phone" rules={rules} >
                                    <Input autoComplete='off' />
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