import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  ten: ''
  xaPhuongTT: ''
  huyenTP: ''
  dungTichHo106m3: number
  phamViHanhLang: ''
  thuocDienCamMocHanhLang: ''
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [NN_HanhLangBaoVeNN_AoHoDamTuNhienNhanTaoData, setNN_HanhLangBaoVeNN_AoHoDamTuNhienNhanTaoData] = useState<State>({
    id: data?.id || 0,
    ten: data?.ten || '',
    xaPhuongTT: data?.xaPhuongTT || '',
    huyenTP: data?.huyenTP || '',
    dungTichHo106m3: data?.dungTichHo106m3 || 0,
    phamViHanhLang: data?.phamViHanhLang || '',
    thuocDienCamMocHanhLang: data?.thuocDienCamMocHanhLang || '',
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setNN_HanhLangBaoVeNN_AoHoDamTuNhienNhanTaoData({ ...NN_HanhLangBaoVeNN_AoHoDamTuNhienNhanTaoData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('NN_HanhLangBaoVeNN_AoHoDamTuNhienNhanTao/luu', NN_HanhLangBaoVeNN_AoHoDamTuNhienNhanTaoData)
        if (res) {
          // Reset form fields
          setNN_HanhLangBaoVeNN_AoHoDamTuNhienNhanTaoData({
            id: 0,
            ten: '',
            xaPhuongTT: '',
            huyenTP: '',
            dungTichHo106m3: 0,
            phamViHanhLang: '',
            thuocDienCamMocHanhLang: ''
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
    setNN_HanhLangBaoVeNN_AoHoDamTuNhienNhanTaoData({
      id: 0,
      ten: '',
      xaPhuongTT: '',
      huyenTP: '',
      dungTichHo106m3: 0,
      phamViHanhLang: '',
      thuocDienCamMocHanhLang: ''
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
            label='Tên'
            fullWidth
            placeholder=''
            value={NN_HanhLangBaoVeNN_AoHoDamTuNhienNhanTaoData.ten || ''}
            onChange={event => handleChange('ten')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Xã/Phường/Thị trấn'
            fullWidth
            placeholder=''
            value={NN_HanhLangBaoVeNN_AoHoDamTuNhienNhanTaoData.xaPhuongTT || ''}
            onChange={event => handleChange('xaPhuongTT')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Huyện/Thành phố'
            fullWidth
            placeholder=''
            value={NN_HanhLangBaoVeNN_AoHoDamTuNhienNhanTaoData.huyenTP || ''}
            onChange={event => handleChange('huyenTP')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Dung tích hồ'
            fullWidth
            placeholder=''
            value={NN_HanhLangBaoVeNN_AoHoDamTuNhienNhanTaoData.dungTichHo106m3 || ''}
            onChange={event => handleChange('dungTichHo106m3')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Phạm vi hành lang'
            fullWidth
            placeholder=''
            value={NN_HanhLangBaoVeNN_AoHoDamTuNhienNhanTaoData.phamViHanhLang || ''}
            onChange={event => handleChange('phamViHanhLang')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thuộc diện cắm mốc hành lang'
            fullWidth
            placeholder=''
            value={NN_HanhLangBaoVeNN_AoHoDamTuNhienNhanTaoData.thuocDienCamMocHanhLang || ''}
            onChange={event => handleChange('thuocDienCamMocHanhLang')(event.target.value)}
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

const CreateNN_HanhLangBaoVeNN_AoHoDamTuNhienNhanTao = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateNN_HanhLangBaoVeNN_AoHoDamTuNhienNhanTao
