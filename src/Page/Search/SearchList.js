import { Tag , Row , Card, Col } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCompanyById } from '../../Services/companyService';
import CardJob from './CardJob';
function SearchList(prop){
    const { data } = prop;
    return (
        <div className='layout-default__search-list'>
            <Row gutter={[15,15]}>
                {
                    data.map((item) =>(
                        <Col key={item.id} xxl={4} xl={6} >
                            <CardJob jobInfor = {item}/>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}
export default SearchList;