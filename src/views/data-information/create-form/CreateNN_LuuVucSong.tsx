import { useState } from 'react'
import { Add, EditNote, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  maSong: string
  capSong: string
  tenSongSuoi: string
  chayRa: string
  chieuDai: number
  dienTich: number
  tinh: string
  thuocLVS: string
  loaiSongSuoi: string
  ghiChu: string
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [NN_LuuVucSongData, setNN_LuuVucSongData] = useState<State>({
    id: data?.id || 0,
    maSong: data?.maSong || '',
    capSong: data?.capSong || '',
    tenSongSuoi: data?.tenSongSuoi || '',
    chayRa: data?.chayRa || '',
    chieuDai: data?.chieuDai || 0,
    dienTich: data?.dienTich || 0,
    tinh: data?.tinh || '',
    thuocLVS: data?.thuocLVS || '',
    loaiSongSuoi: data?.loaiSongSuoi || '',
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setNN_LuuVucSongData({ ...NN_LuuVucSongData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('NN_LuuVucSong/luu', NN_LuuVucSongData)
        if (res) {
          // Reset form fields
          setNN_LuuVucSongData({
            id: 0,
            maSong: '',
            capSong: '',
            tenSongSuoi: '',
            chayRa: '',
            chieuDai: 0,
            dienTich: 0,
            tinh: '',
            thuocLVS: '',
            loaiSongSuoi: '',
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
    setNN_LuuVucSongData({
      id: 0,
      maSong: '',
      capSong: '',
      tenSongSuoi: '',
      chayRa: '',
      chieuDai: 0,
      dienTich: 0,
      tinh: '',
      thuocLVS: '',
      loaiSongSuoi: '',
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
            value={NN_LuuVucSongData.maSong || ''}
            onChange={event => handleChange('maSong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Cấp sông'
            fullWidth
            placeholder=''
            value={NN_LuuVucSongData.capSong || ''}
            onChange={event => handleChange('capSong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tên sông, suối'
            fullWidth
            placeholder=''
            value={NN_LuuVucSongData.tenSongSuoi || ''}
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
            value={NN_LuuVucSongData.chayRa || ''}
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
            value={NN_LuuVucSongData.chieuDai || ''}
            onChange={event => handleChange('chieuDai')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Diện tích'
            fullWidth
            placeholder=''
            value={NN_LuuVucSongData.dienTich || ''}
            onChange={event => handleChange('dienTich')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Tỉnh/Thành phố'
            fullWidth
            placeholder=''
            value={NN_LuuVucSongData.tinh || ''}
            onChange={event => handleChange('tinh')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thuộc lưu vực sông'
            fullWidth
            placeholder=''
            value={NN_LuuVucSongData.thuocLVS || ''}
            onChange={event => handleChange('thuocLVS')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Loại sông suối'
            fullWidth
            placeholder=''
            value={NN_LuuVucSongData.loaiSongSuoi || ''}
            onChange={event => handleChange('loaiSongSuoi')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={NN_LuuVucSongData.ghiChu || ''}
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

const CreateNN_LuuVucSong = ({ data, setPostSuccess, isEdit }: any) => {
  const formTitle = isEdit ? 'Thay đổi thông tin lưu vực sông' : 'Thêm thông tư lưu vực sông'

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

export default CreateNN_LuuVucSong
