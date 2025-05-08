import { FormEvent, useState } from 'react'
import { API_URL } from '../utils/contanst'
import axios from 'axios'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Fab } from '@mui/material'
import { Input } from '@mui/material';
import { chat_bot } from '../types/Interfaces';
import { toast, Toaster } from 'sonner'
import { BottonExporChat } from '../components/ExportChat_Bot';

function Home() {
  const [test, setTest] = useState<chat_bot[]>([]);
  const [date1, setDate1] = useState<string>()
  const [date2, setDate2] = useState<string>()
  const [zona, setZona] = useState<string | undefined>(undefined)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (date1 === undefined || date2 === undefined || zona === undefined) {
      toast.warning('Debe seleccionar las fechas y la empresa')
      return;
    }

    const fecha1ISO = new Date(date1).toISOString(); // Fecha desde 00:00:00
    const fecha2Obj = new Date(date2);
    fecha2Obj.setHours(23, 59, 59, 999); // Fecha hasta 23:59:59
    const fecha2ISO = fecha2Obj.toISOString();

    axios.post(`${API_URL}/getChat`, { fecha1: fecha1ISO, fecha2: fecha2ISO, zona })
      .then(res => {
        console.log(res.data)
        setTest(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }


  return (
    <section className='relative flex flex-col'>
      <div className='flex items-center justify-around py-2 px-4 rounded-b-md  bg-cyan-200 dark:bg-blue-100 dark:border-gray-700'>

        <div>
          <label className='font-semibold'>Fecha Inicial: </label>
          <Input type='date' className='p-2 rounded-md border border-black' value={date1} onChange={ev => setDate1(ev.target.value)} />
        </div>

        <div>
          <label className='font-semibold'>Fecha Final: </label>
          <Input type='date' className='p-2 rounded-md border border-black' value={date2} onChange={ev => setDate2(ev.target.value)} />
        </div>

        <form onSubmit={handleSubmit} className='gap-2 flex '>
          <select name='zona' className='px-4 rounded-md w-52 border border-black' value={zona} onChange={e => setZona(e.target.value)} >
            <option value=' '>Selecione Empresa</option>
            <option value='39627'>Multired</option>
            <option value='39628'>Servired</option>
          </select>

          <Fab variant="extended" type='submit' color="primary" aria-label="add">
            Solicitar Reporte
          </Fab>

        </form>

        <div className='flex gap-2 items-center'>
          <p className='font-semibold'>Cantidad De Datos: {test.length}</p>
          <div>{test.length > 0 ? <BottonExporChat datos={test} /> : null} </div>
        </div>

      </div>

      <div className='h-[92vh] overflow-y-auto'>
        <TableContainer component={Paper} className='mt-4 rounded-md w-52 border border-gray-300'>
          <Table>
            <TableHead className='bg-blue-100 '>
              <TableRow className=''>
                <TableCell >EMPRESA</TableCell>
                <TableCell>ID PQR</TableCell>
                <TableCell>FECHA REGISTRO</TableCell>
                <TableCell>TIPO PQR</TableCell>
                <TableCell>CLIENTE</TableCell>
                <TableCell>DOCUMENTO</TableCell>
                <TableCell>TELEFONO</TableCell>
                <TableCell>CORREO ELECTRONICO</TableCell>
                <TableCell>DESCRIPCION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {test.map((row, index) => (
                <TableRow
                  className='last:border-0 border-gray-300'
                  component="th"
                  scope="row"
                  key={index}
                >
                  <TableCell>{row.EMPRESA}</TableCell>
                  <TableCell>{row.ID_PQR}</TableCell>
                  <TableCell>{new Date(row.FECHAREGISTRO).toLocaleDateString()}</TableCell>
                  <TableCell>{row.ID_PQR}</TableCell>
                  <TableCell>{row.CLIENTE}</TableCell>
                  <TableCell>{row.DOCUMENTO}</TableCell>
                  <TableCell>{row.TELEFONO}</TableCell>
                  <TableCell>{row.CORREO_ELECTRONICO}</TableCell>
                  <TableCell>{row.DESCRIPCION}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Toaster duration={3000} position='top-right' richColors visibleToasts={5} />
    </section>
  )
}

export default Home
