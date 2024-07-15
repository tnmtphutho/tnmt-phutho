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
      await getData('BaoCaoBieuMau/so14', { nam: year })
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
      id: 'tangChuaNuoc',
      label: 'Tầng chứa nước',
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
      label: <>Kết quả phân tích <br /> chỉ tiêu pH [-]</>,
      align: 'center',
      children: [
        {
          id: 'pHlonNhat',
          label: 'Lớn nhất',
          align: 'center',
        },
        {
          id: 'phNhoNhat',
          label: 'Nhỏ nhất',
          align: 'center',
        },
        {
          id: 'phTrungBinh',
          label: 'Trung bình',
          align: 'center',
        },
      ]
    },
    {
      id: '#',
      label: <>Kết quả phân tích <br /> chỉ tiêu Tổng Coliform [-]</>,
      align: 'center',
      children: [
        {
          id: 'coliformlonNhat',
          label: 'Lớn nhất',
          align: 'center',
        },
        {
          id: 'coliformNhoNhat',
          label: 'Nhỏ nhất',
          align: 'center',
        },
        {
          id: 'coliformTrungBinh',
          label: 'Trung bình',
          align: 'center',
        },
      ]
    },
    {
      id: '#',
      label: <>Kết quả phân tích <br /> chỉ tiêu Nitrate [-]</>,
      align: 'center',
      children: [
        {
          id: 'nitratelonNhat',
          label: 'Lớn nhất',
          align: 'center',
        },
        {
          id: 'nitrateNhoNhat',
          label: 'Nhỏ nhất',
          align: 'center',
        },
        {
          id: 'nitrateTrungBinh',
          label: 'Trung bình',
          align: 'center',
        },
      ]
    },
    {
      id: '#',
      label: <>Kết quả phân tích <br /> chỉ tiêu Amoni [-]</>,
      align: 'center',
      children: [
        {
          id: 'amonilonNhat',
          label: 'Lớn nhất',
          align: 'center',
        },
        {
          id: 'amoniNhoNhat',
          label: 'Nhỏ nhất',
          align: 'center',
        },
        {
          id: 'amoniTrungBinh',
          label: 'Trung bình',
          align: 'center',
        },
      ]
    },
    {
      id: '#',
      label: <>Kết quả phân tích <br /> chỉ tiêu Tổng chất rắn hòa tan (TDS)[-]</>,
      align: 'center',
      children: [
        {
          id: 'tdSlonNhat',
          label: 'Lớn nhất',
          align: 'center',
        },
        {
          id: 'tdsNhoNhat',
          label: 'Nhỏ nhất',
          align: 'center',
        },
        {
          id: 'tdsTrungBinh',
          label: 'Trung bình',
          align: 'center',
        },
      ]
    },
    {
      id: '#',
      label: <>Kết quả phân tích <br /> chỉ tiêu Độ cứng(tính theo CaCO3) [-]</>,
      align: 'center',
      children: [
        {
          id: 'doCungLonNhat',
          label: 'Lớn nhất',
          align: 'center',
        },
        {
          id: 'doCungNhoNhat',
          label: 'Nhỏ nhất',
          align: 'center',
        },
        {
          id: 'doCungTrungBinh',
          label: 'Trung bình',
          align: 'center',
        },
      ]
    },
    {
      id: '#',
      label: <>Kết quả phân tích <br /> chỉ tiêu Arsenic [-]</>,
      align: 'center',
      children: [
        {
          id: 'arsenicLonNhat',
          label: 'Lớn nhất',
          align: 'center',
        },
        {
          id: 'arsenicNhoNhat',
          label: 'Nhỏ nhất',
          align: 'center',
        },
        {
          id: 'arsenicTrungBinh',
          label: 'Trung bình',
          align: 'center',
        },
      ]
    },
    {
      id: '#',
      label: <>Kết quả phân tích <br /> chỉ tiêu Chloride [-]</>,
      align: 'center',
      children: [
        {
          id: 'chlorideLonNhat',
          label: 'Lớn nhất',
          align: 'center',
        },
        {
          id: 'chlorideNhoNhat',
          label: 'Nhỏ nhất',
          align: 'center',
        },
        {
          id: 'chlorideTrungBinh',
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
          <Box sx={{ width: 'max-content' }}><ExportTableToExcel tableId={'BieuMau14'} filename={'BieuMau14'} /></Box>
          <TableComponent
            columns={columnsTable}
            id='BieuMau14'
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

const BieuMau14 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 14'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 14</Typography>
              <Typography className='text-success text-weight-bold _font12'>Chất lượng nước dưới đất</Typography>
            </Grid>
            <Grid item xs={4}>
            <Box component='img' src='/images/report-form/ANHBIEUMAU14.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default BieuMau14
