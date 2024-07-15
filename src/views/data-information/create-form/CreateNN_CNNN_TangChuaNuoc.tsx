import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  viTriPhamVi: ''
  xaPhuongTT: ''
  huyenTP: ''
  tenTCN: ''
  loaiChuaNuoc: ''
  chieuSauPhanBo: number
  chucNangNguonNuoc: number
  mucTieuChatLuongNuoc: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [NN_CNNN_TangChuaNuocData, setNN_CNNN_TangChuaNuocData] = useState<State>({
    id: data?.id || 0,
    viTriPhamVi: data?.viTriPhamVi || '',
    xaPhuongTT: data?.xaPhuongTT || '',
    huyenTP: data?.huyenTP || '',
    tenTCN: data?.tenTCN || '',
    loaiChuaNuoc: data?.loaiChuaNuoc || '',
    chieuSauPhanBo: data?.chieuSauPhanBo || 0,
    chucNangNguonNuoc: data?.chucNangNguonNuoc || 0,
    mucTieuChatLuongNuoc: data?.mucTieuChatLuongNuoc || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setNN_CNNN_TangChuaNuocData({ ...NN_CNNN_TangChuaNuocData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('NN_CNNN_TangChuaNuoc/luu', NN_CNNN_TangChuaNuocData)
        if (res) {
          // Reset form fields
          setNN_CNNN_TangChuaNuocData({
            id: 0,
            viTriPhamVi: '',
            xaPhuongTT: '',
            huyenTP: '',
            tenTCN: '',
            loaiChuaNuoc: '',
            chieuSauPhanBo: 0,
            chucNangNguonNuoc: 0,
            mucTieuChatLuongNuoc: ''
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
    setNN_CNNN_TangChuaNuocData({
      id: 0,
      viTriPhamVi: '',
      xaPhuongTT: '',
      huyenTP: '',
      tenTCN: '',
      loaiChuaNuoc: '',
      chieuSauPhanBo: 0,
      chucNangNguonNuoc: 0,
      mucTieuChatLuongNuoc: ''
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
            value={NN_CNNN_TangChuaNuocData.viTriPhamVi || ''}
            onChange={event => handleChange('viTriPhamVi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Xã/Phường/Thị trấn'
            fullWidth
            placeholder=''
            value={NN_CNNN_TangChuaNuocData.xaPhuongTT || ''}
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
            value={NN_CNNN_TangChuaNuocData.huyenTP || ''}
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
            value={NN_CNNN_TangChuaNuocData.tenTCN || ''}
            onChange={event => handleChange('tenTCN')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Dung tích toàn bộ (triệu m3)'
            fullWidth
            placeholder=''
            value={NN_CNNN_TangChuaNuocData.loaiChuaNuoc || ''}
            onChange={event => handleChange('loaiChuaNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Dung tích hữu ích (triệu m3)'
            fullWidth
            placeholder=''
            value={NN_CNNN_TangChuaNuocData.chieuSauPhanBo || ''}
            onChange={event => handleChange('chieuSauPhanBo')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Năm hoàn thành'
            fullWidth
            placeholder=''
            value={NN_CNNN_TangChuaNuocData.chucNangNguonNuoc || ''}
            onChange={event => handleChange('chucNangNguonNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đơn vị quản lý vận hành'
            fullWidth
            placeholder=''
            value={NN_CNNN_TangChuaNuocData.mucTieuChatLuongNuoc || ''}
            onChange={event => handleChange('mucTieuChatLuongNuoc')(event.target.value)}
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

const CreateNN_CNNN_TangChuaNuoc = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateNN_CNNN_TangChuaNuoc
