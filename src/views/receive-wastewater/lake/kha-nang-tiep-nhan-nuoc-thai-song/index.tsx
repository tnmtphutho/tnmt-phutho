import React, { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { getData } from 'src/api/axios';
import { Box, Grid, Paper, Typography } from '@mui/material';
import TableComponent, { TableColumn } from 'src/@core/components/table';
import ExportTableToExcel from 'src/@core/components/export-excel/export-csv';
import { calculateBounds, fetchAndParseKML } from 'src/@core/components/map/utils';
import FormatCellValue from 'src/@core/components/calculate-data-river';
import MapLegendWaste from './MapLegend';

const MapDoanSong = dynamic(() => import('src/@core/components/map/mapdoansong'), { ssr: false });

const KhaNangTiepNhanNuocThaiSong = () => {
  const [data, setData] = useState([]);
  console.log(data);
  
  const [mapCenter, setMapCenter] = useState([15.012172, 108.676488]);
  const [mapZoom, setMapZoom] = useState(9);
  const [selectedRiver, setSelectedRiver] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Tạo ref cho container chứa bản đồ
  const mapRef = useRef<HTMLDivElement>(null);
  const handleRiverSelection = useCallback(async (river) => {
    setSelectedRiver(river);
    try {
      const kmlDoc = await fetchAndParseKML(`${river.fileKML}`);
      const bounds = calculateBounds(kmlDoc);
      if (bounds) {
        setMapCenter(bounds.center);
        setMapZoom(bounds.zoom);
      }

      // Cuộn bản đồ vào tầm nhìn
      if (mapRef.current) {
        mapRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error loading KML:', error);
    }
  }, []);
  const [initConsType, setInitConstype] = useState<any>([
    'nuocmat',
    'thuydien',
    'hochua',
    'trambom',
    'tramcapnuoc',
    'conglaynuoc',
    'nhamaynuoc'
  ])

  const handleConsTypeChange = (data: any) => {
    setInitConstype(data)
  }

  const columnsTable: TableColumn[] = [
    { id: 'stt', label: 'STT', rowspan: 2 },
    {
      id: 'phanDoan',
      label: 'Phân đoạn sông',
      align: 'left',
      minWidth: 200,
      elm: (row: any) => (
        <Typography className='btnShowFilePdf' onClick={() => handleRiverSelection(row)}>
          {row?.phanDoan}
        </Typography>
      )
    },
    { id: 'luuVucSong', label: 'Lưu vực sông', rowspan: 2, align: 'left', minWidth: 150 },
    { id: 'song', label: 'Sông', rowspan: 2, align: 'left', minWidth: 250 },
    { id: 'tenDoanSong', label: 'Tên đoạn sông', rowspan: 2, align: 'left', minWidth: 250 },
    { id: 'chieuDai', label: <>Chiều dài<br/> đoạn sông (km)</>, rowspan: 2, align: 'left', minWidth: 120 },
    { id: 'heSoFS', label: 'Hệ số an toàn(Fs)', rowspan: 2, align: 'left' },
    {
      id: '#',
      label: 'KHẢ NĂNG TIẾP NHẬN NƯỚC THẢI, SỨC CHỊU TẢI Ltd (kg/ngày)',
      align: 'left',
      children: [
        { id: 'ltnBod', label: 'BOD5 (mg/l)', align: 'left', elm: (row: any) => FormatCellValue(row.ltnBod) },
        { id: 'ltnCod', label: 'COD (mg/l)', align: 'left', elm: (row: any) => FormatCellValue(row.ltnCod) },
        { id: 'ltnAmoni', label: 'Amoni (mg/l)', align: 'left', elm: (row: any) => FormatCellValue(row.ltnAmoni) },
        { id: 'ltnTongN', label: 'Tổng N (mg/l)', align: 'left', elm: (row: any) => FormatCellValue(row.ltnTongN) },
        { id: 'ltnTongP', label: 'Tổng P (mg/l)', align: 'left', elm: (row: any) => FormatCellValue(row.ltnTongP) },
        { id: 'ltnTSS', label: 'Tổng chất rắn lơ lửng TSS (mg/l)', align: 'left', elm: (row: any) => FormatCellValue(row.ltnTSS) },
        { id: 'ltnColiform', label: 'Tổng Coliform (MPN/100ml)', align: 'left', elm: (row: any) => FormatCellValue(row.ltnColiform) },
      ]
    },
  
    { id: 'ghiChu', label: 'Ghi chú', rowspan: 2, align: 'left' }
  ];

  useEffect(() => {
    async function getDataReport1() {
      setLoading(true);
      await getData('PhanDoanSong/tai-luong')
        .then(data => {
          setData(data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    getDataReport1();
  }, [initConsType]);

  useEffect(() => {
    if (!selectedRiver) {
      setMapCenter([15.012172, 108.676488]);
      setMapZoom(9);
    }
  }, [selectedRiver]);

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12} sx={{ height: '55vh', overflow: 'hidden' }}>
        <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
          <Box className='map-legend' sx={{ background: 'white', px: 2, zIndex: 999, height: 'auto', top: '15px' }}>
           
            <MapLegendWaste onChange={handleConsTypeChange} />
          </Box>
          <MapDoanSong
          center={mapCenter}
          zoom={mapZoom}
          mapData={selectedRiver}
          selectedKmlFile={selectedRiver ? selectedRiver.fileKML : null}
          loading={loading}
        />
        </Paper>
      </Grid>
      {/* <Grid item xs={12} ref={mapRef} sx={{ height: '55vh', overflow: 'hidden' }}>
        <MapDoanSong
          center={mapCenter}
          zoom={mapZoom}
          mapData={selectedRiver}
          selectedKmlFile={selectedRiver ? selectedRiver.fileKML : null}
          loading={loading}
        />
      </Grid> */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 0, height: '100%' }}>
          <Grid container className='_flexEnd' spacing={2} sx={{ p: 2 }}>
            <Grid item>
              <ExportTableToExcel tableId='kha_nang_tiep_nhan_nuoc_thai' filename='khanangtiepnhannuocthai.csv' />
            </Grid>
          </Grid>
          <TableComponent
            columns={columnsTable}
            rows={data}
            id='phan_doan_song'
            loading={loading}
            pagination
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default KhaNangTiepNhanNuocThaiSong;
