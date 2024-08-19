import { useRoutes } from 'react-router-dom'
import { Routers } from '../../Routers';
function All(){
    const elements = useRoutes(Routers())
    return (
        <>
            {elements}
        </>
    )
}
export default All;