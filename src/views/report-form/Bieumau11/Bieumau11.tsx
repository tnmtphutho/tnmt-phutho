//React Imports
import React, { useEffect } from 'react'
import { useState } from 'react'

//MUI Imports
import { getData } from 'src/api/axios'
import { Box, Grid, Link, Paper, Typography } from '@mui/material'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import DialogControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import HeaderReport from '../HeaderReport'
import FooterReport from '../FooterReport'
import ExportTableToExcel from 'src/@core/components/export-excel/export-csv'

const BieuMauMuoiMot = () => {
  const columnsTable: TableColumn[] = [
    { id: 'stt', label: 'STT', minWidth: 60, align: 'center', },
    {
      id: 'luuVucSong',
      label: (
        <>
          Lưu vực sông/<br />
          Vùng/Tỉnh
        </>
      ),
      pinned: 'left',
      align: 'center',

    },
    {
      id: 'tongSoCongTrinh',
      label: (
        <>
          Tổng số <br />
          công trình
        </>
      ),
      align: 'center',
    },

    {
      id: '#',
      label: 'Số lượng công trình phân theo loại hình',
      children: [
        {
          id: 'xa',
          label: 'Khai thác nước mặt',

          children: [
            {
              id: 'congTrinhHoChua',
              label: 'Hồ chứa',
              align: 'center',
            },
            {
              id: 'congTrinhDapDang',
              label: 'Đập dâng',
              align: 'center',
            },
            {
              id: 'congTrinhCong',
              label: 'Cống',
              align: 'center',
            },
            {
              id: 'congTrinhTramBom',
              label: 'Trạm bơm',
              align: 'center',
            },
            {
              id: 'congTrinhKhacNuocMat',
              label: 'Khác',
              align: 'center',
            },

          ]
        },
        {
          id: 'huyen',
          label: 'Khai thác nước dưới đất',

          children: [
            {
              id: 'congTrinhGieng',
              label: 'Giếng khoan',
              align: 'center',

            },
            {
              id: 'congTrinhKhacNDD',
              label: 'Khác',
              align: 'center',
            },

          ]
        },

      ]
    },

  ]

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BaoCaoBieuMau/so11')
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
      <Grid xs={12} md={12}>
        <HeaderReport />
        <Grid className='_text_center'>
          <Typography className='font-weight-bold ' variant='h4'>
            BÁO CÁO
          </Typography>
          <Typography className='font-weight-bold ' variant='h6'>
            Số lượng công trình khai thác nước mặt, nước dưới đất phân theo loại hình
          </Typography>
        </Grid>

        <Paper elevation={3} sx={{ p: 5, height: '100%' }}>
          <Box sx={{ width: 'max-content', p: 3 }}><ExportTableToExcel tableId={'BieuMau11'} filename={'BieuMau11'} /></Box>
          <TableComponent
            columns={columnsTable}
            rows={data}
            id='BieuMau11'
            loading={loading}
          />
          <FooterReport />
        </Paper>
      </Grid>
    </Grid>
  )
}

const Bieuma11 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 11'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<BieuMauMuoiMot />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 11</Typography>
              <Typography className='text-success text-weight-bold _font12'>Số lượng CTKT phân theo loại hình</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU11.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieuma11
