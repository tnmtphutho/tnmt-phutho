import Paper from '@mui/material/Paper'
import { Grid, Typography, Box, Toolbar, TextField, Button, } from '@mui/material'

// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Header from '../header'
import Footer from '../footer'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'

// import dayjs from 'dayjs'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import CreateNN_LuuVucSong from '../create-form/CreateNN_LuuVucSong'
import DeleteData from 'src/@core/components/delete-data'
import { Search } from '@mui/icons-material'
import ExportTableToExcel from 'src/@core/components/export-excel/export-csv'

const LuuVucSong = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataNN_LuuVucSong() {
      setLoading(true)
      await getData('NN_LuuVucSong/danh-sach')
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

    getDataNN_LuuVucSong()
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
      id: 'capSong',
      label: 'Cấp sông',
      align: 'left',
    },
    {
      id: 'tenSongSuoi',
      label: 'Tên sông',
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
      id: 'chieuDai',
      label: 'Chiều dài (km)',
      align: 'left',
    },
    {
      id: 'dienTich',
      label: 'Diện tích lưu vực (km2)',
      align: 'left',
    },
    {
      id: 'tinh',
      label: 'Tỉnh/ Thành phố',
      align: 'left',
      minWidth:150
    },
    {
      id: 'thuocLVS',
      label: 'Thuộc lưu vực sông',
      align: 'left',
    },
    {
      id: 'loaiSongSuoi',
      label: 'Loại sông, suối',
      align: 'left',
    },
    {
      id: 'ghiChu',
      label: 'Ghi chú',
      align: 'left',
    },

    { align: 'center', id: 'actions', label: 'Thao tác', minWidth: 150, }
  ]

  return (
    <Paper sx={{ p: 8 }}>
      <Header />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h6'>
          THÔNG TIN DỮ LIỆU VỀ LƯU VỰC SÔNG TỈNH QUẢNG NGÃI
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
      {/* <CreateReport2 isEdit={false} setPostSuccess={handlePostSuccess}/> */}
      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <Toolbar variant='dense'>
            <Grid container spacing={2} sx={{ paddingY: 3 }} className='_flexEnd '>
              <Grid item xs={12} md={3} py={0}>

                <TextField sx={{ p: 0 }} size='small' fullWidth variant='outlined' placeholder='Tên sông, suối...' />
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
                <ExportTableToExcel tableId={'nn-luuvucsong'} filename={'nn-luuvucsong'} />
              </Grid>
              <Grid item xs={6} md={1.5} py={0}>
                <CreateNN_LuuVucSong isEdit={false} setPostSuccess={handlePostSuccess} />
              </Grid>
            </Grid>
          </Toolbar>
          <TableComponent
            columns={columnsTable}
            rows={data}
            loading={loading}
            id='nn-luuvucsong'
            pagination
            actions={(row: any) => (
              <Box >
                <CreateNN_LuuVucSong isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'NN_LuuVucSong'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default LuuVucSong
