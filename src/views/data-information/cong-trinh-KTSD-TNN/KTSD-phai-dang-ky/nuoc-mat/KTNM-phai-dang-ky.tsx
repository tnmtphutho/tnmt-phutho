import Paper from '@mui/material/Paper'
import { Grid, Typography, Box, } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Header from '../../../header'
import Footer from '../../../footer'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import dayjs from 'dayjs'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import DeleteData from 'src/@core/components/delete-data'
import ToolBar from '../../../cong-trinh-KTSD-TNN/KTSD-phai-dang-ky/nuoc-mat/toolbar'
import CreateCTKTSDN_PDK_NuocMat from '../../../create-form/CreateCTKTSDN_PDK_NuocMat'

const CTKTSDN_PDK_NuocMat = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataCTKTSDN_PDK_NuocMat() {
      setLoading(true)
      await getData('CTKTSDN_PDK_NuocMat/danh-sach')
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

    getDataCTKTSDN_PDK_NuocMat()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      id: 'tenCongTrinh',
      label: 'Tên công trình',
      align: 'left',
    },
    {
      id: 'tenTCN',
      label: 'Tên tổ chức cá nhân',
      align: 'left',
    },
    {
      id: 'namVanHanh',
      label: 'Năm vận hành',
      align: 'left',
    },
    {
      id: '#',
      label: 'Vị trí',
      align: 'left',
      children: [
        {
          id: 'xa',
          label: 'Xã',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.xa == null ? "-" : row.xa}</Typography>,
        },
        {
          id: 'huyen',
          label: 'Huyện',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.huyen == null ? "-" : row.huyen}</Typography>,
        }
      ]
    },
    {
      id: '#',
      label: 'Toạ độ',
      align: 'left',
      children: [
        {
          id: 'x',
          label: 'X',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.x == null ? "-" : row.x}</Typography>,
        },
        {
          id: 'y',
          label: 'Y',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.y == null ? "-" : row.y}</Typography>,
        }
      ]
    },
    {
      id: 'tenSong',
      label: 'Tên sông',
      align: 'left',
    },
    {
      id: 'luuVucSong',
      label: 'Lưu vực sông',
      align: 'left',
    },
    {
      id: 'caoTrinhDap',
      label: 'Cao trình đập (m)',
      align: 'left',
    },
    {
      id: 'caoTrinhNguongTran',
      label: 'Cao trình ngưỡng tràn (m)',
      align: 'left',
    },
    {
      id: 'luuLuongXaLuTK',
      label: 'Lưu lượng xả lũ thiết kế (m3/s)',
      align: 'left',
    },
    {
      id: 'luuLuongXaLuKT',
      label: 'Lưu lượng xả lũ khai thác (m3/s)',
      align: 'left',
    },
    {
      id: 'dungTichChet',
      label: 'Dung tích chết (triệu m3)',
      align: 'left',
    },
    {
      id: 'soToMay',
      label: 'Số tổ máy',
      align: 'left',
    },
    {
      id: 'soGP',
      label: 'Số giấy phép',
      align: 'left',
    },
    {
      id: 'ngayQuyetDinh',
      label: 'Ngày quyết định',
      align: 'left',
    },
    {
      id: 'thoiGianHieuLuc',
      label: 'Thời gian hiệu lực',
      align: 'left',
    },
    {
      id: 'idCongTrinh',
      label: 'ID CT trên hệ thống',
      align: 'left',
    },
    {
      id: 'thoiGianBatDauKetNoi',
      label: 'Thời gian bắt đầu kết nối',
      align: 'left',
    },
    {
      id: 'cheDoKT',
      label: 'Chế độ khai thác',
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
        CÔNG TRÌNH KHAI THÁC NƯỚC MẶT THUỘC TRƯỜNG HỢP PHẢI ĐĂNG KÝ
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
                <CreateCTKTSDN_PDK_NuocMat isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'CTKTSDN_PDK_NuocMat'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default CTKTSDN_PDK_NuocMat
