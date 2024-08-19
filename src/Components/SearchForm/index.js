import { Col, Form, Select, Row, Input, Button } from "antd";
import { useEffect, useState } from "react";
import { getListCity } from "../../Services/cityService";
import { useNavigate } from 'react-router-dom'
function SearchForm() {
    const [city, setCity] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const result = await getListCity();
            if (result) {
                const newOption = {
                    key: 0,
                    value: "Tất cả"
                }
                setCity([newOption, ...result]);
            }
        }
        fetchData();
    }, []);
    const handleSubmit = (values) => {
        const city = values.city == undefined ? "" : values.city;
        const keyword = values.keyword == undefined ? "" : values.keyword;
        navigate(`search?city=${city}&keyword=${keyword}`);
    }
    return (
        <>
            <h1>1000+ IT Jobs For Developer</h1>
            {
                city && (
                    <Form
                        onFinish={handleSubmit}
                        initialValues={{
                            city: "Tất cả",  // Set initial value here
                        }}
                    >
                        <Row gutter={[12, 12]}>
                            <Col sm={4} lg={3}>
                                <Form.Item name="city">
                                    <Select
                                        options={city}
                                        placeholder="Chọn thành phố"
                                    />
                                </Form.Item>
                            </Col>
                            <Col sm={12} lg={10}>
                                <Form.Item name="keyword">
                                    <Input
                                        placeholder="Nhập từ khóa..."
                                        autoComplete="off"
                                    />
                                </Form.Item>
                            </Col>
                            <Col sm={3} lg={2}>
                                <Button type="primary" htmlType="submit" block>
                                    Tìm kiếm
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                )
            }

        </>
    )
}
export default SearchForm;