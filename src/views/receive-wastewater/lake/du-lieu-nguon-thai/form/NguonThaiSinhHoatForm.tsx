import { Fragment, useEffect, useState } from 'react'
import { Add, Edit, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, TextField, CircularProgress, Tooltip, Autocomplete } from '@mui/material'
import { getData, saveData } from 'src/api/axios'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import { FormDuLieuNguonThaiSinhHoatState } from './DuLieuNguonThaiInterface'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [phanDoanSong, setPhanDoanSong] = useState([]);

  const [sinhHoat, setSinhHoat] = useState<FormDuLieuNguonThaiSinhHoatState>({
    id: data?.id || 0,
    idPhanDoanSong: data?.idPhanDoanSong || '',
    soDan: data?.soDan || 0,
    heSoSuyGiam: data?.heSoSuyGiam || 0,
    ctSinhHoatBOD: data?.ctSinhHoatBOD || 0,
    ctSinhHoatCOD: data?.ctSinhHoatCOD || 0,
    ctSinhHoatAmoni: data?.ctSinhHoatAmoni || 0,
    ctSinhHoatTongN: data?.ctSinhHoatTongN || 0,
    ctSinhHoatTongP: data?.ctSinhHoatTongP || 0,
    ctSinhHoatTSS: data?.ctSinhHoatTSS || 0,
    ctSinhHoatColiform: data?.ctSinhHoatColiform || 0,
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof FormDuLieuNguonThaiSinhHoatState) => (value: any) => {
    setSinhHoat({ ...sinhHoat, [prop]: value })
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
        const res = await saveData('DuLieuNguonNuocThaiSinhHoat/luu', sinhHoat)
        if (res) {
          // Reset form fields
          setSinhHoat({
            id: 0,
            idPhanDoanSong: 0,
            soDan: 0,
            heSoSuyGiam: 0,
            ctSinhHoatBOD: 0,
            ctSinhHoatCOD: 0,
            ctSinhHoatAmoni: 0,
            ctSinhHoatTongN: 0,
            ctSinhHoatTongP: 0,
            ctSinhHoatTSS: 0,
            ctSinhHoatColiform: 0,
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
    setSinhHoat({
      id: 0,
      idPhanDoanSong: 0,
      soDan: 0,
      heSoSuyGiam: 0,
      ctSinhHoatBOD: 0,
      ctSinhHoatCOD: 0,
      ctSinhHoatAmoni: 0,
      ctSinhHoatTongN: 0,
      ctSinhHoatTongP: 0,
      ctSinhHoatTSS: 0,
      ctSinhHoatColiform: 0,
      ghiChu: ''
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
           value={phanDoanSong?.find((option:any) => option.id === sinhHoat.idPhanDoanSong) || null}
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
            label='Số dân'
            fullWidth
            placeholder=''
            value={sinhHoat.soDan || ''}
            onChange={event => handleChange('soDan')(event.target.value)}
          />
        </Grid>  
        <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Hệ số suy giảm dọc đường hay hệ số dòng chảy'
            fullWidth
            placeholder=''
            value={sinhHoat.heSoSuyGiam || ''}
            onChange={event => handleChange('heSoSuyGiam')(event.target.value)}
          />
        </Grid>        
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <fieldset>
            <legend>Kết quả phân tích thông số chất lượng nước nguồn thải sinh hoạt</legend>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='BOD5'
                  fullWidth
                  placeholder=''
                  value={sinhHoat.ctSinhHoatBOD || ''}
                  onChange={event => handleChange('ctSinhHoatBOD')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='COD'
                  fullWidth
                  placeholder=''
                  value={sinhHoat.ctSinhHoatCOD || ''}
                  onChange={event => handleChange('ctSinhHoatCOD')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Amoni'
                  fullWidth
                  placeholder=''
                  value={sinhHoat.ctSinhHoatAmoni || ''}
                  onChange={event => handleChange('ctSinhHoatAmoni')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng N'
                  fullWidth
                  placeholder=''
                  value={sinhHoat.ctSinhHoatTongN || ''}
                  onChange={event => handleChange('ctSinhHoatTongN')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng P'
                  fullWidth
                  placeholder=''
                  value={sinhHoat.ctSinhHoatTongP || ''}
                  onChange={event => handleChange('ctSinhHoatTongP')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng chất rắn lơ lửng TSS'
                  fullWidth
                  placeholder=''
                  value={sinhHoat.ctSinhHoatTSS || ''}
                  onChange={event => handleChange('ctSinhHoatTSS')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng coliform'
                  fullWidth
                  placeholder=''
                  value={sinhHoat.ctSinhHoatColiform || ''}
                  onChange={event => handleChange('ctSinhHoatColiform')(event.target.value)}
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
            value={sinhHoat.ghiChu || ''}
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

const ThaiSinhHoatForm = ({ data, setPostSuccess, isEdit }: any) => {
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

export default ThaiSinhHoatForm
