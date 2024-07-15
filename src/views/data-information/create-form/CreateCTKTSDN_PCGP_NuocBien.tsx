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
  tenVungbien: ''
  cheDoLayNuoc: ''
  diemLayNuoc: ''
  congSuatTho: number
  congSuatTinh: number
  soToMay: ''
  luuLuongKTMax: number
  soMayBom: number
  diemXaNuocLamMat: ''
  luuLuongXaMax: number
  congSuatThietKe: number
  phuongThucKT: ''
  mucDichKT: ''
  cheDoKT: ''
  soGP: ''
  ngayQuyetDinh: ''
  thoiGianHieuLuc: ''
  idCongTrinh: ''
  thoiGianBatDauKetNoi: ''
  ghiChu: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [CTKTSDN_PCGP_NuocBienData, setCTKTSDN_PCGP_NuocBienData] = useState<State>({
    id: data?.id || 0,
    tenCongTrinh: data?.tenCongTrinh || '',
    tenTCCN: data?.tenTCCN || '',
    namVanHanh: data?.namVanHanh || '',
    xa: data?.xa || '',
    huyen: data?.huyen || '',
    x: data?.x || 0,
    y: data?.y || 0,
    tenVungbien: data?.tenVungbien || '',
    cheDoLayNuoc: data?.cheDoLayNuoc || '',
    diemLayNuoc: data?.diemLayNuoc || '',
    congSuatTho: data?.congSuatTho || 0,
    congSuatTinh: data?.congSuatTinh || 0,
    soToMay: data?.soToMay || '',
    luuLuongKTMax: data?.luuLuongKTMax || 0,
    soMayBom: data?.soMayBom || 0,
    diemXaNuocLamMat: data?.diemXaNuocLamMat || '',
    luuLuongXaMax: data?.luuLuongXaMax || 0,
    congSuatThietKe: data?.congSuatThietKe || 0,
    phuongThucKT: data?.phuongThucKT || '',
    mucDichKT: data?.mucDichKT || '',
    cheDoKT: data?.cheDoKT || '',
    soGP: data?.soGP || '',
    ngayQuyetDinh: data?.ngayQuyetDinh || '',
    thoiGianHieuLuc: data?.thoiGianHieuLuc || '',
    idCongTrinh: data?.idCongTrinh || '',
    thoiGianBatDauKetNoi: data?.thoiGianBatDauKetNoi || '',
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setCTKTSDN_PCGP_NuocBienData({ ...CTKTSDN_PCGP_NuocBienData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('CTKTSDN_PCGP_NuocBien/luu', CTKTSDN_PCGP_NuocBienData)
        if (res) {
          // Reset form fields
          setCTKTSDN_PCGP_NuocBienData({
            id: 0,
            tenCongTrinh: '',
            tenTCCN: '',
            namVanHanh: '',
            xa: '',
            huyen: '',
            x: 0,
            y: 0,
            tenVungbien: '',
            cheDoLayNuoc: '',
            diemLayNuoc: '',
            congSuatTho: 0,
            congSuatTinh: 0,
            soToMay: '',
            luuLuongKTMax: 0,
            soMayBom: 0,
            diemXaNuocLamMat: '',
            luuLuongXaMax: 0,
            congSuatThietKe: 0,
            phuongThucKT: '',
            mucDichKT: '',
            cheDoKT: '',
            soGP: '',
            ngayQuyetDinh: '',
            thoiGianHieuLuc: '',
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
    setCTKTSDN_PCGP_NuocBienData({
      id: 0,
      tenCongTrinh: '',
      tenTCCN: '',
      namVanHanh: '',
      xa: '',
      huyen: '',
      x: 0,
      y: 0,
      tenVungbien: '',
      cheDoLayNuoc: '',
      diemLayNuoc: '',
      congSuatTho: 0,
      congSuatTinh: 0,
      soToMay: '',
      luuLuongKTMax: 0,
      soMayBom: 0,
      diemXaNuocLamMat: '',
      luuLuongXaMax: 0,
      congSuatThietKe: 0,
      phuongThucKT: '',
      mucDichKT: '',
      cheDoKT: '',
      soGP: '',
      ngayQuyetDinh: '',
      thoiGianHieuLuc: '',
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
            value={CTKTSDN_PCGP_NuocBienData.tenCongTrinh || ''}
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
            value={CTKTSDN_PCGP_NuocBienData.tenTCCN || ''}
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
            value={CTKTSDN_PCGP_NuocBienData.namVanHanh || ''}
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
            value={CTKTSDN_PCGP_NuocBienData.xa || ''}
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
            value={CTKTSDN_PCGP_NuocBienData.huyen || ''}
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
            value={CTKTSDN_PCGP_NuocBienData.x || ''}
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
            value={CTKTSDN_PCGP_NuocBienData.y || ''}
            onChange={event => handleChange('y')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tên vùng biển'
            fullWidth
            placeholder=''
            value={CTKTSDN_PCGP_NuocBienData.tenVungbien || ''}
            onChange={event => handleChange('tenVungbien')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chế độ lấy nước'
            fullWidth
            placeholder=''
            value={CTKTSDN_PCGP_NuocBienData.cheDoLayNuoc || ''}
            onChange={event => handleChange('cheDoLayNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Điểm lấy nước'
            fullWidth
            placeholder=''
            value={CTKTSDN_PCGP_NuocBienData.diemLayNuoc || ''}
            onChange={event => handleChange('diemLayNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công suất thô'
            fullWidth
            placeholder=''
            value={CTKTSDN_PCGP_NuocBienData.congSuatTho || ''}
            onChange={event => handleChange('congSuatTho')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công suất tĩnh'
            fullWidth
            placeholder=''
            value={CTKTSDN_PCGP_NuocBienData.congSuatTinh || ''}
            onChange={event => handleChange('congSuatTinh')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số tổ máy'
            fullWidth
            placeholder=''
            value={CTKTSDN_PCGP_NuocBienData.soToMay || ''}
            onChange={event => handleChange('soToMay')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Lưu lượng khai thác lớn nhất'
            fullWidth
            placeholder=''
            value={CTKTSDN_PCGP_NuocBienData.luuLuongKTMax || ''}
            onChange={event => handleChange('luuLuongKTMax')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số máy bơm'
            fullWidth
            placeholder=''
            value={CTKTSDN_PCGP_NuocBienData.soMayBom || ''}
            onChange={event => handleChange('soMayBom')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Điểm xả nước làm mát'
            fullWidth
            placeholder=''
            value={CTKTSDN_PCGP_NuocBienData.diemXaNuocLamMat || ''}
            onChange={event => handleChange('diemXaNuocLamMat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Lưu lượng xả lớn nhất'
            fullWidth
            placeholder=''
            value={CTKTSDN_PCGP_NuocBienData.luuLuongXaMax || ''}
            onChange={event => handleChange('luuLuongXaMax')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Công suất thiết kế'
            fullWidth
            placeholder=''
            value={CTKTSDN_PCGP_NuocBienData.congSuatThietKe || ''}
            onChange={event => handleChange('congSuatThietKe')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Phương thúc khai thác'
            fullWidth
            placeholder=''
            value={CTKTSDN_PCGP_NuocBienData.phuongThucKT || ''}
            onChange={event => handleChange('phuongThucKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Mục đích khai thác'
            fullWidth
            placeholder=''
            value={CTKTSDN_PCGP_NuocBienData.mucDichKT || ''}
            onChange={event => handleChange('mucDichKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chế độ khai thác'
            fullWidth
            placeholder=''
            value={CTKTSDN_PCGP_NuocBienData.cheDoKT || ''}
            onChange={event => handleChange('cheDoKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số GP'
            fullWidth
            placeholder=''
            value={CTKTSDN_PCGP_NuocBienData.soGP || ''}
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
            value={CTKTSDN_PCGP_NuocBienData.ngayQuyetDinh || ''}
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
            value={CTKTSDN_PCGP_NuocBienData.thoiGianHieuLuc || ''}
            onChange={event => handleChange('thoiGianHieuLuc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='ID công trình'
            fullWidth
            placeholder=''
            value={CTKTSDN_PCGP_NuocBienData.idCongTrinh || ''}
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
            value={CTKTSDN_PCGP_NuocBienData.thoiGianBatDauKetNoi || ''}
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
            value={CTKTSDN_PCGP_NuocBienData.ghiChu || ''}
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

const CreateCTKTSDN_PCGP_NuocBien = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateCTKTSDN_PCGP_NuocBien
