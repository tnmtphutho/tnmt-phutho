import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import FormatCellValue from '../calculate-data-river'
import { useRouter } from 'next/router'

const DoanSongPopup = ({ popupData }: any) => {
  const router = useRouter();
  const pathSegments = router.pathname.split('/');
  
  const section = pathSegments[4];
  

  const TableKhaNangTiepNhan =(
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
      <TableHead>
        <TableRow>
          <TableCell align='center'>KNTN BoD</TableCell>
          <TableCell align='center'>KNTN COD</TableCell>
          <TableCell align='center'>KNTN Amoni</TableCell>
          <TableCell align='center'>KNTN Tổng N</TableCell>
          <TableCell align='center'>KNTN Tổng P</TableCell>
          <TableCell align='center'>KNTN TSS </TableCell>
          <TableCell align='center'>KNTN Coliform </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell align='center'>{FormatCellValue(popupData.ltnBod)}</TableCell>
          <TableCell align='center'>{FormatCellValue(popupData.ltnCod)}</TableCell>
          <TableCell align='center'>{FormatCellValue(popupData.ltnAmoni)}</TableCell>
          <TableCell align='center'>{FormatCellValue(popupData.ltnTongN)}</TableCell>
          <TableCell align='center'>{FormatCellValue(popupData.ltnTongP)}</TableCell>
          <TableCell align='center'>{FormatCellValue(popupData.ltnTSS)}</TableCell>
          <TableCell align='center'>{FormatCellValue(popupData.ltnColiform)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  )

  const tableB = (

    <TableContainer component={Paper}>
        <Table aria-label='table B'>
            <TableHead>
                <TableRow>
                    <TableCell align='center'>Phân đoạn sông</TableCell>
                    <TableCell align='center'>Chiều dài đoạn sông</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              <TableCell align='center'>{popupData.phanDoan}</TableCell>
            <TableCell align='center'>{popupData.chieuDai}</TableCell>
            </TableBody>
        </Table>
    </TableContainer>
);
  
  return (
    <>
            <Typography className='text-table' sx={{textAlign:'center'}}>
                {popupData.tenDoanSong}
            </Typography>

           {section == 'kha-nang-tiep-nhan-nuoc-thai-song'? TableKhaNangTiepNhan : section =='phan-doan-song'? tableB : null}
        </>
   
  )
}

export default DoanSongPopup
