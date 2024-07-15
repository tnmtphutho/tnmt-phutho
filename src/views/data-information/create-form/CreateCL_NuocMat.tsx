import { useState } from 'react'
import { Add, EditNote, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, TextField, CircularProgress, Typography } from '@mui/material'
import { saveData } from 'src/api/axios'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'

interface State {
  id: number
  luuVucSong: string
  thoiGianQuanTrac: number
  songSuoiHoChua: string
  viTriQuanTrac: string
  kyHieuDiemQuanTrac: string
  x: number
  y: number
  phDot1: number
  phDot2: number
  phDot3: number
  boD5Dot1: number
  boD5Dot2: number
  boD5Dot3: number
  codDot1: number
  codDot2: number
  codDot3: number
  doDot1: number
  doDot2: number
  doDot3: number
  photphoDot1: number
  photphoDot2: number
  photphoDot3: number
  nitoDot1: number
  nitoDot2: number
  nitoDot3: number
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [CL_NuocMat, setCL_NuocMat] = useState<State>({
    id: data?.id,
    luuVucSong: data?.luuVucSong,
    thoiGianQuanTrac: data?.thoiGianQuanTrac,
    songSuoiHoChua: data?.songSuoiHoChua,
    viTriQuanTrac: data?.viTriQuanTrac,
    kyHieuDiemQuanTrac: data?.kyHieuDiemQuanTrac,
    x: data?.x,
    y: data?.y,
    phDot1: data?.phDot1,
    phDot2: data?.phDot2,
    phDot3: data?.phDot3,
    boD5Dot1: data?.boD5Dot1,
    boD5Dot2: data?.boD5Dot2,
    boD5Dot3: data?.boD5Dot3,
    codDot1: data?.codDot1,
    codDot2: data?.codDot2,
    codDot3: data?.codDot3,
    doDot1: data?.doDot1,
    doDot2: data?.doDot2,
    doDot3: data?.doDot3,
    photphoDot1: data?.photphoDot1,
    photphoDot2: data?.photphoDot2,
    photphoDot3: data?.photphoDot3,
    nitoDot1: data?.nitoDot1,
    nitoDot2: data?.nitoDot2,
    nitoDot3: data?.nitoDot3,
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setCL_NuocMat({ ...CL_NuocMat, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('CLN_NuocMat/luu', CL_NuocMat)
        if (res) {
          // Reset form fields
          setCL_NuocMat({
            id: 0,
            luuVucSong: '',
            thoiGianQuanTrac: 0,
            songSuoiHoChua: '',
            viTriQuanTrac: '',
            kyHieuDiemQuanTrac: '',
            x: 0,
            y: 0,
            phDot1: 0,
            phDot2: 0,
            phDot3: 0,
            boD5Dot1: 0,
            boD5Dot2: 0,
            boD5Dot3: 0,
            codDot1: 0,
            codDot2: 0,
            codDot3: 0,
            doDot1: 0,
            doDot2: 0,
            doDot3: 0,
            photphoDot1: 0,
            photphoDot2: 0,
            photphoDot3: 0,
            nitoDot1: 0,
            nitoDot2: 0,
            nitoDot3: 0,
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
    setCL_NuocMat({
      id: 0,
      luuVucSong: '',
      thoiGianQuanTrac: 0,
      songSuoiHoChua: '',
      viTriQuanTrac: '',
      kyHieuDiemQuanTrac: '',
      x: 0,
      y: 0,
      phDot1: 0,
      phDot2: 0,
      phDot3: 0,
      boD5Dot1: 0,
      boD5Dot2: 0,
      boD5Dot3: 0,
      codDot1: 0,
      codDot2: 0,
      codDot3: 0,
      doDot1: 0,
      doDot2: 0,
      doDot3: 0,
      photphoDot1: 0,
      photphoDot2: 0,
      photphoDot3: 0,
      nitoDot1: 0,
      nitoDot2: 0,
      nitoDot3: 0,
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
            label='Năm quan trắc'
            fullWidth
            placeholder=''
            value={CL_NuocMat.thoiGianQuanTrac || ''}
            onChange={event => handleChange('thoiGianQuanTrac')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Ký hiệu điểm quan trắc'
            fullWidth
            placeholder=''
            value={CL_NuocMat.kyHieuDiemQuanTrac || ''}
            onChange={event => handleChange('kyHieuDiemQuanTrac')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Lưu vực sông'
            fullWidth
            placeholder=''
            value={CL_NuocMat.luuVucSong || ''}
            onChange={event => handleChange('luuVucSong')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Sông, suối, hồ chứa'
            fullWidth
            placeholder=''
            value={CL_NuocMat.songSuoiHoChua || ''}
            onChange={event => handleChange('songSuoiHoChua')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Vị trí quan trắc'
            fullWidth
            placeholder=''
            value={CL_NuocMat.viTriQuanTrac || ''}
            onChange={event => handleChange('viTriQuanTrac')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <Typography align='center'>Tọa độ quan trắc(WGS 84)</Typography>
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Vĩ độ'
            fullWidth
            placeholder=''
            value={CL_NuocMat.x || ''}
            onChange={event => handleChange('x')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Kinh độ'
            fullWidth
            placeholder=''
            value={CL_NuocMat.y || ''}
            onChange={event => handleChange('y')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <Typography align='center'>pH [mg/l]</Typography>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 1'
            fullWidth
            placeholder=''
            value={CL_NuocMat.phDot1 || ''}
            onChange={event => handleChange('phDot1')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 2'
            fullWidth
            placeholder=''
            value={CL_NuocMat.phDot2 || ''}
            onChange={event => handleChange('phDot2')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 3'
            fullWidth
            placeholder=''
            value={CL_NuocMat.phDot3 || ''}
            onChange={event => handleChange('phDot3')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <Typography align='center'>BOD5 [mg/l]</Typography>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 1'
            fullWidth
            placeholder=''
            value={CL_NuocMat.boD5Dot1 || ''}
            onChange={event => handleChange('boD5Dot1')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 2'
            fullWidth
            placeholder=''
            value={CL_NuocMat.boD5Dot2 || ''}
            onChange={event => handleChange('boD5Dot2')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 3'
            fullWidth
            placeholder=''
            value={CL_NuocMat.boD5Dot3 || ''}
            onChange={event => handleChange('boD5Dot3')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <Typography align='center'>COD [mg/l]</Typography>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 1'
            fullWidth
            placeholder=''
            value={CL_NuocMat.codDot1 || ''}
            onChange={event => handleChange('codDot1')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 2'
            fullWidth
            placeholder=''
            value={CL_NuocMat.codDot2 || ''}
            onChange={event => handleChange('codDot2')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 3'
            fullWidth
            placeholder=''
            value={CL_NuocMat.codDot3 || ''}
            onChange={event => handleChange('codDot3')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <Typography align='center'>DO [mg/l]</Typography>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 1'
            fullWidth
            placeholder=''
            value={CL_NuocMat.doDot1 || ''}
            onChange={event => handleChange('doDot1')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 2'
            fullWidth
            placeholder=''
            value={CL_NuocMat.doDot2 || ''}
            onChange={event => handleChange('doDot2')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 3'
            fullWidth
            placeholder=''
            value={CL_NuocMat.doDot3 || ''}
            onChange={event => handleChange('doDot3')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <Typography align='center'>Photphor [mg/l]</Typography>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 1'
            fullWidth
            placeholder=''
            value={CL_NuocMat.photphoDot1 || ''}
            onChange={event => handleChange('photphoDot1')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 2'
            fullWidth
            placeholder=''
            value={CL_NuocMat.photphoDot2 || ''}
            onChange={event => handleChange('photphoDot2')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 3'
            fullWidth
            placeholder=''
            value={CL_NuocMat.photphoDot3 || ''}
            onChange={event => handleChange('photphoDot3')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12}>
          <Typography align='center'>Nito [mg/l] </Typography>
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 1'
            fullWidth
            placeholder=''
            value={CL_NuocMat.nitoDot1 || ''}
            onChange={event => handleChange('nitoDot1')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 2'
            fullWidth
            placeholder=''
            value={CL_NuocMat.nitoDot2 || ''}
            onChange={event => handleChange('nitoDot2')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đợt 3'
            fullWidth
            placeholder=''
            value={CL_NuocMat.nitoDot3 || ''}
            onChange={event => handleChange('nitoDot3')(event.target.value)}
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

const CreateCL_NuocMat = ({ data, setPostSuccess, isEdit }: any) => {
  const formTitle = isEdit ? 'Thay đổi thông tin' : 'Thêm mới'

  return (
    <DialogsControlFullScreen>
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
    </DialogsControlFullScreen>
  )
}

export default CreateCL_NuocMat
