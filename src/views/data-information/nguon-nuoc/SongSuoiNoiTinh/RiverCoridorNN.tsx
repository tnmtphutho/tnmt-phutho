import Paper from '@mui/material/Paper'
import { Grid, Typography, Box, Toolbar, TextField, Button, } from '@mui/material'

// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Header from '../../header'
import Footer from '../../footer'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'

// import dayjs from 'dayjs'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import DeleteData from 'src/@core/components/delete-data'
import CreateNN_NguonNuoc_SongSuoi from '../../create-form/CreateNN_NguonNuoc_SongSuoi'
import { Search } from '@mui/icons-material'
import ExportTableToExcel from 'src/@core/components/export-excel/export-csv'

const NN_NguonNuoc_SongSuoi = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)

  // const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataNN_NguonNuoc_SongSuoi() {
      setLoading(true)
      await getData('NN_NguonNuoc_SongSuoi/danh-sach')
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

    getDataNN_NguonNuoc_SongSuoi()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT'
    },
    {
      id: 'maSong',
      label: 'Mã sông',
      align: 'left',
    },
    {
      id: 'tenSongSuoi',
      label: 'Tên sông suối',
      align: 'left',
    },
    {
      id: 'chayRa',
      label: 'Chảy ra',
      align: 'left',
    },
    {
      id: 'chieuDai',
      label: 'Chiều dài (km)',
      align: 'left',
    },
    {
      id: 'diaPhanHanhChinh',
      label: 'Địa phận hành chính',
      align: 'left',
    },
    {
      id: 'huyen',
      label: 'Huyện',
      align: 'left',
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
      id: 'chucNang',
      label: 'Chức năng',
      align: 'left',
    },
    {
      id: 'ghiChu',
      label: 'Ghi chú',
      align: 'left',
    },
    { align: 'center', id: 'actions', label: 'Thao tác', minWidth: 200 }
  ]

  return (
    <Paper sx={{ p: 8 }}>
      <Header />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h6'>
          Thống kê danh mục nguồn nước thuộc các sông suối tỉnh Quảng Ngãi
        </Typography>

        {/* <Typography className='font-weight-bold ' variant='h6'>
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
        </Typography> */}
      </Grid>
      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <Toolbar variant='dense'>
            <Grid container spacing={2} sx={{ paddingY: 3 }} className='_flexEnd '>
              <Grid item xs={12} md={3} py={0}>
                <TextField sx={{ p: 0 }} size='small' fullWidth variant='outlined' placeholder='Tên trạm...' />
              </Grid>
              <Grid item xs={6} md={1.5} py={0}>
                <Button
                  variant='outlined'
                  size='small'
                  fullWidth
                  sx={{ borderRadius: 0 }}
                  startIcon={<Search />}
                >
                  Tìm kiếm
                </Button>
              </Grid>
              <Grid item xs={6} md={1.5} py={0}>
                <ExportTableToExcel tableId={'nn-songsuoi'} filename={'nn-songsuoi'} />
              </Grid>
              <Grid item xs={6} md={1.5} py={0}>
                <CreateNN_NguonNuoc_SongSuoi isEdit={false} setPostSuccess={handlePostSuccess} />
              </Grid>
            </Grid>
          </Toolbar>
          <TableComponent
            columns={columnsTable}
            rows={data}
            loading={loading}
            id='nn-songsuoi'
            pagination
            actions={(row: any) => (
              <Box >
                <CreateNN_NguonNuoc_SongSuoi isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'NN_NguonNuoc_SongSuoi'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default NN_NguonNuoc_SongSuoi
