import Paper from '@mui/material/Paper'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'



  


const NguonThaiCLN = () => {
  return (

    <TableContainer component={Paper}>
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
            Lưu lượng  <br /> dòng chảy  <br /> Qs  <br /> (m3/s)
            </TableCell>
            <TableCell size='small' align='center' colSpan={7}>
            KẾT QUẢ PHÂN TÍCH THÔNG SỐ CHẤT LƯỢNG NƯỚC THẢI HJFHJ  MẶT <br /> Cnn [-]
              </TableCell>
              <TableCell size='small' align='center' colSpan={7}>
              TẢI LƯỢNG Ô NHIỄM NGUỒN NƯỚC HIỆN CÓ <br /> Lnn (kg/ngày) 
              </TableCell>

              <TableCell size='small' align='center' colSpan={7}>
             GIÁ TRỊ GIỚI HẠN THÔNG SỐ CHẤT LƯỢNG NƯỚC THEO TIÊU CHUẨN QCVN 08:2023/BTNMT <br />  Cqc [-]
              </TableCell>

              <TableCell size='small' align='center' colSpan={7}>
             TẢI LƯỢNG TỐI ĐA CỦA THÔNG SỐ CHẤT LƯỢNG NƯỚC MẶT <br /> Ltd (kg/ngày)
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
  )
}

export default NguonThaiCLN
