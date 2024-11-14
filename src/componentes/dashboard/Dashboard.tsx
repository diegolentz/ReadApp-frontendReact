import { useEffect, useState } from 'react'
import './Dashboard.css'
import { dashboardService } from '../../service/dashboardService'
import { DashboardCard } from './DashboardCard/DashboardCard'
import { Alert, Snackbar } from '@mui/material'
export const Dashboard = () => {
  const [recomendations, setRecomendations] = useState(0)
  const [books, setBooks] = useState(0)
  const [users, setUsers] = useState(0)
  const [centers, setCenters] = useState(0)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('success')
  const [errorMessage, setErrorMessage] = useState('')


  let changeState = false

  const fetchData = async () => {
    try {
      const total = await dashboardService.getDashboardData();
      if (total.totalRecomendaciones != recomendations || total.totalLibros != books || total.totalUsuarios != users || total.totalCentros != centers) {
        changeState = true
      }
      setRecomendations(total.totalRecomendaciones);
      setBooks(total.totalLibros)
      setUsers(total.totalUsuarios)
      setCenters(total.totalCentros)
    } catch (error) {
      errorResponse(error)
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const successResponse = () => {
    setSnackbarSeverity('success')
    setOpenSnackbar(true)
    setErrorMessage("Operación realizada correctamente")
  }

  const errorResponse = (errorMessage:unknown) =>{
    setSnackbarSeverity('error')
    setOpenSnackbar(true)
    setErrorMessage(`${errorMessage}`)
  }

  const deleteUsers = async () => {
    try {
      await dashboardService.deleteUsers()
      await fetchData()
      if (changeState) {
        setSnackbarSeverity('info')
        setOpenSnackbar(true)
        setErrorMessage("No hay usuarios para eliminar")
      } else {
        successResponse()
      }
    } catch (error: unknown) {
      errorResponse(error)
    }
  }

  const deleteCenters = async () => {
    try {
      await dashboardService.deleteCenters()
      await fetchData()
      successResponse()
    } catch (error: unknown) {
      errorResponse(error)
    }
  }


  useEffect(() => {
    fetchData();
  }, []);
  return <>
    <h1 className='titulo'>Indicadores</h1>
    <section className="indicadores">
      <DashboardCard title={'Recomendaciones'} data={recomendations} svg={"recomendations.svg"} data-testid="recomendations"></DashboardCard>
      <DashboardCard title={'Libros totales'} data={books} svg={'book.svg'} data-testid="books"></DashboardCard>
      <DashboardCard title={'Usuarios registrados'} data={users} svg={'user-circle.svg'}></DashboardCard>
      <DashboardCard title={'Centros de lectura'} data={centers} svg={'center.svg'}></DashboardCard>
    </section>
    <h2 className="titulo">Acciones</h2>
    <section className="acciones">
      <button data-testid="delete-users" className="btn-admin" onClick={deleteUsers}>Borrar usuarios inactivos</button>
      <button data-testid="delete-centers" className="btn-admin" onClick={deleteCenters}>Borrar centros inactivos</button>
    </section>
    <Snackbar
      open={openSnackbar}
      autoHideDuration={2000}
      onClose={handleCloseSnackbar}
    >
      <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                    {errorMessage}
                </Alert>
    </Snackbar>
  </>
}