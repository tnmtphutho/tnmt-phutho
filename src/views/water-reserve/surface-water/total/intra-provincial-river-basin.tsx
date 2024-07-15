import Paper from '@mui/material/Paper'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import Header from '../../header'
import Footer from '../../footer'
import { Delete, Edit } from '@mui/icons-material'

const IntraProvincialRiverBasin = () => {
  const [data] = useState<any[]>([])
  const [loading] = useState(false)

  const columnsTable: TableColumn[] = [
    { id: 'stt', label: 'STT', rowspan: 2 },
    {
      id: 'tenCT',
      label: 'Lưu vực sông',
      align: 'left',
      rowspan: 2
    },
    {
      id: 'nguonnuoc_kt',
      label: 'Năm',
      align: 'left',
      rowspan: 2,
    },
    {
      id: 'thuoc_song',
      label: 'Vị trí ',
      align: 'left',
      children: [
        { id: '#3.1', label: 'Xã', align: 'left', },
        { id: '#3.2', label: 'Huyện', align: 'left', }
      ]
    },
    {
      id: 'thuoc_song',
      label: 'Tháng',
      align: 'left',
      children: [
        { id: '#4.1', label: '1', align: 'left', },
        { id: '#4.2', label: '2', align: 'left', },
        { id: '#4.3', label: '3', align: 'left', },
        { id: '#4.4', label: '4', align: 'left', },
        { id: '#4.5', label: '5', align: 'left', },
        { id: '#4.6', label: '6', align: 'left', },
        { id: '#4.7', label: '7', align: 'left', },
        { id: '#4.8', label: '8', align: 'left', },
        { id: '#4.9', label: '9', align: 'left', },
        { id: '#4.10', label: '10', align: 'left', },
        { id: '#4.11', label: '11', align: 'left', },
        { id: '#4.12', label: '12', align: 'left', }
      ]
    },
    {
      id: 'nguonnuoc_kt',
      label: 'Mùa lũ',
      align: 'left',
      rowspan: 2,
    },
    {
      id: 'nguonnuoc_kt',
      label: 'Mùa kiệt',
      align: 'left',
      rowspan: 2,
    },
    {
      id: 'nguonnuoc_kt',
      label: 'Cả năm',
      align: 'left',
      rowspan: 2,
    },
    { id: 'actions', label: '#', rowspan: 2 },
  ]

  return (
    <Paper sx={{ p: 8 }}>

      <Header />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h6'>
          BÁO CÁO
        </Typography>
        <Typography className='font-weight-bold' variant='body1' textTransform={'uppercase'}>
          Kiểm kê tổng lượng dòng chảy theo lưu vực sông nội tỉnh 
        </Typography>
      </Grid>
      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <TableComponent
            columns={columnsTable}
            rows={data}
            loading={loading}
            pagination

            actions={() => (
              <Box display={"flex"}>
                <IconButton>
                  <Edit />
                </IconButton>
                <IconButton>
                  <Delete />
                </IconButton>
              </Box>
            )}
          />

        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default IntraProvincialRiverBasin
