import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  tenChuHoCT: ''
  loaiCongTrinh: ''
  xa: ''
  huyen: ''
  tenNguonNuocKhaiThac: ''
  mucDichSD: ''
  uocTinhLuongNuocKT: number
  dienTichTuoi: number
  dienTichNuoiTrongThuySan: number
  congSuatPhatDien: number
  soHoDanDuocCapNuoc: ''
  cheDoKT: ''
  filePDF: ''
  ghiChu: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [SLDTKTSDN_NuocMatData, setSLDTKTSDN_NuocMatData] = useState<State>({
    id: data?.id || 0,
    tenChuHoCT: data?.tenChuHoCT || '',
    loaiCongTrinh: data?.loaiCongTrinh || '',
    xa: data?.xa || '',
    huyen: data?.huyen || '',
    tenNguonNuocKhaiThac: data?.tenNguonNuocKhaiThac || '',
    mucDichSD: data?.mucDichSD || '',
    uocTinhLuongNuocKT: data?.uocTinhLuongNuocKT || 0,
    dienTichTuoi: data?.dienTichTuoi || 0,
    dienTichNuoiTrongThuySan: data?.dienTichNuoiTrongThuySan || 0,
    congSuatPhatDien: data?.congSuatPhatDien || 0,
    soHoDanDuocCapNuoc: data?.soHoDanDuocCapNuoc || '',
    cheDoKT: data?.cheDoKT || '',
    filePDF: data?.filePDF || '',
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setSLDTKTSDN_NuocMatData({ ...SLDTKTSDN_NuocMatData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('SLDTKTSDN_NuocMat/luu', SLDTKTSDN_NuocMatData)
        if (res) {
          // Reset form fields
          setSLDTKTSDN_NuocMatData({
            id: 0,
            tenChuHoCT: '',
            loaiCongTrinh: '',
            xa: '',
            huyen: '',
            tenNguonNuocKhaiThac: '',
            mucDichSD: '',
            uocTinhLuongNuocKT: 0,
            dienTichTuoi: 0,
            dienTichNuoiTrongThuySan: 0,
            congSuatPhatDien: 0,
            soHoDanDuocCapNuoc: '',
            cheDoKT: '',
            filePDF: '',
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
    setSLDTKTSDN_NuocMatData({
      id: 0,
      tenChuHoCT: '',
      loaiCongTrinh: '',
      xa: '',
      huyen: '',
      tenNguonNuocKhaiThac: '',
      mucDichSD: '',
      uocTinhLuongNuocKT: 0,
      dienTichTuoi: 0,
      dienTichNuoiTrongThuySan: 0,
      congSuatPhatDien: 0,
      soHoDanDuocCapNuoc: '',
      cheDoKT: '',
      filePDF: '',
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
            value={SLDTKTSDN_NuocMatData.tenChuHoCT || ''}
            onChange={event => handleChange('tenChuHoCT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Xã'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NuocMatData.xa || ''}
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
            value={SLDTKTSDN_NuocMatData.huyen || ''}
            onChange={event => handleChange('huyen')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Loại công trinh'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NuocMatData.loaiCongTrinh || ''}
            onChange={event => handleChange('loaiCongTrinh')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tên nguồn nước khai thác'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NuocMatData.tenNguonNuocKhaiThac || ''}
            onChange={event => handleChange('tenNguonNuocKhaiThac')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Mục đích sử dụng'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NuocMatData.mucDichSD || ''}
            onChange={event => handleChange('mucDichSD')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ước tính lượng nước khai thác'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NuocMatData.uocTinhLuongNuocKT || ''}
            onChange={event => handleChange('uocTinhLuongNuocKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Diện tích tưới'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NuocMatData.dienTichTuoi || ''}
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
            value={SLDTKTSDN_NuocMatData.dienTichNuoiTrongThuySan || ''}
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
            value={SLDTKTSDN_NuocMatData.congSuatPhatDien || ''}
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
            value={SLDTKTSDN_NuocMatData.soHoDanDuocCapNuoc || ''}
            onChange={event => handleChange('soHoDanDuocCapNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chế độ khai thác'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NuocMatData.cheDoKT || ''}
            onChange={event => handleChange('cheDoKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='File PDF'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NuocMatData.filePDF || ''}
            onChange={event => handleChange('filePDF')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NuocMatData.ghiChu || ''}
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

const CreateSLDTKTSDN_NuocMat = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateSLDTKTSDN_NuocMat
