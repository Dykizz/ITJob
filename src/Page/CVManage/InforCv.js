import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCVbyId } from "../../Services/cvService";
import { getJobById } from "../../Services/jobService";
import { Button, Card, Tag} from "antd";
import TextArea from "antd/es/input/TextArea";
import { patch } from "../../utils/request";

function InforCv(){
    const {id} = useParams();
    const [inforCv,setInforCv] = useState({});
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchData = async ()=>{
            const response =  await getCVbyId(id);
            if (response){
                const inforJob = await getJobById(response.idJob);
                setInforCv({
                    ...response,
                    inforJob : inforJob
                })
                if (!response.statusRead){
                    await patch("cv",id,{...response, statusRead : true});
                }
            }
        }
        fetchData();
    },[]);
    return (<>
        <Button className="goback goback-admin" type="primary" onClick={()=>{navigate(-1)}}>Trở lại</Button>
       <Card className="mb-10" title = {<p>Ứng viên: <strong> {inforCv.name}</strong></p>}>
            <div className="mb-10">Ngày gửi: <strong> {inforCv.createAt}</strong> </div>
            <div className="mb-10">Số điện thoại:<strong> {inforCv.phone}</strong> </div>
            <div className="mb-10">Email : <strong> {inforCv.email}</strong></div>
            <div className="mb-10">Thành phố ứng tuyển :<strong> {inforCv.city}</strong> </div>
            <div className="mb-10">Giới thiệu bản thân:</div>
            <TextArea className="mb-10" rows={4} value={inforCv.description}/>
            <div className="mb-10">Link project :</div>
            <TextArea className="mb-10" rows={3} value={inforCv.linkProject}/>
        </Card>
        <Card className="mb-10" title = {<p>Thông tin job: <strong>{inforCv?.inforJob?.name}</strong></p>}>
            <div className="mb-10">Tags:  <> 
                {
                    inforCv?.inforJob?.tags.map((tag,index) => (<Tag key={index} color="blue">{tag}</Tag>))
                }</>
            </div>
            <div className="mb-10">Mức lương: <strong>{inforCv?.inforJob?.salary}$</strong></div>
            <div className="mb-10">Mô tả:</div>
            <TextArea className="mb-10"rows={5} value={inforCv?.inforJob?.description}/>
            
        </Card>
    
    </>)
}
export default InforCv;