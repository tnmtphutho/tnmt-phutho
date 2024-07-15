import { Typography, Grid } from '@mui/material'

const Header = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0 (0 = tháng 1)
  const year = currentDate.getFullYear();

  return (
    <Grid className='_space_between' container sx={{ my: 5, display: 'flex' }}>
      <Grid className='_text_center' item xs={4}>
        <Typography component={'p'} variant='caption'>UBND Tỉnh Quảng Ngãi</Typography>
        <Typography component={'p'} className='font-weight-bold ' variant='caption' fontSize={14}>
          SỞ TÀI NGUYÊN VÀ MÔI TRƯỜNG
        </Typography>
        <Typography component={'p'} variant='caption'>
          Số:.........../STNMT-TNN-KS&KTTV
        </Typography>
      </Grid>

      <Grid className='_text_center' item xs={5}>
        <Typography component={'p'} variant='caption'>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</Typography>
        <Typography className='font-weight-bold ' component={'p'} variant='caption'>
          Độc lập - Tự do - Hạnh phúc
        </Typography>
        <Typography className='italicText' component={'p'} variant='caption'>Quãng Ngãi,ngày {day},tháng {month} ,năm{year}</Typography>
      </Grid>
    </Grid>
  )
}
export default Header
