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
import CreateNN_MatCatSongSuoi from '../create-form/CreateNN_MatCatSongSuoi'
import ToolBar from '../mat-cat-song-suoi/toolbar'
import DeleteData from 'src/@core/components/delete-data'

const NN_MatCatSongSuoi = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataNN_MatCatSongSuoi() {
      setLoading(true)
      await getData('NN_MatCatSongSuoi/danh-sach')
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

    getDataNN_MatCatSongSuoi()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      id: 'soHieuMatCat',
      label: 'Số hiệu mặt cắt',
      align: 'left',
    },
    {
      id: 'tenSongSuoi',
      label: 'Tên sông suối',
      align: 'left',
    },
    {
      id: 'thuocLVS',
      label: 'Thuộc lưu vực sông',
      align: 'left',
    },
    {
      id: '#',
      label: 'Toạ độ bờ trái',
      align: 'left',
      children: [
        {
          id: 'xBoTrai',
          label: 'X bờ trái',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.xBoTrai == null ? "-" : row.xBoTrai}</Typography>,
        },
        {
          id: 'yBoTrai',
          label: 'Y bờ trái',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.yBoTrai == null ? "-" : row.yBoTrai}</Typography>,
        }
      ]
    },
    {
      id: '#',
      label: 'Toạ độ bờ phải',
      align: 'left',
      children: [
        {
          id: 'xBoPhai',
          label: 'X bờ phải',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.xBoPhai == null ? "-" : row.xBoPhai}</Typography>,
        },
        {
          id: 'yBoPhai',
          label: 'Y bờ phải',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.yBoPhai == null ? "-" : row.yBoPhai}</Typography>,
        }
      ]
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
      id: 'soHieuDiem',
      label: 'Số hiệu điểm',
      align: 'left',
    },
    {
      id: 'khoangCach',
      label: 'Khoảng cách (m)',
      align: 'left',
    },
    {
      id: 'caoDoDaySong',
      label: 'Cao độ đáy sông (m)',
      align: 'left',
    },
    {
      id: 'thoiGianDo',
      label: 'Thời gian đo',
      align: 'left',
    },
    {
      id: 'mucNuocSong',
      label: 'Mực nước sông (m)',
      align: 'left',
    },
    {
      id: 'donViDoDacKhaoSat',
      label: 'Đơn vị đo đạc khảo sát',
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
        THÔNG TIN DỮ LIỆU VỀ MẶT CẮT SÔNG SUỐI TỈNH QUẢNG NGÃI
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
                <CreateNN_MatCatSongSuoi isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'NN_MatCatSongSuoi'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default NN_MatCatSongSuoi
