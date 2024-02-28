import DataView from '../components/dataview'

function Dashboard(){

    return(
        <div className='dashboard'>
        <div className='header'>
        <h1>Motor de Busqueda de Correos Electronicos</h1>
        </div>
        <div className='tables'>
        <DataView/>
        </div> 
        </div>
    )

}

export default Dashboard