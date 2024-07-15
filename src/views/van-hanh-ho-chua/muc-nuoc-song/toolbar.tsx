//import { Replay, Search } from '@mui/icons-material'
import { Button, Grid, TextField, Toolbar } from '@mui/material'

import { FC } from 'react'
import { Add, Replay, Search } from '@mui/icons-material'
import ExportTableToExcel from 'src/@core/components/export-excel/export-csv'

interface ToolBarProps {
  tableId: string
}
const ToolBar: FC<ToolBarProps> = ({ tableId }) => {
  return (
    <Toolbar variant='dense'>
      <Grid container spacing={2} sx={{ paddingY: 3 }} className='_flexEnd '>
        <Grid item xs={12} md={3} py={0}>
          <TextField sx={{ p: 0 }} size='small' fullWidth variant='outlined' placeholder='Tên trạm...' />
        </Grid>
        <Grid item xs={6} md={1.5} py={0}>
          <Button variant='outlined' size='small' fullWidth sx={{ borderRadius: 0 }} startIcon={<Search />}>
            Tìm kiếm
          </Button>
        </Grid>
        <Grid item xs={6} md={1.5} py={0}>
          <Button variant='outlined' size='small' fullWidth sx={{ borderRadius: 0 }} startIcon={<Replay />}>
            Tải lại
          </Button>
        </Grid>
        <Grid item xs={6} md={1.5} py={0}>
          <ExportTableToExcel filename='luongmuahientai' tableId={tableId} />
        </Grid>
        <Grid item xs={6} md={1.5} py={0}>
          <Button variant='outlined' size='small' fullWidth sx={{ borderRadius: 0 }} startIcon={<Add />}>
            Thêm mới
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default ToolBar
