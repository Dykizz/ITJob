import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCompanyById } from "../../Services/companyService";
import { getAllJob } from "../../Services/jobService";
import SearchList from "../Search/SearchList";
import { Button } from "antd";
function CompanyDetail() {
    const { id } = useParams();
    const [inforCompany, setInforCompany] = useState({});
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const company = await getCompanyById(id);
            if (company) {
                const listjob = await getAllJob();
                const jobOfCompany = (listjob || []).filter((job) => {
                    return job.idCompany === id;
                });
                setInforCompany(company);
                setJobs(jobOfCompany);
            }
        }
        fetchData();
    }, []);
    return (<>
        <Button className="goback" style={{marginTop : 10}} type='primary' onClick={()=>{navigate(-1)}}>Trở lại</Button>
        <h1>{inforCompany.companyName}</h1>
        <div>
            <div className="mb-10">Địa chỉ :<strong>{inforCompany.address}</strong> </div>
            <div className="mb-10">Số lượng nhân sự : <strong>{inforCompany.quantityPeople}</strong> </div>
            <div className="mb-10">Thời gian làm việc : <strong>{inforCompany.workingTime}</strong></div>
            <div className="mb-10">Link website :<strong>{inforCompany.website}</strong> </div>
            <div className="mb-10 " >Mô tả ngắn :<p className="border">{inforCompany.description}</p>
            </div>
            <div className="mb-10 ">Mô tả chi tiết :<p className="border">{inforCompany.detail}</p>
            </div>
        </div>
        <div>
            <div className="mb-10">Danh sách các job :</div>
            <SearchList data = {jobs}/>
        </div>
    </>)
}
export default CompanyDetail;