import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tag , Row , Card, Col, Button } from 'antd';
import { getAllJob } from '../../Services/jobService';

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const citySearch = searchParams.get("city") || "";
    const keywordSearch = searchParams.get("keyword") || "";
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const respone = await getAllJob();
            if (respone) {
                const newData = respone.filter((item) => {
                    const city = citySearch ? item.city?.includes(citySearch) : true;
                    const keyword = keywordSearch ? item.tags?.includes(keywordSearch) : true;
                    const status = item.status;
                    return city && keyword && status;
                })
                setData(newData);
            }
        }
        fetchData();
    }, [])
    return (<div className='layout-default__search'>
        <Button style={{marginTop : 10}} type='primary' onClick={()=>{navigate(-1)}}>Trở lại</Button>
        <h3 className='layout-default__search-title'>Kết quả tìm kiếm :
            {citySearch && <Tag style={{marginLeft : 5}}> {citySearch}</Tag>}
            {keywordSearch && <Tag style={{marginLeft : 5}}>{keywordSearch}</Tag>}
            {!citySearch && !keywordSearch && <Tag style={{marginLeft : 5}}>Tất cả</Tag>}
        </h3>
        <div className='layout-default__search-innerCard'>
            <Row gutter={[15,15]}>
                {
                    data.map((item) =>(
                        <Col key={item.id} xxl={4} xl={6} >
                            <Card  title = {item.name} style={{width : 250}}>
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
                                <div className='layout-default__search-itemCard'>Công ty : <strong>{item.nameCompany}</strong>  </div>
                                <div className='layout-default__search-itemCard'>Ngày tạo : <strong>{item.createAt}</strong>  </div>
                            </Card>
                        </Col>
                    ))
                }
            </Row>

        </div>
    </div>);
}
export default Search;