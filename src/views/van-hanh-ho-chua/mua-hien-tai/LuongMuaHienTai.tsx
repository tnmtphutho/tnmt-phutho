import Paper from '@mui/material/Paper'
import { Grid, Box, Button, } from '@mui/material'

import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'

import TableComponent, { TableColumn } from 'src/@core/components/table'

import DeleteData from 'src/@core/components/delete-data'
import ToolBar from './toolbar'

import dynamic from 'next/dynamic'
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material'
import React from 'react'
import ViewAmountRain1HourData from './form/Mua1H'

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const getLabelWithDate = (hour:number) => {
  const today = new Date();
  const date = today;
  if (hour < 7) {
    date.setDate(today.getDate() + 1);
  }
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');

  return (
    <>
      {hour}h <br /> ({day}/{month})
    </>
  );
};

const LuongMuaHienTai = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)


  const [mapCenter] = useState([15.012172, 108.676488])
  const [mapZoom] = useState(9)
  const [selected, setSelected] = React.useState(true)


  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataDuLieuTram() {
      setLoading(true)
      await getData('DuLieuTram/danh-sach')
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

    getDataDuLieuTram()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      id: 'tenTram',
      label: 'Trạm đo mưa',
      align: 'left',
      minWidth: 120,
      pinned: 'left'
    },
    {
      id: '#',
      label: 'Lượng mưa (mm)',
      align: 'left',
      children: [
        { id: '7h', label: getLabelWithDate(7), align: 'center', },
        { id: '8h', label: getLabelWithDate(8), align: 'center', },
        { id: '9h', label: getLabelWithDate(9), align: 'center', },
        { id: '10h', label: getLabelWithDate(10), align: 'center', },
        { id: '11h', label: getLabelWithDate(11), align: 'center', },
        { id: '12h', label: getLabelWithDate(12), align: 'center', },
        { id: '13h', label: getLabelWithDate(13), align: 'center', },
        { id: '14h', label: getLabelWithDate(14), align: 'center', },
        { id: '15h', label: getLabelWithDate(15), align: 'center', },
        { id: '16h', label: getLabelWithDate(16), align: 'center', },
        { id: '17h', label: getLabelWithDate(17), align: 'center', },
        { id: '18h', label: getLabelWithDate(18), align: 'center', },
        { id: '19h', label: getLabelWithDate(19), align: 'center', },
        { id: '20h', label: getLabelWithDate(20), align: 'center', },
        { id: '21h', label: getLabelWithDate(21), align: 'center', },
        { id: '22h', label: getLabelWithDate(22), align: 'center', },
        { id: '23h', label: getLabelWithDate(23), align: 'center', },
        { id: '24h', label: getLabelWithDate(24), align: 'center', },
        { id: '1h', label: getLabelWithDate(1), align: 'center', },
        { id: '2h', label: getLabelWithDate(2), align: 'center', },
        { id: '3h', label: getLabelWithDate(3), align: 'center', },
        { id: '4h', label: getLabelWithDate(4), align: 'center', },
        { id: '5h', label: getLabelWithDate(5), align: 'center', },
        { id: '6h', label: getLabelWithDate(6), align: 'center', },
      ]
    },
    { align: 'center', id: 'actions', label: 'Thao tác', minWidth: 150 }
  ]

  return (
    <Paper sx={{ p: 8 }}>

      <Grid xs={12} md={12} sx={{ height: 'calc(50vh - 82px)' }}>
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
      <Grid className='_text_center'>

      </Grid>
      {/* <CreateReport2 isEdit={false} setPostSuccess={handlePostSuccess}/> */}
      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <ToolBar tableId='luongmuahientai' />
          <TableComponent
            id="luongmuahientai"
            columns={columnsTable}
            rows={data}
            loading={loading}
            pagination
            actions={(row: any) => (
              <Box >
                <DeleteData url={'DuLieuTram'} data={row} setPostSuccess={handlePostSuccess} />
                <Button>
                  <ViewAmountRain1HourData data={row} />
                </Button>
              </Box>
            )}
          />
        </Grid>
      )}


    </Paper>
  )
}

export default LuongMuaHienTai
