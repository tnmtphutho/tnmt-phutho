import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number,
  kyHieuCT: '',
  tenTaiLieuHoSo: '',
  tenToChucThucHienQuanTrac: '',
  nguoiThanhLapHoSo: '',
  nguoiKiemTraHoSo: '',
  filePDF: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [HSKTT_NDDData, setHSKTT_NDDData] = useState<State>({
    id: data?.id || 0,
    kyHieuCT: data?.kyHieuCT || '',
    tenTaiLieuHoSo: data?.tenTaiLieuHoSo || '',
    tenToChucThucHienQuanTrac: data?.tenToChucThucHienQuanTrac || '',
    nguoiThanhLapHoSo: data?.nguoiThanhLapHoSo || '',
    nguoiKiemTraHoSo: data?.nguoiKiemTraHoSo || '',
    filePDF: data?.filePDF || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setHSKTT_NDDData({ ...HSKTT_NDDData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('HSKTT_NDD/luu', HSKTT_NDDData)
        if (res) {
          // Reset form fields
          setHSKTT_NDDData({
            id: 0,
            kyHieuCT: '',
            tenTaiLieuHoSo: '',
            tenToChucThucHienQuanTrac: '',
            nguoiThanhLapHoSo: '',
            nguoiKiemTraHoSo: '',
            filePDF: ''
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
    setHSKTT_NDDData({
      id: 0,
      kyHieuCT: '',
      tenTaiLieuHoSo: '',
      tenToChucThucHienQuanTrac: '',
      nguoiThanhLapHoSo: '',
      nguoiKiemTraHoSo: '',
      filePDF: ''
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
            label='Ký hiệu công trình'
            fullWidth
            placeholder=''
            value={HSKTT_NDDData.kyHieuCT || ''}
            onChange={event => handleChange('kyHieuCT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tên tài liệu hồ sơ'
            fullWidth
            placeholder=''
            value={HSKTT_NDDData.tenTaiLieuHoSo || ''}
            onChange={event => handleChange('tenTaiLieuHoSo')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tên tổ chức thực hiện quan trắc'
            fullWidth
            placeholder=''
            value={HSKTT_NDDData.tenToChucThucHienQuanTrac || ''}
            onChange={event => handleChange('tenToChucThucHienQuanTrac')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Người thành lập hồ sơ'
            fullWidth
            placeholder=''
            value={HSKTT_NDDData.nguoiThanhLapHoSo || ''}
            onChange={event => handleChange('nguoiThanhLapHoSo')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Người kiểm tra hồ sơ'
            fullWidth
            placeholder=''
            value={HSKTT_NDDData.nguoiKiemTraHoSo || ''}
            onChange={event => handleChange('nguoiKiemTraHoSo')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='File PDF'
            fullWidth
            placeholder=''
            value={HSKTT_NDDData.filePDF || ''}
            onChange={event => handleChange('filePDF')(event.target.value)}
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

const CreateHSKTT_NDD = ({ data, setPostSuccess, isEdit }: any) => {
  const formTitle = isEdit ? 'Thay đổi thông tin tài khoản' : 'Thêm tài khoản mới'

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

export default CreateHSKTT_NDD
