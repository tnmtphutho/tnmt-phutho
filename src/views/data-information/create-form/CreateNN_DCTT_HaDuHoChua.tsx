import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  tenCT: ''
  thuocLVS: ''
  xaPhuongTT: ''
  huyenTP: ''
  nguonNuocKhaiThac: ''
  qttSauDap: number
  qttSauCT: number
  qttQuyDinhKhac: number
  loaiHinhCT: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [NN_DCTT_HaDuHoChuaData, setNN_DCTT_HaDuHoChuaData] = useState<State>({
    id: data?.id || 0,
    tenCT: data?.tenCT || '',
    thuocLVS: data?.thuocLVS || '',
    xaPhuongTT: data?.xaPhuongTT || '',
    huyenTP: data?.huyenTP || '',
    nguonNuocKhaiThac: data?.nguonNuocKhaiThac || '',
    qttSauDap: data?.qttSauDap || 0,
    qttSauCT: data?.qttSauCT || 0,
    qttQuyDinhKhac: data?.qttQuyDinhKhac || 0,
    loaiHinhCT: data?.loaiHinhCT || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setNN_DCTT_HaDuHoChuaData({ ...NN_DCTT_HaDuHoChuaData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('NN_DCTT_HaDuHoChua/luu', NN_DCTT_HaDuHoChuaData)
        if (res) {
          // Reset form fields
          setNN_DCTT_HaDuHoChuaData({
            id: 0,
            tenCT: '',
            thuocLVS: '',
            xaPhuongTT: '',
            huyenTP: '',
            nguonNuocKhaiThac: '',
            qttSauDap: 0,
            qttSauCT: 0,
            qttQuyDinhKhac: 0,
            loaiHinhCT: ''
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
    setNN_DCTT_HaDuHoChuaData({
      id: 0,
      tenCT: '',
      thuocLVS: '',
      xaPhuongTT: '',
      huyenTP: '',
      nguonNuocKhaiThac: '',
      qttSauDap: 0,
      qttSauCT: 0,
      qttQuyDinhKhac: 0,
      loaiHinhCT: ''
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
            label='Tên công trình'
            fullWidth
            placeholder=''
            value={NN_DCTT_HaDuHoChuaData.tenCT || ''}
            onChange={event => handleChange('tenCT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thuộc lưu vực sông'
            fullWidth
            placeholder=''
            value={NN_DCTT_HaDuHoChuaData.thuocLVS || ''}
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
            value={NN_DCTT_HaDuHoChuaData.xaPhuongTT || ''}
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
            value={NN_DCTT_HaDuHoChuaData.huyenTP || ''}
            onChange={event => handleChange('huyenTP')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Nguồn nước khai thác'
            fullWidth
            placeholder=''
            value={NN_DCTT_HaDuHoChuaData.nguonNuocKhaiThac || ''}
            onChange={event => handleChange('nguonNuocKhaiThac')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Qtt sau đập (m3/s)'
            fullWidth
            placeholder=''
            value={NN_DCTT_HaDuHoChuaData.qttSauDap || ''}
            onChange={event => handleChange('qttSauDap')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Qtt sau công trình (m3/s)'
            fullWidth
            placeholder=''
            value={NN_DCTT_HaDuHoChuaData.qttSauCT || ''}
            onChange={event => handleChange('qttSauCT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Qtt quy định khác (m3/s)'
            fullWidth
            placeholder=''
            value={NN_DCTT_HaDuHoChuaData.qttQuyDinhKhac || ''}
            onChange={event => handleChange('qttQuyDinhKhac')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Loại hình công trình'
            fullWidth
            placeholder=''
            value={NN_DCTT_HaDuHoChuaData.loaiHinhCT || ''}
            onChange={event => handleChange('loaiHinhCT')(event.target.value)}
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

const CreateNN_DCTT_HaDuHoChua = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateNN_DCTT_HaDuHoChua
