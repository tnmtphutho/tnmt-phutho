import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  tenVungCamHanChe: ''
  dienTichVungCamHanChe: ''
  xa: ''
  huyen: ''
  tinhTP: ''
  phamViChieuSau: number
  cacBienPhapHanCheKT: number
  qdPheDuyetVungCamKT: number
  ghiChu: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [NN_VungCamHanCheKTNDDData, setNN_VungCamHanCheKTNDDData] = useState<State>({
    id: data?.id || 0,
    tenVungCamHanChe: data?.tenVungCamHanChe || '',
    dienTichVungCamHanChe: data?.dienTichVungCamHanChe || '',
    xa: data?.xa || '',
    huyen: data?.huyen || '',
    tinhTP: data?.tinhTP || '',
    phamViChieuSau: data?.phamViChieuSau || 0,
    cacBienPhapHanCheKT: data?.cacBienPhapHanCheKT || 0,
    qdPheDuyetVungCamKT: data?.qdPheDuyetVungCamKT || 0,
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setNN_VungCamHanCheKTNDDData({ ...NN_VungCamHanCheKTNDDData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('NN_VungCamHanCheKTNDD/luu', NN_VungCamHanCheKTNDDData)
        if (res) {
          // Reset form fields
          setNN_VungCamHanCheKTNDDData({
            id: 0,
            tenVungCamHanChe: '',
            dienTichVungCamHanChe: '',
            xa: '',
            huyen: '',
            tinhTP: '',
            phamViChieuSau: 0,
            cacBienPhapHanCheKT: 0,
            qdPheDuyetVungCamKT: 0,
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
    setNN_VungCamHanCheKTNDDData({
      id: 0,
      tenVungCamHanChe: '',
      dienTichVungCamHanChe: '',
      xa: '',
      huyen: '',
      tinhTP: '',
      phamViChieuSau: 0,
      cacBienPhapHanCheKT: 0,
      qdPheDuyetVungCamKT: 0,
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
            label='Tên vùng cấm/vùng hạn chế'
            fullWidth
            placeholder=''
            value={NN_VungCamHanCheKTNDDData.tenVungCamHanChe || ''}
            onChange={event => handleChange('tenVungCamHanChe')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Diện tích vùng cấm/vùng hạn chế (km2)'
            fullWidth
            placeholder=''
            value={NN_VungCamHanCheKTNDDData.dienTichVungCamHanChe || ''}
            onChange={event => handleChange('dienTichVungCamHanChe')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Xã'
            fullWidth
            placeholder=''
            value={NN_VungCamHanCheKTNDDData.xa || ''}
            onChange={event => handleChange('xa')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Huyện'
            fullWidth
            placeholder=''
            value={NN_VungCamHanCheKTNDDData.huyen || ''}
            onChange={event => handleChange('huyen')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tỉnh/Thành phố'
            fullWidth
            placeholder=''
            value={NN_VungCamHanCheKTNDDData.tinhTP || ''}
            onChange={event => handleChange('tinhTP')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Phạm vi chiều sâu hoặc tầng chứa nước hạn chế KT (m)'
            fullWidth
            placeholder=''
            value={NN_VungCamHanCheKTNDDData.phamViChieuSau || ''}
            onChange={event => handleChange('phamViChieuSau')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Các biện pháp hạn chế khai thác'
            fullWidth
            placeholder=''
            value={NN_VungCamHanCheKTNDDData.cacBienPhapHanCheKT || ''}
            onChange={event => handleChange('cacBienPhapHanCheKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='QĐ phê duyệt vùng cấm khai thác'
            fullWidth
            placeholder=''
            value={NN_VungCamHanCheKTNDDData.qdPheDuyetVungCamKT || ''}
            onChange={event => handleChange('qdPheDuyetVungCamKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={NN_VungCamHanCheKTNDDData.ghiChu || ''}
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

const CreateNN_VungCamHanCheKTNDD = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateNN_VungCamHanCheKTNDD
