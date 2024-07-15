import {  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

const ThongTinVanHanhHo = () => {
  return (
    <TableContainer component={Paper} className='box_info_ho'>
      <Table aria-label="simple table">
        <TableHead style={{ textAlign: 'center' }}>
            <TableRow >Đập A</TableRow>
        </TableHead>
        <TableBody >
        <TableRow>
            <TableCell>Tỷ lệ dung <br/> tích hồ(lũ)</TableCell>
            <TableCell>11</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Q đến</TableCell>
            <TableCell>11</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Q xả</TableCell>
            <TableCell>11</TableCell>
          </TableRow>
         
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ThongTinVanHanhHo
