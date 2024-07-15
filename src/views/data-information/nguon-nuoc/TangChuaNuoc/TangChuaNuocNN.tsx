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
import CreateNN_NguonNuoc_TangChuaNuoc from '../../create-form/CreateNN_NguonNuoc_TangChuaNuoc'
import ToolBar from '../TangChuaNuoc/toolbar'

const NN_NguonNuoc_TangChuaNuoc = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataNN_NguonNuoc_TangChuaNuoc() {
      setLoading(true)
      await getData('NN_NguonNuoc_TangChuaNuoc/danh-sach')
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

    getDataNN_NguonNuoc_TangChuaNuoc()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      id: 'tenTangChuaNuoc',
      label: 'Tên tầng chứa nước',
      align: 'left',
    },
    {
      id: 'loaiChuaNuoc',
      label: 'Loại chứa nước (lổ hổng, khe nứt)',
      align: 'left',
    },
    {
      id: 'thuocLVS',
      label: 'Thuộc lưu vực sông',
      align: 'left',
    },
    {
      id: 'xaPhuongTT',
      label: 'Xã/Phường/Thị trấn',
      align: 'left',
    },
    {
      id: 'huyenTP',
      label: 'Huyện/Thành phố',
      align: 'left',
    },
    {
      id: 'dungTichPhanBo',
      label: 'Diện tích phân bố (km2)',
      align: 'left',
    },
    {
      id: 'khoangChieuSauPhanBo',
      label: 'Khoảng chiều sâu phân bố (m)',
      align: 'left',
    },
    {align: 'center', id: 'actions', label: 'Thao tác', minWidth: 150, rowspan: 3 }
  ]

  return (
    <Paper sx={{ p: 8 }}>
      <Header />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h6'>
        Thống kê thông tin dữ liệu về nguồn nước là các tầng chứa nước tỉnh Quảng Ngãi
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
                <CreateNN_NguonNuoc_TangChuaNuoc isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'NN_NguonNuoc_TangChuaNuoc'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default NN_NguonNuoc_TangChuaNuoc
