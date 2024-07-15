import Paper from '@mui/material/Paper'
import { Grid, Typography, Box, } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Header from '../../header'
import Footer from '../../footer'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import dayjs from 'dayjs'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import LakeToolBar from './toolbar'
import CreateLake from './CreateLake'
import DeleteData from 'src/@core/components/delete-data'

const Lake = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataLake() {
      setLoading(true)
      await getData('NM_SoLuong/danh-sach/ao-ho')
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

    getDataLake()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
      rowspan: 3
    },
    {
      id: 'ten',
      label: 'Tên hồ chứa',
      align: 'left',
      minWidth: 100,
    },
    {
      id: 'nguonNuocKhaiThac',
      label: 'Nguồn nước khai thác',
      align: 'left',
    },
    {
      id: 'thuocHeThongSong',
      label: 'Thuộc hệ thống sông ',
      align: 'left',
    },
    {
      id: 'dienTichMatNuoc',
      label: 'Diện tích mặt nước(m2)',
      align: 'left',
    },
    {
      id: 'dungTichToanBo',
      label: 'Dung tích toàn bộ(triệu/m3)',
      align: 'left',
    },
    {
      id: 'dungTichHuuIch',
      label: 'Dung tích hữu ích(triệu/m3)',
      align: 'left',
    },
    {
      id: '#',
      label: 'Vị trí hành chính',
      align: 'left',
      children: [
        {
          id: 'xa',
          label: 'Xã',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.xa == null ? "-" : row.xa}</Typography>,
        },
        {
          id: 'huyen',
          label: 'Huyện',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.huyen == null ? "-" : row.huyen}</Typography>,
        }
      ]
    },
    {
      id: 'mucDich',
      label: 'Mục đích sử dụng',
      align: 'left',
    },
    {
      id: 'ghiChu',
      label: 'Ghi chú',
      align: 'left',
    },
    { id: 'actions', label: 'Thao tác', minWidth: 150, rowspan: 3 }
  ]

  return (
    <Paper sx={{ p: 8 }}>
      <Header />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h6'>
          BÁO CÁO
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          KIỂM KÊ SỐ LƯỢNG NGUỒN NƯỚC MẶT LÀ CÁC AO HỒ, ĐẦM, PHÁ
          TỈNH QUẢNG NGÃI
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
          <LakeToolBar onExport={{ data: data, column: columnsTable }} />
          <TableComponent
            columns={columnsTable}
            rows={data}
            loading={loading}
            pagination
            actions={(row: any) => (
              <Box >
                <CreateLake isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'NM_SoLuong/ao-ho'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default Lake
