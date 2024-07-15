import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  tenHoChua: ''
  thuocLVS: ''
  xaPhuongTT: ''
  huyenTP: ''
  dienTichMatNuoc: number
  dungTichToanBo: number
  dungTichHuuIch: number
  namHoanThanh: number
  donViQuanLyVanHanh: ''
  chucNangNguonNuoc: ''
  mucTieuChatLuong: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [NN_CNNN_HoData, setNN_CNNN_HoData] = useState<State>({
    id: data?.id || 0,
    tenHoChua: data?.tenHoChua || '',
    thuocLVS: data?.thuocLVS || '',
    xaPhuongTT: data?.xaPhuongTT || '',
    huyenTP: data?.huyenTP || '',
    dienTichMatNuoc: data?.dienTichMatNuoc || 0,
    dungTichToanBo: data?.dungTichToanBo || 0,
    dungTichHuuIch: data?.dungTichHuuIch || 0,
    namHoanThanh: data?.namHoanThanh || 0,
    donViQuanLyVanHanh: data?.donViQuanLyVanHanh || '',
    chucNangNguonNuoc: data?.chucNangNguonNuoc || '',
    mucTieuChatLuong: data?.mucTieuChatLuong || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setNN_CNNN_HoData({ ...NN_CNNN_HoData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('NN_CNNN_Ho/luu', NN_CNNN_HoData)
        if (res) {
          // Reset form fields
          setNN_CNNN_HoData({
            id: 0,
            tenHoChua: '',
            thuocLVS: '',
            xaPhuongTT: '',
            huyenTP: '',
            dienTichMatNuoc: 0,
            dungTichToanBo: 0,
            dungTichHuuIch: 0,
            namHoanThanh: 0,
            donViQuanLyVanHanh: '',
            chucNangNguonNuoc: '',
            mucTieuChatLuong: ''
          })

          typeof setPostSuccess === 'function' ? setPostSuccess(true) : ''
          closeDialogs()
        }
      } catch (error) {
        console.log(error)
      } finally {
        6
        setSaving(false)
      }
    }

    // Call the function
    handleApiCall()
  }

  const handleClose = () => {
    setNN_CNNN_HoData({
      id: 0,
      tenHoChua: '',
      thuocLVS: '',
      xaPhuongTT: '',
      huyenTP: '',
      dienTichMatNuoc: 0,
      dungTichToanBo: 0,
      dungTichHuuIch: 0,
      namHoanThanh: 0,
      donViQuanLyVanHanh: '',
      chucNangNguonNuoc: '',
      mucTieuChatLuong: ''
    })

    closeDialogs()
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tên hồ chứa'
            fullWidth
            placeholder=''
            value={NN_CNNN_HoData.tenHoChua || ''}
            onChange={event => handleChange('tenHoChua')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thuộc lưu vực sông'
            fullWidth
            placeholder=''
            value={NN_CNNN_HoData.thuocLVS || ''}
            onChange={event => handleChange('thuocLVS')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Xã/Phường/Thị trấn'
            fullWidth
            placeholder=''
            value={NN_CNNN_HoData.xaPhuongTT || ''}
            onChange={event => handleChange('xaPhuongTT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Huyện/Thành phố'
            fullWidth
            placeholder=''
            value={NN_CNNN_HoData.huyenTP || ''}
            onChange={event => handleChange('huyenTP')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Diện tích mặt nước (km2)'
            fullWidth
            placeholder=''
            value={NN_CNNN_HoData.dienTichMatNuoc || ''}
            onChange={event => handleChange('dienTichMatNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Dung tích toàn bộ (triệu m3)'
            fullWidth
            placeholder=''
            value={NN_CNNN_HoData.dungTichToanBo || ''}
            onChange={event => handleChange('dungTichToanBo')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Dung tích hữu ích (triệu m3)'
            fullWidth
            placeholder=''
            value={NN_CNNN_HoData.dungTichHuuIch || ''}
            onChange={event => handleChange('dungTichHuuIch')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Năm hoàn thành'
            fullWidth
            placeholder=''
            value={NN_CNNN_HoData.namHoanThanh || ''}
            onChange={event => handleChange('namHoanThanh')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đơn vị quản lý vận hành'
            fullWidth
            placeholder=''
            value={NN_CNNN_HoData.donViQuanLyVanHanh || ''}
            onChange={event => handleChange('donViQuanLyVanHanh')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chức năng nguồn nước'
            fullWidth
            placeholder=''
            value={NN_CNNN_HoData.chucNangNguonNuoc || ''}
            onChange={event => handleChange('chucNangNguonNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Mục tiêu chất lượng'
            fullWidth
            placeholder=''
            value={NN_CNNN_HoData.mucTieuChatLuong || ''}
            onChange={event => handleChange('mucTieuChatLuong')(event.target.value)}
          />
        </Grid>
      </Grid>

      <DialogActions sx={{ p: 0, mt: 5 }}>
        <Button size='small' onClick={handleClose} className='btn cancleBtn'>
          Hủy
        </Button>
        <Button disabled={saving} className='btn saveBtn' onClick={handleSubmit}>
          {' '}
          {saving ? <CircularProgress color='inherit' size={20} /> : <Save />} &nbsp; Lưu{' '}
        </Button>
      </DialogActions>
    </>
  )
}

const CreateNN_CNNN_Ho = ({ data, setPostSuccess, isEdit }: any) => {
  const formTitle = isEdit ? 'Thay đổi thông tin' : 'Thêm mới'

  return (
    <DialogsControl>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          {isEdit ? (
            <EditNote
              className='tableActionBtn'
              onClick={() =>
                openDialogs(<Form data={data} setPostSuccess={setPostSuccess} closeDialogs={closeDialogs} />, formTitle)
              }
            />
          ) : (
            <IconButton
              aria-label='add user'
              onClick={() =>
                openDialogs(<Form setPostSuccess={setPostSuccess} closeDialogs={closeDialogs} />, formTitle)
              }
            >
              <PersonAddAlt sx={{ mr: 2 }} />
              <Typography>Thêm mới</Typography>
            </IconButton>
          )}
        </>
      )}
    </DialogsControl>
  )
}

export default CreateNN_CNNN_Ho
