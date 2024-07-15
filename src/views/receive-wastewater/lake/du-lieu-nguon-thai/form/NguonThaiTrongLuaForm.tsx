import { Fragment, useEffect, useState } from 'react'
import { Add, Edit, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, TextField, CircularProgress, Tooltip, Autocomplete } from '@mui/material'
import { getData, saveData } from 'src/api/axios'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import { FormDuLieuNguonThaiTrongLuaState } from './DuLieuNguonThaiInterface'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [phanDoanSong, setPhanDoanSong] = useState([]);
console.log(data);

  const [TrongLua, setTrongLua] = useState<FormDuLieuNguonThaiTrongLuaState>({
    id: data?.id || 0,
    idPhanDoanSong: data?.idPhanDoanSong || '',
    dienTichTrongLua: data?.dienTichTrongLua || 0,
    heSoSuyGiam: data?.heSoSuyGiam || 0,
    ctTrongLuaBOD: data?.ctTrongLuaBOD || 0,
    ctTrongLuaCOD: data?.ctTrongLuaCOD || 0,
    ctTrongLuaAmoni: data?.ctTrongLuaAmoni || 0,
    ctTrongLuaTongN: data?.ctTrongLuaTongN || 0,
    ctTrongLuaTongP: data?.ctTrongLuaTongP || 0,
    ctTrongLuaTSS: data?.ctTrongLuaTSS || 0,
    ctTrongLuaColiform: data?.ctTrongLuaColiform || 0,
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof FormDuLieuNguonThaiTrongLuaState) => (value: any) => {
    setTrongLua({ ...TrongLua, [prop]: value })
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
        const res = await saveData('DuLieuNguonNuocThaiTrongLua/luu', TrongLua)
        if (res) {
          // Reset form fields
          setTrongLua({
            id: 0,
            idPhanDoanSong: 0,
            dienTichTrongLua:  0,
            heSoSuyGiam: 0,
            ctTrongLuaBOD: 0,
            ctTrongLuaCOD: 0,
            ctTrongLuaAmoni: 0,
            ctTrongLuaTongN: 0,
            ctTrongLuaTongP: 0,
            ctTrongLuaTSS: 0,
            ctTrongLuaColiform: 0,
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
    setTrongLua({
      id: 0,
      idPhanDoanSong: 0,
      dienTichTrongLua: 0,
      heSoSuyGiam: 0,
      ctTrongLuaBOD: 0,
      ctTrongLuaCOD: 0,
      ctTrongLuaAmoni: 0,
      ctTrongLuaTongN: 0,
      ctTrongLuaTongP: 0,
      ctTrongLuaTSS: 0,
      ctTrongLuaColiform: 0,
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
           value={phanDoanSong?.find((option:any) => option.id === TrongLua.idPhanDoanSong) || null}
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
            label='Diện tích trồng lúa'
            fullWidth
            placeholder=''
            value={TrongLua.dienTichTrongLua || ''}
            onChange={event => handleChange('dienTichTrongLua')(event.target.value)}
          />
        </Grid>  
       
        <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Hệ số suy giảm dọc đường'
            fullWidth
            placeholder=''
            value={TrongLua.heSoSuyGiam || ''}
            onChange={event => handleChange('heSoSuyGiam')(event.target.value)}
          />
        </Grid>        
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <fieldset>
            <legend>Kết quả phân tích thông số chất lượng nước nguồn thải trồng lúa</legend>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='BOD5'
                  fullWidth
                  placeholder=''
                  value={TrongLua.ctTrongLuaBOD || ''}
                  onChange={event => handleChange('ctTrongLuaBOD')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='COD'
                  fullWidth
                  placeholder=''
                  value={TrongLua.ctTrongLuaCOD || ''}
                  onChange={event => handleChange('ctTrongLuaCOD')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Amoni'
                  fullWidth
                  placeholder=''
                  value={TrongLua.ctTrongLuaAmoni || ''}
                  onChange={event => handleChange('ctTrongLuaAmoni')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng N'
                  fullWidth
                  placeholder=''
                  value={TrongLua.ctTrongLuaTongN || ''}
                  onChange={event => handleChange('ctTrongLuaTongN')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng P'
                  fullWidth
                  placeholder=''
                  value={TrongLua.ctTrongLuaTongP || ''}
                  onChange={event => handleChange('ctTrongLuaTongP')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng chất rắn lơ lửng TSS'
                  fullWidth
                  placeholder=''
                  value={TrongLua.ctTrongLuaTSS || ''}
                  onChange={event => handleChange('ctTrongLuaTSS')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng coliform'
                  fullWidth
                  placeholder=''
                  value={TrongLua.ctTrongLuaColiform || ''}
                  onChange={event => handleChange('ctTrongLuaColiform')(event.target.value)}
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
            value={TrongLua.ghiChu || ''}
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

const ThaiTrongLuaForm = ({ data, setPostSuccess, isEdit }: any) => {
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

export default ThaiTrongLuaForm
