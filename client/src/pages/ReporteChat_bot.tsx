import { FormEvent, useState } from 'react'
import { API_URL } from '../utils/contanst'
import axios from 'axios'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Fab, Input } from '@mui/material'
import { chat_bot } from '../types/Interfaces';
import { toast, Toaster } from 'sonner'
import { BottonExporChat } from '../components/ExportChat_Bot';

function Home() {
  const [test, setTest] = useState<chat_bot[]>([]);
  const [date1, setDate1] = useState<string>()
  const [date2, setDate2] = useState<string>()
  const [zona, setZona] = useState<string | undefined>(undefined)
  const descriptionStyle = {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (date1 === undefined || date2 === undefined || zona === undefined) {
      toast.warning('Debe seleccionar las fechas y la empresa')
      return;
    }

    axios.post(`${API_URL}/getChat`, { fecha1: date1.slice(0, 10), fecha2: date2.slice(0, 10), zona })
      .then(res => {
        console.log(res.data)
        setTest(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }


  return (
    <section className='space-y-6'>
      <div className='glass-panel rounded-[2rem] p-6 sm:p-8'>
        <div className='flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between'>
          <div className='max-w-2xl space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.22em] text-blue-600'>Reporte</p>
            <h1 className='text-3xl font-black tracking-tight text-slate-950 sm:text-4xl'>Consulta de PQRS del chat bot</h1>
            <p className='text-sm leading-6 text-slate-600 sm:text-base'>
              Selecciona rango de fechas y empresa para revisar los casos. La tabla se mantiene limpia, con cabecera fija y exportación directa.
            </p>
          </div>

          <div className='grid gap-3 sm:grid-cols-2 xl:w-auto xl:grid-cols-2'>
            <div className='rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm'>
              <p className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Cantidad de datos</p>
              <p className='mt-1 text-2xl font-black text-slate-900'>{test.length}</p>
            </div>
            <div className='rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm'>
              <p className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Acción</p>
              <div className='mt-2'>{test.length > 0 ? <BottonExporChat datos={test} /> : null}</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='mt-8 grid gap-4 xl:grid-cols-[1fr_1fr_1fr_auto]'>
          <label className='field-shell'>
            <span className='field-label'>Fecha inicial</span>
            <Input type='date' disableUnderline className='field-input' value={date1} onChange={ev => setDate1(ev.target.value)} />
          </label>

          <label className='field-shell'>
            <span className='field-label'>Fecha final</span>
            <Input type='date' disableUnderline className='field-input' value={date2} onChange={ev => setDate2(ev.target.value)} />
          </label>

          <label className='field-shell'>
            <span className='field-label'>Empresa</span>
            <select name='zona' className='field-input rounded-none px-0 py-1' value={zona} onChange={e => setZona(e.target.value)}>
              <option value=''>Seleccione empresa</option>
              <option value='39627'>Multired</option>
              <option value='39628'>Servired</option>
            </select>
          </label>

          <div className='flex items-end'>
            <Fab variant='extended' type='submit' color='primary' aria-label='Solicitar reporte' className='!h-[56px] !rounded-2xl !px-6 !font-semibold !capitalize'>
              Solicitar reporte
            </Fab>
          </div>
        </form>
      </div>

      <div className='glass-panel overflow-hidden rounded-[2rem]'>
        <div className='border-b border-white/70 bg-white/60 px-6 py-4'>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>Resultados</p>
          <p className='mt-1 text-sm text-slate-600'>Las filas están optimizadas para lectura rápida, con una descripción resumida para mantener el ancho controlado.</p>
        </div>
        <TableContainer component={Paper} className='max-h-[68vh] overflow-auto !bg-transparent !shadow-none'>
          <Table stickyHeader size='small' className='min-w-[1200px]'>
            <TableHead>
              <TableRow>
                <TableCell className='!bg-slate-100 !px-5 !py-4 !text-[11px] !font-black !tracking-[0.18em] !text-slate-600'>FECHA REGISTRO</TableCell>
                <TableCell className='!bg-slate-100 !px-5 !py-4 !text-[11px] !font-black !tracking-[0.18em] !text-slate-600'>TIPO PQR</TableCell>
                <TableCell className='!bg-slate-100 !px-5 !py-4 !text-[11px] !font-black !tracking-[0.18em] !text-slate-600'>CLIENTE</TableCell>
                <TableCell className='!bg-slate-100 !px-5 !py-4 !text-[11px] !font-black !tracking-[0.18em] !text-slate-600'>DOCUMENTO</TableCell>
                <TableCell className='!bg-slate-100 !px-5 !py-4 !text-[11px] !font-black !tracking-[0.18em] !text-slate-600'>TELEFONO</TableCell>
                <TableCell className='!bg-slate-100 !px-5 !py-4 !text-[11px] !font-black !tracking-[0.18em] !text-slate-600'>CORREO ELECTRONICO</TableCell>
                <TableCell className='!bg-slate-100 !px-5 !py-4 !text-[11px] !font-black !tracking-[0.18em] !text-slate-600'>DESCRIPCION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {test.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className='!py-16 !text-center !text-sm !text-slate-500'>
                    Aún no hay registros cargados. Usa el filtro superior para generar el reporte.
                  </TableCell>
                </TableRow>
              ) : (
                test.map((row, index) => (
                  <TableRow
                    className='group transition odd:bg-white even:bg-slate-50/60 hover:bg-blue-50/80'
                    hover
                    key={index}
                  >
                    <TableCell className='!px-5 !py-4 text-sm text-slate-700'>{new Date(row.FECHAREGISTRO).toLocaleDateString()}</TableCell>
                    <TableCell className='!px-5 !py-4'>
                      <span className='inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200'>
                        {row.TIPO_PQR}
                      </span>
                    </TableCell>
                    <TableCell className='!px-5 !py-4 text-sm text-slate-800'>{row.CLIENTE}</TableCell>
                    <TableCell className='!px-5 !py-4 text-sm text-slate-700'>{row.DOCUMENTO}</TableCell>
                    <TableCell className='!px-5 !py-4 text-sm text-slate-700'>{row.TELEFONO}</TableCell>
                    <TableCell className='!px-5 !py-4 text-sm text-slate-700'>{row.CORREO_ELECTRONICO}</TableCell>
                    <TableCell className='!max-w-[28rem] !px-5 !py-4 text-sm leading-6 text-slate-700'>
                      <p style={descriptionStyle}>{row.DESCRIPCION}</p>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Toaster duration={3000} position='top-right' richColors visibleToasts={5} />
    </section>
  )
}

export default Home
