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
import CreateSLDTKTSDN_NuocMat from '../../create-form/CreateSLDTKTSDN_NuocMat'
import ToolBar from '../nuoc-mat/toolbar'
import DeleteData from 'src/@core/components/delete-data'

const SLDTKTSDN_NuocMat = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataSLDTKTSDN_NuocMat() {
      setLoading(true)
      await getData('SLDTKTSDN_NuocMat/danh-sach')
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

    getDataSLDTKTSDN_NuocMat()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      id: 'tenChuHoCT',
      label: 'Tên chủ hộ/Công trình',
      align: 'left',
    },
    {
      id: 'loaiCongTrinh',
      label: 'Loại công trình',
      align: 'left',
    },
    {
      id: 'thuocLVS',
      label: 'Thuộc lưu vực sông',
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
      id: 'tenNguonNuocKhaiThac',
      label: 'Tên nguồn nước khai thác',
      align: 'left',
    },
    {
      id: 'mucDichSD',
      label: 'Mục đích sử dụng',
      align: 'left',
    },
    {
      id: 'uocTinhLuongNuocKT',
      label: 'Ước tính lượng nước khai thác (m3/ngày)',
      align: 'left',
    },
    {
      id: 'dienTichTuoi',
      label: 'Diện tích tưới (ha)',
      align: 'left',
    },
    {
      id: 'dienTichNuoiTrongThuySan',
      label: 'Diện tích nuôi trồng thủy sản (ha)',
      align: 'left',
    },
    {
      id: 'congSuatPhatDien',
      label: 'Công suất phát điện (kW)',
      align: 'left',
    },
    {
      id: 'soHoDanDuocCapNuoc',
      label: 'Số hộ dân được cấp nước',
      align: 'left',
    },
    {
      id: 'cheDoKT',
      label: 'Chế độ khai thác',
      align: 'left',
    },
    {
      id: 'filePDF',
      label: 'File phiếu điều tra (pdf)',
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
        PHIẾU ĐIỀU TRA TỔNG HỢP HIỆN TRẠNG KHAI THÁC, SỬ DỤNG NƯỚC MẶT
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
                <CreateSLDTKTSDN_NuocMat isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'SLDTKTSDN_NuocMat'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default SLDTKTSDN_NuocMat
