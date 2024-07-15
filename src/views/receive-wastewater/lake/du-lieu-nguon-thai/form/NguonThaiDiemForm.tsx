import { Fragment, useEffect, useState } from 'react'
import { Add, Edit, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, TextField, CircularProgress, Tooltip, Autocomplete } from '@mui/material'
import { getData, saveData } from 'src/api/axios'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import { FormDuLieuNguonThaiDiemState } from './DuLieuNguonThaiInterface'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [phanDoanSong, setPhanDoanSong] = useState([]);

  const [thaiDiem, setThaiDiem] = useState<FormDuLieuNguonThaiDiemState>({
    id: data?.id || 0,
    idPhanDoanSong: data?.idPhanDoanSong || 0,
    luuLuongXaThai: data?.luuLuongXaThai || '',
    ctdiemBOD: data?.ctdiemBOD || 0,
    ctdiemCOD: data?.ctdiemCOD || 0,
    ctdiemAmoni: data?.ctdiemAmoni || 0,
    ctdiemTongN: data?.ctdiemTongN || 0,
    ctdiemTongP: data?.ctdiemTongP || 0,
    ctdiemTSS: data?.ctdiemTSS || 0,
    ctdiemColiform: data?.ctdiemColiform || 0,
    ghiChu: data?.ghiChu || '',
    nguonThaiCongTrinh: data?.nguonThaiCongTrinh || '',
    toaDoX: data?.toaDoX || 0,
    toaDoY: data?.toaDoY || 0,
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof FormDuLieuNguonThaiDiemState) => (value: any) => {
    setThaiDiem({ ...thaiDiem, [prop]: value })
  }

   //dataselect
   useEffect(() => {
    setLoading(true);
    const getDataForSelect = async () => {
      try {
        const list = await getData('PhanDoanSong/danh-sach');
        setPhanDoanSong(list);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };
    getDataForSelect();
  }, []);


  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('DuLieuNguonNuocThaiDiem/luu', thaiDiem)
        if (res) {
          // Reset form fields
          setThaiDiem({
            id: 0,
            idPhanDoanSong: 0,
            luuLuongXaThai: 0,
            ctdiemBOD: 0,
            ctdiemCOD: 0,
            ctdiemAmoni: 0,
            ctdiemTongN: 0,
            ctdiemTongP: 0,
            ctdiemTSS: 0,
            ctdiemColiform: 0,
            ghiChu: '',
            nguonThaiCongTrinh: '',
            toaDoX: 0,
            toaDoY: 0,
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
    setThaiDiem({
      id: 0,
      idPhanDoanSong: 0,
      luuLuongXaThai: 0,
      ctdiemBOD: 0,
      ctdiemCOD: 0,
      ctdiemAmoni: 0,
      ctdiemTongN: 0,
      ctdiemTongP: 0,
      ctdiemTSS: 0,
      ctdiemColiform: 0,
      ghiChu: '',
      nguonThaiCongTrinh: '',
      toaDoX: 0,
      toaDoY: 0,
    })

    closeDialogs()
  }

  return (
    <>
      <Grid container spacing={3}>
      <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
          <Autocomplete
           size="small"
           options={phanDoanSong}
           getOptionLabel={(option: any) => `${option.phanDoan} `}
           value={phanDoanSong?.find((option:any) => option.id === thaiDiem.idPhanDoanSong) || null}
           onChange={(_, value) => handleChange('idPhanDoanSong')(value?.id || 0)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Chọn phân đoạn sông"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {loading && (
                        <CircularProgress color="primary" size={20} />
                      )}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Nguồn thải công trình'
            fullWidth
            placeholder=''
            value={thaiDiem.nguonThaiCongTrinh || ''}
            onChange={event => handleChange('nguonThaiCongTrinh')(event.target.value)}
          />
        </Grid>    
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tọa độ X'
            fullWidth
            placeholder=''
            value={thaiDiem.toaDoX || ''}
            onChange={event => handleChange('toaDoX')(event.target.value)}
          />
        </Grid>    
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Tọa độ y'
            fullWidth
            placeholder=''
            value={thaiDiem.toaDoY || ''}
            onChange={event => handleChange('toaDoY')(event.target.value)}
          />
        </Grid>    
        <Grid item xs={12} md={4} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Lưu lương xả thải max'
            fullWidth
            placeholder=''
            value={thaiDiem.luuLuongXaThai || ''}
            onChange={event => handleChange('luuLuongXaThai')(event.target.value)}
          />
        </Grid>      
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <fieldset>
            <legend>Kết quả phân tích thông số chất lượng nước nguồn thải điểm</legend>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='BOD5'
                  fullWidth
                  placeholder=''
                  value={thaiDiem.ctdiemBOD || ''}
                  onChange={event => handleChange('ctdiemBOD')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='COD'
                  fullWidth
                  placeholder=''
                  value={thaiDiem.ctdiemCOD || ''}
                  onChange={event => handleChange('ctdiemCOD')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Amoni'
                  fullWidth
                  placeholder=''
                  value={thaiDiem.ctdiemAmoni || ''}
                  onChange={event => handleChange('ctdiemAmoni')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng N'
                  fullWidth
                  placeholder=''
                  value={thaiDiem.ctdiemTongN || ''}
                  onChange={event => handleChange('ctdiemTongN')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng P'
                  fullWidth
                  placeholder=''
                  value={thaiDiem.ctdiemTongP || ''}
                  onChange={event => handleChange('ctdiemTongP')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng chất rắn lơ lửng TSS'
                  fullWidth
                  placeholder=''
                  value={thaiDiem.ctdiemTSS || ''}
                  onChange={event => handleChange('ctdiemTSS')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng coliform'
                  fullWidth
                  placeholder=''
                  value={thaiDiem.ctdiemColiform || ''}
                  onChange={event => handleChange('ctdiemColiform')(event.target.value)}
                />
              </Grid>
            </Grid>
          </fieldset>
        </Grid>
       

        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Ghi chú'
            fullWidth
            placeholder=''
            value={thaiDiem.ghiChu || ''}
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

const ThaiDiemForm = ({ data, setPostSuccess, isEdit }: any) => {
  const formTitle = isEdit ? 'Thay đổi thông tin ' : 'Thêm mới'

  return (
    <DialogsControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          {isEdit ? (
            <Tooltip title='Chỉnh sửa thông tin công trình'>
              <IconButton
                onClick={() =>
                  openDialogs(
                    <Form data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />,
                    formTitle
                  )
                }
              >
                <Edit className='tableActionBtn' />
              </IconButton>
            </Tooltip>
          ) : (
            <Button
              variant='outlined'
              size='small'
              startIcon={<Add />}
              onClick={() =>
                openDialogs(<Form data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />, formTitle)
              }
            >
              Thêm mới
            </Button>
          )}
        </>
      )}
    </DialogsControlFullScreen>
  )
}

export default ThaiDiemForm
