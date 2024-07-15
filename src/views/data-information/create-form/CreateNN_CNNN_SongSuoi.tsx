import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  maSong: ''
  tenSongSuoi: ''
  chayRa: number
  chieuDai: number
  diaPhanHanhChinh: ''
  huyen: ''
  xDiemDau: number
  yDiemDau: number
  xDiemCuoi: number
  yDiemCuoi: number
  chucNangNguonNuoc: ''
  mucTieuChatLuong: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [NN_CNNN_SongSuoiData, setNN_CNNN_SongSuoiData] = useState<State>({
    id: data?.id || 0,
    maSong: data?.maSong || '',
    tenSongSuoi: data?.tenSongSuoi || '',
    chayRa: data?.chayRa || 0,
    chieuDai: data?.chieuDai || 0,
    diaPhanHanhChinh: data?.diaPhanHanhChinh || '',
    huyen: data?.huyen || '',
    xDiemDau: data?.xDiemDau || 0,
    yDiemDau: data?.yDiemDau || 0,
    xDiemCuoi: data?.xDiemCuoi || 0,
    yDiemCuoi: data?.yDiemCuoi || 0,
    chucNangNguonNuoc: data?.chucNangNguonNuoc || '',
    mucTieuChatLuong: data?.mucTieuChatLuong || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setNN_CNNN_SongSuoiData({ ...NN_CNNN_SongSuoiData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('NN_CNNN_SongSuoi/luu', NN_CNNN_SongSuoiData)
        if (res) {
          // Reset form fields
          setNN_CNNN_SongSuoiData({
            id: 0,
            maSong: '',
            tenSongSuoi: '',
            chayRa: 0,
            chieuDai: 0,
            diaPhanHanhChinh: '',
            huyen: '',
            xDiemDau: 0,
            yDiemDau: 0,
            xDiemCuoi: 0,
            yDiemCuoi: 0,
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
    setNN_CNNN_SongSuoiData({
      id: 0,
      maSong: '',
      tenSongSuoi: '',
      chayRa: 0,
      chieuDai: 0,
      diaPhanHanhChinh: '',
      huyen: '',
      xDiemDau: 0,
      yDiemDau: 0,
      xDiemCuoi: 0,
      yDiemCuoi: 0,
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
            label='Mã sông'
            fullWidth
            placeholder=''
            value={NN_CNNN_SongSuoiData.maSong || ''}
            onChange={event => handleChange('maSong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tên sông suối'
            fullWidth
            placeholder=''
            value={NN_CNNN_SongSuoiData.tenSongSuoi || ''}
            onChange={event => handleChange('tenSongSuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chảy ra'
            fullWidth
            placeholder=''
            value={NN_CNNN_SongSuoiData.chayRa || ''}
            onChange={event => handleChange('chayRa')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chiều dài'
            fullWidth
            placeholder=''
            value={NN_CNNN_SongSuoiData.chieuDai || ''}
            onChange={event => handleChange('chieuDai')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Địa phận hành chính'
            fullWidth
            placeholder=''
            value={NN_CNNN_SongSuoiData.diaPhanHanhChinh || ''}
            onChange={event => handleChange('diaPhanHanhChinh')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Huyện'
            fullWidth
            placeholder=''
            value={NN_CNNN_SongSuoiData.huyen || ''}
            onChange={event => handleChange('huyen')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='X điểm đầu'
            fullWidth
            placeholder=''
            value={NN_CNNN_SongSuoiData.xDiemDau || ''}
            onChange={event => handleChange('xDiemDau')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Y điểm đầu'
            fullWidth
            placeholder=''
            value={NN_CNNN_SongSuoiData.yDiemDau || ''}
            onChange={event => handleChange('yDiemDau')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='X điểm cuối'
            fullWidth
            placeholder=''
            value={NN_CNNN_SongSuoiData.xDiemCuoi || ''}
            onChange={event => handleChange('xDiemCuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Y điểm cuối'
            fullWidth
            placeholder=''
            value={NN_CNNN_SongSuoiData.yDiemCuoi || ''}
            onChange={event => handleChange('yDiemCuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chức năng nguồn nước'
            fullWidth
            placeholder=''
            value={NN_CNNN_SongSuoiData.chucNangNguonNuoc || ''}
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
            value={NN_CNNN_SongSuoiData.mucTieuChatLuong || ''}
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

const CreateNN_CNNN_SongSuoi = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateNN_CNNN_SongSuoi
