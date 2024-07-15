import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: 0
  tenChuHoCT: ''
  xa: ''
  huyen: ''
  soLuongGieng: ''
  uocTinhLuongNuocKT: 0
  loaiCT: ''
  hinhThucKT: 0
  chieuSauKT: 0
  mucDichSD: 0
  tinhTrangSD: ''
  phieuDieuTraPDF: ''
  ghiChu: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [SLDTKTSDN_NDDData, setSLDTKTSDN_NDDData] = useState<State>({
    id: data?.id || 0,
    tenChuHoCT: data?.tenChuHoCT || '',
    xa: data?.xa || '',
    huyen: data?.huyen || '',
    soLuongGieng: data?.soLuongGieng || '',
    uocTinhLuongNuocKT: data?.uocTinhLuongNuocKT || 0,
    loaiCT: data?.loaiCT || '',
    hinhThucKT: data?.hinhThucKT || 0,
    chieuSauKT: data?.chieuSauKT || 0,
    mucDichSD: data?.mucDichSD || 0,
    tinhTrangSD: data?.tinhTrangSD || '',
    phieuDieuTraPDF: data?.phieuDieuTraPDF || '',
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setSLDTKTSDN_NDDData({ ...SLDTKTSDN_NDDData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('SLDTKTSDN_NDD/luu', SLDTKTSDN_NDDData)
        if (res) {
          // Reset form fields
          setSLDTKTSDN_NDDData({
            id: 0,
            tenChuHoCT: '',
            xa: '',
            huyen: '',
            soLuongGieng: '',
            uocTinhLuongNuocKT: 0,
            loaiCT: '',
            hinhThucKT: 0,
            chieuSauKT: 0,
            mucDichSD: 0,
            tinhTrangSD: '',
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
    setSLDTKTSDN_NDDData({
      id: 0,
      tenChuHoCT: '',
      xa: '',
      huyen: '',
      soLuongGieng: '',
      uocTinhLuongNuocKT: 0,
      loaiCT: '',
      hinhThucKT: 0,
      chieuSauKT: 0,
      mucDichSD: 0,
      tinhTrangSD: '',
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
            value={SLDTKTSDN_NDDData.tenChuHoCT || ''}
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
            value={SLDTKTSDN_NDDData.xa || ''}
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
            value={SLDTKTSDN_NDDData.huyen || ''}
            onChange={event => handleChange('huyen')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số lượng giếng'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NDDData.soLuongGieng || ''}
            onChange={event => handleChange('soLuongGieng')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ước tính lượng nước khai thác'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NDDData.uocTinhLuongNuocKT || ''}
            onChange={event => handleChange('uocTinhLuongNuocKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Loại công trình'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NDDData.loaiCT || ''}
            onChange={event => handleChange('loaiCT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Hình thức khai thác'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NDDData.hinhThucKT || ''}
            onChange={event => handleChange('hinhThucKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chiều sâu khai thác'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NDDData.chieuSauKT || ''}
            onChange={event => handleChange('chieuSauKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Mục đích sử dụng'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NDDData.mucDichSD || ''}
            onChange={event => handleChange('mucDichSD')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tình trạng sử dụng'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NDDData.tinhTrangSD || ''}
            onChange={event => handleChange('tinhTrangSD')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Phiếu điều tra PDF'
            fullWidth
            placeholder=''
            value={SLDTKTSDN_NDDData.phieuDieuTraPDF || ''}
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
            value={SLDTKTSDN_NDDData.ghiChu || ''}
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

const CreateSLDTKTSDN_NDD = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateSLDTKTSDN_NDD
