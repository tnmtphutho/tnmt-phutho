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
import ToolBar from '../../chuc-nang-nguon-nuoc/TangChuaNuoc/toolbar'
import CreateNN_CNNN_TangChuaNuoc from '../../create-form/CreateNN_CNNN_TangChuaNuoc'

const NN_CNNN_TangChuaNuoc = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataNN_CNNN_TangChuaNuoc() {
      setLoading(true)
      await getData('NN_CNNN_TangChuaNuoc/danh-sach')
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

    getDataNN_CNNN_TangChuaNuoc()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      id: 'viTriPhamVi',
      label: 'Vị trí, phạm vi quy định chức năng nguồn nước',
      align: 'left',
      minWidth: 300,
      children: [
        {
          id: '#1',
          children: [{ id: '#1.1', label: '(1)', align: 'left' }]
        }
      ]
    },
    {
      id: 'xaPhuongTT',
      label: 'Xã/Phường/Thị trấn',
      align: 'left',
      minWidth: 200,
      children: [
        {
          id: '#2',
          children: [{ id: '#2.1', label: '(2)', align: 'left' }]
        }
      ]
    },
    {
      id: 'huyenTP',
      label: 'Huyện/Thành phố',
      align: 'left',
      minWidth: 200,
      children: [
        {
          id: '#3',
          children: [{ id: '#3.1', label: '(3)', align: 'left' }]
        }
      ]
    },
    {
      id: 'tenTCN',
      label: 'Tên tầng chứa nước',
      align: 'left',
      minWidth: 200,
      children: [
        {
          id: '#4',
          children: [{ id: '#4.1', label: '(4)', align: 'left' }]
        }
      ]
    },
    {
      id: 'loaiChuaNuoc',
      label: 'Loại chứa nước (lỗ hổng, khe nứt)',
      align: 'left',
      minWidth: 300,
      children: [
        {
          id: '#5',
          children: [{ id: '#5.1', label: '(5)', align: 'left' }]
        }
      ]
    },
    {
      id: 'chieuSauPhanBo',
      label: 'Chiều sâu phân bố (m)',
      align: 'left',
      children: [
        {
          id: '#6',
          children: [{ id: '#6.1', label: '(6)', align: 'left' }]
        }
      ]
    },
    {
      id: 'chucNangNguonNuoc',
      label: 'Chức năng nguồn nước',
      align: 'left',
      children: [
        {
          id: '#7',
          children: [{ id: '#7.1', label: '(7)', align: 'left' }]
        }
      ]
    },
    {
      id: 'mucTieuChatLuongNuoc',
      label: 'Mục tiêu chất lượng nước',
      align: 'left',
      children: [
        {
          id: '#8',
          children: [{ id: '#8.1', label: '(8)', align: 'left' }]
        }
      ]
    },
    {
      id: 'chucNangNguonNuoc',
      label: 'Chức năng nguồn nước',
      align: 'left',
      children: [
        {
          id: '#9',
          children: [{ id: '#9.1', label: '(9)', align: 'left' }]
        }
      ]
    },
    {align: 'center', id: 'actions', label: 'Thao tác', minWidth: 150, rowspan: 3 }
  ]

  return (
    <Paper sx={{ p: 8 }}>
      <Header />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h6'>
        Thống kê chức năng nguồn nước là các tầng chứa nước tỉnh Quảng Ngãi
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
                <CreateNN_CNNN_TangChuaNuoc isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'NN_CNNN_TangChuaNuoc'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default NN_CNNN_TangChuaNuoc
