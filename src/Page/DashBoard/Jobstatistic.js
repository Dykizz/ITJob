import { Card } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getJobbyCompanyId } from "../../Services/jobService";

function Jobstatistic(){
    const idCompany = getCookie("id");
    const [data,setData] = useState();
    useEffect(()=>{
        const fetchData = async ()=>{
            const respone = await getJobbyCompanyId(idCompany);
            if (respone){
                let newOb = {
                    total : 0,
                    statusTrue : 0,
                    statusFalse : 0
                }
                newOb.total = respone.length;
                respone.map(job =>{
                    if (job.status){
                        newOb.statusTrue++;
                    }else newOb.statusFalse++;
                });
                setData(newOb);
            }
        }
        fetchData();
    },[]);
    return (
        data && <Card title = "Job" size='small'>
            <div>Số lượng job : <strong>{data.total}</strong></div>
            <div>Job đang bật : <strong>{data.statusTrue}</strong></div>
            <div>Job đang tắt : <strong>{data.statusFalse}</strong></div>
        </Card>
    )
}
export default Jobstatistic;