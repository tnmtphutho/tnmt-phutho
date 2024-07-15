import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  tenChuHoCT: ''
  loaiHinhNuocThai: ''
  xa: ''
  huyen: ''
  quyMo: ''
  mucDichSD: ''
  dienTichTuoi: number
  dienTichNuoiTrongThuySan: number
  congSuatPhatDien: number
  soHoDanDuocCapNuoc: ''
  cheDoKT: ''
  phieuDieuTraPDF: ''
  ghiChu: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [SLDTKTSDN_XaThaiData, setSLDTKTSDN_XaThaiData] = useState<State>({
    id: data?.id || 0,
    tenChuHoCT: data?.tenChuHoCT || '',
    loaiHinhNuocThai: data?.loaiHinhNuocThai || '',
    xa: data?.xa || '',
    huyen: data?.huyen || '',
    quyMo: data?.quyMo || '',
    mucDichSD: data?.mucDichSD || '',
    dienTichTuoi: data?.dienTichTuoi || 0,
    dienTichNuoiTrongThuySan: data?.dienTichNuoiTrongThuySan || 0,
    congSuatPhatDien: data?.congSuatPhatDien || 0,
    soHoDanDuocCapNuoc: data?.soHoDanDuocCapNuoc || '',
    cheDoKT: data?.cheDoKT || '',
    phieuDieuTraPDF: data?.phieuDieuTraPDF || '',
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setSLDTKTSDN_XaThaiData({ ...SLDTKTSDN_XaThaiData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('SLDTKTSDN_XaThai/luu', SLDTKTSDN_XaThaiData)
        if (res) {
          // Reset form fields
          setSLDTKTSDN_XaThaiData({
            id: 0,
            tenChuHoCT: '',
            loaiHinhNuocThai: '',
            xa: '',
            huyen: '',
            quyMo: '',
            mucDichSD: '',
            dienTichTuoi: 0,
            dienTichNuoiTrongThuySan: 0,
            congSuatPhatDien: 0,
            soHoDanDuocCapNuoc: '',
            cheDoKT: '',
            phieuDieuTraPDF: '',
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
    setSLDTKTSDN_XaThaiData({
      id: 0,
      tenChuHoCT: '',
      loaiHinhNuocThai: '',
      xa: '',
      huyen: '',
      quyMo: '',
      mucDichSD: '',
      dienTichTuoi: 0,
      dienTichNuoiTrongThuySan: 0,
      congSuatPhatDien: 0,
      soHoDanDuocCapNuoc: '',
      cheDoKT: '',
      phieuDieuTraPDF: '',
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
            label='Tên chủ hộ công trình'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_XaThaiData.tenChuHoCT || ''}
            onChange={event => handleChange('tenChuHoCT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Loại hình nước thải'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_XaThaiData.loaiHinhNuocThai || ''}
            onChange={event => handleChange('loaiHinhNuocThai')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Xã'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_XaThaiData.xa || ''}
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
            value={SLDTKTSDN_XaThaiData.huyen || ''}
            onChange={event => handleChange('huyen')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Quy mô'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_XaThaiData.quyMo || ''}
            onChange={event => handleChange('quyMo')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Diện tích tưới'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_XaThaiData.dienTichTuoi || ''}
            onChange={event => handleChange('dienTichTuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Diện tích nuôi trồng thuỷ sản'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_XaThaiData.dienTichNuoiTrongThuySan || ''}
            onChange={event => handleChange('dienTichNuoiTrongThuySan')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công suất phát điện'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_XaThaiData.congSuatPhatDien || ''}
            onChange={event => handleChange('congSuatPhatDien')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số hộ dân được cấp nước'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_XaThaiData.soHoDanDuocCapNuoc || ''}
            onChange={event => handleChange('soHoDanDuocCapNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Mục đích sử dụng'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_XaThaiData.mucDichSD || ''}
            onChange={event => handleChange('mucDichSD')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chế độ khai thác'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_XaThaiData.cheDoKT || ''}
            onChange={event => handleChange('cheDoKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Phiếu điều tra PDF'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_XaThaiData.phieuDieuTraPDF || ''}
            onChange={event => handleChange('phieuDieuTraPDF')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_XaThaiData.ghiChu || ''}
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

const CreateSLDTKTSDN_XaThai = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateSLDTKTSDN_XaThai
