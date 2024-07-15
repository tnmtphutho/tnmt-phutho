import { Button, Grid, TextField, Typography } from "@mui/material"
import { TravelExplore, East } from '@mui/icons-material'


const RequestDetails = () => {
    
  return (  
    
    <fieldset className="field-request-info">
      <legend>
        <Typography variant={'subtitle1'} className='legend__title'>Thông tin công trình</Typography>
      </legend>
       <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' label='Tên đơn vị XCP' fullWidth placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' label='Địa chỉ đơn vị XCP' fullWidth placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' label='Số GP' fullWidth placeholder='' defaultValue='' />      
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' label='Tên công trình' fullWidth placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' label='Ký hiệu CT' fullWidth placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' label='Loại CT' fullWidth placeholder='' defaultValue='' />      
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' label='Địa điểm CT' fullWidth placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' label='Huyện' fullWidth placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' label='Xã' fullWidth placeholder='' defaultValue='' />      
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' label='Tọa độ X' fullWidth placeholder='' defaultValue='' />
          </Grid>
          <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
            <TextField size='small' type='text' label='Tọa độ Y' fullWidth placeholder='' defaultValue='' />      
          </Grid>
          <Grid item xs={12} md={2} sm={12} sx={{ my: 2 }}>
            <Button fullWidth variant="outlined"><TravelExplore fontSize='small' /> &nbsp; Xem vị trí</Button>
        </Grid>
        </Grid>
        <Button variant="outlined">Gửi yêu cầu phê duyệt &nbsp;<East fontSize='small' /> </Button>
        <Typography py={2} sx={{fontSize: 12, fontStyle: 'italic'}}>Mỗi tài khoản ứng với 1 chủ công trình (1 chủ công trình có thể quản lý nhiều công trình)</Typography>
    </fieldset>)
}

export default RequestDetails
