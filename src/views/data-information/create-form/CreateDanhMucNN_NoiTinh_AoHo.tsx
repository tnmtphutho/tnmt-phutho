import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  maHo: ''
  tenHoChua: ''
  xaPhuongTT: ''
  huyenTP: ''
  nguonNuoc: ''
  thuocHeThongSong: ''
  ghiChu: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [DanhMucNN_NoiTinh_AoHoData, setDanhMucNN_NoiTinh_AoHoData] = useState<State>({
    id: data?.id || 0,
    maHo: data?.maHo || '',
    tenHoChua: data?.tenHoChua || '',
    xaPhuongTT: data?.xaPhuongTT || '',
    huyenTP: data?.huyenTP || '',
    nguonNuoc: data?.nguonNuoc || '',
    thuocHeThongSong: data?.thuocHeThongSong || '',
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setDanhMucNN_NoiTinh_AoHoData({ ...DanhMucNN_NoiTinh_AoHoData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('DanhMucNN_NoiTinh_AoHo/luu', DanhMucNN_NoiTinh_AoHoData)
        if (res) {
          // Reset form fields
          setDanhMucNN_NoiTinh_AoHoData({
            id: 0,
            maHo: '',
            tenHoChua: '',
            xaPhuongTT: '',
            huyenTP: '',
            nguonNuoc: '',
            thuocHeThongSong: '',
            ghiChu: ''
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
    setDanhMucNN_NoiTinh_AoHoData({
      id: 0,
      maHo: '',
      tenHoChua: '',
      xaPhuongTT: '',
      huyenTP: '',
      nguonNuoc: '',
      thuocHeThongSong: '',
      ghiChu: ''
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
            label='Mã hồ'
            fullWidth
            placeholder=''
            value={DanhMucNN_NoiTinh_AoHoData.maHo || ''}
            onChange={event => handleChange('maHo')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tên hồ chứa'
            fullWidth
            placeholder=''
            value={DanhMucNN_NoiTinh_AoHoData.tenHoChua || ''}
            onChange={event => handleChange('tenHoChua')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Xã/Phường/Thị trấn'
            fullWidth
            placeholder=''
            value={DanhMucNN_NoiTinh_AoHoData.xaPhuongTT || ''}
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
            value={DanhMucNN_NoiTinh_AoHoData.huyenTP || ''}
            onChange={event => handleChange('huyenTP')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Nguồn nước'
            fullWidth
            placeholder=''
            value={DanhMucNN_NoiTinh_AoHoData.nguonNuoc || ''}
            onChange={event => handleChange('nguonNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thuộc hệ thống sông'
            fullWidth
            placeholder=''
            value={DanhMucNN_NoiTinh_AoHoData.thuocHeThongSong || ''}
            onChange={event => handleChange('thuocHeThongSong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={DanhMucNN_NoiTinh_AoHoData.ghiChu || ''}
            onChange={event => handleChange('ghiChu')(event.target.value)}
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

const CreateDanhMucNN_NoiTinh_AoHo = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateDanhMucNN_NoiTinh_AoHo
