import { useEffect, useState } from "react";
import { getCompanys } from "../../Services/companyService";
import { Button, Card, Col, Row } from "antd";
import { useNavigate, Link } from "react-router-dom";

function CompanyList() {
    const [companys, setCompanys] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const result = await getCompanys(4);
            if (result) setCompanys(result);
        }
        fetchData();
    }, [])

    return (
        <>
            <h2>Danh sách một số công ty</h2>
            <Row gutter={20} style={{ marginTop: 10, marginBottom: 10 }}>
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
            <Button onClick={() => { navigate('/company') }}>Xem thêm ...</Button>
        </>
    )
}
export default CompanyList;