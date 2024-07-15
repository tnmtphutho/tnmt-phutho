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
      await getData('BaoCaoBieuMau/so10')
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
    },
    {
      id: 'tenLVS',
      label: (<>Lưu vực sông/<br /> Vùng/Tỉnh</>),
      align: 'left',
    },
    {
      id: 'tongCongTrinh',
      label: (<>Tổng số <br /> công trình</>),
      align: 'left',
    },
    {
      id: '#',
      label: 'Số lượng công trình',
      children: [
        {
          id: 'tuoi', label: 'Tưới', children: [
            { id: 'ctTuoiNuocMat', label: 'Nguồn nước mặt' },
            { id: 'ctTuoiNuocDuoiDat', label: 'Nguồn nước dưới đất' }
          ]
        },
        { id: 'ctThuyDien', label: 'Thủy điện' },
        {
          id: 'mucdichkhac', label: 'Mục đích khác', children: [
            { id: 'ctMucDichKhacNuocMat', label: 'Nguồn nước mặt' },
            { id: 'ctMucDichKhacNuocDuoiDat', label: 'Nguồn nước dưới đất' }
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
          Số lượng công trình khai thác nước mặt, nước dưới đất phân theo mục đích sử dụng
        </Typography>
        <Typography className='font-weight-bold ' variant='h6'>
          (Kỳ báo cáo: <TextField size='small' sx={{ width: '50px' }}></TextField>)
        </Typography>
      </Grid>

      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <Box sx={{ width: 'max-content' }}><ExportTableToExcel tableId={'BieuMau10'} filename={'BieuMau10'} /></Box>
          <TableComponent
            columns={columnsTable}
            id='BieuMau10'
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

const Bieumau10 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 10'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<FormContruction />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 10</Typography>
              <Typography className='text-success text-weight-bold _font12'>Số lượng CTKT phân theo sử dụng</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU10.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau10
