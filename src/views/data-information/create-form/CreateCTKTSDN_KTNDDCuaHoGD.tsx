import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  tenCongTrinh: ''
  tenTCCN: ''
  xa: ''
  huyen: ''
  x: number
  y: number
  soThuaDat: ''
  chieuSauGieng: number
  soNguoiSD: number
  tinhTrangChatLuongNuoc: ''
  tinhTrangKeKhai: ''
  ghiChu: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [CTKTSDN_KTNDDCuaHoGDData, setCTKTSDN_KTNDDCuaHoGDData] = useState<State>({
    id: data?.id || 0,
    tenCongTrinh: data?.tenCongTrinh || '',
    tenTCCN: data?.tenTCCN || '',
    xa: data?.xa || '',
    huyen: data?.huyen || '',
    x: data?.x || 0,
    y: data?.y || 0,
    soThuaDat: data?.soThuaDat || '',
    chieuSauGieng: data?.chieuSauGieng || 0,
    soNguoiSD: data?.soNguoiSD || 0,
    tinhTrangChatLuongNuoc: data?.tinhTrangChatLuongNuoc || '',
    tinhTrangKeKhai: data?.tinhTrangKeKhai || '',
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setCTKTSDN_KTNDDCuaHoGDData({ ...CTKTSDN_KTNDDCuaHoGDData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('CTKTSDN_KTNDDCuaHoGD/luu', CTKTSDN_KTNDDCuaHoGDData)
        if (res) {
          // Reset form fields
          setCTKTSDN_KTNDDCuaHoGDData({
            id: 0,
            tenCongTrinh: '',
            tenTCCN: '',
            xa: '',
            huyen: '',
            x: 0,
            y: 0,
            soThuaDat: '',
            chieuSauGieng: 0,
            soNguoiSD: 0,
            tinhTrangChatLuongNuoc: '',
            tinhTrangKeKhai: '',
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
    setCTKTSDN_KTNDDCuaHoGDData({
      id: 0,
      tenCongTrinh: '',
      tenTCCN: '',
      xa: '',
      huyen: '',
      x: 0,
      y: 0,
      soThuaDat: '',
      chieuSauGieng: 0,
      soNguoiSD: 0,
      tinhTrangChatLuongNuoc: '',
      tinhTrangKeKhai: '',
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
            label='Tên công trình'
            fullWidth
            placeholder=''
            value={CTKTSDN_KTNDDCuaHoGDData.tenCongTrinh || ''}
            onChange={event => handleChange('tenCongTrinh')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tên tổ chức cá nhân'
            fullWidth
            placeholder=''
            value={CTKTSDN_KTNDDCuaHoGDData.tenTCCN || ''}
            onChange={event => handleChange('tenTCCN')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Xã'
            fullWidth
            placeholder=''
            value={CTKTSDN_KTNDDCuaHoGDData.xa || ''}
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
            value={CTKTSDN_KTNDDCuaHoGDData.huyen || ''}
            onChange={event => handleChange('huyen')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Toạ độ X'
            fullWidth
            placeholder=''
            value={CTKTSDN_KTNDDCuaHoGDData.x || ''}
            onChange={event => handleChange('x')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Toạ độ Y'
            fullWidth
            placeholder=''
            value={CTKTSDN_KTNDDCuaHoGDData.y || ''}
            onChange={event => handleChange('y')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số thửa đất'
            fullWidth
            placeholder=''
            value={CTKTSDN_KTNDDCuaHoGDData.soThuaDat || ''}
            onChange={event => handleChange('soThuaDat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chiều sâu giếng'
            fullWidth
            placeholder=''
            value={CTKTSDN_KTNDDCuaHoGDData.chieuSauGieng || ''}
            onChange={event => handleChange('chieuSauGieng')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số người sử dụng'
            fullWidth
            placeholder=''
            value={CTKTSDN_KTNDDCuaHoGDData.soNguoiSD || ''}
            onChange={event => handleChange('soNguoiSD')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tình trạng chất lượng nước'
            fullWidth
            placeholder=''
            value={CTKTSDN_KTNDDCuaHoGDData.tinhTrangChatLuongNuoc || ''}
            onChange={event => handleChange('tinhTrangChatLuongNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tình trạng kê khai'
            fullWidth
            placeholder=''
            value={CTKTSDN_KTNDDCuaHoGDData.tinhTrangKeKhai || ''}
            onChange={event => handleChange('tinhTrangKeKhai')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={CTKTSDN_KTNDDCuaHoGDData.ghiChu || ''}
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

const CreateCTKTSDN_KTNDDCuaHoGD = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateCTKTSDN_KTNDDCuaHoGD
