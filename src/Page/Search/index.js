import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tag , Button } from 'antd';
import { getAllJob } from '../../Services/jobService';
import SearchList from './SearchList';

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const citySearch = searchParams.get("city") === "Tất cả" ? '' : (searchParams.get("city") || '');
    const keywordSearch = searchParams.get("keyword") || "";
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const respone = await getAllJob();
            if (respone) {
                let newData = respone.filter((item) => {
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
    return (
        <div className='layout-default__search'>
            <Button className='goback' type='primary' onClick={()=>{navigate(-1)}}>Trở lại</Button>
            <h3 className='layout-default__search-title'>Kết quả tìm kiếm :
                {citySearch && <Tag style={{marginLeft : 5}}> {citySearch}</Tag>}
                {keywordSearch && <Tag style={{marginLeft : 5}}>{keywordSearch}</Tag>}
                {!citySearch && !keywordSearch && <Tag style={{marginLeft : 5}}>Tất cả</Tag>}
            </h3>
            {data.length > 0 ?
                <SearchList data = {data}/> : <h3> Không tìm thấy job phù hợp!</h3>
            }
        </div>
    );
}
export default Search;