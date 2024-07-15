import { useState } from 'react'
import { EditNote, PersonAddAlt, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, Typography, TextField, CircularProgress } from '@mui/material'
import DialogsControl from 'src/@core/components/dialog-control'
import { saveData } from 'src/api/axios'

interface State {
  id: number
  tenHoChua: string
  nguonNuoc: string
  thuocLVS: string
  dienTichMatNuoc: number
  xaPhuongTT: string
  huyenTP: string
  dungTichToanBo: number
  dungTichHuuIch: number
  dungTichPhongLu: number
  mndbt: number
  mnc: number
  namXayDung: number
  donViQuanLyVanHanh: string
  phamViHanhLang: string
  thuocDienCamMocHanhLang: string
}

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [NN_NguonNuoc_AoHoDamPhaData, setNN_NguonNuoc_AoHoDamPhaData] = useState<State>({
    id: data?.id || 0,
    tenHoChua: data?.tenHoChua || '',
    nguonNuoc: data?.nguonNuoc || '',
    thuocLVS: data?.thuocLVS || '',
    dienTichMatNuoc: data?.dienTichMatNuoc || 0,
    xaPhuongTT: data?.xaPhuongTT || '',
    huyenTP: data?.huyenTP || '',
    dungTichToanBo: data?.dungTichToanBo || 0,
    dungTichHuuIch: data?.dungTichHuuIch || 0,
    dungTichPhongLu: data?.dungTichPhongLu || 0,
    mndbt: data?.mndbt || 0,
    mnc: data?.mnc || 0,
    namXayDung: data?.namXayDung || 0,
    donViQuanLyVanHanh: data?.donViQuanLyVanHanh || '',
    phamViHanhLang: data?.phamViHanhLang || '',
    thuocDienCamMocHanhLang: data?.thuocDienCamMocHanhLang || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof State) => (value: any) => {
    setNN_NguonNuoc_AoHoDamPhaData({ ...NN_NguonNuoc_AoHoDamPhaData, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('NN_NguonNuoc_AoHoDamPha/luu', NN_NguonNuoc_AoHoDamPhaData)
        if (res) {
          // Reset form fields
          setNN_NguonNuoc_AoHoDamPhaData({
            id: 0,
            tenHoChua: '',
            nguonNuoc: '',
            thuocLVS: '',
            dienTichMatNuoc: 0,
            xaPhuongTT: '',
            huyenTP: '',
            dungTichToanBo: 0,
            dungTichHuuIch: 0,
            dungTichPhongLu: 0,
            mndbt: 0,
            mnc: 0,
            namXayDung: 0,
            donViQuanLyVanHanh: '',
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
    setNN_NguonNuoc_AoHoDamPhaData({
      id: 0,
      tenHoChua: '',
      nguonNuoc: '',
      thuocLVS: '0',
      dienTichMatNuoc: 0,
      xaPhuongTT: '',
      huyenTP: '',
      dungTichToanBo: 0,
      dungTichHuuIch: 0,
      dungTichPhongLu: 0,
      mndbt: 0,
      mnc: 0,
      namXayDung: 0,
      donViQuanLyVanHanh: '',
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
            label='Tên hồ chứa'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_AoHoDamPhaData.tenHoChua || ''}
            onChange={event => handleChange('tenHoChua')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Nguồn nước'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_AoHoDamPhaData.nguonNuoc || ''}
            onChange={event => handleChange('nguonNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Thuộc lưu vực sông'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_AoHoDamPhaData.thuocLVS || ''}
            onChange={event => handleChange('thuocLVS')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Diện tích mặt nước'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_AoHoDamPhaData.dienTichMatNuoc || ''}
            onChange={event => handleChange('dienTichMatNuoc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Xã/Phường/Thị trấn'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_AoHoDamPhaData.xaPhuongTT || ''}
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
            value={NN_NguonNuoc_AoHoDamPhaData.huyenTP || ''}
            onChange={event => handleChange('huyenTP')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Dung tích toàn bộ'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_AoHoDamPhaData.dungTichToanBo || ''}
            onChange={event => handleChange('dungTichToanBo')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Dung tích hữu ích'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_AoHoDamPhaData.dungTichHuuIch || ''}
            onChange={event => handleChange('dungTichHuuIch')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Dung tích phòng lũ'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_AoHoDamPhaData.dungTichPhongLu || ''}
            onChange={event => handleChange('dungTichPhongLu')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Mực nước dâng bình thường'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_AoHoDamPhaData.mndbt || ''}
            onChange={event => handleChange('mndbt')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Mực nước chết'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_AoHoDamPhaData.mnc || ''}
            onChange={event => handleChange('mnc')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Năm xây dựng'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_AoHoDamPhaData.namXayDung || ''}
            onChange={event => handleChange('namXayDung')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Đơn vị quản lý vận hành'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_AoHoDamPhaData.donViQuanLyVanHanh || ''}
            onChange={event => handleChange('donViQuanLyVanHanh')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <TextField
            size='small'
            type='text'
            label='Phạm vi hành lang'
            fullWidth
            placeholder=''
            value={NN_NguonNuoc_AoHoDamPhaData.phamViHanhLang || ''}
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
            value={NN_NguonNuoc_AoHoDamPhaData.thuocDienCamMocHanhLang || ''}
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

const CreateNN_NguonNuoc_AoHoDamPha = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateNN_NguonNuoc_AoHoDamPha
