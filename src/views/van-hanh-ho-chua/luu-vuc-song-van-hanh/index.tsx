import Paper from '@mui/material/Paper'
import { Grid, Typography, Box, Button, } from '@mui/material'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import DeleteData from 'src/@core/components/delete-data'
import dynamic from 'next/dynamic'
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material'

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const VanHanhHoChuaLuuVucSong = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };

  const [mapCenter] = useState([15.012172, 108.676488])
  const [mapZoom] = useState(9)
  const [selected, setSelected] = useState(true)

  useEffect(() => {
    async function getDataVHHC_LuuVucSong() {
      setLoading(true)

      //API de lay du lieu tu sql: 'VHHC_LuuVucSong/danh-sach'
      await getData('VHHC_LuuVucSong/danh-sach')
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

    getDataVHHC_LuuVucSong()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      //Id là trường dữ liệu lưu trong csdl
      id: 'luuVucSong',
      label: 'Lưu vực sông',
      align: 'left',
      children: [{ id: '#', label: '(1)', align: 'left' }]
    },
    {
      //Id là trường dữ liệu lưu trong csdl
      id: 'dienTichLuuVuc',
      label: 'Diện tích lưu vực (km2)',
      align: 'left',
      children: [{ id: '#', label: '(2)', align: 'left' }]
    },
    {
      id: 'chieuDaiSongChinh',
      label: 'Chiều dài sông chính (km)',
      align: 'left',
      children: [{ id: '#', label: '(3)', align: 'left' }]
    },
    {
      id: 'banDo',
      label: 'Bản đồ',
      align: 'left',
      children: [{ id: '#', label: '(4)', align: 'left' }]
    },
    {
      id: 'soDoCacCT',
      label: 'Sơ đồ các công trình trên lưu vực',
      align: 'left',
      children: [{ id: '#', label: '(5)', align: 'left' }]
    },
    {
      id: 'soQuyTrinh',
      label: 'Số quy trình',
      align: 'left',
      children: [{ id: '#', label: '(6)', align: 'left' }]
    },
    {
      id: 'tepDinhKem',
      label: 'Tệp đính kèm',
      align: 'left',
      children: [{ id: '#', label: '(7)', align: 'left' }]
    },


    {
      id: 'ghiChu',
      label: 'Ghi chú',
      align: 'left',
      children: [{ id: '#', label: '(8)', align: 'left' }]
    },
    { align: 'center', id: 'actions', label: 'Thao tác', minWidth: 150, rowspan: 3 }
  ]

  return (
    <Paper sx={{ px: 8, py: 4 }}>
      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h6'>
          THÔNG TIN DỮ LIỆU VỀ LƯU VỰC SÔNG TỈNH QUẢNG NGÃI
        </Typography>
      </Grid>
      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <Grid xs={12} md={12} sx={{ height: 'calc(50vh - 82px)', mb: 4 }}>
            <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
              <Button
                className='toggle-legend'
                variant='outlined'
                onClick={() => {
                  setSelected(!selected)
                }}
              >
                {selected ? <KeyboardDoubleArrowDown /> : <KeyboardDoubleArrowUp />}
              </Button>
              <Map center={mapCenter} zoom={mapZoom} showLabel={false} mapData={null} loading={false} />
            </Paper>
          </Grid>
          <TableComponent
            columns={columnsTable}
            id='VHHC_LuuVucSong'
            rows={data}
            loading={loading}
            pagination
            actions={(row: any) => (
              <Box >
                <DeleteData url={'VHHC_LuuVucSong'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}


    </Paper>
  )
}

export default VanHanhHoChuaLuuVucSong
