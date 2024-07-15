import Paper from '@mui/material/Paper'
import { Grid, Typography, Link, Box, } from '@mui/material';
import DialogControlFullScreen from 'src/@core/components/dialog-control-full-screen';
import HeaderReport from '../HeaderReport';
import FooterReport from '../FooterReport';
import { getData } from 'src/api/axios';
import { useEffect, useState } from 'react';
import BoxLoading from 'src/@core/components/box-loading';
import TableComponent, { TableColumn } from 'src/@core/components/table';
import ExportTableToExcel from 'src/@core/components/export-excel/export-csv';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import CreateReport5 from './CreateForm5';
import DeleteData from 'src/@core/components/delete-data';

const FormContruction = () => {
  const [data, setData] = useState<any[]>([])
  
  const [loading, setLoading] = useState(false)
  const [year, setYear] = useState(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false)

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }

  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BieuMauSoNam/danhsach', { nam: year })
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

    getDataReport1()
  }, [year,postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      id: 'tenTram',
      label: 'Tên trạm',
      align: 'left',
    },
    {
      id: '#',
      label: 'Lưu lượng(m3/s)',
      align: 'center',
      children: [
        {
          id: 'luuLuongThang1',
          label: 'I',
          align: 'center',
        },
        {
          id: 'luuLuongThang2',
          label: 'II',
          align: 'center',
        },
        {
          id: 'luuLuongThang3',
          label: ' III',
          align: 'center',
        },
        {
          id: 'luuLuongThang4',
          label: 'IV',
          align: 'center',
        },
        {
          id: 'luuLuongThang5',
          label: 'V',
          align: 'center',
        },
        {
          id: 'luuLuongThang6',
          label: ' VI',
          align: 'center',
        },
        {
          id: 'luuLuongThang7',
          label: ' VII',
          align: 'center',
        },
        {
          id: 'luuLuongThang8',
          label: ' VIII',
          align: 'center',
        },
        {
          id: 'luuLuongThang9',
          label: ' IX',
          align: 'center',
        },
        {
          id: 'luuLuongThang10',
          label: 'X',
          align: 'center',
        },
        {
          id: 'luuLuongThang11',
          label: 'XI',
          align: 'center',
        },
        {
          id: 'luuLuongThang12',
          label: ' XII',
          align: 'center',
        },
      ]
    },
    {
      id: 'luuLuongNam',
      label: 'Lưu lượng trung bình năm',
      align: 'left',
    },
    { id: 'actions', label: '#', align: 'center', pinned: 'right' }
  ]

  return (

    <Paper sx={{ p: 8 }}>
      <HeaderReport />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h4'>
          BÁO CÁO
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
        Tổng hợp các đặc trưng của các chỉ tiêu cơ bản về chất lượng nước dưới đất
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo:
          <Box sx={{ width: 100, ml: 2, display: 'inline-block' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Năm'
                views={["year"]}
                value={dayjs(new Date(year, 1, 1))}
                onChange={(newVal: any) => setYear(dayjs(newVal).year())}
                slotProps={{ textField: { size: 'small', required: true } }}
              />
            </LocalizationProvider>
          </Box>
          )
        </Typography>
      </Grid>

      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <Grid sx={{ display:'flex' }}>
          <Box sx={{ width: 'max-content' }}><ExportTableToExcel tableId={'BieuMau5'} filename={'BieuMau5'} /></Box>
          <Box sx={{ width: 'max-content' }}><CreateReport5 isEdit={false} setPostSuccess={handlePostSuccess} /></Box>
          
          </Grid>
          <TableComponent
            columns={columnsTable}
            id='BieuMau5'
            rows={data}
            loading={loading}
            pagination
            actions={(row: any) => (
              <Box display={"flex"}>
                <CreateReport5 isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'cong-trinh'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}
      <FooterReport />
    </Paper>
  )
}

const BieuMau5 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 5'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 5</Typography>
              <Typography className='text-success text-weight-bold _font12'>Dòng chảy trung bình tháng năm trong kỳ báo cáo</Typography>
            </Grid>
            <Grid item xs={4}>
            <Box component='img' src='/images/report-form/ANHBIEUMAU5.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default BieuMau5
