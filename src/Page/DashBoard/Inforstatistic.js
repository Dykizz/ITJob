import { Card } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getCompanyById } from "../../Services/companyService";

function Inforstatistic(){
    const idCompany = getCookie("id");
    const [data,setData] = useState();
    useEffect(()=>{
        const fetchData = async ()=>{
            const respone = await getCompanyById(idCompany);
            if (respone){
                setData(respone);
            }
        }
        fetchData();
    },[]);
    return (
        data && <Card title = "Thông tin công ty" size='small'>
            <div>Tên công ty : <strong>{data.companyName}</strong></div>
            <div>Email : <strong>{data.email}</strong></div>
            <div>Số điện thoại : <strong>{data.phone}</strong></div>
            <div>Số nhân viên : <strong>{data.quantityPeople}</strong></div>
        </Card>
    )
}
export default Inforstatistic;