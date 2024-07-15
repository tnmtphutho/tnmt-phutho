//React Imports
import React, { useEffect } from 'react'
import { useState } from 'react'

//MUI Imports
//import { Box, Paper, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

//import dynamic from 'next/dynamic'
import dynamic from 'next/dynamic'
import { getData } from 'src/api/axios'
import { Paper, Typography } from '@mui/material'
import TableComponent, { TableColumn } from 'src/@core/components/table'

const Map = dynamic(() => import('src/@core/components/map'), { ssr: false })

// eslint-disable-next-line react-hooks/rules-of-hooks
const TaiLuongONhiem = () => {
  //Init columnTable

  // const [mapCenter, setMapCenter] = useState([15.012172, 108.676488])
  // const [mapZoom, setMapZoom] = useState(9)
  // const [showLabel, setShowLabel] = useState(false)
  function roundToTwoDecimalPlaces(num: number): number {
    return parseFloat(num?.toFixed(2))
  }
  const columnsTable: TableColumn[] = [
    { id: 'stt', label: 'STT' },
    { id: 'luuVucSong', label: 'Lưu vực sông', align: 'left', minWidth: 200 },

    { id: 'song', label: 'Sông', align: 'left', minWidth: 200 },
    {
      id: 'tenDoanSong',
      label: 'Tên đoạn sông',
      align: 'left',
      minWidth: 150
    },
    {
      id: 'phanDoan',
      label: 'Phân đoạn sông',
      align: 'left',
      minWidth: 200
    },
    {
      id: 'chieuDai',
      label: (
        <>
          Chiều dài <br /> đoạn sông <br /> (km)
        </>
      ),
      align: 'left',
      minWidth: 100
    },

    {
      id: 'duLieuNguonNuocNhan',
      label: (
        <>
          TẢI LƯỢNG TỐI ĐA CỦA THÔNG SỐ CHẤT LƯỢNG NƯỚC MẶT
          <br />
          Ltd (kg/ngày)
        </>
      ),
      align: 'left',
      children: [
        {
          id: 'ltdBOD',
          label: (
            <>
              BOD5 <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => <Typography className='text_table'>{row.duLieuNguonNuocNhan.ltdBOD}</Typography>
        },
        {
          id: 'ltdCOD',
          label: (
            <>
              COD <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => <Typography className='text_table'>{row.duLieuNguonNuocNhan.ltdCOD}</Typography>
        },
        {
          id: 'ltdAmoni',
          label: (
            <>
              Amoni <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => <Typography className='text_table'>{row.duLieuNguonNuocNhan.ltdAmoni}</Typography>
        },
        {
          id: 'ltdTongN',
          label: (
            <>
              Tổng N <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => <Typography className='text_table'>{row.duLieuNguonNuocNhan.ltdTongN}</Typography>
        },
        {
          id: 'ltdTongP',
          label: (
            <>
              Tổng P <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => <Typography className='text_table'>{row.duLieuNguonNuocNhan.ltdTongP}</Typography>
        },
        {
          id: 'ltdTSS',
          label: (
            <>
              Tổng <br /> chất rắn <br /> lơ lửng <br /> TSS(mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => <Typography className='text_table'>{row.duLieuNguonNuocNhan.ltdTSS}</Typography>
        },
        {
          id: 'ltdColiform',
          label: (
            <>
              Tổng P <br /> coliform
              <br /> (MPN/100ml)
            </>
          ),
          align: 'left',
          elm: (row: any) => <Typography className='text_table'>{row.duLieuNguonNuocNhan.ltdColiform}</Typography>
        }
      ]
    },

    //lnn
    {
      id: 'duLieuNguonNuocNhan',
      label: (
        <>
          {' '}
          TẢI LƯỢNG Ô NHIỄM NGUỒN NƯỚC HIỆN CÓ <br />
          Lnn (kg/ngày)
        </>
      ),
      align: 'left',
      children: [
        {
          id: 'lnnBOD',
          label: (
            <>
              BOD5 <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => <Typography className='text_table'>{row.duLieuNguonNuocNhan.lnnBOD}</Typography>
        },
        {
          id: 'lnnCOD',
          label: (
            <>
              COD <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => <Typography className='text_table'>{row.duLieuNguonNuocNhan.lnnCOD}</Typography>
        },
        {
          id: 'lnnAmoni',
          label: (
            <>
              Amoni <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => <Typography className='text_table'>{row.duLieuNguonNuocNhan.lnnAmoni}</Typography>
        },
        {
          id: 'lnnTongN',
          label: (
            <>
              Tổng N <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => <Typography className='text_table'>{row.duLieuNguonNuocNhan.lnnTongN}</Typography>
        },
        {
          id: 'lnnTongP',
          label: (
            <>
              Tổng P <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => <Typography className='text_table'>{row.duLieuNguonNuocNhan.lnnTongP}</Typography>
        },
        {
          id: 'lnnTSS',
          label: (
            <>
              Tổng <br /> chất rắn <br /> lơ lửng <br /> TSS(mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => <Typography className='text_table'>{row.duLieuNguonNuocNhan.lnnTSS}</Typography>
        },
        {
          id: 'lnnColiform',
          label: (
            <>
              Tổng P <br /> coliform
              <br /> (MPN/100ml)
            </>
          ),
          align: 'left',
          elm: (row: any) => <Typography className='text_table'>{row.duLieuNguonNuocNhan.lnnColiform}</Typography>
        }
      ]
    },

    {
      id: '#',
      label: (
        <>
          TỔNG TẢI LƯỢNG Ô NHIỄM CỦA NGUỒN NƯỚC THẢI <br />
          Lt (kg/ngày)
        </>
      ),
      align: 'left',
      children: [
        {
          id: 'ltBod',
          label: (
            <>
              BOD5 <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => roundToTwoDecimalPlaces(row.ltBod)
        },
        {
          id: 'ltCod',
          label: (
            <>
              COD <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => roundToTwoDecimalPlaces(row.ltCod)
        },
        {
          id: 'ltAmoni',
          label: (
            <>
              Amoni <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => roundToTwoDecimalPlaces(row.ltAmoni)
        },
        {
          id: 'ltTongN',
          label: (
            <>
              Tổng N <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => roundToTwoDecimalPlaces(row.ltTongN)
        },
        {
          id: 'ltTongP',
          label: (
            <>
              Tổng P <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => roundToTwoDecimalPlaces(row.ltTongP)
        },
        {
          id: 'ltTSS',
          label: (
            <>
              Tổng <br /> chất rắn <br /> lơ lửng <br /> TSS(mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => roundToTwoDecimalPlaces(row.ltTSS)
        },
        {
          id: 'ltColiform',
          label: (
            <>
              Tổng  <br /> coliform
              <br /> (MPN/100ml)
            </>
          ),
          align: 'left',
          elm: (row: any) => roundToTwoDecimalPlaces(row.ltColiform)
        }
      ]
    },
    {
      id: 'heSoFS',
      label: 'Hệ số an toàn ',
      align: 'left'
    },
    {
      id: 'ghiChu',
      label: 'Ghi chú',
      align: 'left'
    }
  ]

  const [mapCenter] = useState([15.012172, 108.676488])
  const [mapZoom] = useState(9)
  const [data, setData] = useState([])
  console.log(data)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('PhanDoanSong/tai-luong')
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
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Map center={mapCenter} zoom={mapZoom} loading={false} />
      </Grid>
      <Grid xs={12} md={12}>
        <Paper elevation={3} sx={{ p: 0, height: '100%' }}>
          <TableComponent columns={columnsTable} rows={data} loading={loading} pagination />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default TaiLuongONhiem
