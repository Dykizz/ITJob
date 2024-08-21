import { useEffect, useState } from "react";
import { Tag , Card } from 'antd';
import { Link } from 'react-router-dom';
import { getCompanyById } from '../../Services/companyService';
function CardJob({ jobInfor }) {
    const [job,setJob] = useState(jobInfor)
    useEffect(() => {
        const fetchData = async () => {
            const inforCompany = await getCompanyById(job.idCompany);
            if (inforCompany) {
                setJob({
                    ...job,
                    inforCompany: inforCompany
                })
            }
        }
        fetchData();
    }, [])
    return (<>
        <Card title={<Link to={`/job/${job.id}`}>{job.name}</Link>} style={{ width: 250 }}>
            <div className='layout-default__search-itemCard'>Ngôn ngữ :
                {
                    job.tags.map((tag, index) => (<Tag key={index} style={{ marginLeft: 5 }} color='blue'>{tag}</Tag>))
                }
            </div>
            <div className='layout-default__search-itemCard'>Thành phố :
                {
                    job.city.map((city, index) => (<Tag key={index} style={{ marginLeft: 5 }} color='orange'>{city}</Tag>))
                }
            </div>
            <div className='layout-default__search-itemCard'>Lương : <strong>{job.salary} $</strong> </div>
            <div className='layout-default__search-itemCard'>Công ty : <strong>{job?.inforCompany?.companyName}</strong>  </div>
            <div className='layout-default__search-itemCard'>Ngày tạo : <strong>{job.createAt}</strong>  </div>
        </Card>
    </>);
}
export default CardJob;