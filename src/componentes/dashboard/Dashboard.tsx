import { useEffect, useState } from 'react'
import './Dashboard.css'
import { dashboardService } from '../../service/dashboardService'
import { useToast } from '../../domain/CustomHooks/useToast'
import { DashboardCard } from './DashboardCard/DashBoardCard'
import '../../assets/recomendations.svg'
export const Dashboard = () => {
    const [recomendations, setRecomendations] = useState(0)
    const[books, setBooks] = useState(0)
    const[users, setUsers] = useState(0)
    const[centers, setCenters] = useState(0)
    const [listToasts, showToast] = useToast()

    const fetchData = async () => {
        try {
          const total = await dashboardService.getDashboardData();
          setRecomendations(total.totalRecomendaciones);
          setBooks(total.totalLibros)
          setUsers(total.totalUsuarios)
          setCenters(total.totalCentros)
        } catch  {
            showToast("Error al obtener la informacion del dashboard", "error");
        }
      };

      const deleteUsers = async () => {
        try{
            await dashboardService.deleteUsers()
            await fetchData()
            showToast("Usuarios inactivos eliminados correctamente", "success")
        } catch {
            showToast("Error al borrar los usuarios inactivos", "error")
            
        }
      }

      const deleteCenters = async () => {
        try{
            await dashboardService.deleteCenters()
            await fetchData() 
            showToast("Centros inactivos eliminados correctamente", "success")
        } catch {
            showToast("Error al borrar los centros inactivos", "error")
        }
      }


    useEffect(() => {
        fetchData();
      }, []); 
    return <>
        <h1 className='titulo'>Indicadores</h1>
        <section className="indicadores">
            <DashboardCard title={'Recomendaciones'} data={recomendations} svg={'../../../assets/recomendations.svg'} data-testid="recomendations"></DashboardCard>
            <DashboardCard title={'Libros totales'} data={books} svg={''} data-testid="books"></DashboardCard>
            <DashboardCard title={'Usuarios registrados'} data={users} svg={''}></DashboardCard>
            <DashboardCard title={'Centros de lectura'} data={centers} svg={''}></DashboardCard>
        </section>
        <section className="acciones">
            <h1 className="">Acciones</h1>
            <button data-testid="delete-users" className="btn-admin" onClick={deleteUsers}>Borrar usuarios inactivos</button>
            <button data-testid="delete-centers" className="btn-admin" onClick={deleteCenters}>Borrar centros inactivos</button>
        </section>
        {listToasts}
    </>
}