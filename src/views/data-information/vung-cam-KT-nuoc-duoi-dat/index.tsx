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
import CreateNN_VungCamHanCheKTNDD from '../create-form/CreateNN_VungCamHanCheKTNDD'
import DeleteData from 'src/@core/components/delete-data'
import ToolBar from '../vung-cam-KT-nuoc-duoi-dat/toolbar'

const NN_VungCamHanCheKTNDD = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataNN_VungCamHanCheKTNDD() {
      setLoading(true)
      await getData('NN_VungCamHanCheKTNDD/danh-sach')
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

    getDataNN_VungCamHanCheKTNDD()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      id: 'tenVungCamHanChe',
      label: 'Tên vùng cấm/vùng hạn chế',
      align: 'left',
    },
    {
      id: 'dienTichVungCamHanChe',
      label: 'Diện tích vùng cấm/vùng hạn chế (km2)',
      align: 'left',
    },
    {
      id: 'xa',
      label: 'Xã',
      align: 'left',
    },
    {
      id: 'huyen',
      label: 'Huyện',
      align: 'left',
    },
    {
      id: 'tinhTP',
      label: 'Tỉnh/ Thành phố',
      align: 'left',
    },
    {
      id: 'phamViChieuSau',
      label: 'Phạm vi chiều sâu hoặc tầng chứa nước hạn chế KT (m)',
      align: 'left',
    },
    {
      id: 'cacBienPhapHanCheKT',
      label: 'Các biện pháp hạn chế khai thác',
      align: 'left',
    },
    {
      id: 'qdPheDuyetVungCamKT',
      label: 'QĐ phê duyệt vùng cấm khai thác',
      align: 'left',
    },
    {
      id: 'ghiChu',
      label: 'Ghi chú',
      align: 'left',
    },
    {align: 'center', id: 'actions', label: 'Thao tác', minWidth: 150, rowspan: 3 }
  ]

  return (
    <Paper sx={{ p: 8 }}>
      <Header />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h6'>
        THÔNG TIN DỮ LIỆU VỀ VÙNG CẤM, VÙNG HẠN CHẾ KHAI THÁC NƯỚC DƯỚI ĐẤT TỈNH QUẢNG NGÃI
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
                <CreateNN_VungCamHanCheKTNDD isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'NN_VungCamHanCheKTNDD'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default NN_VungCamHanCheKTNDD
