import {
  Button,
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

const LienHoChua = () => {
  return (
    <Grid>
    <Grid className='_text_center'>
      <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>
      VẬN HÀNH HỒ CHỨA ĐAKDRINK TRONG MÙA LŨ
      </Typography>
    </Grid>
  <Button variant='outlined'>Thêm mới</Button>
    <Grid className='_text_center' sx={{ mt: 3 }}>
    <TableContainer component={Paper} sx={{ mt: 5 }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
      <TableHead className='tableHead'>
          <TableRow>
            <TableCell size='small' align='center' rowSpan={2}>
              STT
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Sông
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Tên đoạn <br />
              sông
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Chiều dài 
              <br />
              đoạn sông
              <br />
              (km)
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
              Nguồn thải <br /> công trình XT 
            </TableCell>
            <TableCell size='small' align='center' rowSpan={1} colSpan={2}>
              Tọa độ vị trí <br /> xả thải <br /> của công trình XT
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2}>
            Lưu lượng  <br /> xả max  <br /> Qxt  <br /> (m3/s)
            </TableCell>
            <TableCell size='small' align='center' colSpan={7}>
            KẾT QUẢ PHÂN TÍCH THÔNG SỐ CHẤT LƯỢNG NƯỚC NGUỒN THẢI ĐIỂM <br /> Ct_diem [-]
              </TableCell>
              <TableCell size='small' align='center' colSpan={7}>
              TẢI LƯỢNG THÔNG SỐ CHẤT LƯỢNG NƯỚC CÓ TRONG NGUỒN THẢI ĐIỂM <br /> Lt_diem (kg/ngày) 
              </TableCell>

                      
            <TableCell size='small' align='center' rowSpan={2} >
              Ghi chú
            </TableCell>
            <TableCell size='small' align='center' rowSpan={2} >
              Thao tác
            </TableCell>
          </TableRow>

          <TableRow>
          <TableCell size='small' align='center'>
                  Tọa độ <br /> X
              </TableCell> 
              <TableCell size='small' align='center'>
                  Tọa độ <br /> Y
              </TableCell> 


                <TableCell size='small' align='center'>
                  BOD5 <br /> (mg/l)
              </TableCell>
              <TableCell size='small' align='center'>
              COD <br /> (mg/l)
              </TableCell>
             
              <TableCell size='small' align='center'>
              Amoni <br /> (mg/l)
              </TableCell>
              <TableCell size='small' align='center'>
              Tổng N <br /> (mg/l)
              </TableCell>
              <TableCell size='small' align='center'>
              Tổng P <br /> (mg/l)
              </TableCell>
              <TableCell size='small' align='center'>
              Tổng <br /> chất rắn <br/> lơ lửng <br/> TSS <br/> (mg/l)
              </TableCell>
              <TableCell size='small' align='center'>
              Tổng <br /> coliform <br/> (MPN/100ml)
              </TableCell>
        
                  <TableCell size='small' align='center'>
                  BOD5 <br /> (mg/l)
              </TableCell>
              <TableCell size='small' align='center'>
              COD <br /> (mg/l)
              </TableCell>
             
              <TableCell size='small' align='center'>
              Amoni <br /> (mg/l)
              </TableCell>
              <TableCell size='small' align='center'>
              Tổng N <br /> (mg/l)
              </TableCell>
              <TableCell size='small' align='center'>
              Tổng P <br /> (mg/l)
              </TableCell>
              <TableCell size='small' align='center'>
              Tổng <br /> chất rắn <br/> lơ lửng <br/> TSS <br/> (mg/l)
              </TableCell>
              <TableCell size='small' align='center'>
              Tổng <br /> coliform <br/> (MPN/100ml)
              </TableCell>

       

       

            </TableRow>
        </TableHead>

        <TableBody className='tableBody'>
          <TableRow>
            <TableCell className="text-center  size='small' align-middle font-13">1</TableCell>
            <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
            <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
            <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
            <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
            <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
            <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
            <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
            <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
            <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
            <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
            <TableCell className="text-center  size='small' align-middle font-13">-</TableCell>
            
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  </Grid>
  )
}

export default LienHoChua
