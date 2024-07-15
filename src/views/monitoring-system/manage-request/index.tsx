import { useState, useEffect } from 'react'

// ** MUI Imports
import { Grid, Box, IconButton, Tooltip, Button, TextField, Typography } from '@mui/material';

// ** Icons Imports
import { EditNote, Delete, GroupAdd } from "@mui/icons-material";

import TableComponent from 'src/@core/components/table';



// id of columnsTable is parameter to bind ex: get LicseFk.BasinId: id: 'License_Fk.BasinId'
const columnsTable = [
  {
    id: 'stt', label: 'STT',
  },
  {
    id: 'UserName', label: 'Tài khoản đăng ký giám sát',
  },
  {
    id: 'FTPAddress', label: 'Địa chỉ FTP',
  }, {
    id: 'Password', label: 'Mật khẩu',
  },
  {
    id: 'WorkingDirectory', label: 'Thư mục lưu trữ',
  },
  {
    id: 'CameraLink', label: 'Camera',
  },
  {
    id: 'CreatedTime', label: 'Thời gian tạo',
  },
  { id: 'actions', label: 'Thao tác', },
];

const ManageRequestDetails = () => {

  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    setData([]);
    setColumns(columnsTable);

    // fetchData();
  }, []);

  const EditLicense = (row: any) => {
    console.log('Edit: ' + row.LicenseNumber)
  }

  const DeleteLicense = (row: any) => {
    console.log('Delete: ' + row.LicenseNumber)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12} sx={{ mt: 5 }} >
        <Box className='_search _row' sx={{ justifyContent: 'space-between' }}>
          <Typography variant='h6' p={1}>Danh sách tài khoản đăng ký kết nối truyền số liệu</Typography>
          <Grid md={4} sm={12} className='_row'>
              <TextField id="outlined-basic" label="Tìm kiếm" variant="outlined" />
              <Button size="small" variant="outlined">Tài khoản chưa được duyệt</Button>
              <Button size="small" variant="outlined">Thêm mới &nbsp; <GroupAdd/></Button>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <TableComponent columns={columns} rows={data}
          actions={(row: any) => (
            <Box>
              <Tooltip title="Chỉnh sửa giấy phép">
                <IconButton onClick={() => EditLicense(row)}>
                  <EditNote className='tableActionBtn' />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xóa giấy phép">
                <IconButton onClick={() => DeleteLicense(row)}>
                  <Delete className='tableActionBtn deleteBtn' />
                </IconButton>
              </Tooltip>
            </Box>
          )

          } />
      </Grid>
    </Grid>
  )
}

export default ManageRequestDetails
