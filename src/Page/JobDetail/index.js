import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { getJobById } from '../../Services/jobService';
import { Button, Card, Form, Tag, Row, Col, Input} from 'antd';
import { getCompanyById } from '../../Services/companyService';
const {TextArea} = Input;

function JobDetail() {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const rules = [{ required: true, message: "Bắt buộc điền thông tin này" }]
    useEffect(() => {
        const fetchData = async () => {
            const result = await getJobById(id);
            if (result) {
                const company = await getCompanyById(result.idCompany);
                setItem({ inforCompany: company, ...result });
            }
        }
        fetchData();
    }, []);
    const onFinish = (record) =>{
        console.log(record);
        form.resetFields();
    }
    return (<>
        <Button style={{ marginTop: 10 }} type='primary' onClick={() => { navigate(-1) }}>Trở lại</Button>
        {item &&
            <div className='layout-default__DetailJob'>
                <h1 className='layout-default__DetailJob-title' >{item.name}</h1>
                <Button type='primary' href='#formApply' style={{textDecoration : 'none', marginBottom: 10}}>Ứng tuyển ngay</Button>
                <div>
                    <div className='layout-default__DetailJob-item'>Ngôn ngữ :
                        {
                            (item.tags || []).map((tag, index) => (<Tag key={index} style={{ marginLeft: 5 }} color='blue'>{tag}</Tag>))
                        }
                    </div>
                    <div className='layout-default__DetailJob-item'>Thành phố :
                        {
                            (item.city || []).map((city, index) => (<Tag key={index} style={{ marginLeft: 5 }} color='orange'>{city}</Tag>))
                        }
                    </div>
                    <div className='layout-default__DetailJob-item'>Mức lương : <strong>{item.salary} $</strong> </div>


                    <div className='layout-default__DetailJob-item'>Công ty : <strong>{item.companyName}</strong>  </div>
                    <div className='layout-default__DetailJob-item'>Địa chỉ công ty : <strong>{item.inforCompany && item.inforCompany.address}</strong></div>
                    <div className='layout-default__DetailJob-item'>Sologan : <strong>{item.inforCompany && item.inforCompany.description}</strong></div>
                    <div className='layout-default__DetailJob-item'>Mô tả công việc :
                        <p>{item.description}</p>
                    </div>

                    <div className='layout-default__DetailJob-item'>Ngày đăng bài : <strong>{item.createAt}</strong>  </div>
                </div>
            </div>
        }
        <Card title=' Ứng tuyển ngay'>
            <Form
                id='formApply'
                onFinish={onFinish}
                form={form}
                name='formApply'
                layout='vertical'
            >
                <Row gutter={20}>
                    <Col span={6}>
                        <Form.Item label='Họ và tên' name='name' rules={rules} >
                            <Input autoComplete='off'/>
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='Số điện thoại' name='phone' rules={rules}>
                            <Input autoComplete='off' />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='Email' name='email' rules={rules}>
                            <Input type='email' />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label='Thành phố' name='city' rules={rules}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Form.Item rules={rules} label = 'Giới thiệu bản thân' name='description'>
                            <TextArea rows={6} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item rules={rules} label = 'Danh sách link project đã làm' name='linkProject'>
                            <TextArea  rows={6} />
                        </Form.Item>
                    </Col>

                </Row>
                <Button type='primary' htmlType='submit'>Ứng tuyển</Button>
            </Form>
        </Card>


    </>);
}
export default JobDetail;