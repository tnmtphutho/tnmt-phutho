//React Imports
import React, { useState, useEffect, useRef } from 'react'

//MUI Imports
import { Box, Typography, Paper, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
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
const SurfaceConstruction = () => {
  const [mapCenter, setMapCenter] = useState([15.012172, 108.676488])
  const [mapZoom, setMapZoom] = useState(9)
  const [showLabel, setShowLabel] = useState(false)
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
    { id: 'stt', label: 'STT' },
    {
      id: 'tenCT',
      label: 'Tên công trình',
      rowspan: 2,
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
      rowspan: 2,
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
    { id: 'nguonNuocKT', label: 'Nguồn nước khai thác', rowspan: 2, align: 'left', minWidth: 200 },
    { id: 'phuongThucKT', label: 'Phương thức khai thác', rowspan: 2, align: 'left', minWidth: 600 },
    { id: 'cheDoKT', label: 'Chế độ khai thác', rowspan: 2, align: 'left', minWidth: 200, elm: (row: any) => (<span>{row?.thongso?.cheDoKT}</span>) },
    { id: 'mucDichKT', label: 'Mục đích khai thác', rowspan: 2, align: 'left', minWidth: 200, elm: (row: any) => (<span>{row?.mucDichKT}</span>) },
    { id: 'namBatDauVanHanh', label: 'Năm vận hành', rowspan: 2, align: 'left' },
    { id: 'tieuvung_quyhoach', label: 'Tiểu vùng quy hoạch', rowspan: 2, align: 'left', minWidth: 150 },
    {
      id: 'thongso',
      label: 'Thông số công trình',
      align: 'left',
      children: [
        { id: 'capCT', label: 'Cấp công trình', align: 'left', elm: (row: any) => row?.thongso?.capCT },
        { id: 'dienTichLuuVuc', label: 'Diện tích lưu vực', align: 'left', elm: (row: any) => row?.thongso?.dienTichLuuVuc },
        {
          id: 'muaTrungBinhNam',
          label: (
            <span>
              X <sub>TB năm</sub> (m)
            </span>
          ),
          elm: (row: any) => row?.thongso?.muaTrungBinhNam,
          align: 'left'
        },
        {
          id: 'qTrungBinhNam',
          label: (
            <span>
              Q <sub>TB năm</sub>(m3/s)
            </span>
          ),
          elm: (row: any) => row?.thongso?.qTrungBinhNam,
          align: 'left'
        },
        { id: 'congSuatLM', label: 'Công suất lắp máy', align: 'left', elm: (row: any) => row?.thongso?.congSuatLM, },
        { id: 'congSuatDamBao', label: 'Công suất đảm bảo', align: 'left', elm: (row: any) => row?.thongso?.congSuatDamBao, },
        { id: 'chieuCaoDap', label: 'Chiều cao đập', align: 'left', elm: (row: any) => row?.thongso?.chieuCaoDap, },
        { id: 'chieuDaiDap', label: 'Chiều dài đập', align: 'left', elm: (row: any) => row?.thongso?.chieuDaiDap, },
        { id: 'caoTrinhDap', label: 'Cao trình đập', align: 'left', elm: (row: any) => row?.thongso?.caoTrinhDap, },
        {
          id: 'qmaxNM',
          label: (
            <span>
              Q<sub>max</sub>(m<sup>3</sup>/s)
            </span>
          ),
          elm: (row: any) => row?.thongso?.qmaxNM,
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
          id: 'qDamBao',
          label: (
            <span>
              Q<sub>đảm bảo</sub>(m<sup>3</sup>/s)
            </span>
          ),
          elm: (row: any) => row?.thongso?.qDamBao,
          align: 'left'
        },
        {
          id: 'hmax',
          label: (
            <span>
              H<sub>max</sub> (m)
            </span>
          ),
          elm: (row: any) => row?.thongso?.hmax,
          align: 'left'
        },
        {
          id: 'hmin',
          label: (
            <span>
              H<sub>min</sub> (m)
            </span>
          ),
          elm: (row: any) => row?.thongso?.hmin,
          align: 'left'
        },
        {
          id: 'htoiThieu',
          label: (
            <span>
              H<sub>TT</sub> (m)
            </span>
          ),
          elm: (row: any) => row?.thongso?.htoiThieu,
          align: 'left'
        },
        { id: 'mnc', label: 'MNC', align: 'left', elm: (row: any) => row?.thongso?.mnc, },
        { id: 'mndbt', label: 'MNDBT(m)', align: 'left', elm: (row: any) => row?.thongso?.mndbt, },
        { id: 'mnltk', label: 'MNLTK(m)', align: 'left', elm: (row: any) => row?.thongso?.mnltk, },
        { id: 'mnlkt', label: 'MNLKT(m)', align: 'left', elm: (row: any) => row?.thongso?.mnlkt, },
        {
          id: 'dungTichToanBo',
          label: (
            <span>
              W<sub>toàn bộ</sub>(triệu m<sup>3</sup>)
            </span>
          ),
          elm: (row: any) => row?.thongso?.dungTichToanBo,
          align: 'left'
        },
        {
          id: 'dungTichChet',
          label: (
            <span>
              W<sub> chết </sub>(triệu m<sup>3</sup>)
            </span>
          ),
          elm: (row: any) => row?.thongso?.dungTichChet,
          align: 'left'
        },
        {
          id: 'dungTichHuuIch',
          label: (
            <span>
              W<sub>hữu ích</sub>(triệu m<sup>3</sup>)
            </span>
          ),
          elm: (row: any) => row?.thongso?.dungTichHuuIch,
          align: 'left'
        },
        {
          id: 'soLuongMayBom',
          label: 'Số máy bơm',
          elm: (row: any) => row?.thongso?.soLuongMayBom,
          align: 'left'
        },
        {
          id: 'qThietKe',
          label: (
            <span>
              Q<sub>TK</sub> (m<sup>3</sup>/h)
            </span>
          ),
          elm: (row: any) => row?.thongso?.qThietKe,
          align: 'left'
        },
        {
          id: 'qThucTe',
          label: (
            <span>
              Q<sub>TT</sub> (m<sup>3</sup>/h)
            </span>
          ),
          elm: (row: any) => row?.thongso?.qThucTe,
          align: 'left'
        },
        {
          id: 'dienTichTuoiThietKe',
          label: (
            <span>
              F<sub>tưới TK</sub> (ha)
            </span>
          ),
          elm: (row: any) => row?.thongso?.dienTichTuoiThietKe,
          align: 'left'
        },
        {
          id: 'dienTichTuoiThucTe',
          label: (
            <span>
              F<sub>tưới TT</sub> (ha)
            </span>
          ),
          elm: (row: any) => row?.thongso?.dienTichTuoiThucTe,
          align: 'left'
        },
        {
          id: 'thoiGianBomTB',
          label: (
            <span>
              T<sub>bơm TB</sub>(h)
            </span>
          ),
          elm: (row: any) => row?.thongso?.thoiGianBomTB,
          align: 'left'
        },
        {
          id: 'thoiGianBomNhoNhat',
          label: (
            <span>
              T<sub>bơm min</sub>(h)
            </span>
          ),
          elm: (row: any) => row?.thongso?.thoiGianBomNhoNhat,
          align: 'left'
        },
        {
          id: 'thoiGianBomLonNhat',
          label: (
            <span>
              T<sub>bơm max</sub>(h)
            </span>
          ),
          elm: (row: any) => row?.thongso?.thoiGianBomLonNhat,
          align: 'left'
        }
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

    { id: 'actions', label: 'Thao tác', align: 'center', pinned: 'right' }
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
          <Box className='map-legend' sx={{ background: 'white', px: 2, zIndex: 999, height: 'auto', top: '15px' }}>
            <FormGroup>
              <FormControlLabel
                sx={{ m: 0}}
                control={<Checkbox sx={{p: 1}} onClick={() => setShowLabel(!showLabel)} />}
                label='Hiển thị tên công trình'
              />
            </FormGroup>
            <MapLegend onChange={handleConsTypeChange} />
          </Box>
          <Map center={mapCenter} zoom={mapZoom} showLabel={showLabel} mapData={dataFiltered} loading={false} />
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

export default SurfaceConstruction
