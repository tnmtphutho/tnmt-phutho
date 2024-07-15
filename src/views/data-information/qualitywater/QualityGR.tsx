import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp, Search } from '@mui/icons-material'
import {
  Box,
  Button,
  Grid,
  Paper,
  SelectChangeEvent,
  Toolbar,
} from '@mui/material'
import React, { ChangeEvent, useEffect } from 'react'
import { useState } from 'react'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import { getData } from 'src/api/axios'

import dynamic from 'next/dynamic'
import BoxLoading from 'src/@core/components/box-loading'
import DeleteData from 'src/@core/components/delete-data'
import ExportTableToExcel from 'src/@core/components/export-excel/export-csv'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CreateCL_NuocMat from '../create-form/CreateCL_NuocMat'

//khai bao map
const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const QualityGround = () => {
  // Gọi dữ liệu lên bảng gọi API về
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)


  const [mapCenter] = useState([15.012172, 108.676488])
  const [mapZoom] = useState(9)
  const [selected, setSelected] = React.useState(true)

  const [paramsFilter, setParamsFilter] = useState({
    tu_nam: new Date().getFullYear() - 5,
    den_nam: new Date().getFullYear(),
  });


  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataNN_LuuVucSong() {
      setLoading(true)
      await getData(`CLN_NDD/danh-sach`, paramsFilter)

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

    getDataNN_LuuVucSong()
  }, [postSuccess, paramsFilter])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
    },
    {
      id: 'thoiGianQuanTrac',
      label: (<>Thời gian <br /> quan trắc</>),
      minWidth: 100,
    },
    {
      id: 'luuVucSong',
      label: <>Lưu vực sông <br /> Vùng/Tỉnh</>,
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'tangChuaNuoc',
      label: 'Tầng chứa nước',
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'viTriQuanTrac',
      label: <>Vị trí <br /> quan trắc</>,
      align: 'left',
      minWidth: 200,
    },
    {
      id: 'kyHieuDiemQuanTrac',
      label: <>Ký hiệu điểm<br /> quan trắc</>,
      align: 'left',
      minWidth: 200,
    },
    {
      id: '#',
      label: (<>Tọa độ quan trắc <br /> (WGS 84)</>),
      align: 'left',
      children: [
        {
          id: 'x',
          label: 'Vĩ độ',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'y',
          label: 'Kinh độ',
          align: 'left',
          minWidth: 70,
        }
      ]
    },
    {
      id: '#',
      label: <>Kết quả phân tích <br /> chỉ tiêu pH [-]</>,
      align: 'left',
      children: [
        {
          id: 'phDot1',
          label: 'Đợt 1',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'phDot2',
          label: 'Đợt 2',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'phDot3',
          label: 'Đợt 3',
          align: 'left',
          minWidth: 70,
        },
      ]
    },
    {
      id: '#',
      label: <>Kết quả phân tích <br /> chỉ tiêu Tổng Coliform [mg/l]</>,
      align: 'left',
      children: [
        {
          id: 'coliformDot1',
          label: 'Đợt 1',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'coliformDot2',
          label: 'Đợt 2',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'coliformDot3',
          label: 'Đợt 3',
          align: 'left',
          minWidth: 70,
        },
      ]
    },
    {
      id: '#',
      label: <>Kết quả phân tích <br /> chỉ tiêu Nitrate (NO3- tính theo <br/> Nitơ) [mg/l]</>,
      align: 'left',
      children: [
        {
          id: 'nitrateDot1',
          label: 'Đợt 1',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'nitrateDot2',
          label: 'Đợt 2',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'nitrateDot3',
          label: 'Đợt 3',
          align: 'left',
          minWidth: 70,
        },
      ]
    },

    {
      id: '#',
      label: <>Kết quả phân tích <br /> chỉ tiêu Amoni (NH4+ tính theo <br/> Nitơ) [mg/l]</>,
      align: 'left',
      children: [
        {
          id: 'amoniDot1',
          label: 'Đợt 1',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'amoniDot2',
          label: 'Đợt 2',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'amoniDot3',
          label: 'Đợt 3',
          align: 'left',
          minWidth: 70,
        },
      ]
    },
    {
      id: '#',
      label:<>Kết quả phân tích <br />chỉ tiêu Tổng chất rắn hòa tan <br/>(TDS) [mg/l]</>,
      align: 'left',
      children: [
        {
          id: 'tdsDot1',
          label: 'Đợt 1',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'tdsDot2',
          label: 'Đợt 2',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'tdsDot3',
          label: 'Đợt 3',
          align: 'left',
          minWidth: 70,
        },
      ]
    },
    {
      id: '#',
      label: <>Kết quả phân tích <br />chỉ tiêu Độ cứng (tính theo CaCO3) [mg/l] </>,
      align: 'left',
      children: [
        {
          id: 'doCungDot1',
          label: 'Đợt 1',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'doCungDot2',
          label: 'Đợt 2',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'doCungDot3',
          label: 'Đợt 3',
          align: 'left',
          minWidth: 70,
        },
      ]
    },
    {
      id: '#',
      label: <>Kết quả phân tích <br />chỉ tiêu Arsenic (As) [mg/l]</>,
      align: 'left',
      children: [
        {
          id: 'arsenicDot1',
          label: 'Đợt 1',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'arsenicDot2',
          label: 'Đợt 2',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'arsenicDot3',
          label: 'Đợt 3',
          align: 'left',
          minWidth: 70,
        },
      ]
    },
    {
      id: '#',
      label: <>Kết quả phân tích <br />chỉ tiêu Chloride (Cl-) [mg/l]</>,
      align: 'left',
      children: [
        {
          id: 'chlorideDot1',
          label: 'Đợt 1',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'chlorideDot2',
          label: 'Đợt 2',
          align: 'left',
          minWidth: 70,
        },
        {
          id: 'chlorideDot3',
          label: 'Đợt 3',
          align: 'left',
          minWidth: 70,
        },
      ]
    },
    {
      align: 'center', id: 'actions', label: '#',
    }
  ]



  const handleChange = (event: SelectChangeEvent | ChangeEvent<HTMLInputElement> | null) => (column: string) => {
    if (event) {
      if (event?.target) {
        setParamsFilter({ ...paramsFilter, [column]: event.target.value });
      } else {
        setParamsFilter({ ...paramsFilter, [column]: event });
      }
    }

  };

  return (
    <Paper sx={{ p: 8 }}>
      <Grid sx={{ height: 'calc(50vh - 82px)' }}>
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
          <Map center={mapCenter} zoom={mapZoom} showLabel={false} mapData={data} loading={false} />
        </Paper>
      </Grid>
      <Grid className='_text_center'>

      </Grid>
      {
        loading ? (
          <BoxLoading />
        ) : (
          <Grid className='_text_center' sx={{ mt: 3 }}>
            <Toolbar variant='dense'>
              <Grid container spacing={2} sx={{ paddingY: 3 }} className='_flexEnd '>
                <Grid item xs={12} md={2} py={0}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Từ năm'
                      views={["year"]}
                      value={dayjs(new Date(paramsFilter.tu_nam, 1, 1))}
                      onChange={(newVal: any) => handleChange(newVal.year())('tu_nam')}
                      slotProps={{ textField: { size: 'small', fullWidth: true, required: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={2} py={0}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Đến năm'
                      views={["year"]}
                      value={dayjs(new Date(paramsFilter.den_nam, 1, 1))}
                      onChange={(newVal: any) => handleChange(newVal.year())('den_nam')}
                      slotProps={{ textField: { size: 'small', fullWidth: true, required: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6} md={1.5} py={0}>
                  <Button
                    variant='outlined'
                    size='small'
                    fullWidth
                    sx={{ borderRadius: 0 }}
                    startIcon={<Search />}
                  >
                    Tìm kiếm
                  </Button>
                </Grid>
                <Grid item xs={6} md={1.5} py={0}>
                  <ExportTableToExcel tableId={'chatluong_nuocduoidat'} filename={'chatluong_nuocduoidat'} />
                </Grid>
                <Grid item xs={6} md={1.5} py={0}>
                  <CreateCL_NuocMat isEdit={false} setPostSuccess={handlePostSuccess} />
                </Grid>
              </Grid>
            </Toolbar>
            <TableComponent
              columns={columnsTable}
              rows={data}
              id='chatluong_nuocduoidat'
              loading={loading}
              pagination
              actions={(row: any) => (
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} >
                  <DeleteData url={'CLN_NDD'} data={row} setPostSuccess={handlePostSuccess} />
                  <CreateCL_NuocMat data={row} isEdit={true} setPostSuccess={handlePostSuccess} />
                </Box>
              )}
            />
          </Grid>
        )
      }


    </Paper >
  )
}

export default QualityGround
