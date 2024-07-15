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
import DeleteData from 'src/@core/components/delete-data'
import ToolBar from '../../chuc-nang-nguon-nuoc/SongSuoi/toolbar'
import CreateNN_CNNN_SongSuoi from '../../create-form/CreateNN_CNNN_SongSuoi'

const NN_CNNN_SongSuoi = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataNN_CNNN_SongSuoi() {
      setLoading(true)
      await getData('NN_CNNN_SongSuoi/danh-sach')
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

    getDataNN_CNNN_SongSuoi()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      id: '#',
      label: 'Mã sông',
      align: 'left',
      minWidth: 100,
      children: [
        {
          id: 'maSong1',
          label: '',
          align: 'left',
         
        },
        {
          id: 'maSong2',
          label: '',
          align: 'left',
         
        },
        {
          id: 'maSong3',
          label: '',
          align: 'left',
         
        },{
          id: 'maSong4',
          label: '',
          align: 'left',
         
        },{
          id: 'maSong5',
          label: '',
          align: 'left',
         
        },
        {
          id: 'maSong6',
          label: '',
          align: 'left',
         
        },
      ]
    },
    {
      id: 'tenSongSuoi',
      label: 'Tên sông,suối',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'phanDoan',
      label: 'Phân đoạn',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'chayRa',
      label: 'Chảy ra',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'chieuDai',
      label: 'Chiều dài (km)',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'diaPhanHanhChinh',
      label: 'Địa phận hành chính',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'huyen',
      label: 'Huyện',
      align: 'left',
      minWidth: 200,
    },
    {
      id: '#',
      label: 'Toạ độ điểm đầu',
      align: 'left',
      children: [
        {
          id: 'xDiemDau',
          label: 'X điểm đầu',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.xDiemDau == null ? "-" : row.xDiemDau}</Typography>,
        },
        {
          id: 'yDiemDau',
          label: 'Y điểm đầu',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.yDiemDau == null ? "-" : row.yDiemDau}</Typography>,
        }
      ]
    },
    {
      id: '#',
      label: 'Toạ độ điểm cuối',
      align: 'left',
      children: [
        {
          id: 'xDiemCuoi',
          label: 'X điểm cuối',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.xDiemCuoi == null ? "-" : row.xDiemCuoi}</Typography>,
        },
        {
          id: 'yDiemCuoi',
          label: 'Y điểm cuối',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.yDiemCuoi == null ? "-" : row.yDiemCuoi}</Typography>,
        }
      ]
    },
    {
      id: 'chucNangNguonNuoc',
      label: 'Chức năng nguồn nước',
      align: 'left',
    },
    {
      id: 'mucTieuChatLuong',
      label: 'Mục tiêu chất lượng',
      align: 'left',
    },
    {
      id: '#',
      label: 'Thời gian thực hiện',
      align: 'left',
    },
    {align: 'center', id: 'actions', label: 'Thao tác', minWidth: 150, rowspan: 3 }
  ]

  return (
    <Paper sx={{ p: 8 }}>
      <Header />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h6'>
        Thống kê chức năng nguồn nước sông suối tỉnh Quảng Ngãi
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
          <ToolBar onExport={{ data: data, column: columnsTable }} />
          <TableComponent
            columns={columnsTable}
            rows={data}
            loading={loading}
            pagination
            actions={(row: any) => (
              <Box >
                <CreateNN_CNNN_SongSuoi isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'NN_CNNN_SongSuoi'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default NN_CNNN_SongSuoi
