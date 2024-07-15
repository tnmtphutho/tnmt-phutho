import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
  } from '@mui/material'
import Header from '../header'
import Footer from '../footer'
 
  
  const KiemKeXaNuocThai = () => {
    return (
   <Grid container>
      <Header />
        <Grid item md={12} xs={12} textAlign={'center'} textTransform={'uppercase'}>
          <Typography className='font-weight-bold ' variant='h6'>
            BÁO CÁO
          </Typography>
        <Typography pt={1} pb={2} className='font-weight-bold ' variant='h6'>
          KIỂM KÊ XẢ NƯỚC THẢI VÀO NGUỒN NƯỚC
        </Typography>
        <Typography pt={1} pb={2} className='font-weight-bold ' variant='h6'>
         (Xả nước thải của các cơ sở SXKD, dịch vụ với quy mô lớn hơn 5 m3/ngày đêm và không chứa hóa chất độc hại, chất phóng xạ)
        </Typography>
      </Grid>
      <Grid item md={12} xs={12} pt={3}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead className='tableHead'>
              <TableRow>
                <TableCell size='small' align='center' rowSpan={2}>
                  STT
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Tên chủ hộ / công trình
                </TableCell>
                <TableCell size='small' align='center' colSpan={2}>
                 Tọa độ (VN2000 kinh tuyến trục, múi chiếu 3o)
                </TableCell>
                <TableCell size='small' align='center' colSpan={3}>
                  Vị trí hành chính
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2} >
                  Lưu lượng xả thải (m3/ngày)
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Loại hình nước thải
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Nguồn tiếp nhận nước thải
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                 Thuộc lưu vực sông 
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Ghi chú
                </TableCell>
                <TableCell size='small' align='center' rowSpan={2}>
                  Thao tác
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center'>
                  X
                </TableCell>
                <TableCell size='small' align='center'>
                 Y
                </TableCell>
                <TableCell size='small' align='center'>
                  Xã
                </TableCell>
                <TableCell size='small' align='center'>
                Huyện
                </TableCell>
                <TableCell size='small' align='center'>
                Tỉnh
                </TableCell>
               
              </TableRow>

              <TableRow>
                <TableCell size='small' align='center'>
                  (1)
                </TableCell>
                <TableCell size='small' align='center'>
                  (2)
                </TableCell>
                <TableCell size='small' align='center'>
                  (3)
                </TableCell>
                <TableCell size='small' align='center'>
                  (4)
                </TableCell>
                <TableCell size='small' align='center'>
                  (5)
                </TableCell>
                <TableCell size='small' align='center'>
                  (6)
                </TableCell>
                <TableCell size='small' align='center'>
                  (7)
                </TableCell>
                <TableCell size='small' align='center'>
                  (8)
                </TableCell>
                <TableCell size='small' align='center'>
                  (9)
                </TableCell>
                <TableCell size='small' align='center'>
                  (10)
                </TableCell>
                <TableCell size='small' align='center'>
                  (11)
                </TableCell>
                <TableCell size='small' align='center'>
                  (12)
                </TableCell>
                <TableCell size='small' align='center'>
                  (13)
                </TableCell>
                
              </TableRow>


            </TableHead>

            <TableBody className='tableBody'>
              <TableRow>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">Tầng chứa nước qp</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
                <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Footer />
    </Grid>
    )
  }
  export default KiemKeXaNuocThai
