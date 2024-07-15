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
import ToolBar from '../../dong-chay-toi-thieu/Ho/toolbar'
import CreateNN_DCTT_HaDuHoChua from '../../create-form/CreateNN_DCTT_HaDuHoChua'

const NN_DCTT_HaDuHoChua = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataNN_DCTT_HaDuHoChua() {
      setLoading(true)
      await getData('NN_DCTT_HaDuHoChua/danh-sach')
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

    getDataNN_DCTT_HaDuHoChua()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      id: 'tenCT',
      label: 'Tên công trình',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'thuocLVS',
      label: 'Thuộc lưu vực sông',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'xaPhuongTT',
      label: 'Xã/Phường/Thị trấn',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'huyenTP',
      label: 'Huyện/ Thành phố',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'nguonNuocKhaiThac',
      label: 'Nguồn nước khai thác',
      align: 'left',
      minWidth: 200,
    },
    
    {
      id: 'qttSauDap',
      label: 'Qtt sau đập (m3/s)',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'qttSauCT',
      label: 'Qtt sau công trình (m3/s)',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'qttQuyDinhKhac',
      label: 'Qtt quy định khác (m3/s)',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'loaiHinhCT',
      label: 'Loại hình công trình',
      align: 'left',
      minWidth: 200,
    },
    {align: 'center', id: 'actions', label: 'Thao tác', minWidth: 150, rowspan: 3 }
  ]

  return (
    <Paper sx={{ p: 8 }}>
      <Header />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h6'>
        Thống kê giá trị dòng chảy tối thiểu ở hạ du các hồ chứa, đập dâng tỉnh Quảng Ngãi
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
                <CreateNN_DCTT_HaDuHoChua isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'NN_DCTT_HaDuHoChua'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default NN_DCTT_HaDuHoChua
