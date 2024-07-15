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

const FormContruction = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [year, setYear] = useState(new Date().getFullYear() - 1)

  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BaoCaoBieuMau/so13', { nam: year })
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
  }, [year])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      id: 'luuVucSong',
      label: <>Lưu vực sông <br /> Vùng/Tỉnh</>,
      align: 'left',
    },
    {
      id: 'songSuoiHoChua',
      label: <>Sông, suối <br /> hồ chứa</>,
      align: 'left',
    },
    {
      id: 'viTriQuanTrac',
      label: <>Vị trí <br /> quan trắc</>,
      align: 'left',
      minWidth: 200,
    },
    {
      id: '#',
      label: <>Kết quả phân tích <br /> chỉ tiêu BOD5 [-]</>,
      align: 'center',
      children: [
        {
          id: 'boD5LonNhat',
          label: 'Lớn nhất',
          align: 'center',
        },
        {
          id: 'boD5NhoNhat',
          label: 'Nhỏ nhất',
          align: 'center',
        },
        {
          id: 'boD5TrungBinh',
          label: 'Trung bình',
          align: 'center',
        },
      ]
    },
    {
      id: '#',
      label: <>Kết quả phân tích <br /> chỉ tiêu COD [-]</>,
      align: 'center',
      children: [
        {
          id: 'codLonNhat',
          label: 'Lớn nhất',
          align: 'center',
        },
        {
          id: 'codNhoNhat',
          label: 'Nhỏ nhất',
          align: 'center',
        },
        {
          id: 'codTrungBinh',
          label: 'Trung bình',
          align: 'center',
        },
      ]
    },
    {
      id: '#',
      label: <>Kết quả phân tích <br /> chỉ tiêu DO [-]</>,
      align: 'center',
      children: [
        {
          id: 'doLonNhat',
          label: 'Lớn nhất',
          align: 'center',
        },
        {
          id: 'doNhoNhat',
          label: 'Nhỏ nhất',
          align: 'center',
        },
        {
          id: 'doTrungBinh',
          label: 'Trung bình',
          align: 'center',
        },
      ]
    },
  ]

  return (

    <Paper sx={{ p: 8 }}>
      <HeaderReport />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h4'>
          BÁO CÁO
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          Số lượng công trình khai thác nước mặt, nước dưới đất phân theo mục đích sử dụng
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
          <Box sx={{ width: 'max-content' }}><ExportTableToExcel tableId={'bieumau13'} filename={'bieumau13'} /></Box>
          <TableComponent
            columns={columnsTable}
            id='bieumau13'
            rows={data}
            loading={loading}
            actions={() => (
              <Box >
              </Box>
            )}
          />
        </Grid>
      )}
      <FooterReport />
    </Paper>
  )
}

const Bieumau13 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 13'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 13</Typography>
              <Typography className='text-success text-weight-bold _font12'>Số lượng CTKT phân theo sử dụng</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU13.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau13
