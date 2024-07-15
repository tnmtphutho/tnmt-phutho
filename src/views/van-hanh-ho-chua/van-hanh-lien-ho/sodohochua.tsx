import { Grid, Typography } from '@mui/material'
import ThongTinVanHanhHo from './thongtinvanhanhho'

const SoDoHeThongHo = () => {
  return (
    <Grid>
      <Grid className='_text_center'>
        <Typography className='font-weight-bold' variant='h6'>
          Sơ đồ hệ thống hồ chứa
        </Typography>
      </Grid>
      <Grid className='back_ground_ho'>
        <Grid className='info_ho'>
            <ThongTinVanHanhHo />
        </Grid>
        <Grid className='back_ground_dam'></Grid>
      </Grid>
    </Grid>
  )
}

export default SoDoHeThongHo
