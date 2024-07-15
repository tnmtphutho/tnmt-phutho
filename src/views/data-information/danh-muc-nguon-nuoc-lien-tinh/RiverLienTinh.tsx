import Paper from '@mui/material/Paper'
import { Grid, Typography, Box, } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Header from '../header'
import Footer from '../footer'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import dayjs from 'dayjs'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import DeleteData from 'src/@core/components/delete-data'
import ToolBar from '../danh-muc-nguon-nuoc-lien-tinh/toolbar'
import CreateDanhMucNN_LienTinh from '../create-form/CreateDanhMucNN_LienTinh'

const DanhMucNN_LienTinh = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataDanhMucNN_LienTinh() {
      setLoading(true)
      await getData('DanhMucNN_LienTinh/danh-sach')
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

    getDataDanhMucNN_LienTinh()
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
      ]
    },
    {
      id: 'tenSongSuoi',
      label: 'Tên sông,suối',
      align: 'left',
      minWidth:150
    },
    {
      id: 'chayRa',
      label: 'Chảy ra',
      align: 'left',
      minWidth:150
    },
    {
      id: '#',
      label: 'Vị trí điểm đầu',
      align: 'left',
      children: [
        {
          id: 'xDiemDau',
          label: 'X điểm đầu',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.xDiemDau == null ? "-" : row.xDiemDau}</Typography>
        },
        {
          id: 'yDiemDau',
          label: 'Y điểm đầu',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.yDiemDau == null ? "-" : row.yDiemDau}</Typography>,
        },
        {
          id: 'thonDiemDau',
          label: 'Thôn điểm đầu',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.thonDiemDau == null ? "-" : row.thonDiemDau}</Typography>
        },
        {
          id: 'xaPhuongTTDiemDau',
          label: 'Xã/Phường/Thị trấn điểm đầu',
          align: 'left',
          minWidth: 250,
          elm: (row: any) => <Typography className='f_14'>{row.xaPhuongTTDiemDau == null ? "-" : row.xaPhuongTTDiemDau}</Typography>
        },
        {
          id: 'huyenTPDiemDau',
          label: 'Huyện/Thành phố điểm đầu',
          align: 'left',
          minWidth: 250,
          elm: (row: any) => <Typography className='f_14'>{row.huyenTPDiemDau == null ? "-" : row.huyenTPDiemDau}</Typography>
        }
      ]
    },
    {
      id: '#',
      label: 'Vị trí điểm cuối',
      align: 'left',
      children: [
        {
          id: 'xDiemCuoi',
          label: 'X điểm cuối',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.xDiemCuoi == null ? "-" : row.xDiemCuoi}</Typography>
        },
        {
          id: 'yDiemCuoi',
          label: 'Y điểm cuối',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.yDiemCuoi == null ? "-" : row.yDiemCuoi}</Typography>,
        },
        {
          id: 'thonDiemCuoi',
          label: 'Thôn điểm cuối',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.thonDiemCuoi == null ? "-" : row.thonDiemCuoi}</Typography>
        },
        {
          id: 'xaPhuongTTDiemCuoi',
          label: 'Xã/Phường/Thị trấn điểm cuối',
          align: 'left',
          minWidth: 250,
          elm: (row: any) => <Typography className='f_14'>{row.xaPhuongTTDiemCuoi == null ? "-" : row.xaPhuongTTDiemCuoi}</Typography>
        },
        {
          id: 'huyenTPDiemCuoi',
          label: 'Huyện/Thành phố điểm cuối',
          align: 'left',
          minWidth: 250,
          elm: (row: any) => <Typography className='f_14'>{row.huyenTPDiemCuoi == null ? "-" : row.huyenTPDiemCuoi}</Typography>
        }
      ]
    },
    {
      id: 'ghiChu',
      label: 'Ghi chú',
      align: 'left'
    },
    {align: 'center', id: 'actions', label: 'Thao tác', minWidth: 150, rowspan: 3 }
  ]

  return (
    <Paper sx={{ p: 8 }}>
      <Header />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h6'>
        THỐNG KÊ NGUỒN NƯỚC MẶT LIÊN TỈNH THUỘC CÁC SÔNG SUỐI TỈNH QUẢNG NGÃI
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
                <CreateDanhMucNN_LienTinh isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'DanhMucNN_LienTinh'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default DanhMucNN_LienTinh
