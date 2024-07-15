import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  soHieuMatCat: ''
  tenSongSuoi: ''
  thuocLVS: ''
  xBoTrai: number
  yBoTrai: number
  xBoPhai: number
  yBoPhai: number
  xa: ''
  huyen: ''
  tinhTP: ''
  soHieuDiem: ''
  khoangCach: number
  caoDoDaySong: number
  thoiGianDo: ''
  mucNuocSong: number
  donViDoDacKhaoSat: ''
  ghiChu: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [NN_MatCatSongSuoiData, setNN_MatCatSongSuoiData] = useState<State>({
    id: data?.id || 0,
    soHieuMatCat: data?.soHieuMatCat || '',
    tenSongSuoi: data?.tenSongSuoi || '',
    thuocLVS: data?.thuocLVS || '',
    xBoTrai: data?.xBoTrai || 0,
    yBoTrai: data?.yBoTrai || 0,
    xBoPhai: data?.xBoPhai || 0,
    yBoPhai: data?.yBoPhai || 0,
    xa: data?.xa || '',
    huyen: data?.huyen || '',
    tinhTP: data?.tinhTP || '',
    soHieuDiem: data?.soHieuDiem || '',
    khoangCach: data?.khoangCach || 0,
    caoDoDaySong: data?.caoDoDaySong || 0,
    thoiGianDo: data?.thoiGianDo || '',
    mucNuocSong: data?.mucNuocSong || 0,
    donViDoDacKhaoSat: data?.donViDoDacKhaoSat || '',
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setNN_MatCatSongSuoiData({ ...NN_MatCatSongSuoiData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('NN_MatCatSongSuoi/luu', NN_MatCatSongSuoiData)
        if (res) {
          // Reset form fields
          setNN_MatCatSongSuoiData({
            id: 0,
            soHieuMatCat: '',
            tenSongSuoi: '',
            thuocLVS: '',
            xBoTrai: 0,
            yBoTrai: 0,
            xBoPhai: 0,
            yBoPhai: 0,
            xa: '',
            huyen: '',
            tinhTP: '',
            soHieuDiem: '',
            khoangCach: 0,
            caoDoDaySong: 0,
            thoiGianDo: '',
            mucNuocSong: 0,
            donViDoDacKhaoSat: '',
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
    setNN_MatCatSongSuoiData({
      id: 0,
      soHieuMatCat: '',
      tenSongSuoi: '',
      thuocLVS: '',
      xBoTrai: 0,
      yBoTrai: 0,
      xBoPhai: 0,
      yBoPhai: 0,
      xa: '',
      huyen: '',
      tinhTP: '',
      soHieuDiem: '',
      khoangCach: 0,
      caoDoDaySong: 0,
      thoiGianDo: '',
      mucNuocSong: 0,
      donViDoDacKhaoSat: '',
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
            label='Số hiệu mặt cắt'
            fullWidth
            placeholder=''
            value={NN_MatCatSongSuoiData.soHieuMatCat || ''}
            onChange={event => handleChange('soHieuMatCat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tên sông suối'
            fullWidth
            placeholder=''
            value={NN_MatCatSongSuoiData.tenSongSuoi || ''}
            onChange={event => handleChange('tenSongSuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thuộc lưu vực sông'
            fullWidth
            placeholder=''
            value={NN_MatCatSongSuoiData.thuocLVS || ''}
            onChange={event => handleChange('thuocLVS')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tọa độ X bờ trái'
            fullWidth
            placeholder=''
            value={NN_MatCatSongSuoiData.xBoTrai || ''}
            onChange={event => handleChange('xBoTrai')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tọa độ y bờ trái'
            fullWidth
            placeholder=''
            value={NN_MatCatSongSuoiData.yBoTrai || ''}
            onChange={event => handleChange('yBoTrai')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tọa độ X bờ phải'
            fullWidth
            placeholder=''
            value={NN_MatCatSongSuoiData.xBoPhai || ''}
            onChange={event => handleChange('xBoPhai')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tọa độ y bờ phải'
            fullWidth
            placeholder=''
            value={NN_MatCatSongSuoiData.yBoPhai || ''}
            onChange={event => handleChange('yBoPhai')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Xã'
            fullWidth
            placeholder=''
            value={NN_MatCatSongSuoiData.xa || ''}
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
            value={NN_MatCatSongSuoiData.huyen || ''}
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
            value={NN_MatCatSongSuoiData.tinhTP || ''}
            onChange={event => handleChange('tinhTP')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Số hiệu điểm'
            fullWidth
            placeholder=''
            value={NN_MatCatSongSuoiData.soHieuDiem || ''}
            onChange={event => handleChange('soHieuDiem')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Khoảng cách (m)'
            fullWidth
            placeholder=''
            value={NN_MatCatSongSuoiData.khoangCach || ''}
            onChange={event => handleChange('khoangCach')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Cao độ đáy sông (m)'
            fullWidth
            placeholder=''
            value={NN_MatCatSongSuoiData.caoDoDaySong || ''}
            onChange={event => handleChange('caoDoDaySong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thời gian đo'
            fullWidth
            placeholder=''
            value={NN_MatCatSongSuoiData.thoiGianDo || ''}
            onChange={event => handleChange('thoiGianDo')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Mực nước sông (m)'
            fullWidth
            placeholder=''
            value={NN_MatCatSongSuoiData.mucNuocSong || ''}
            onChange={event => handleChange('mucNuocSong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đơn vị đo đạc khảo sát'
            fullWidth
            placeholder=''
            value={NN_MatCatSongSuoiData.donViDoDacKhaoSat || ''}
            onChange={event => handleChange('donViDoDacKhaoSat')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={NN_MatCatSongSuoiData.ghiChu || ''}
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

const CreateNN_MatCatSongSuoi = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateNN_MatCatSongSuoi
