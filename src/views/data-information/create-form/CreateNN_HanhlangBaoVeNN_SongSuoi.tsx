import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'
import { Dayjs } from "dayjs";

interface State {
  id: number,
  doanSong: string,
  chieuDai: number,
  diaPhanHanhChinh: string,
  huyen: string,
  xDiemDau: number,
  yDiemDau: number,
  xDiemCuoi: number,
  yDiemCuoi: number,
  chucNang: string,
  phamViHanhLangBaoVe: string,
  thoiGianThucHien: Dayjs | null
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [NN_HanhLangBaoVeNN_SongSuoiData, setNN_HanhLangBaoVeNN_SongSuoiData] = useState<State>({
    id: data?.id || 0,
    doanSong: data?.doanSong || '',
    chieuDai: data?.chieuDai || 0,
    huyen: data?.huyen || '',
    diaPhanHanhChinh: data?.diaPhanHanhChinh || '',
    xDiemDau: data?.xDiemDau || 0,
    yDiemDau: data?.yDiemDau || 0,
    xDiemCuoi: data?.xDiemCuoi || 0,
    yDiemCuoi: data?.yDiemCuoi || 0,
    chucNang: data?.chucNang || '',
    phamViHanhLangBaoVe: data?.phamViHanhLangBaoVe || '',
    thoiGianThucHien: data?.thoiGianThucHien || null
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setNN_HanhLangBaoVeNN_SongSuoiData({ ...NN_HanhLangBaoVeNN_SongSuoiData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('NN_HanhLangBaoVeNN_SongSuoi/luu', NN_HanhLangBaoVeNN_SongSuoiData)
        if (res) {
          // Reset form fields
          setNN_HanhLangBaoVeNN_SongSuoiData({
            id: 0,
            doanSong: '',
            chieuDai: 0,
            diaPhanHanhChinh: '',
            huyen: '',
            xDiemDau: 0,
            yDiemDau: 0,
            xDiemCuoi: 0,
            yDiemCuoi: 0,
            chucNang: '',
            phamViHanhLangBaoVe: '',
            thoiGianThucHien: null
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
    setNN_HanhLangBaoVeNN_SongSuoiData({
      id: 0,
      doanSong: '',
      chieuDai: 0,
      diaPhanHanhChinh: '',
      huyen: '',
      xDiemDau: 0,
      yDiemDau: 0,
      xDiemCuoi: 0,
      yDiemCuoi: 0,
      chucNang: '',
      phamViHanhLangBaoVe: '',
      thoiGianThucHien: null
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
            label='Đoạn sông'
            fullWidth
            placeholder=''
            value={NN_HanhLangBaoVeNN_SongSuoiData.doanSong || ''}
            onChange={event => handleChange('doanSong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chiều dài'
            fullWidth
            placeholder=''
            value={NN_HanhLangBaoVeNN_SongSuoiData.chieuDai || ''}
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
            value={NN_HanhLangBaoVeNN_SongSuoiData.diaPhanHanhChinh || ''}
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
            value={NN_HanhLangBaoVeNN_SongSuoiData.huyen || ''}
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
            value={NN_HanhLangBaoVeNN_SongSuoiData.xDiemDau || ''}
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
            value={NN_HanhLangBaoVeNN_SongSuoiData.yDiemDau || ''}
            onChange={event => handleChange('yDiemDau')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='X điểm cuối'
            fullWidth
            placeholder=''
            value={NN_HanhLangBaoVeNN_SongSuoiData.xDiemCuoi || ''}
            onChange={event => handleChange('xDiemCuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Y điểm cuối'
            fullWidth
            placeholder=''
            value={NN_HanhLangBaoVeNN_SongSuoiData.yDiemCuoi || ''}
            onChange={event => handleChange('yDiemCuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Chức năng'
            fullWidth
            placeholder=''
            value={NN_HanhLangBaoVeNN_SongSuoiData.chucNang || ''}
            onChange={event => handleChange('chucNang')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Phạm vi hành lang bảo vệ'
            fullWidth
            placeholder=''
            value={NN_HanhLangBaoVeNN_SongSuoiData.phamViHanhLangBaoVe || ''}
            onChange={event => handleChange('phamViHanhLangBaoVe')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thời gian thực hiện'
            fullWidth
            placeholder=''
            value={NN_HanhLangBaoVeNN_SongSuoiData.thoiGianThucHien || ''}
            onChange={event => handleChange('thoiGianThucHien')(event.target.value)}
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

const CreateNN_HanhLangBaoVeNN_SongSuoi = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateNN_HanhLangBaoVeNN_SongSuoi
