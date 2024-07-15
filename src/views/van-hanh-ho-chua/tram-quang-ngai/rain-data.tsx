import { useState, useEffect } from 'react'
import {Grid,Typography} from '@mui/material'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import { getData } from 'src/api/axios'

const MonitoringSFData = () => {
  const [time, setTime] = useState(new Date())
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function getDataTramQuangNgai() {
      setLoading(true)
      await getData('TramQuangNgai/danh-sach')
        .then(data => {
          setData(data)
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    getDataTramQuangNgai()
  },[])

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
      align: 'center'
    },
    {
      id: 'luongMua',
      label: 'Lượng mưa (mm)',
      align: 'center'
    },
    {
      id: 'nhietDo',
      label: 'Nhiệt độ',
      align: 'center'
    },
    {
      id: 'doAm',
      label: 'Độ ẩm',
      align: 'center'
    },
    {
      id: 'tocDoGio',
      label: 'Tốc độ gió',
      align: 'center'
    },
  ]

  return (
    <Grid>
      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center' }}>
        <img src='/images/icon/live.gif' width={25} height={20} alt='live' />
        &nbsp;Thời gian hiện tại: {time.toLocaleString('zh-HK', { hour12: false })}
      </Typography>
      <TableComponent
            columns={columnsTable}
            rows={data}
            loading={loading}
            pagination
          />
    </Grid>
  )
}

export default MonitoringSFData
