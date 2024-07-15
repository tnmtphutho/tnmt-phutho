import { Typography, Grid } from '@mui/material'

const Footer = () => {
  return (
    <Grid className='_space_between' sx={{ mt: 5 }}>
      <Grid>
        <Typography component={'p'} variant='caption'>Nơi nhận</Typography>
        <Typography component={'p'} variant='caption'>- Ban Giám đốc sở</Typography>
        <Typography component={'p'} variant='caption'>- Lưu:VT; TNN, KS&KTTV; VP, 10b</Typography>
      </Grid>

      <Grid>
        <Typography className='font-weight-bold' component={'p'} variant='body1'>
          Người thống kê
        </Typography>
      </Grid>
    </Grid>
  )
}
export default Footer