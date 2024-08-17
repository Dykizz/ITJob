import { useRoutes } from 'react-router-dom'
import { routers } from '../../Routers';
function All(){
    const elements = useRoutes(routers)
    return (
        <>
            {elements}
        </>
    )
}
export default All;