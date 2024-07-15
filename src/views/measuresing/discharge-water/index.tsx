import { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import { Grid, Box, Typography, Paper, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

// ** Components Imports
import MonitoringSystemToolBar from '../tool-bar';
import TableComponent, { TableColumn } from 'src/@core/components/table';
import DisplayOperatingStatus from 'src/@core/components/monitoring-page/check-status';
import GetConstructionTypeId from 'src/@core/components/get-construction-type';
import { ConverterCood } from 'src/@core/components/map/convert-coord'

import dynamic from 'next/dynamic';
import { getData } from 'src/api/axios';
import { useRouter } from 'next/router';
import MapLegend from 'src/views/construction/MapLegend';

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const DischargewaterMeasuresing = () => {
  const router = useRouter();
  const [mapCenter, setMapCenter] = useState([15.012172, 108.676488]);
  const [mapZoom, setMapZoom] = useState(9);
  const [showLabel, setShowLabel] = useState(false)
  const [resData, setResData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  console.log(total)

  const [dataFiltered, setDataFiltered] = useState([]);

  const columnsTable: TableColumn[] = [
    { id: 'stt', label: 'STT', align: 'center' },
    {
      id: 'ConstructionName', label: 'Tên công trình', pinned: "left", minWidth: 350, elm: (row: any) => (
        <Typography className='btnShowFilePdf' onClick={() => zoomConstruction(ConverterCood(row.y, row.x))}>
          {row.tenCT}
        </Typography>)
    },
    {
      id: '#', label: 'Lưu lượng nước thải sau xử lý',
    },
    {
      id: '#', label: 'Chất lượng nước sau xử lý',
    },
    {
      id: '#', label: 'Lưu lượng nước thải tại nguồn tiếp nhận',
    },

    { id: '#', label: 'Trạng thái vận hành', elm: (row: any) => (<DisplayOperatingStatus data={row} />) },

    { id: 'actions', label: 'Thao tác', rowspan: 2 },
  ];

  const zoomConstruction = (coords: any) => {
    setMapCenter(coords)
    setMapZoom(13)
  }

  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const getDataConstructions = async () => {
      setLoading(true);
      getData('cong-trinh/danh-sach', paramsFilter)
        .then((data) => {
          console.log(data)
          if (isMounted.current) {
            setResData(data);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getDataConstructions();

    setColumns(columnsTable);

    // fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    nguonnuoc_kt: null,
  });

  const [initConsType, setInitConstype] = useState<any>([
    'xathai',
    'khu_cumcn_taptrung',
    'sx_tieuthu_cn',
    'sx_kd_dichvu',
    'cs_benhvien',
    'khudancu_langnghe',
    'channuoi_ntts',
    'congtrinhkhac_xt'
  ])

  const handleFilterChange = (data: any) => {
    setParamsFilter(data);
  };

  useEffect(() => {
    const filteredData: any = resData.filter((item: { [key: string]: any }) =>
      initConsType.some((keyword: any) =>
        item['loaiCT']?.['maLoaiCT']?.toString().toLowerCase().includes(keyword.toLowerCase())
      )
    );
    setDataFiltered(filteredData);
    setTotal(filteredData.length);
  }, [initConsType, resData]);

  const handleConsTypeChange = (data: any) => {
    setInitConstype(data);
  };


  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
          <Box className='map-legend' sx={{ background: 'white', pl: 2, zIndex: 999, height: 'auto', top: '15px' }}>
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
      <Grid item xs={12} sm={12} md={12}>
        <MonitoringSystemToolBar onChange={handleFilterChange} />
        <Typography sx={{ fontStyle: 'italic', fontSize: '14px' }}>Thời gian cập nhật: </Typography>
        <TableComponent loading={loading} columns={columns} rows={dataFiltered} pagination={true} />
      </Grid>
    </Grid>
  )
}

export default DischargewaterMeasuresing
