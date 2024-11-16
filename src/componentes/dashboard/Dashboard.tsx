import {  useState } from 'react'
import './Dashboard.css'
import { dashboardService } from '../../service/dashboardService'
import { DashboardCard } from './DashboardCard/DashboardCard'
import { Alert, Snackbar } from '@mui/material'
import { useOnInit } from '../../domain/CustomHooks/useOnInit'






export const Dashboard = () => {
  
  const dashboardItemsMap = new Map<string, DashboardItem>([
    ["recomendations", new DashboardItem("Recomendations",0, "recomendations.svg")],
    ["books", new DashboardItem("Total number of books", 0, "book.svg")],
    ["centers", new DashboardItem("Active Read Centers", 0, "center.svg")],
    ["users", new DashboardItem("Active Users", 0, "user-circle.svg")]
    ])

  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info'>('success')
  const [errorMessage, setErrorMessage] = useState('')
  const [dashboardMap, useDashboardMap] = useState<Map<string, DashboardItem>>({...dashboardItemsMap})


  let totalOld! : number
  let changeState = false

  const fetchData = async () => {
    try {
      //const totalOld = totalObjects(dashboardMap)
      const total = await dashboardService.getDashboardData();
      const recomendations = dashboardItemsMap!.get("recomendations")!
      const books = dashboardItemsMap!.get("books")!
      const centers = dashboardItemsMap!.get("centers")!
      const users = dashboardItemsMap!.get("users")!

      const totalNow = total.getTotalObjects()
      recomendations.setData(total.totalRecomendaciones)
      books.setData(total.totalLibros)
      centers.setData(total.totalCentros)
      users.setData(total.totalUsuarios)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useDashboardMap(dashboardItemsMap)
      changeState = totalNow != totalOld ? true : false
      console.log(changeState)
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
      totalOld = totalObjects(dashboardMap)
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
      totalOld = totalObjects(dashboardMap)
      await dashboardService.deleteCenters()
      await fetchData()
      successResponse()
    } catch (error: unknown) {
      errorResponse(error)
    }
  }

  const totalObjects = (map : Map<string, DashboardItem>) => {
    let contador = 0
    map.forEach((item) => {
      contador += item.data
    })
    return contador
  }



  useOnInit(fetchData);
  
  return <>
    <h1 className='titulo'>Indicadores</h1>
    <section className="indicadores">
      {Array.from(dashboardMap).map(([, value]) => {
        return <DashboardCard title={value.title} data={value.data} svg={value.svg} data-testid={value.title}></DashboardCard>
      })}
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

class DashboardItem{
  constructor(
    public title : string,
    public data : number,
    public svg : string
  ){}

  setData(number:number){
    this.data = number
  }
}