import { useEffect, useState } from "react";
import { getCompanys } from "../../Services/companyService";
import { Card, Col, Row , Button} from "antd";
import { useNavigate, Link } from "react-router-dom";

function Company() {
    const [companys, setCompanys] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const result = await getCompanys();
            if (result) setCompanys(result);
        }
        fetchData();
    }, [])

    return (
        <>
            <Button className="goback" type="primary" onClick={() => {navigate(-1)}} style={{marginTop: 10}}>Trở lại</Button>
            <h2>Danh sách các công ty</h2>
            <Row gutter={[20, 20]} style={{ marginTop: 10, marginBottom: 10 }}>
                {
                    companys.map((company) => {
                        return (
                            <Col sm={12} md={8} lg={6} key={company.id}>
                                <Link to={'/company/' + company.id} >

                                    <Card title={company.companyName} >
                                        <div>Số lượng nhân sự : <strong>{company.quantityPeople}</strong> </div>
                                        <div>Website : <strong>{company.website}</strong></div>
                                        <div>Địa chỉ : <strong>{company.address}</strong></div>
                                    </Card>

                                </Link>
                            </Col>)

                    })
                }
            </Row>
        </>
    )
}
export default Company;