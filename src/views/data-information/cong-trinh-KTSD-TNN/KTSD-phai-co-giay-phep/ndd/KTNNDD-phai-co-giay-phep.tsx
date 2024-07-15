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
import ToolBar from '../../../cong-trinh-KTSD-TNN/KTSD-phai-co-giay-phep/ndd/toolbar'
import CreateCTKTSDN_PCGP_NDD from '../../../create-form/CreateCTKTSDN_PCGP_NDD'

const CTKTSDN_PCGP_NDD = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataCTKTSDN_PCGP_NDD() {
      setLoading(true)
      await getData('CTKTSDN_PCGP_NDD/danh-sach')
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

    getDataCTKTSDN_PCGP_NDD()
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
      id: 'tenTCCN',
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
      id: 'luuVuc',
      label: 'Lưu vực',
      align: 'left',
    },
    {
      id: 'tangChuaNuoc',
      label: 'Tầng chứa nước',
      align: 'left',
    },
    {
      id: 'soGieng',
      label: 'Số giếng',
      align: 'left',
    },
    {
      id: 'chieuSauCacGieng',
      label: 'Chiều sâu các giếng (m)',
      align: 'left',
    },
    {
      id: 'toaDoCacGieng',
      label: 'Toạ độ các giếng',
      align: 'left',
    },
    {
      id: 'mucDichKT',
      label: 'Mục đích khai thác',
      align: 'left',
    },
    {
      id: 'soToMay',
      label: 'Số tổ máy',
      align: 'left',
    },
    {
      id: 'tongLuuLuongKT',
      label: 'Tổng lưu lượng khai thác (m3/s)',
      align: 'left',
    },
    {
      id: 'cheDoKT',
      label: 'Chế độ khai thác',
      align: 'left',
    },
    {
      id: 'phuongThucKT',
      label: 'Phương thức khai thác',
      align: 'left',
    },
    {
      id: 'thoiGianVanHanh',
      label: 'Thời gian vận hành',
      align: 'left',
    },
    {
      id: 'tinhHinhCapGP',
      label: 'Tình hình cấp GP',
      align: 'left',
    },
    {
      id: 'soGP',
      label: 'Số GP',
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
      id: 'thoiGianKetThuc',
      label: 'Thời gian kết thúc',
      align: 'left',
    },
    {
      id: 'idCongTrinh',
      label: 'ID công trình',
      align: 'left',
    },
    {
      id: 'thoiGianBatDauKetNoi',
      label: 'Thời gian bắt đầu kết nối',
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
        CÔNG TRÌNH KHAI THÁC NƯỚC BIỂN THUỘC TRƯỜNG HỢP PHẢI CÓ GIẤY PHÉP
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
                <CreateCTKTSDN_PCGP_NDD isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'CTKTSDN_PCGP_NDD'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default CTKTSDN_PCGP_NDD
