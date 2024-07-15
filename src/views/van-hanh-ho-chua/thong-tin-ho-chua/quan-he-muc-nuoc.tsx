import Paper from '@mui/material/Paper'
import { Grid, Typography, Box, } from '@mui/material'

import { getData } from 'src/api/axios'
import { useEffect, useState } from 'react'
import BoxLoading from 'src/@core/components/box-loading'

import TableComponent, { TableColumn } from 'src/@core/components/table'

import DeleteData from 'src/@core/components/delete-data'
import ToolBar from './toolbar'

const QuanHeMucNuoc = () => {
  const [data, setData] = useState<any[]>([])

  const [loading, setLoading] = useState(false)
  

  const [postSuccess, setPostSuccess] = useState(false);
  const handlePostSuccess = () => {
    setPostSuccess(prevState => !prevState);
  };
  useEffect(() => {
    async function getDataVHHC_HoChua_ThongSoKT() {
      setLoading(true)
      
      //API de lay du lieu tu sql: 'VHHC_HoChua_ThongSoKT/danh-sach'
      await getData('VHHC_HoChua_ThongSoKT/danh-sach')
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

    getDataVHHC_HoChua_ThongSoKT()
  }, [postSuccess])

  const columnsTable: TableColumn[] = [
    {
      id: 'stt',
      label: 'STT',
      rowspan: 3,
     
    },
    {
      //Id là trường dữ liệu lưu trong csdl
      id: 'tenHoChua',
      label: 'Tên hồ chứa',
      align: 'left',
      rowspan: 2,
      minWidth: 120,
      children: [
        {
          id: '#1',
          children: [{ id: '#1.1', label: '(1)', align: 'left' }]
        }
      ]
    },
    {
      //Id chỗ này để trống vì không có dl, chỉ để mở rộng colspan
      id: '#',
      label: 'Các đặc trưng lưu vực',
      align: 'left',
      children: [
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'thuocLVS',
          label: 'Thuộc LVS',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.thuocLVS == null ? "-" : row.thuocLVS}</Typography>,
          children: [{ id: '#2.1', label: '(2)', align: 'left' }]
        },
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'fLv',
          label: (<span> F_lv <br/>  (km2)</span> ),
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.fLv == null ? "-" : row.fLv}</Typography>,
          children: [{ id: '#3.1', label: '(3)', align: 'left' }]
        },
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'xTbNam',
          label: (<span> X tbnăm <br/> (mm)</span> ),
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.xTbNam == null ? "-" : row.xTbNam}</Typography>,
          children: [{ id: '#4.1', label: '(4)', align: 'left' }]
        },
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'qoTbNam',
          label: (<span> Qo tbnăm <br/> (m3/s) </span>),
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.qoTbNam == null ? "-" : row.qoTbNam}</Typography>,
          children: [{ id: '#5.1', label: '(5)', align: 'left' }]
        }
      ]
    },
    {
      //Id chỗ này để trống vì không có dl, chỉ để mở rộng colspan
      id: '#',
      label: 'Lưu lượng đỉnh lũ ứng với tần suất:P=%',
      align: 'left',
      children: [
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'p002',
          label: 'P=0,02%',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.p002 == null ? "-" : row.p002}</Typography>,
          children: [{ id: '#6.1', label: '(6)', align: 'left' }]
        },
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'p01',
          label: 'P=0,1%',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.p01 == null ? "-" : row.p01}</Typography>,
          children: [{ id: '#7.1', label: '(7)', align: 'left' }]
        },
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'p02',
          label: 'P=0,2%',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.p02 == null ? "-" : row.p02}</Typography>,
          children: [{ id: '#8.1', label: '(8)', align: 'left' }]
        },
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'p05',
          label: 'P=0,5%',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.p05 == null ? "-" : row.p05}</Typography>,
          children: [{ id: '#9.1', label: '(9)', align: 'left' }]
        }
      ]
    },
    {
      id: '#',
      label: 'Hồ chứa',
      align: 'left',
      children: [
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'mndbt',
          label: (<span> MNDBT  <br/> (m) </span> ),
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.mndbt == null ? "-" : row.mndbt}</Typography>,
          children: [{ id: '#10.1', label: '(10)', align: 'left' }]
        },
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'mnc',
          label: 'MNC (m)',
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.mnc == null ? "-" : row.mnc}</Typography>,
          children: [{ id: '#11.1', label: '(11)', align: 'left' }]
        },
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'mnMaxP002',
          label: (<span> MN Max  <br/> (P=0,02%) </span> ),
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.mnMaxP002 == null ? "-" : row.mnMaxP002}</Typography>,
          children: [{ id: '#12.1', label: '(12)', align: 'left' }]
        },
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'mnMaxP01',
          label: (<span> MN Max  <br/> (P=0,1%) </span> ),
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.mnMaxP01 == null ? "-" : row.mnMaxP01}</Typography>,
          children: [{ id: '#13.1', label: '(13)', align: 'left' }]
        },
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'mnMaxP02',
          label: (<span> MN Max  <br/> (P=0,2%) </span> ),
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.mnMaxP02 == null ? "-" : row.mnMaxP02}</Typography>,
          children: [{ id: '#14.1', label: '(14)', align: 'left' }]
        },
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'mnMaxP05',
          label: (<span> MN Max  <br/> (P=0,5%) </span> ),
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.mnMaxP05 == null ? "-" : row.mnMaxP05}</Typography>,
          children: [{ id: '#15.1', label: '(15)', align: 'left' }]
        },
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'wToanBo',
          label: (<span> W toàn bộ <br/> (Wtb)</span> ),
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.wToanBo == null ? "-" : row.wToanBo}</Typography>,
          children: [{ id: '#16.1', label: '(16)', align: 'left' }]
        },
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'wHuuIch',
          label: (<span> W hữu ích <br/>(Whi)</span> ),
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.wHuuIch == null ? "-" : row.wHuuIch}</Typography>,
          children: [{ id: '#17.1', label: '(17)', align: 'left' }]
        },
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'wNam',
          label: (<span> W năm <br/>(Wni)</span> ),
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.wNam == null ? "-" : row.wNam}</Typography>,
          children: [{ id: '#18.1', label: '(18)', align: 'left' }]
        },
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'wNhieuNam',
          label: (<span> W nhiều năm <br/>(Wnni)</span> ),
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.wNhieuNam == null ? "-" : row.wNhieuNam}</Typography>,
          children: [{ id: '#19.1', label: '(19)', align: 'left' }]
        },
        {
          //Id là trường dữ liệu lưu trong csdl
          id: 'wChet',
          label: (<span> W chết <br/> (Wc)</span> ),
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.wChet == null ? "-" : row.wChet}</Typography>,
          children: [{ id: '#20.1', label: '(20)', align: 'left' }]
        },
      ]
    },
    {
      id: '#',
      label: 'Lưu lượng qua nhà máy',
      align: 'left',
      children: [
        {
          id: 'qDamBao',
          label: (<span> Q đảm bảo  <br/> (Qđb) </span> ),
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.qDamBao == null ? "-" : row.qDamBao}</Typography>,
          children: [{ id: '#21.1', label: '(21)', align: 'left' }]
        },
        {
          id: 'qMin',
          label: (<span> Q nhỏ nhất <br/> (Qmin) </span> ),
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.qMin == null ? "-" : row.qMin}</Typography>,
          children: [{ id: '#22.1', label: '(22)', align: 'left' }]
        },
        {
          id: 'qMax',
          label: (<span> Q lớn nhất <br/> (Qmax)</span> ),
          align: 'left',
          minWidth: 150,
          elm: (row: any) => <Typography className='f_14'>{row.qMax == null ? "-" : row.qMax}</Typography>,
          children: [{ id: '#23.1', label: '(23)', align: 'left' }]
        }
      ]
    },
    {
      id: 'ghiChu',
      label: 'Ghi chú',
      align: 'left',
      rowspan: 2,
      children: [
        {
          id: '#24',
          children: [{ id: '#24.1', label: '(24)', align: 'left' }]
        }
      ]
    },
    {align: 'center', id: 'actions', label: 'Thao tác', minWidth: 150, rowspan: 3 }
  ]

  return (
    <Paper sx={{ p: 8 }}>
      

      <Grid className='_text_center'>
       
      
        
      </Grid>
      {/* <CreateReport2 isEdit={false} setPostSuccess={handlePostSuccess}/> */}
      {loading ? (
        <BoxLoading />
      ) : (
        <Grid className='_text_center' sx={{ mt: 3 }}>
          <ToolBar onExport={{ data: data, column: columnsTable }} />
          <TableComponent
            columns={columnsTable}
            rows={data}
            loading={loading}
            pagination
            actions={(row: any) => (
              <Box >
             
                <DeleteData url={'VHHC_HoChua_ThongSoKT'} data={row} setPostSuccess={handlePostSuccess} />
              </Box>
            )}
          />
        </Grid>
      )}

   
    </Paper>
  )
}

export default QuanHeMucNuoc
