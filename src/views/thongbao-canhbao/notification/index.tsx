import { Grid, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'

function createData(name:any, calories:any, time:any) {
  return { name, calories, time };
}
const rows = [
  createData('Giấy phép: 169/GP-UBND', 'admin đã cập nhật 169/GP-UBND', '15:08 01/03/2024' ),
  createData('Giấy phép: 169/GP-UBND', 'admin đã cập nhật 169/GP-UBND', '15:08 01/03/2024' ),
  createData('Giấy phép: 169/GP-UBND', 'admin đã cập nhật 169/GP-UBND', '15:08 01/03/2024' ),
  createData('Giấy phép: 169/GP-UBND', 'admin đã cập nhật 169/GP-UBND', '15:08 01/03/2024' ),
  createData('Giấy phép: 169/GP-UBND', 'admin đã cập nhật 169/GP-UBND', '15:08 01/03/2024' )
]

const Notification = () => {
  return (
    <Grid>
      <Grid className='_text_center'>
        <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>
          Thông báo
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{mt:5}}>
        <Table aria-label='simple table'>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='left'>{row.calories}</TableCell>
                <TableCell align='left'>{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}

export default Notification
