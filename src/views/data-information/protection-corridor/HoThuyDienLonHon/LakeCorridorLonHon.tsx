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
import ToolBar from '../../protection-corridor/HoThuyDienLonHon/toolbar'
import CreateNN_HanhLangBaoVeNN_HoThuyDienLonHon from '../../create-form/CreateNN_HanhlangBaoVeNN_HoThuyDienLonHon'

const NN_HanhLangBaoVeNN_HoThuyLoiNhieuHon1m3 = () => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataNN_HanhLangBaoVeNN_HoThuyLoiNhieuHon1m3() {
      setLoading(true)
      await getData('NN_HanhLangBaoVeNN_HoThuyLoiNhieuHon1m3/danh-sach')
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

    getDataNN_HanhLangBaoVeNN_HoThuyLoiNhieuHon1m3()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      id: 'ten',
      label: 'Tên',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'loaiHo',
      label: 'Loại hồ',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'xaPhuongTT',
      label: 'Xã/Phường/Thị trấn',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'diaPhanHanhChinh',
      label: 'Địa phận hành chính',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'huyenTP',
      label: 'Huyện/Thành phố',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'dungTichHo106m3',
      label: 'Dung tích hồ',
      align: 'left',
    },
    {
      id: 'phamViHanhLang',
      label: 'Phạm vi hành lang',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'thuocDienCamMocHanhLang',
      label: 'Thuộc diện cắm mốc hành lang',
      align: 'left',
    },
    {align: 'center', id: 'actions', label: 'Thao tác', minWidth: 150, rowspan: 3 }
  ]

  return (
    <Paper sx={{ p: 8 }}>
      <Header />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h6'>
        Thống kê hành lang bảo vệ nguồn nước đối với hồ chứa lớn hơn 1 triệu m3 tỉnh Quảng Ngãi
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
                <CreateNN_HanhLangBaoVeNN_HoThuyDienLonHon isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'NN_HanhLangBaoVeNN_HoThuyLoiNhieuHon1m3'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default NN_HanhLangBaoVeNN_HoThuyLoiNhieuHon1m3
