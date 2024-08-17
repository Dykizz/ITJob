import { Tag , Row , Card, Col } from 'antd';
import { Link } from 'react-router-dom';
function SearchList(prop){
    const { data } = prop;
    return (
        <div className='layout-default__search-list'>
            <Row gutter={[15,15]}>
                {
                    data.map((item) =>(
                        <Col key={item.id} xxl={4} xl={6} >
                            <Card  title ={<Link to = {`/job/${item.id}`}>{item.name}</Link>}  style={{width : 250}}>
                                <div className='layout-default__search-itemCard'>Ngôn ngữ : 
                                    {
                                        item.tags.map((tag,index) => (<Tag key={index} style={{marginLeft : 5}} color='blue'>{tag}</Tag>))
                                    }
                                </div>
                                <div className='layout-default__search-itemCard'>Thành phố :
                                    {
                                        item.city.map((city,index) => (<Tag key={index} style={{marginLeft : 5}} color='orange'>{city}</Tag>))
                                    }
                                </div>
                                <div className='layout-default__search-itemCard'>Lương : <strong>{item.salary} $</strong> </div>
                                <div className='layout-default__search-itemCard'>Công ty : <strong>{item.companyName}</strong>  </div>
                                <div className='layout-default__search-itemCard'>Ngày tạo : <strong>{item.createAt}</strong>  </div>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}
export default SearchList;