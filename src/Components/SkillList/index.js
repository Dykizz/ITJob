import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTags } from "../../Services/tagsService";
import { Tag } from "antd";
function SkillList(){
    const [tags,setTags] = useState([]);
    useEffect(()=>{
        const fetchData = async () =>{
            const result = await getTags();
            if (result) setTags(result);
        }
        fetchData();
    },[])
    return (
        <>
            {
                tags.map((tag) =>{
                    return <Tag key={tag.key} color="blue"><Link to={`/search?city=&keyword=${tag.value}`}>{tag.value}</Link></Tag>
                })
            }
        </>
    )
}
export default SkillList;