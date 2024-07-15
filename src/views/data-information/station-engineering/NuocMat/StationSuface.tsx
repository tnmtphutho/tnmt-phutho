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
import CreateHSKTT_NDD from '../../create-form/CreateHSKTT_NDD'
import DeleteData from 'src/@core/components/delete-data'
import ToolBar from '../../station-engineering/NuocDuoiDat/toolbar'

const HSKTT_NDD = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataHSKTT_NDD() {
      setLoading(true)
      await getData('HSKTT_NDD/danh-sach')
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

    getDataHSKTT_NDD()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      id: 'kyHieuCT',
      label: 'Ký hiệu công trình',
      align: 'left',
    },
    {
      id: 'tenTaiLieuHoSo',
      label: 'Tên tài liệu hồ sơ',
      align: 'left',
    },
    {
      id: 'tenToChucThucHienQuanTrac',
      label: 'Tên tổ chức thực hiện quan trắc',
      align: 'left',
    },
    {
      id: 'nguoiThanhLapHoSo',
      label: 'Người thành lập hồ sơ',
      align: 'left',
    },
    {
      id: 'nguoiKiemTraHoSo',
      label: 'Người kiểm tra hồ sơ',
      align: 'left',
    },
    {
      id: 'filePDF',
      label: 'File DPF',
      align: 'left',
    },
    {align: 'center', id: 'actions', label: 'Thao tác', minWidth: 150, rowspan: 3 }
  ]

  return (
    <Paper sx={{ p: 8 }}>
      <Header />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h6'>
          THỐNG KÊ HỒ SƠ KỸ THUẬT CÁC CÔNG TRÌNH QUAN TRẮC NƯỚC MẶT TỈNH QUẢNG NGÃI
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
                <CreateHSKTT_NDD isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'HSKTT_NDD'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default HSKTT_NDD
