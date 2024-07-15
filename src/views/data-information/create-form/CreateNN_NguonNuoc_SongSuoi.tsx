import { useState } from 'react'
import { Add, EditNote, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  maSong: string
  tenSongSuoi: string
  chayRa: number
  chieuDai: number
  diaPhanHanhChinh: string
  huyen: string
  xDiemDau: number
  yDiemDau: number
  xDiemCuoi: number
  yDiemCuoi: number
  chucNang: string
  phamViHanhLangBaoVe: string
  ghiChu: string
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [NN_NguonNuoc_SongSuoiData, setNN_NguonNuoc_SongSuoiData] = useState<State>({
    id: data?.id || 0,
    maSong: data?.maSong || '',
    tenSongSuoi: data?.tenSongSuoi || '',
    chayRa: data?.chayRa || 0,
    chieuDai: data?.chieuDai || 0,
    diaPhanHanhChinh: data?.diaPhanHanhChinh || '',
    huyen: data?.huyen || '',
    xDiemDau: data?.xDiemDau || 0,
    yDiemDau: data?.yDiemDau || 0,
    xDiemCuoi: data?.xDiemCuoi || 0,
    yDiemCuoi: data?.yDiemCuoi || 0,
    chucNang: data?.chucNang || '',
    phamViHanhLangBaoVe: data?.phamViHanhLangBaoVe || '',
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setNN_NguonNuoc_SongSuoiData({ ...NN_NguonNuoc_SongSuoiData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('NN_NguonNuoc_SongSuoi/luu', NN_NguonNuoc_SongSuoiData)
        if (res) {
          // Reset form fields
          setNN_NguonNuoc_SongSuoiData({
            id: 0,
            maSong: '',
            tenSongSuoi: '',
            chayRa: 0,
            chieuDai: 0,
            diaPhanHanhChinh: '',
            huyen: '',
            xDiemDau: 0,
            yDiemDau: 0,
            xDiemCuoi: 0,
            yDiemCuoi: 0,
            chucNang: '',
            phamViHanhLangBaoVe: '',
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
    setNN_NguonNuoc_SongSuoiData({
      id: 0,
      maSong: '',
      tenSongSuoi: '',
      chayRa: 0,
      chieuDai: 0,
      diaPhanHanhChinh: '',
      huyen: '',
      xDiemDau: 0,
      yDiemDau: 0,
      xDiemCuoi: 0,
      yDiemCuoi: 0,
      chucNang: '',
      phamViHanhLangBaoVe: '',
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
            label='Mã sông'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_SongSuoiData.maSong || ''}
            onChange={event => handleChange('maSong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tên sông'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_SongSuoiData.tenSongSuoi || ''}
            onChange={event => handleChange('tenSongSuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chảy ra'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_SongSuoiData.chayRa || ''}
            onChange={event => handleChange('chayRa')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chiều dài'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_SongSuoiData.chieuDai || ''}
            onChange={event => handleChange('chieuDai')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Địa phận hành chính'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_SongSuoiData.diaPhanHanhChinh || ''}
            onChange={event => handleChange('diaPhanHanhChinh')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Huyện'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_SongSuoiData.huyen || ''}
            onChange={event => handleChange('huyen')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='X điểm đầu'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_SongSuoiData.xDiemDau || ''}
            onChange={event => handleChange('xDiemDau')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Y điểm đầu'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_SongSuoiData.yDiemDau || ''}
            onChange={event => handleChange('yDiemDau')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='X điểm Cuối'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_SongSuoiData.xDiemCuoi || ''}
            onChange={event => handleChange('xDiemCuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Y điểm Cuối'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_SongSuoiData.yDiemCuoi || ''}
            onChange={event => handleChange('yDiemCuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_SongSuoiData.ghiChu || ''}
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

const CreateNN_NguonNuoc_SongSuoi = ({ data, setPostSuccess, isEdit }: any) => {
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
            <Button
              variant='outlined' size='small' fullWidth sx={{ borderRadius: 0 }}
              startIcon={<Add />}
              onClick={() =>
                openDialogs(<Form data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />, formTitle)
              }
            >
              Thêm
            </Button>
          )}
        </>
      )}
    </DialogsControl>
  )
}

export default CreateNN_NguonNuoc_SongSuoi
