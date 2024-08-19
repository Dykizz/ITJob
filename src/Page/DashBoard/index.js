import CVstatistic from "./CVstatistic";
import Inforstatistic from "./Inforstatistic"
import Jobstatistic from "./Jobstatistic";
import { Col, Row } from "antd";
function DashBoard(){
    return (
        <>
            <h1>Tổng quan</h1>
            <Row gutter={20}>
                <Col span={8}>
                    <Jobstatistic/>
                </Col>
                <Col span={8}>
                    <CVstatistic/>
                </Col>
                <Col span={8}>
                    <Inforstatistic/>
                </Col>
            </Row>
            
        </>
    )
}
export default DashBoard;