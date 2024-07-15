import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  tenCongTrinh: ''
  tenTCN: ''
  namVanHanh: ''
  xa: ''
  huyen: ''
  x: number
  y: number
  tenSong: ''
  luuVucSong: ''
  caoTrinhDap: ''
  caoTrinhNguongTran: ''
  luuLuongXaLuTK: number
  luuLuongXaLuKT: number
  dungTichChet: number
  soToMay: ''
  soGP: ''
  ngayQuyetDinh: ''
  thoiGianHieuLuc: ''
  idCongTrinh: ''
  thoiGianBatDauKetNoi: ''
  cheDoKT: ''
  ghiChu: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [CTKTSDN_PDK_NuocMatData, setCTKTSDN_PDK_NuocMatData] = useState<State>({
    id: data?.id || 0,
    tenCongTrinh: data?.tenCongTrinh || '',
    tenTCN: data?.tenTCN || '',
    namVanHanh: data?.namVanHanh || '',
    xa: data?.xa || '',
    huyen: data?.huyen || '',
    x: data?.x || 0,
    y: data?.y || 0,
    tenSong: data?.tenSong || '',
    luuVucSong: data?.luuVucSong || '',
    caoTrinhDap: data?.caoTrinhDap || '',
    caoTrinhNguongTran: data?.caoTrinhNguongTran || '',
    luuLuongXaLuTK: data?.luuLuongXaLuTK || 0,
    luuLuongXaLuKT: data?.luuLuongXaLuKT || 0,
    dungTichChet: data?.dungTichChet || 0,
    soToMay: data?.soToMay || '',
    soGP: data?.soGP || '',
    ngayQuyetDinh: data?.ngayQuyetDinh || '',
    thoiGianHieuLuc: data?.thoiGianHieuLuc || '',
    idCongTrinh: data?.idCongTrinh || '',
    thoiGianBatDauKetNoi: data?.thoiGianBatDauKetNoi || '',
    cheDoKT: data?.cheDoKT || '',
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setCTKTSDN_PDK_NuocMatData({ ...CTKTSDN_PDK_NuocMatData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('CTKTSDN_PDK_NuocMat/luu', CTKTSDN_PDK_NuocMatData)
        if (res) {
          // Reset form fields
          setCTKTSDN_PDK_NuocMatData({
            id: 0,
            tenCongTrinh: '',
            tenTCN: '',
            namVanHanh: '',
            xa: '',
            huyen: '',
            x: 0,
            y: 0,
            tenSong: '',
            luuVucSong: '',
            caoTrinhDap: '',
            caoTrinhNguongTran: '',
            luuLuongXaLuTK: 0,
            luuLuongXaLuKT: 0,
            dungTichChet: 0,
            soToMay: '',
            soGP: '',
            ngayQuyetDinh: '',
            thoiGianHieuLuc: '',
            idCongTrinh: '',
            thoiGianBatDauKetNoi: '',
            cheDoKT: '',
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
    setCTKTSDN_PDK_NuocMatData({
      id: 0,
      tenCongTrinh: '',
      tenTCN: '',
      namVanHanh: '',
      xa: '',
      huyen: '',
      x: 0,
      y: 0,
      tenSong: '',
      luuVucSong: '',
      caoTrinhDap: '',
      caoTrinhNguongTran: '',
      luuLuongXaLuTK: 0,
      luuLuongXaLuKT: 0,
      dungTichChet: 0,
      soToMay: '',
      soGP: '',
      ngayQuyetDinh: '',
      thoiGianHieuLuc: '',
      idCongTrinh: '',
      thoiGianBatDauKetNoi: '',
      cheDoKT: '',
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
            value={CTKTSDN_PDK_NuocMatData.tenCongTrinh || ''}
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
            value={CTKTSDN_PDK_NuocMatData.tenTCN || ''}
            onChange={event => handleChange('tenTCN')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Năm vận hành'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NuocMatData.namVanHanh || ''}
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
            value={CTKTSDN_PDK_NuocMatData.xa || ''}
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
            value={CTKTSDN_PDK_NuocMatData.huyen || ''}
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
            value={CTKTSDN_PDK_NuocMatData.x || ''}
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
            value={CTKTSDN_PDK_NuocMatData.y || ''}
            onChange={event => handleChange('y')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tên sông'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NuocMatData.tenSong || ''}
            onChange={event => handleChange('tenSong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Lưu vực sông'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NuocMatData.luuVucSong || ''}
            onChange={event => handleChange('luuVucSong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Cao trình đập'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NuocMatData.caoTrinhDap || ''}
            onChange={event => handleChange('caoTrinhDap')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Cao trình ngưỡng tràn'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NuocMatData.caoTrinhNguongTran || ''}
            onChange={event => handleChange('caoTrinhNguongTran')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Lưu lượng xả lũ thiết kế'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NuocMatData.luuLuongXaLuTK || ''}
            onChange={event => handleChange('luuLuongXaLuTK')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Lưu lượng xả lũ khai thác'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NuocMatData.luuLuongXaLuKT || ''}
            onChange={event => handleChange('luuLuongXaLuKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Dung tích chết'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NuocMatData.dungTichChet || ''}
            onChange={event => handleChange('dungTichChet')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số tổ máy'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NuocMatData.soToMay || ''}
            onChange={event => handleChange('soToMay')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số GP'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NuocMatData.soGP || ''}
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
            value={CTKTSDN_PDK_NuocMatData.ngayQuyetDinh || ''}
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
            value={CTKTSDN_PDK_NuocMatData.thoiGianHieuLuc || ''}
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
            value={CTKTSDN_PDK_NuocMatData.idCongTrinh || ''}
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
            value={CTKTSDN_PDK_NuocMatData.thoiGianBatDauKetNoi || ''}
            onChange={event => handleChange('thoiGianBatDauKetNoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chế độ khai thác'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NuocMatData.cheDoKT || ''}
            onChange={event => handleChange('cheDoKT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={CTKTSDN_PDK_NuocMatData.ghiChu || ''}
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

const CreateCTKTSDN_PDK_NuocMat = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateCTKTSDN_PDK_NuocMat
