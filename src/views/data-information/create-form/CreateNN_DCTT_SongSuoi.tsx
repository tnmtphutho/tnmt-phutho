import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  tenSong: ''
  thuocLVS: ''
  tenDiem: ''
  xaPhuongTT: ''
  huyenTP: ''
  x: number
  y: number
  dienTichViTriXacDinhQtt: number
  qtt: number
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [NN_DCTT_SongSuoiData, setNN_DCTT_SongSuoiData] = useState<State>({
    id: data?.id || 0,
    tenSong: data?.tenSong || '',
    thuocLVS: data?.thuocLVS || '',
    tenDiem: data?.tenDiem || '',
    xaPhuongTT: data?.xaPhuongTT || '',
    huyenTP: data?.huyenTP || '',
    x: data?.x || 0,
    y: data?.y || 0,
    dienTichViTriXacDinhQtt: data?.dienTichViTriXacDinhQtt || 0,
    qtt: data?.qtt || 0
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setNN_DCTT_SongSuoiData({ ...NN_DCTT_SongSuoiData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('NN_DCTT_SongSuoi/luu', NN_DCTT_SongSuoiData)
        if (res) {
          // Reset form fields
          setNN_DCTT_SongSuoiData({
            id: 0,
            tenSong: '',
            thuocLVS: '',
            tenDiem: '',
            xaPhuongTT: '',
            huyenTP: '',
            x: 0,
            y: 0,
            dienTichViTriXacDinhQtt: 0,
            qtt: 0
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
    setNN_DCTT_SongSuoiData({
      id: 0,
      tenSong: '',
      thuocLVS: '',
      tenDiem: '',
      xaPhuongTT: '',
      huyenTP: '',
      x: 0,
      y: 0,
      dienTichViTriXacDinhQtt: 0,
      qtt: 0
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
            label='Tên sông'
            fullWidth
            placeholder=''
            value={NN_DCTT_SongSuoiData.tenSong || ''}
            onChange={event => handleChange('tenSong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thuộc lưu vực sông'
            fullWidth
            placeholder=''
            value={NN_DCTT_SongSuoiData.thuocLVS || ''}
            onChange={event => handleChange('thuocLVS')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tên điểm'
            fullWidth
            placeholder=''
            value={NN_DCTT_SongSuoiData.tenDiem || ''}
            onChange={event => handleChange('tenDiem')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Xã/Phường/Thị trấn'
            fullWidth
            placeholder=''
            value={NN_DCTT_SongSuoiData.xaPhuongTT || ''}
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
            value={NN_DCTT_SongSuoiData.huyenTP || ''}
            onChange={event => handleChange('huyenTP')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='X'
            fullWidth
            placeholder=''
            value={NN_DCTT_SongSuoiData.x || ''}
            onChange={event => handleChange('x')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Y'
            fullWidth
            placeholder=''
            value={NN_DCTT_SongSuoiData.y || ''}
            onChange={event => handleChange('y')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Diện tích đến vị trí xác định Qtt (km2)'
            fullWidth
            placeholder=''
            value={NN_DCTT_SongSuoiData.dienTichViTriXacDinhQtt || ''}
            onChange={event => handleChange('dienTichViTriXacDinhQtt')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Qtt (m3/s)'
            fullWidth
            placeholder=''
            value={NN_DCTT_SongSuoiData.qtt || ''}
            onChange={event => handleChange('qtt')(event.target.value)}
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

const CreateNN_DCTT_SongSuoi = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateNN_DCTT_SongSuoi
