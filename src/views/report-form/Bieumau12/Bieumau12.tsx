import Paper from '@mui/material/Paper'
import { Grid, TextField, Typography, Link, Box, } from '@mui/material';
import DialogControlFullScreen from 'src/@core/components/dialog-control-full-screen';
import HeaderReport from '../HeaderReport';
import FooterReport from '../FooterReport';
import { getData } from 'src/api/axios';
import { useEffect, useState } from 'react';
import BoxLoading from 'src/@core/components/box-loading';
import TableComponent, { TableColumn } from 'src/@core/components/table';
import ExportTableToExcel from 'src/@core/components/export-excel/export-csv';

const FormContruction = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BaoCaoBieuMau/so12')
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
  }, [])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'TT',
      align: 'center'
    },
    {
      id: 'tenLVS',
      label: (<>Lưu vực sông/<br /> Vùng/Tỉnh</>),
      align: 'left',
    },
    {
      id: 'tongCongTrinh',
      label: (<>Tổng số <br /> công trình</>),
      align: 'center',
    },
    {
      id: '#',
      label: (<>Lượng nước khai thác, sử dụng (quy mô) <br /> đã được cấp giấy phép khai thác tài nguyên nước</>),
      children: [
        {
          id: 'tuoi', label: 'Tưới(m³/s)', children: [
            { id: 'tuoiNguonNuocMat', label: 'Nguồn nước mặt', align: 'center' },
            { id: 'tuoiNguonNuocDuoiDat', label: 'Nguồn nước dưới đất', align: 'center' },
          ]
        },
        { id: 'khaiThacThuyDien', label: 'Thủy điện(MW)', align: 'center' },
        {
          id: 'mucdichkhac', label: 'Mục đích khác(m³/Ngày đêm)', children: [
            { id: 'mucDichKhacNguonNuocMat', label: 'Nguồn nước mặt', align: 'center' },
            { id: 'mucDichKhacNguonNuocDD', label: 'Nguồn nước dưới đất', align: 'center' },
          ]
        }
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
          Lượng nước khai thác, sử dụng (quy mô) đã được cấp giấy phép khai thác tài nguyên nước
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>

      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <Box sx={{ width: 'max-content' }}><ExportTableToExcel tableId={'bieumau12'} filename={'bieumau12'} /></Box>
          <TableComponent
            columns={columnsTable}
            id='bieumau12'
            rows={data}
            loading={loading}
          />
        </Grid>
      )}
      <FooterReport />
    </Paper>
  )
}

const Bieumau12 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 12'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 12</Typography>
              <Typography className='text-success text-weight-bold _font12'>Lượng nước KTSD đã được cấp giấy phép khai thác tài nguyên nước</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU12.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau12
