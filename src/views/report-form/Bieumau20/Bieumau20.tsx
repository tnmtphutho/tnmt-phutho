//React Imports
import React, { useEffect } from 'react'
import { useState } from 'react'

//MUI Imports
import { getData } from 'src/api/axios'
import { Box, Grid, Link, Paper, Typography } from '@mui/material'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import DeleteData from 'src/@core/components/delete-data'
import DialogControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import HeaderReport from '../HeaderReport'
import FooterReport from '../FooterReport'
import ExportTableToExcel from 'src/@core/components/export-excel/export-csv'

const BieuMauHaiMuoi = () => {
  const columnsTable: TableColumn[] = [
    { id: 'stt', label: 'STT', align: 'center' },
    {
      id: 'tenCT',
      label: 'Tên công trình',
      align: 'left',
      minWidth: 300
    },
    {
      id: 'loaiCT',
      label: (
        <>
          Loại hình công trình <br />
          (hồ, đập, cống, <br />trạm bơm, giếng khoan,khác)
        </>
      ),
      align: 'left',
      minWidth: 200,
      elm: (row: any) => (
        <Typography>
          {row?.loaiCT.tenLoaiCT}
        </Typography>
      )
    },
    {
      id: 'nguonNuocKT',
      label: (
        <>
          Nguồn nước khai thác
          <br />
          (sông, suối, hồ, <br /> đập, nước dưới đất)
        </>
      ),
      align: 'left',
      minWidth: 250,
      elm: (row: any) => (
        <Typography>
          {row?.nguonNuocKT}
        </Typography >
      )
    },

    {
      id: '#',
      label: 'Vị trí',
      children: [
        {
          id: 'xa',
          label: 'Xã',
          elm: (row: any) => (
            row?.xa?.map((x: any, key: number, arr: any[]) => (
              <Typography key={key}>
                {x?.tenXa}{key < arr.length - 1 ? ', ' : ''}
              </Typography>
            ))
          ),
          minWidth: 300
        },
        {
          id: 'huyen',
          label: 'Huyện',
          elm: (row: any) => (
            row?.huyen?.map((h: any, key: number, arr: any[]) => (
              <Typography key={key}>
                {h?.tenHuyen}{key < arr.length - 1 ? ', ' : ''}
              </Typography>
            ))
          ),
          minWidth: 300
        },
        {
          id: 'tinh',
          label: 'Tỉnh',
          elm: () => (
            <Typography>
              Quảng Ngãi
            </Typography>
          ),
          minWidth: 150
        }
      ]
    },

    {
      id: '#',
      label: 'Thông số cơ bản',
      children: [
        {
          id: '#',
          label: 'Hồ chứa,đập',
          children: [
            {
              id: 'dungTichToanBo',
              label: (<>Dung tích <br /> toàn bộ <br /> (triệu m3)</>),
              elm: (row: any) => (
                <Typography>
                  {row?.thongso?.dungTichToanBo}
                </Typography >
              )
            },
            {
              id: 'dungTichHuuIch',
              label: (<>Dung tích <br /> hữu ích <br /> (triệu m3)</>),
              elm: (row: any) => (
                <Typography>
                  {row?.thongso?.dungTichHuuIch}
                </Typography >
              )
            },
            {
              id: 'congSuatDamBao',
              label: (<>Công suất <br /> (MW)</>),
              elm: (row: any) => (
                <Typography>
                  {row?.thongso?.congSuatLM}
                </Typography >
              )
            }
          ]
        },
        {
          id: '#',
          label: (
            <>
              Giếng khoan <br /> và <br /> loại hình khác
            </>
          ),
          children: [
            {
              id: 'qThucTe',
              label: (<>Lưu lượng <br /> thiết kế <br /> (m3/ngày đêm)</>),
              elm: (row: any) => (
                <Typography>
                  {row?.idLoaiCT !== 4 && row?.idLoaiCT !== 5 && row?.idLoaiCT !== 11 ? row?.tongLuuLuong != 0 ? row?.tongLuuLuong : null : null}
                </Typography >
              )
            },
            {
              id: 'qThucTe',
              label: (<>Lưu lượng <br /> thực tế <br /> (m3/ngày đêm)</>),
              elm: (row: any) => (
                <Typography>
                  {row?.idLoaiCT !== 4 && row?.idLoaiCT !== 5 && row?.idLoaiCT !== 11 ? row?.tongLuuLuong != 0 ? row?.tongLuuLuong : null : null}
                </Typography >
              )
            }
          ]
        }
      ]
    }
  ]

  const [data, setData] = useState([])

  const [loading, setLoading] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState)
  }

  useEffect(() => {
    async function getDataReport1() {
      setLoading(true)
      await getData('BaoCaoBieuMau/so20')
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

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12}>

        <HeaderReport />
        <Grid className='_text_center'>
          <Typography className='font-weight-bold ' variant='h4'>
            BÁO CÁO
          </Typography>
          <Typography className='font-weight-bold ' variant='h6'>
            Danh mục các công trình khai thác, sử dụng tài nguyên nước
          </Typography>
        </Grid>
        <Paper elevation={3} sx={{ p: 5, height: '100%' }}>
          <Box sx={{ width: 'max-content', p: 3 }}><ExportTableToExcel tableId={'BieuMau20'} filename={'BieuMau20'} /></Box>
          <TableComponent
            columns={columnsTable}
            rows={data}
            id='BieuMau20'
            loading={loading}
            pagination
            actions={(row: any) => (
              <Box display={'none'}>

                {row ? null : null}
                <DeleteData url={'BieuMauSoHaiMuoi'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
          <FooterReport />
        </Paper>
      </Grid>
    </Grid>
  )
}

const Bieumau20 = () => {
  const formTitle = 'BIỂU MẪU THÔNG TƯ 31/2018/TT-BTNMT/ BIỂU MẪU SỐ 20'

  return (
    <DialogControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void) => (
        <>
          <Link className='formReport_box' onClick={() => openDialogs(<BieuMauHaiMuoi />, formTitle)}>
            <Grid item xs={8}>
              <Typography className='text-danger text-weight-bold'>Biểu mẫu 20</Typography>
              <Typography className='text-success text-weight-bold _font12'>
                Danh mục các CTKT,SD tài nguyên nước
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box component='img' src='/images/report-form/ANHBIEUMAU20.png' className='formReport_img' alt='' />
            </Grid>
          </Link>
        </>
      )}
    </DialogControlFullScreen>
  )
}

export default Bieumau20
