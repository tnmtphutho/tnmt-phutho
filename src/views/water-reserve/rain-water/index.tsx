import Paper from '@mui/material/Paper'
import { Grid, Box, Typography, } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Header from '../header'
import Footer from '../footer'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import dayjs from 'dayjs'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import RainWaterToolBar from './toolbar'
import CreateRainWater from './form'
import DeleteData from 'src/@core/components/delete-data'

const RainWater = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataRainWater() {
      setLoading(true)
      await getData(`NMua_TongLuong/danh-sach/${selectedYear}`)
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

    getDataRainWater()
  }, [postSuccess, selectedYear])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      id: 'tenTram',
      label: 'Tên trạm',
      align: 'left',
      minWidth: 100,
    },
    {
      id: 'ngayBatDau',
      label: 'Năm bắt đầu quan trắc',
      align: 'left',
    },
    {
      id: 'ngayKetThuc',
      label: 'Năm kết thúc quan trắc',
      align: 'left',
    },
    {
      id: '#',
      label: 'Vị trí',
      align: 'left',
      children: [
        {
          id: '#4',
          label: 'Xã',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.xa?.tenXa}</Typography>,
        },
        {
          id: '#5',
          label: 'Huyện',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.huyen?.tenHuyen}</Typography>,
        }
      ]
    },
    {
      id: 'tongluong_nuocmua',
      label: 'Tháng',
      align: 'left',
      children: [
        {
          id: '#6',
          label: 'Tháng 1',
          align: 'left',
          elm: (row: any) => <Typography className='f_14'>{row.thang1}</Typography>,
        },
        {
          id: '#7',
          label: 'Tháng 2',
          align: 'left',
          elm: (row: any) => <Typography className='f_14'>{row.thang2}</Typography>,
        },
        {
          id: '#8',
          label: 'Tháng 3',
          align: 'left',
          elm: (row: any) => <Typography className='f_14'>{row.thang3}</Typography>,
        },
        {
          id: '#9',
          label: 'Tháng 4',
          align: 'left',
          elm: (row: any) => <Typography className='f_14'>{row.thang4}</Typography>,
        },
        {
          id: '#10',
          label: 'Tháng 5',
          align: 'left',
          elm: (row: any) => <Typography className='f_14'>{row.thang5}</Typography>,
        },
        {
          id: '#11',
          label: 'Tháng 6',
          align: 'left',
          elm: (row: any) => <Typography className='f_14'>{row.thang6}</Typography>,
        },
        {
          id: '#12',
          label: 'Tháng 7',
          align: 'left',
          elm: (row: any) => <Typography className='f_14'>{row.thang7}</Typography>,
        },
        {
          id: '#13',
          label: 'Tháng 8',
          align: 'left',
          elm: (row: any) => <Typography className='f_14'>{row.thang8}</Typography>,
        },
        {
          id: '#14',
          label: 'Tháng 9',
          align: 'left',
          elm: (row: any) => <Typography className='f_14'>{row.thang9}</Typography>,
        },
        {
          id: '#15',
          label: 'Tháng 10',
          align: 'left',
          elm: (row: any) => <Typography className='f_14'>{row.thang10}</Typography>,
        },
        {
          id: '#15',
          label: 'Tháng 11',
          align: 'left',
          elm: (row: any) => <Typography className='f_14'>{row.thang11}</Typography>,
        },
        {
          id: '#17',
          label: 'Tháng 12',
          align: 'left',
          elm: (row: any) => <Typography className='f_14'>{row.thang12}</Typography>,
        }
      ]
    },
    {
      id: '#',
      label: 'Mùa mưa',
      align: 'left',
      elm: (row: any) => <Typography className='f_14'>{row.tongluong_nuocmua?.[0]?.muamua}</Typography>
    },
    {
      id: '#',
      label: 'Mùa khô',
      align: 'left',
      elm: (row: any) => <Typography className='f_14'>{row.tongluong_nuocmua?.[0]?.muakho}</Typography>,
    },
    {
      id: '#',
      label: 'Cả năm',
      align: 'left',
      elm: (row: any) => <Typography className='f_14'>{row.tongluong_nuocmua?.[0]?.canam}</Typography>,
    },
    { id: 'actions', label: 'Thao tác', minWidth: 150, rowspan: 3 }
  ]

  return (
    <Paper sx={{ p: 8 }}>
      <Header />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h4'>
          BÁO CÁO
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          Tổng lượng mưa, phân phối lượng mưa trong năm
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo:{' '}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              views={['year']}
              value={dayjs(new Date(selectedYear, 1, 1))}
              onChange={(newVal: any) => setSelectedYear(newVal.year())}
              slotProps={{ textField: { size: 'small', fullWidth: true, required: true } }}
              sx={{ width: '100px' }}
            />
          </LocalizationProvider>
          )
        </Typography>
      </Grid>
      {/* <CreateReport2 isEdit={false} setPostSuccess={handlePostSuccess}/> */}
      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <RainWaterToolBar onExport={{ data: data, column: columnsTable }} />
          <TableComponent
            columns={columnsTable}
            rows={data}
            loading={loading}
            pagination
            actions={(row: any) => (
              <Box >
                <CreateRainWater isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'licensefee'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default RainWater
