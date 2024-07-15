//import { Replay, Search } from '@mui/icons-material'
import { Button, Grid, TextField, Toolbar } from '@mui/material'
import { FC, useState } from 'react'
import ExportToExcel from 'src/@core/components/export-excel'
import { TableColumn } from 'src/@core/components/table'
import { Replay, Search } from "@mui/icons-material";
import CreateNN_DCTT_SongSuoi from '../../create-form/CreateNN_DCTT_SongSuoi';


interface LicenseToolBarProps {
  onExport: { data: any; column: TableColumn[] }
}
const ToolBar: FC<LicenseToolBarProps> = ({ onExport }) => {
  const [postSucceed, setPostSucceed] = useState(false)
  console.log(postSucceed)

  const handlePostSuccess = () => {
    setPostSucceed(prevState => !prevState)
  }

  return (
    <Toolbar variant='dense'>
      <Grid container spacing={2} sx={{ paddingY: 3 }} className='_flexEnd '>
        <Grid item xs={12} md={3} py={0}>
          <TextField sx={{ p: 0 }} size='small' fullWidth variant='outlined' placeholder='Tên trạm...' />
        </Grid>
        <Grid item xs={6} md={1.5} py={0}>
          <Button
            variant='outlined'
            size='small'
            fullWidth
            sx={{ borderRadius: 0 }}
            startIcon={<Search />}
          >
            Tìm kiếm
          </Button>
        </Grid>
        <Grid item xs={6} md={1.5} py={0}>
          <Button
            variant='outlined'
            size='small'
            fullWidth
            sx={{ borderRadius: 0 }}
            startIcon={<Replay />}
          >
            Tải lại
          </Button>
        </Grid>
        <Grid item xs={6} md={1.5} py={0}>
          <ExportToExcel resData={onExport?.data} columnsTable={onExport?.column} />
        </Grid>
        <Grid item xs={6} md={1.5} py={0}>
          <CreateNN_DCTT_SongSuoi isEdit={false} setPostSuccess={handlePostSuccess} />
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default ToolBar
