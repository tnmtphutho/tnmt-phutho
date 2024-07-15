import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  tenCongTrinh: ''
  tenTCCN: ''
  namVanHanh: ''
  xa: ''
  huyen: ''
  x: number
  y: number
  luuVuc: ''
  tangChuaNuoc: ''
  soGieng: number
  chieuSauCacGieng: number
  toaDoCacGieng: number
  mucDichKT: ''
  soToMay: ''
  tongLuuLuongKT: number
  cheDoKT: ''
  phuongThucKT: ''
  thoiGianVanHanh: ''
  tinhHinhCapGP: ''
  soGP: ''
  ngayQuyetDinh: ''
  thoiGianHieuLuc: ''
  thoiGianKetThuc: ''
  idCongTrinh: ''
  thoiGianBatDauKetNoi: ''
  ghiChu: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [CTKTSDN_PDK_NDDData, setCTKTSDN_PDK_NDDData] = useState<State>({
    id: data?.id || 0,
    tenCongTrinh: data?.tenCongTrinh || '',
    tenTCCN: data?.tenTCCN || '',
    namVanHanh: data?.namVanHanh || '',
    xa: data?.xa || '',
    huyen: data?.huyen || '',
    x: data?.x || 0,
    y: data?.y || 0,
    luuVuc: data?.luuVuc || '',
    tangChuaNuoc: data?.tangChuaNuoc || '',
    soGieng: data?.soGieng || 0,
    chieuSauCacGieng: data?.chieuSauCacGieng || 0,
    toaDoCacGieng: data?.toaDoCacGieng || 0,
    mucDichKT: data?.mucDichKT || '',
    soToMay: data?.soToMay || '',
    tongLuuLuongKT: data?.tongLuuLuongKT || 0,
    cheDoKT: data?.cheDoKT || '',
    phuongThucKT: data?.phuongThucKT || '',
    thoiGianVanHanh: data?.thoiGianVanHanh || '',
    tinhHinhCapGP: data?.tinhHinhCapGP || '',
    soGP: data?.soGP || '',
    ngayQuyetDinh: data?.ngayQuyetDinh || '',
    thoiGianHieuLuc: data?.thoiGianHieuLuc || '',
    thoiGianKetThuc: data?.thoiGianKetThuc || '',
    idCongTrinh: data?.idCongTrinh || '',
    thoiGianBatDauKetNoi: data?.thoiGianBatDauKetNoi || '',
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setCTKTSDN_PDK_NDDData({ ...CTKTSDN_PDK_NDDData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('CTKTSDN_PDK_NDD/luu', CTKTSDN_PDK_NDDData)
        if (res) {
          // Reset form fields
          setCTKTSDN_PDK_NDDData({
            id: 0,
            tenCongTrinh: '',
            tenTCCN: '',
            namVanHanh: '',
            xa: '',
            huyen: '',
            x: 0,
            y: 0,
            luuVuc: '',
            tangChuaNuoc: '',
            soGieng: 0,
            chieuSauCacGieng: 0,
            toaDoCacGieng: 0,
            mucDichKT: '',
            soToMay: '',
            tongLuuLuongKT: 0,
            cheDoKT: '',
            phuongThucKT: '',
            thoiGianVanHanh: '',
            tinhHinhCapGP: '',
            soGP: '',
            ngayQuyetDinh: '',
            thoiGianHieuLuc: '',
            thoiGianKetThuc: '',
            idCongTrinh: '',
            thoiGianBatDauKetNoi: '',
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
    setCTKTSDN_PDK_NDDData({
      id: 0,
      tenCongTrinh: '',
      tenTCCN: '',
      namVanHanh: '',
      xa: '',
      huyen: '',
      x: 0,
      y: 0,
      luuVuc: '',
      tangChuaNuoc: '',
      soGieng: 0,
      chieuSauCacGieng: 0,
      toaDoCacGieng: 0,
      mucDichKT: '',
      soToMay: '',
      tongLuuLuongKT: 0,
      cheDoKT: '',
      phuongThucKT: '',
      thoiGianVanHanh: '',
      tinhHinhCapGP: '',
      soGP: '',
      ngayQuyetDinh: '',
      thoiGianHieuLuc: '',
      thoiGianKetThuc: '',
      idCongTrinh: '',
      thoiGianBatDauKetNoi: '',
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
            value={CTKTSDN_PDK_NDDData.tenCongTrinh || ''}
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
            value={CTKTSDN_PDK_NDDData.tenTCCN || ''}
            onChange={event => handleChange('tenTCCN')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Năm vận hành'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.namVanHanh || ''}
            onChange={event => handleChange('namVanHanh')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Xã'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.xa || ''}
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
            value={CTKTSDN_PDK_NDDData.huyen || ''}
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
            value={CTKTSDN_PDK_NDDData.x || ''}
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
            value={CTKTSDN_PDK_NDDData.y || ''}
            onChange={event => handleChange('y')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Lưu vực'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.luuVuc || ''}
            onChange={event => handleChange('luuVuc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tầng chứa nước'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.tangChuaNuoc || ''}
            onChange={event => handleChange('tangChuaNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số giếng'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.soGieng || ''}
            onChange={event => handleChange('soGieng')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chiều sâu các giếng'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.chieuSauCacGieng || ''}
            onChange={event => handleChange('chieuSauCacGieng')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Toạ độ các giếng'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.toaDoCacGieng || ''}
            onChange={event => handleChange('toaDoCacGieng')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Mục đích khai thác'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.mucDichKT || ''}
            onChange={event => handleChange('mucDichKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số tổ máy'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.soToMay || ''}
            onChange={event => handleChange('soToMay')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tổng lưu lượng khai thác'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.tongLuuLuongKT || ''}
            onChange={event => handleChange('tongLuuLuongKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chế độ khai thác'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.cheDoKT || ''}
            onChange={event => handleChange('cheDoKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Phương thức khai thác'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.phuongThucKT || ''}
            onChange={event => handleChange('phuongThucKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thời gian vận hành'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.thoiGianVanHanh || ''}
            onChange={event => handleChange('thoiGianVanHanh')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tình hình cấp GP'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.tinhHinhCapGP || ''}
            onChange={event => handleChange('tinhHinhCapGP')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số GP'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.soGP || ''}
            onChange={event => handleChange('soGP')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ngày quyết định'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.ngayQuyetDinh || ''}
            onChange={event => handleChange('ngayQuyetDinh')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thời gian hiệu lực'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.thoiGianHieuLuc || ''}
            onChange={event => handleChange('thoiGianHieuLuc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thời gian kết thúc'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.thoiGianKetThuc || ''}
            onChange={event => handleChange('thoiGianKetThuc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='ID công trình'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.idCongTrinh || ''}
            onChange={event => handleChange('idCongTrinh')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thời gian bắt đầu kết nối'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.thoiGianBatDauKetNoi || ''}
            onChange={event => handleChange('thoiGianBatDauKetNoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NDDData.ghiChu || ''}
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

const CreateCTKTSDN_PDK_NDD = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateCTKTSDN_PDK_NDD
