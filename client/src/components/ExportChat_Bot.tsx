import { chat_bot } from '../types/Interfaces'
import { utils, ColInfo, writeFile } from 'xlsx'
import { toast } from 'sonner'
import { Fab } from '@mui/material'

const generateExcelData = (datos: chat_bot[]): unknown[] => {
  const titulo = [{ A: 'Reporte d los PQRS del CHAT BOT ' }]
  const headers = [
    {
      A: 'EMPRESA',
      B: 'ID PQR',
      C: 'FECHA REGISTRO',
      D: 'TIPO PQR',
      E: 'CLIENTE',
      F: 'DOCUMENTO',
      G: 'TELEFONO',
      H: 'CORREO ELECTRONICO',
      I: 'DESCRIPCION'
    }
  ]

  const rows = datos.map((it) => ({
    A: it.EMPRESA,
    B: it.ID_PQR,
    C: it.FECHAREGISTRO,
    D: it.TIPO_PQR,
    E: it.CLIENTE,
    F: it.DOCUMENTO,
    G: it.TELEFONO,
    H: it.CORREO_ELECTRONICO,
    I: it.DESCRIPCION
  }))

  return [...titulo, ...headers, ...rows]
}

const createExcelFile = (data: unknown[]): void => {
  const libro = utils.book_new()
  const hoja = utils.json_to_sheet(data, { skipHeader: true })

  hoja['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }]

  const colWidths: ColInfo[] = [
    { width: 30 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }, { width: 20 }, { width: 10 }
  ]

  hoja['!cols'] = colWidths
  utils.book_append_sheet(libro, hoja, 'ChatBot')
  writeFile(libro, 'ReporteChatBot.xlsx')
}

export const BottonExporChat = ({ datos }: { datos: chat_bot[] }): JSX.Element => {
  const handleDownload = (): void => {
    const dataFinal = generateExcelData(datos)

    const promises = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ name: 'sonner' })
      }, 3000)
    })

    toast.promise(promises, {
      loading: 'Generando Archivo ...',
      description: 'Espere un momento',
      style: { background: '#77d9b5', color: '#000000' },
      success: () => {
        createExcelFile(dataFinal)
        return 'Archivo Generado Correctamente'
      },
      error: 'Error al Generar Archivo'
    })
  }

  return (
    <>
      <Fab variant="extended" type='submit' color="success" aria-label="add" onClick={handleDownload}>
        Solicitar Reporte
      </Fab>
    </>
  )
}