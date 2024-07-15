import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  tenTCN: ''
  loaiChuaNuoc: ''
  xa: ''
  huyen: ''
  tinhTP: ''
  dienTichPhanBo: number
  khoangChieuSauPhanBo: number
  nguongGHKTLuuLuong: number
  nguongGHKTMucNuoc: number
  qdPheDuyetNguongGioiHanKT: ''
  ghiChu: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [NN_NguongKhaiThacNDDData, setNN_NguongKhaiThacNDDData] = useState<State>({
    id: data?.id || 0,
    tenTCN: data?.tenTCN || '',
    loaiChuaNuoc: data?.loaiChuaNuoc || '',
    xa: data?.xa || '',
    huyen: data?.huyen || '',
    tinhTP: data?.tinhTP || '',
    dienTichPhanBo: data?.dienTichPhanBo || 0,
    khoangChieuSauPhanBo: data?.khoangChieuSauPhanBo || 0,
    nguongGHKTLuuLuong: data?.nguongGHKTLuuLuong || 0,
    nguongGHKTMucNuoc: data?.nguongGHKTMucNuoc || 0,
    qdPheDuyetNguongGioiHanKT: data?.qdPheDuyetNguongGioiHanKT || '',
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setNN_NguongKhaiThacNDDData({ ...NN_NguongKhaiThacNDDData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('NN_NguongKhaiThacNDD/luu', NN_NguongKhaiThacNDDData)
        if (res) {
          // Reset form fields
          setNN_NguongKhaiThacNDDData({
            id: 0,
            tenTCN: '',
            loaiChuaNuoc: '',
            xa: '',
            huyen: '',
            tinhTP: '',
            dienTichPhanBo: 0,
            khoangChieuSauPhanBo: 0,
            nguongGHKTLuuLuong: 0,
            nguongGHKTMucNuoc: 0,
            qdPheDuyetNguongGioiHanKT: '',
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
    setNN_NguongKhaiThacNDDData({
      id: 0,
      tenTCN: '',
      loaiChuaNuoc: '',
      xa: '',
      huyen: '',
      tinhTP: '',
      dienTichPhanBo: 0,
      khoangChieuSauPhanBo: 0,
      nguongGHKTLuuLuong: 0,
      nguongGHKTMucNuoc: 0,
      qdPheDuyetNguongGioiHanKT: '',
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
            label='Tên tầng chứa nước'
            fullWidth
            placeholder=''
            value={NN_NguongKhaiThacNDDData.tenTCN || ''}
            onChange={event => handleChange('tenTCN')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Loại chứa nước (lỗ hổng, khe nứt)'
            fullWidth
            placeholder=''
            value={NN_NguongKhaiThacNDDData.loaiChuaNuoc || ''}
            onChange={event => handleChange('loaiChuaNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Xã'
            fullWidth
            placeholder=''
            value={NN_NguongKhaiThacNDDData.xa || ''}
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
            value={NN_NguongKhaiThacNDDData.huyen || ''}
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
            value={NN_NguongKhaiThacNDDData.tinhTP || ''}
            onChange={event => handleChange('tinhTP')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Diện tích phân bố (km2)'
            fullWidth
            placeholder=''
            value={NN_NguongKhaiThacNDDData.dienTichPhanBo || ''}
            onChange={event => handleChange('dienTichPhanBo')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Khoảng chiều sâu phân bố (m)'
            fullWidth
            placeholder=''
            value={NN_NguongKhaiThacNDDData.khoangChieuSauPhanBo || ''}
            onChange={event => handleChange('khoangChieuSauPhanBo')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ngưỡng GHKT về lưu lượng (m3/ngày đêm)'
            fullWidth
            placeholder=''
            value={NN_NguongKhaiThacNDDData.nguongGHKTLuuLuong || ''}
            onChange={event => handleChange('nguongGHKTLuuLuong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ngưỡng GHKT về mực nước (m)'
            fullWidth
            placeholder=''
            value={NN_NguongKhaiThacNDDData.nguongGHKTMucNuoc || ''}
            onChange={event => handleChange('nguongGHKTMucNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='QĐ phê duyệt ngưỡng giới hạn KT'
            fullWidth
            placeholder=''
            value={NN_NguongKhaiThacNDDData.qdPheDuyetNguongGioiHanKT || ''}
            onChange={event => handleChange('qdPheDuyetNguongGioiHanKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={NN_NguongKhaiThacNDDData.ghiChu || ''}
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

const CreateNN_NguongKhaiThacNDD = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateNN_NguongKhaiThacNDD
