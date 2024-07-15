//React Imports
import React, { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

//MUI Imports

import { getData } from 'src/api/axios'
import { Grid,Box, Paper, Typography } from '@mui/material';
import TableComponent, { TableColumn } from 'src/@core/components/table'
import DeleteData from 'src/@core/components/delete-data'
import PhanDoanSongForm from './PhanDoanSongForm'
import ExportTableToExcel from 'src/@core/components/export-excel/export-csv'
import { calculateBounds, fetchAndParseKML } from 'src/@core/components/map/utils';

const MapDoanSong = dynamic(() => import('src/@core/components/map/mapdoansong'), { ssr: false });

// eslint-disable-next-line react-hooks/rules-of-hooks
const PhanDoanSongTiepNhanNuocThai = () => {
  const [data, setData] = useState([])
  const [mapCenter, setMapCenter] = useState([15.012172, 108.676488]);
  const [mapZoom, setMapZoom] = useState(9);
  const [selectedRiver, setSelectedRiver] = useState<any>(null);

  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }

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
  const columnsTable: TableColumn[] = [
    { id: 'stt', label: 'STT' },
    {
      id: 'phanDoan',
      label: 'Phân đoạn sông',
      align: 'left',
      minWidth: 200,
      elm: (row: any) => (
        <Typography className='btnShowFilePdf'  onClick={() => handleRiverSelection(row)}>
          {row?.phanDoan}
        </Typography>
      )
    },
    {
      id: 'luuVucSong',
      label: 'Lưu vực sông',
      align: 'left',
      minWidth: 200
    },
    {
      id: 'song',
      label: 'Sông',
      align: 'left',
      minWidth: 200
    },
    {
      id: 'tenDoanSong',
      label: 'Tên đoạn sông',
      align: 'left',
      minWidth: 200
    },
   
    {
      id: '#',
      label: 'Tọa độ (VN2000, múi chiếu 30, kinh tuyến trục 107045’)',
      children: [
        {
          id: 'xDau',
          label: 'Điểm đầu X'
        },
        {
          id: 'yDau',
          label: 'Điểm đầu Y'
        },
        {
          id: 'xCuoi',
          label: 'Điểm cuối X'
        },
        {
          id: 'xCuoi',
          label: 'Điểm cuối Y'
        }
      ]
    },
    {
      id: 'diaGioiHanhChinh',
      label: 'Địa giới hành chính',
      align: 'left'
    },
    {
      id: 'mucDichSuDung',
      label: (
        <>
          Mục đích sử dụng nước <br /> theo QCVN 08:2023/BTNMT
        </>
      ),
      align: 'left'
    },
    {
      id: 'chatLuongNuoc',
      label: (
        <>
          Chất lượng nước <br /> theo QCVN 08:2023 ứng
        </>
      ),
      align: 'left'
    },

    {
      id: 'ghiChu',
      label: 'Ghi chú',
      align: 'left'
    },

    { id: 'actions', label: 'Thao tác', align: 'center', pinned: 'right' }
  ]

  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('PhanDoanSong/danh-sach')
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
  }, [postSuccess])

  useEffect(() => {
    if (!selectedRiver) {
        setMapCenter([15.012172, 108.676488]); // Mặc định trung tâm
        setMapZoom(9); // Mặc định zoom
    }
}, [selectedRiver]);


  return (
    <Grid container spacing={2}>
       <Grid item xs={12} ref={mapRef} sx={{ height: '55vh', overflow: 'hidden' }}>
        <MapDoanSong
          center={mapCenter}
          zoom={mapZoom}
          mapData={selectedRiver}
          selectedKmlFile={selectedRiver ? selectedRiver.fileKML : null}
          loading={loading}
        />
      </Grid>

      <Grid xs={12} md={12}>
        <Grid className='_text_center'>
          <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>
            TỔNG HỢP PHÂN ĐOẠN SÔNG TỈNH QUẢNG NGÃI
          </Typography>
        </Grid>
        <Paper elevation={3} sx={{ p: 0, height: '100%' }}>
          <Grid container className='_flexEnd' spacing={2} sx={{ p: 2 }}>
            <Grid>
              <ExportTableToExcel tableId='phan_doan_song' filename='phandoansong.csv' />
            </Grid>

            <Grid>
              <PhanDoanSongForm isEdit={false} setPostSuccess={handlePostSuccess} />
            </Grid>
          </Grid>

          <TableComponent
            columns={columnsTable}
            rows={data}
            id='phan_doan_song'
            loading={loading}
            pagination
            actions={(row: any) => (
              <Box display={'flex'}>
                <PhanDoanSongForm isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'du-lieu-nguon-nhan'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default PhanDoanSongTiepNhanNuocThai
