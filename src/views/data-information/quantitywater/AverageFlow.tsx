import {
  Box,
  Grid,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import DeleteData from 'src/@core/components/delete-data'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import { getData } from 'src/api/axios'
import CreateReport5 from 'src/views/report-form/Bieumau5/CreateForm5'

const AverageFlowSF = () => { 
  const [data, setData] = useState<any[]>([])
  
  const [loading, setLoading] = useState(false)

  const [postSuccess, setPostSuccess] = useState(false)

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }

  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BieuMauSoNam/danhsach', { nam: 2024 })
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

    getDataReport1()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      id: 'tenTram',
      label: 'Tên trạm',
      align: 'left',
    },
    {
      id: '#',
      label: 'Lưu lượng(m3/s)',
      align: 'center',
      children: [
        {
          id: 'luuLuongThang1',
          label: 'I',
          align: 'center',
        },
        {
          id: 'luuLuongThang2',
          label: 'II',
          align: 'center',
        },
        {
          id: 'luuLuongThang3',
          label: ' III',
          align: 'center',
        },
        {
          id: 'luuLuongThang4',
          label: 'IV',
          align: 'center',
        },
        {
          id: 'luuLuongThang5',
          label: 'V',
          align: 'center',
        },
        {
          id: 'luuLuongThang6',
          label: ' VI',
          align: 'center',
        },
        {
          id: 'luuLuongThang7',
          label: ' VII',
          align: 'center',
        },
        {
          id: 'luuLuongThang8',
          label: ' VIII',
          align: 'center',
        },
        {
          id: 'luuLuongThang9',
          label: ' IX',
          align: 'center',
        },
        {
          id: 'luuLuongThang10',
          label: 'X',
          align: 'center',
        },
        {
          id: 'luuLuongThang11',
          label: 'XI',
          align: 'center',
        },
        {
          id: 'luuLuongThang12',
          label: ' XII',
          align: 'center',
        },
      ]
    },
    {
      id: 'luuLuongNam',
      label: 'Lưu lượng trung bình năm',
      align: 'left',
    },
    { id: 'actions', label: '#', align: 'center', pinned: 'right' }
  ]

  return (
    <Grid>
<Grid className='_text_center' >
      <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>BẢNG DÒNG CHẢY TRUNG BÌNH THÁNG, NĂM CÁC TRẠM THỦY VĂN TRÊN ĐỊA BÀN TỈNH </Typography>
    </Grid>
    <CreateReport5 isEdit={false} setPostSuccess={handlePostSuccess} />
    {loading ? (
      <BoxLoading />
    ) : (
      <TableComponent
            columns={columnsTable}
            id='BieuMau5'
            rows={data}
            loading={loading}
            pagination
            actions={(row: any) => (
              <Box display={"flex"}>
                <CreateReport5 isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'cong-trinh'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
    )}
    </Grid>
   
  )
}

export default AverageFlowSF
