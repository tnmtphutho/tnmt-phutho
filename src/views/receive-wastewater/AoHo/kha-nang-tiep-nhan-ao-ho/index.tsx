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
const KhaNangTiepNhanNuocThaiAo = () => {
  //Init columnTable

  // const [mapCenter, setMapCenter] = useState([15.012172, 108.676488])
  // const [mapZoom, setMapZoom] = useState(9)
  // const [showLabel, setShowLabel] = useState(false)
  function roundToTwoDecimalPlaces(num: number): number {
    return parseFloat(num.toFixed(2))
  }

  const columnsTable: TableColumn[] = [
    { id: 'stt', label: 'STT',},
    {
      id: 'tenCT',
      label: 'Tên công trình',
        align: 'left',
      minWidth: 200,
    },
    {
      id: '#',
      label: 'Vị trí',
      align: 'left',
      minWidth: 200,
      children: [
        {
          id: 'xa',
          label: 'Xã',
          align: 'left',
        },
        {
          id: 'huyen',
          label: 'Huyện',
          align: 'left',
        }
      ]
    },
  
    {
      id: '#',
      label: 'Thông số kỹ thuật',
      align: 'left',
      children: [
        {
          id: 'flv',
          label: 'Flv (km2)',
          align: 'left',
        },
        {
          id: '#',
          label: 'F tưới	',
          children: [
            {
              id: 'ftuoi1',
              label: '',
              align: 'left',
            },
            {
              id: 'ftuoi2',
              label: '',
              align: 'left',
            }
          ]
        },
        {
          id: '#',
          label: 'W trữ',
          children: [
            {
              id: 'wtru1',
              label: '',
              align: 'left',
            },
            {
              id: 'wtru2',
              label: '',
              align: 'left',
            }
          ]
        },
        {
          id: 'tranXaLu',
          label: 'Tràn xả lũ',
          align: 'left',
        }
      ]
    },
    {
      id: 'vh',
      label: 'Vh(m3)',
        align: 'left',
      minWidth: 100,
    },
    {
      id: 'heSoFs',
      label: 'Hệ số Fs',
        align: 'left',
      minWidth: 100,
    },
    {
      id: '#',
      label: 'KẾT QUẢ PHÂN TÍCH THÔNG SỐ CHẤT LƯỢNG NƯỚC MẶT(Cnn)',
      align: 'left',
      children: [
        {
          id: 'cnnBOD',
          label: (
            <>
              BOD5 <br />
              (mg/l)
            </>
          ),
          align: 'left',
        },
        {
          id: 'cnnCOD',
          label: (
            <>
              COD <br />
              (mg/l)
            </>
          ),
          align: 'left',
        },
        {
          id: 'cnnAmoni',
          label: (
            <>
              Amoni <br />
              (mg/l)
            </>
          ),
          align: 'left',
        },
        {
          id: 'cnnTongN',
          label: (
            <>
              Tổng N <br />
              (mg/l)
            </>
          ),
          align: 'left',
        },
        {
          id: 'cnnTongP',
          label: (
            <>
              Tổng P <br />
              (mg/l)
            </>
          ),
          align: 'left',
        },
        {
          id: 'cnnTSS',
          label: (
            <>
              Tổng <br /> chất rắn <br /> lơ lửng <br /> TSS(mg/l)
            </>
          ),
          align: 'left',
        },
        {
          id: 'cnnColiform',
          label: (
            <>
              Tổng P <br /> coliform
              <br /> (MPN/100ml)
            </>
          ),
          align: 'left',
        }
      ]
    },
    {
      id: '#',
      label: 'Giá trị giới hạn thông số chất lượng nước theo tiêu chuẩn QCVN 08:2023/BTNMT (Cqc)',
      align: 'left',
      children: [
        {
          id: 'cqcBOD',
          label: (
            <>
              BOD5 <br />
              (mg/l)
            </>
          ),
          align: 'left',
        },
        {
          id: 'cqcCOD',
          label: (
            <>
              COD <br />
              (mg/l)
            </>
          ),
          align: 'left',
        },
        {
          id: 'cqcAmoni',
          label: (
            <>
              Amoni <br />
              (mg/l)
            </>
          ),
          align: 'left',
        },
        {
          id: 'cqcTongN',
          label: (
            <>
              Tổng N <br />
              (mg/l)
            </>
          ),
          align: 'left',
        },
        {
          id: 'cqcTongP',
          label: (
            <>
              Tổng P <br />
              (mg/l)
            </>
          ),
          align: 'left',
        },
        {
          id: 'cqcTSS',
          label: (
            <>
              Tổng <br /> chất rắn <br /> lơ lửng <br /> TSS(mg/l)
            </>
          ),
          align: 'left',
        },
        {
          id: 'cqcColiform',
          label: (
            <>
              Tổng P <br /> coliform
              <br /> (MPN/100ml)
            </>
          ),
          align: 'left',
        }
      ]
    },
    {
      id: '#',
      label: 'KHẢ NĂNG TIẾP NHẬN NƯỚC THẢI, SỨC CHỊU TẢI CỦA HỒ CHỨA Mtn (kg)',
      align: 'left',
      children: [
        {
          id: 'ltnBod',
          label: (
            <>
              BOD5 <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => roundToTwoDecimalPlaces(row.mtnBOD)
        },
        {
          id: 'ltnCod',
          label: (
            <>
              COD <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => roundToTwoDecimalPlaces(row.mtnCOD)
        },
        {
          id: 'ltnAmoni',
          label: (
            <>
              Amoni <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => roundToTwoDecimalPlaces(row.mtnAmoni)
        },
        {
          id: 'ltnTongN',
          label: (
            <>
              Tổng N <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => roundToTwoDecimalPlaces(row.mtnTongN)
        },
        {
          id: 'ltnTongP',
          label: (
            <>
              Tổng P <br />
              (mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => roundToTwoDecimalPlaces(row.mtnTongP)
        },
        {
          id: 'ltnTSS',
          label: (
            <>
              Tổng <br /> chất rắn <br /> lơ lửng <br /> TSS(mg/l)
            </>
          ),
          align: 'left',
          elm: (row: any) => roundToTwoDecimalPlaces(row.mtnTSS)
        },
        {
          id: 'ltnColiform',
          label: (
            <>
              Tổng P <br /> coliform
              <br /> (MPN/100ml)
            </>
          ),
          align: 'left',
          elm: (row: any) => roundToTwoDecimalPlaces(row.mtnColiform)
        }
      ]
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
      await getData('KhaNangTiepNhanNuocHo/danh-sach')
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

  // const zoomConstruction = (coords: any) => {
  //   setMapCenter(coords)
  //   setMapZoom(13)
  // }
  // const handleConsTypeChange = (data: any) => {
  //   setInitConstype(data);
  // };

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Map center={mapCenter} zoom={mapZoom} loading={false} />
      </Grid>
      <Grid xs={12} md={12}>
        <Grid className='_text_center'>
          <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>
          KHẢ NĂNG TIẾP NHẬN NƯỚC THẢI, SỨC CHỊU TẢI CỦA AO,HỒ CHỨA 
          </Typography>
        </Grid>
        <Paper elevation={3} sx={{ p: 0, height: '100%' }}>
          <TableComponent columns={columnsTable} rows={data} loading={loading} pagination />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default KhaNangTiepNhanNuocThaiAo
