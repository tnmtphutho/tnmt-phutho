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
import CreateNN_NguonNuoc_AoHoDamPha from '../../create-form/CreateNN_NguonNuoc_AoHoDamPha'
import ToolBar from '../SongSuoiNoiTinh/toolbar'

const NN_NguonNuoc_AoHoDamPha = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataNN_NguonNuoc_AoHoDamPha() {
      setLoading(true)
      await getData('NN_NguonNuoc_AoHoDamPha/danh-sach')
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

    getDataNN_NguonNuoc_AoHoDamPha()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',

    },
    {
      id: 'tenHoChua',
      label: 'Tên hồ chứa',
      align: 'left',
      minWidth: 100,
    },
    {
      id: 'nguonNuoc',
      label: 'Nguồn nước',
      align: 'left',
    },
    {
      id: 'thuocLVS',
      label: 'Thuộc lưu vực sông',
      align: 'left',
    },
    {
      id: 'dienTichMatNuoc',
      label: 'Diện tích mặt nước (km2)',
      align: 'left',
    },
    {
      id: 'xaPhuongTT',
      label: 'Xã phường/Thị trấn',
      align: 'left',
    },
    {
      id: 'huyenTP',
      label: 'Huyện/Thành phố',
      align: 'left',
    },
    {
      id: 'dungTichToanBo',
      label: 'Dung tích toàn bộ (triệu m3)',
      align: 'left',
    },
    {
      id: 'dungTichHuuIch',
      label: 'Dung tích hữu ích',
      align: 'left',
    },
    {
      id: 'dungTichPhongLu',
      label: 'Dung tích phòng lũ',
      align: 'left',
    },
    {
      id: 'mndbt',
      label: 'Mực nước dâng bình thường',
      align: 'left',
    },
    {
      id: 'mnc',
      label: 'Mực nước chết',
      align: 'left',
    },
    {
      id: 'namXayDung',
      label: 'Năm xây dựng',
      align: 'left',
    },
    {
      id: 'donViQuanLyVanHanh',
      label: 'Đơn vị quản lý vận hành',
      align: 'left',
    },
    {
      id: 'phamViHanhLang',
      label: 'Phạm vi hành lang',
      align: 'left',
    },
    {
      id: 'thuocDienCamMocHanhLang',
      label: 'Thuộc diện cắm mốc hành lang',
      align: 'left',
    },
    { align: 'center', id: 'actions', label: 'Thao tác', minWidth: 150, }
  ]

  return (
    <Paper sx={{ p: 8 }}>
      <Header />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h6'>
          Thống kê danh mục các hồ, ao nội tỉnh Quảng Ngãi
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
                <CreateNN_NguonNuoc_AoHoDamPha isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'NN_NguonNuoc_AoHoDamPha'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default NN_NguonNuoc_AoHoDamPha
