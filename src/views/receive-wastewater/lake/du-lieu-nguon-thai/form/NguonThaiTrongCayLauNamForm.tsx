import { Fragment, useEffect, useState } from 'react'
import { Add, Edit, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, TextField, CircularProgress, Tooltip, Autocomplete } from '@mui/material'
import { getData, saveData } from 'src/api/axios'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import { FormDuLieuNguonThaiTrongCayState } from './DuLieuNguonThaiInterface'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [phanDoanSong, setPhanDoanSong] = useState([]);
console.log(data);

  const [TrongCay, setTrongCay] = useState<FormDuLieuNguonThaiTrongCayState>({
    id: data?.id || 0,
    idPhanDoanSong: data?.idPhanDoanSong || '',
    dienTichTrongCay: data?.dienTichTrongCay || 0,
    heSoSuyGiam: data?.heSoSuyGiam || 0,
    ctTrongCayBOD: data?.ctTrongCayBOD || 0,
    ctTrongCayCOD: data?.ctTrongCayCOD || 0,
    ctTrongCayAmoni: data?.ctTrongCayAmoni || 0,
    ctTrongCayTongN: data?.ctTrongCayTongN || 0,
    ctTrongCayTongP: data?.ctTrongCayTongP || 0,
    ctTrongCayTSS: data?.ctTrongCayTSS || 0,
    ctTrongCayColiform: data?.ctTrongCayColiform || 0,
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof FormDuLieuNguonThaiTrongCayState) => (value: any) => {
    setTrongCay({ ...TrongCay, [prop]: value })
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
        const res = await saveData('DuLieuNguonNuocThaiTrongCay/luu', TrongCay)
        if (res) {
          // Reset form fields
          setTrongCay({
            id: 0,
            idPhanDoanSong: 0,
            dienTichTrongCay:  0,
            heSoSuyGiam: 0,
            ctTrongCayBOD: 0,
            ctTrongCayCOD: 0,
            ctTrongCayAmoni: 0,
            ctTrongCayTongN: 0,
            ctTrongCayTongP: 0,
            ctTrongCayTSS: 0,
            ctTrongCayColiform: 0,
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
    setTrongCay({
      id: 0,
      idPhanDoanSong: 0,
      dienTichTrongCay: 0,
      heSoSuyGiam: 0,
      ctTrongCayBOD: 0,
      ctTrongCayCOD: 0,
      ctTrongCayAmoni: 0,
      ctTrongCayTongN: 0,
      ctTrongCayTongP: 0,
      ctTrongCayTSS: 0,
      ctTrongCayColiform: 0,
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
           value={phanDoanSong?.find((option:any) => option.id === TrongCay.idPhanDoanSong) || null}
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
            label='Diện tích trồng cây lâu năm'
            fullWidth
            placeholder=''
            value={TrongCay.dienTichTrongCay || ''}
            onChange={event => handleChange('dienTichTrongCay')(event.target.value)}
          />
        </Grid>  
       
        <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Hệ số suy giảm dọc đường'
            fullWidth
            placeholder=''
            value={TrongCay.heSoSuyGiam || ''}
            onChange={event => handleChange('heSoSuyGiam')(event.target.value)}
          />
        </Grid>        
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <fieldset>
            <legend>Kết quả phân tích thông số chất lượng nước nguồn thải trồng cây lâu năm</legend>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='BOD5'
                  fullWidth
                  placeholder=''
                  value={TrongCay.ctTrongCayBOD || ''}
                  onChange={event => handleChange('ctTrongCayBOD')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='COD'
                  fullWidth
                  placeholder=''
                  value={TrongCay.ctTrongCayCOD || ''}
                  onChange={event => handleChange('ctTrongCayCOD')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Amoni'
                  fullWidth
                  placeholder=''
                  value={TrongCay.ctTrongCayAmoni || ''}
                  onChange={event => handleChange('ctTrongCayAmoni')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng N'
                  fullWidth
                  placeholder=''
                  value={TrongCay.ctTrongCayTongN || ''}
                  onChange={event => handleChange('ctTrongCayTongN')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng P'
                  fullWidth
                  placeholder=''
                  value={TrongCay.ctTrongCayTongP || ''}
                  onChange={event => handleChange('ctTrongCayTongP')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng chất rắn lơ lửng TSS'
                  fullWidth
                  placeholder=''
                  value={TrongCay.ctTrongCayTSS || ''}
                  onChange={event => handleChange('ctTrongCayTSS')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng coliform'
                  fullWidth
                  placeholder=''
                  value={TrongCay.ctTrongCayColiform || ''}
                  onChange={event => handleChange('ctTrongCayColiform')(event.target.value)}
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
            value={TrongCay.ghiChu || ''}
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

const ThaiTrongCayForm = ({ data, setPostSuccess, isEdit }: any) => {
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

export default ThaiTrongCayForm
