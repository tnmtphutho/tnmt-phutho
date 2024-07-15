//React Imports
import React, { useState, useEffect, useRef } from 'react'

//MUI Imports
import { Box, Typography, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

//Other Imports
import ShowFilePDF from 'src/@core/components/show-file-pdf'
import dynamic from 'next/dynamic'
import { ConverterCood } from 'src/@core/components/map/convert-coord'
import CreateConstruction from '../form'
import { useRouter } from 'next/router'
import ConstructionToolBar from '../tool-bar'
import { getData } from 'src/api/axios'
import DeleteData from 'src/@core/components/delete-data'
import MapLegend from '../MapLegend'
import GetConstructionTypeId from 'src/@core/components/get-construction-type'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import { formatDate, formatNum } from 'src/@core/components/formater';

const Map = dynamic(() => import('src/@core/components/map'), { ssr: false })

// eslint-disable-next-line react-hooks/rules-of-hooks
const GroundConstruction = () => {
  const [mapCenter, setMapCenter] = useState([15.012172, 108.676488])
  const [mapZoom, setMapZoom] = useState(9)
  const [postSuccess, setPostSuccess] = useState(false)

  const [columnVisibility, setColumnVisibility] = useState<string[]>()

  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }
  const [resData, setResData] = useState([])
  const [dataFiltered, setDataFiltered] = useState([])
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const columnsTable: TableColumn[] = [
    { id: 'stt', label: 'STT', align: 'center' },
    {
      id: 'tenCT',
      label: 'Tên công trình',
      pinned: 'left',
      minWidth: 350,
      elm: (row: any) => (
        <Typography className='btnShowFilePdf' onClick={() => zoomConstruction(ConverterCood(row?.y, row?.x))}>
          {row?.tenCT}
        </Typography>
      )
    },
    {
      id: 'viTriCT',
      label: 'Địa điểm',
      align: 'left',
      minWidth: 300,
    },
    {
      id: '#',
      label: <>Toạ độ đập chính<br /> (VN2000)</>,
      minWidth: 150,
      rowspan: 2,
      elm: (row: any) => (
        <span>
          X: {row?.x}<br /> Y: {row?.y}
        </span>
      )
    },
    { id: 'mucDichKT', label: 'Mục đích khai thác', align: 'left', minWidth: 300 },
    { id: 'soLuongGiengKT', label: 'Số giếng khai thác', align: 'left', elm: (row: any) => row?.thongso?.soLuongGiengKT, },
    { id: 'cheDoKT', label: 'Chế độ khai thác', align: 'left', minWidth: 300, elm: (row: any) => row?.thongso?.cheDoKT, },
    { id: 'namBatDauVanHanh', label: 'Năm vận hành', align: 'left', elm: (row: any) => row?.thongso?.namBatDauVanHanh, },
    { id: 'sohieu', label: 'Số hiệu', align: 'left', elm: (row: any) => row?.thongso?.sohieu, },
    { id: 'thoiGianHNK', label: 'Thời gian hành nghề khoan', align: 'left' },
    {
      id: '#',
      label: 'Chiều sâu đoạn thu nước từ',
      children: [
        { id: 'chieuSauDoanThuNuocTu', label: 'Từ', align: 'left', elm: (row: any) => row?.thongso?.chieuSauDoanThuNuocTu, },
        { id: 'chieuSauDoanThuNuocDen', label: 'Đến', align: 'left', elm: (row: any) => row?.thongso?.chieuSauDoanThuNuocDen, },
      ]
    },
    {
      id: 'thongso',
      label: 'Thông số công trình',
      align: 'left',
      children: [

        {
          id: 'qKhaiThac',
          label: (
            <span>
              Q<sub>khai thác</sub> (m<sup>3</sup>/ng.đêm)
            </span>
          ),
          elm: (row: any) => row?.thongso?.qKhaiThac,
          align: 'left'
        },
        {
          id: 'hGiengKT',
          label: (
            <span>
              H<sub>giếng khai thác</sub>
            </span>
          ),
          elm: (row: any) => row?.thongso?.hGiengKT,
          align: 'left'
        },

        {
          id: 'hgieng',
          label: (
            <span>
              H<sub>giếng quan trắc</sub>
            </span>
          ),
          elm: (row: any) => row?.thongso?.hgieng,
          align: 'left'
        },
        {
          id: 'qtt',
          label: (
            <span>
              Q<sub>TT</sub>(m<sup>3</sup>/s)
            </span>
          ),
          elm: (row: any) => row?.thongso?.qtt,
          align: 'left'
        },
        {
          id: 'cheDoKT',
          label: 'Chế độ KT (giờ/ng.đêm)',
          elm: (row: any) => row?.thongso?.cheDoKT,
          align: 'left'
        },
        {
          id: 'mucNuocTinh',
          label: 'Chiều sâu MN tĩnh(m)',
          elm: (row: any) => row?.thongso?.mucNuocTinh,
          align: 'left'
        },
        {
          id: 'mucNuocDong',
          label: 'Chiều sâu MN động (m)',
          elm: (row: any) => row?.thongso?.mucNuocDong,
          align: 'left'
        },
        {
          id: 'tangChuaNuocKT',
          label: 'Tầng chứa nước KT',
          elm: (row: any) => row?.thongso?.tangChuaNuocKT,
          align: 'left'
        },
        {
          id: 'hHaThap',
          label: 'Mực nước hạ thấp',
          elm: (row: any) => row?.thongso?.hHaThap,
          align: 'left'
        },
      ]
    },

    //license
    {
      id: 'giayphep',
      label: 'Giấy phép',
      align: 'left',
      children: [
        {
          id: 'soGP',
          label: 'Số GP',
          align: 'left',
          minWidth: 200,
          elm: (row: any) => (
            <div style={{ width: '100%' }}>
              {row.giayphep.map((e: any) => (
                <div key={e.id}>
                  <ShowFilePDF
                    name={e?.soGP}
                    src={e?.fileGiayPhep}
                  />
                </div>
              ))}
            </div>
          )
        },
        {
          id: 'thoihan', label: 'Thời hạn', align: 'left', minWidth: 150, elm: (row: any) => (
            <div style={{ width: '100%' }}>
              {row.giayphep?.map((e: any) => (
                <div key={e.id}>
                  {formatDate(e.ngayKy)}
                </div>
              ))}
            </div>
          )
        }
      ]
    },
    {
      id: 'tiencq',
      label: 'Tiền cấp quyền',
      align: 'left',
      children: [
        {
          id: 'soQDTCQ',
          label: 'Số QĐ',
          align: 'left',
          minWidth: 200,
          elm: (row: any) => (
            <div style={{ width: '100%' }}>
              {row.giayphep?.map((e: any) => (
                e.tiencq.map((c: any) => (
                  <div key={c.id}>
                    <ShowFilePDF
                      name={c?.soQDTCQ}
                      src={c?.filePDF}
                    />
                  </div>
                ))
              ))}
            </div>
          )
        },
        {
          id: 'ngayKy', label: 'Ngày ký', align: 'left', minWidth: 150, elm: (row: any) => (
            <div style={{ width: '100%' }}>
              {row.giayphep?.map((e: any) => (
                e.tiencq.map((c: any) => (
                  <div key={c.id}>
                    {formatDate(c.ngayKy)}
                  </div>
                ))
              ))}
            </div>
          )
        },
        {
          id: 'tongTienCQ', label: 'Tổng tiền', align: 'left', minWidth: 150, elm: (row: any) => (
            <div style={{ width: '100%' }}>
              {row.giayphep?.map((e: any) => (
                e.tiencq.map((c: any) => (
                  <div key={c.id}>
                    {formatNum(c.tongTienCQ)}
                  </div>
                ))
              ))}
            </div>
          )
        }
      ]
    },
    { id: 'actions', label: '#', align: 'center', pinned: 'right' }
  ]

  const [paramsFilter, setParamsFilter] = useState({
    tenct: null,
    loai_ct: GetConstructionTypeId(router),
    huyen: 0,
    xa: 0,
    song: 0,
    luuvuc: 0,
    tieu_luuvuc: 0,
    tang_chuanuoc: 0,
    tochuc_canhan: 0,
    nguonnuoc_kt: null
  })

  const [initConsType, setInitConstype] = useState<any>([
    'nuocmat',
    'thuydien',
    'hochua',
    'trambom',
    'tramcapnuoc',
    'conglaynuoc',
    'nhamaynuoc'
  ])

  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    switch (paramsFilter.loai_ct) {
      case 1:
        setColumnVisibility([])
        break
      case 4:
        setColumnVisibility([
          'soLuongMayBom',
          'qThietKe',
          'qThucTe',
          'dienTichTuoiThietKe',
          'dienTichTuoiThucTe',
          'thoiGianBomTB',
          'thoiGianBomNhoNhat',
          'thoiGianBomLonNhat'
        ])
        break
      case 5:
        setColumnVisibility([
          'soLuongMayBom',
          'qThietKe',
          'qThucTe',
          'dienTichTuoiThietKe',
          'dienTichTuoiThucTe',
          'thoiGianBomTB',
          'thoiGianBomNhoNhat',
          'thoiGianBomLonNhat'
        ])
        break
      case 6:
        setColumnVisibility([
          'capCT',
          'dienTichLuuVuc',
          'muaTrungBinhNam',
          'qTrungBinhNam',
          'congSuatDamBao',
          'chieuCaoDap',
          'chieuDaiDap',
          'caoTrinhDap',
          'qmaxNM',
          'qtt',
          'qDamBao',
          'hmax',
          'hmin',
          'htoiThieu',
          'mnc',
          'mndbt',
          'mnltk',
          'mnlkt',
          'dungTichToanBo',
          'dungTichChet',
          'dungTichHuuIch',
          'qThietKe',
          'qThucTe'
        ])
        break
      case 10:
        setColumnVisibility([
          'capCT',
          'dienTichLuuVuc',
          'muaTrungBinhNam',
          'qTrungBinhNam',
          'congSuatDamBao',
          'chieuCaoDap',
          'chieuDaiDap',
          'caoTrinhDap',
          'qmaxNM',
          'qtt',
          'qDamBao',
          'hmax',
          'hmin',
          'htoiThieu',
          'mnc',
          'mndbt',
          'mnltk',
          'mnlkt',
          'dungTichToanBo',
          'dungTichChet',
          'dungTichHuuIch',
          'soLuongMayBom',
          'dienTichTuoiThietKe',
          'dienTichTuoiThucTe',
          'thoiGianBomTB',
          'thoiGianBomNhoNhat',
          'thoiGianBomLonNhat'
        ])
        break
      default:
        setColumnVisibility([
          'capCT',
          'dienTichLuuVuc',
          'muaTrungBinhNam',
          'qTrungBinhNam',
          'congSuatLM',
          'congSuatDamBao',
          'chieuCaoDap',
          'chieuDaiDap',
          'caoTrinhDap',
          'qmaxNM',
          'qtt',
          'qDamBao',
          'hmax',
          'hmin',
          'htoiThieu',
          'mnc',
          'mndbt',
          'mnltk',
          'mnlkt',
          'dungTichToanBo',
          'dungTichChet',
          'dungTichHuuIch',
          'soLuongMayBom',
          'qThietKe',
          'qThucTe',
          'dienTichTuoiThietKe',
          'dienTichTuoiThucTe',
          'thoiGianBomTB',
          'thoiGianBomNhoNhat',
          'thoiGianBomLonNhat'
        ])
        break
    }

    const getDataConstructions = async () => {
      setLoading(true)
      getData('cong-trinh/danh-sach', paramsFilter)
        .then(data => {
          if (isMounted.current) {
            setResData(data)
          }
        })
        .catch(error => {
          console.error(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    getDataConstructions()
  }, [postSuccess, paramsFilter])

  useEffect(() => {
    const filteredData = resData.filter((item: { [key: string]: any }) =>
      initConsType.some((keyword: any) =>
        item['loaiCT']?.['maLoaiCT']?.toString().toLowerCase().includes(keyword.toLowerCase())
      )
    )
    setDataFiltered(filteredData)
  }, [initConsType, resData])

  const handleFilterChange = (data: any, postSuccess: boolean | undefined) => {
    setParamsFilter(data)
    if (postSuccess !== undefined) {
      setPostSuccess(postSuccess)
    }
  }

  const zoomConstruction = (coords: any) => {
    setMapCenter(coords)
    setMapZoom(13)
  }

  const handleConsTypeChange = (data: any) => {
    setInitConstype(data)
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
          <Box className='map-legend' sx={{ background: 'white', pl: 2, zIndex: 999, height: 'auto', top: '15px' }}>
            <MapLegend onChange={handleConsTypeChange} />
          </Box>
          <Map center={mapCenter} zoom={mapZoom} mapData={dataFiltered} loading={false} />
        </Paper>
      </Grid>
      <Grid xs={12} md={12}>
        <Paper elevation={3} sx={{ p: 0, height: '100%' }}>
          <ConstructionToolBar onChange={handleFilterChange} />
          <TableComponent
            columns={columnsTable}
            rows={resData}
            loading={loading}
            columnVisibility={columnVisibility}
            pagination
            actions={(row: any) => (
              <Box display={"flex"}>
                <CreateConstruction isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'cong-trinh'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default GroundConstruction
