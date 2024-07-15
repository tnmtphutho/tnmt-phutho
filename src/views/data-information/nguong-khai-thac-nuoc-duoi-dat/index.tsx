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
import CreateNN_NguongKhaiThacNDD from '../create-form/CreateNN_NguongKhaiThacNDD'
import DeleteData from 'src/@core/components/delete-data'
import ToolBar from './toolbar'

const NN_NguongKhaiThacNDD = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataNN_NguongKhaiThacNDD() {
      setLoading(true)
      await getData('NN_NguongKhaiThacNDD/danh-sach')
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

    getDataNN_NguongKhaiThacNDD()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT'
    },
    {
      id: 'tenTCN',
      label: 'Tên tầng chứa nước',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'loaiChuaNuoc',
      label: 'Loại chứa nước (lỗ hổng, khe nứt)',
      align: 'left',
      minWidth: 300,
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
      label: 'Tỉnh/Thành phố',
      align: 'left',
    },
    {
      id: 'dienTichPhanBo',
      label: 'Diện tích phân bố (km2)',
      align: 'left',
    },
    {
      id: 'khoangChieuSauPhanBo',
      label: 'Khoảng chiều sâu phân bố (m)',
      align: 'left',
    },
    {
      id: 'nguongGHKTLuuLuong',
      label: 'Ngưỡng GHKT về mực nước (m)',
      align: 'left',
    },
    {
      id: 'nguongGHKTMucNuoc',
      label: 'Ngưỡng GHKT về mực nước (m)',
      align: 'left',
    },
    {
      id: 'qdPheDuyetNguongGioiHanKT',
      label: 'QĐ phê duyệt ngưỡng giới hạn KT',
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
        THÔNG TIN DỮ LIỆU VỀ NGƯỠNG KHAI THÁC NƯỚC DƯỚI ĐẤT TỈNH QUẢNG NGÃI
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
                <CreateNN_NguongKhaiThacNDD isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'NN_NguongKhaiThacNDD'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default NN_NguongKhaiThacNDD
