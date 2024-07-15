import Paper from '@mui/material/Paper'
import { Grid, Typography, Box, } from '@mui/material'
import Header from '../header'
import Footer from '../footer'
import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'
import TableComponent, { TableColumn } from 'src/@core/components/table'
import CreateNN_AoHoKhongSanLap from '../create-form/CreateCL_NuocMat'
import DeleteData from 'src/@core/components/delete-data'
import ExportTableToExcel from 'src/@core/components/export-excel/export-csv'

const NN_AoHoKhongSanLap = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataNN_AoHoKhongSanLap() {
      setLoading(true)
      await getData('NN_AoHoDamPhaKhongDuocSanLap/danh-sach')
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

    getDataNN_AoHoKhongSanLap()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
      align: 'center'
    },
    {
      id: 'tenHoChua',
      label: 'Tên hồ chứa',
      minWidth: 250,
      align: 'left',
    },
    {
      id: '#',
      label: 'Vị trí hành chính',
      align: 'left',
      children: [
        {
          id: 'xa',
          label: 'Xã',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.xa == null ? "-" : row.xa}</Typography>,
        },
        {
          id: 'huyen',
          label: 'Huyện',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.huyen == null ? "-" : row.huyen}</Typography>,
        }
      ]
    },
    {
      id: 'nguonNuoc',
      label: 'Nguồn nước',
      align: 'left',
    },
    {
      id: 'thuocLVS',
      label: 'Thuộc lưu vực sông',
      align: 'left',
    },
    {
      id: 'loaiHinhChucNang',
      label: 'Loại hình chức năng',
      align: 'left',
    },
    {
      id: 'dienTichMatNuoc',
      label: 'Diện tích mặt nước (km2)',
      align: 'left',
    },
    {
      id: 'dungTichToanBo',
      label: 'Dung tích toàn bộ (triệu m3)',
      align: 'left',
    },
    {
      id: 'dungTichHuuIch',
      label: 'Dung tích hữu ích (triệu m3)',
      align: 'left',
    },
    {
      id: 'dungTichPhongLu',
      label: 'Dung tích phòng lũ (triệu m3)',
      align: 'left',
    },
    {
      id: 'mucNuocDangBinhThuong',
      label: 'Mực nước dâng bình thường (m)',
      align: 'left',
    },
    {
      id: 'mucNuocChet',
      label: 'Mực nước chết (m)',
      align: 'left',
    },
    {
      id: 'namHoanThanh',
      label: 'Năm hoàn thành',
      align: 'left',
    },
    {
      id: 'donQuayLyVanHanh',
      label: 'Đơn vị quản lý vận hành',
      align: 'left',
    },
    {
      id: 'thuocDanhMucKhongSanLap',
      label: 'Thuộc danh mục không san lấp',
      align: 'left',
    },
    {
      id: 'quyetDinh',
      label: 'Quyết định',
      align: 'left',
    },
    {
      id: 'ghiChu',
      label: 'Ghi chú',
      align: 'left',
    },
    { align: 'center', id: 'actions', label: 'Thao tác', minWidth: 150, rowspan: 3 }
  ]

  return (
    <Paper sx={{ p: 8 }}>
      <Header />

      <Grid className='_text_center'>
        <Typography className='font-weight-bold ' variant='h6'>
          THÔNG TIN DỮ LIỆU VỀ HỒ, AO, ĐẦM, PHÁ KHÔNG ĐƯỢC SAN LẤP TỈNH QUẢNG NGÃI
        </Typography>
      </Grid>
      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <Box sx={{ width: 'max-content', p: 3 }}><ExportTableToExcel tableId={'AoHoKhongDuocSanLap'} filename={'AoHoKhongDuocSanLap'} /></Box>
          <TableComponent
            columns={columnsTable}
            rows={data}
            id='AoHoKhongDuocSanLap'
            loading={loading}
            pagination
            actions={(row: any) => (
              <Box >
                <CreateNN_AoHoKhongSanLap isEdit={true} data={row} setPostSuccess={handlePostSuccess} />
                <DeleteData url={'NN_AoHoDamPhaKhongDuocSanLap'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

      <Footer />
    </Paper>
  )
}

export default NN_AoHoKhongSanLap
