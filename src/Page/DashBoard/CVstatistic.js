import { Card } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getCVbyCompanyId } from "../../Services/cvService";

function CVstatistic(){
    const idCompany = getCookie("id");
    const [data,setData] = useState();
    useEffect(()=>{
        const fetchData = async ()=>{
            const respone = await getCVbyCompanyId(idCompany);
            if (respone){
                let newOb = {
                    total : 0,
                    statusTrue : 0,
                    statusFalse : 0
                }
                newOb.total = respone.length;
                respone.map(job =>{
                    if (job.statusRead){
                        newOb.statusTrue++;
                    }else newOb.statusFalse++;
                });
                setData(newOb);
            }
        }
        fetchData();
    },[]);
    return (
        data && <Card title = "CV" size='small'>
            <div>Số lượng CV : <strong>{data.total}</strong></div>
            <div>Job đã đọc : <strong>{data.statusTrue}</strong></div>
            <div>Job chưa đọc : <strong>{data.statusFalse}</strong></div>
        </Card>
    )
}
export default CVstatistic;