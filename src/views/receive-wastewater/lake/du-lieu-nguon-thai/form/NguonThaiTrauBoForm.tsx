import { Fragment, useEffect, useState } from 'react'
import { Add, Edit, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, TextField, CircularProgress, Tooltip, Autocomplete } from '@mui/material'
import { getData, saveData } from 'src/api/axios'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import { FormDuLieuNguonThaiTrauBoState } from './DuLieuNguonThaiInterface'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [phanDoanSong, setPhanDoanSong] = useState([]);
console.log(data);

  const [trauBo, setTrauBo] = useState<FormDuLieuNguonThaiTrauBoState>({
    id: data?.id || 0,
    idPhanDoanSong: data?.idPhanDoanSong || '',
    soTrau: data?.soTrau || 0,
    soBo: data?.soBo || 0,
    heSoSuyGiam: data?.heSoSuyGiam || 0,
    ctTrauBoBOD: data?.ctTrauBoBOD || 0,
    ctTrauBoCOD: data?.ctTrauBoCOD || 0,
    ctTrauBoAmoni: data?.ctTrauBoAmoni || 0,
    ctTrauBoTongN: data?.ctTrauBoTongN || 0,
    ctTrauBoTongP: data?.ctTrauBoTongP || 0,
    ctTrauBoTSS: data?.ctTrauBoTSS || 0,
    ctTrauBoColiform: data?.ctTrauBoColiform || 0,
    ghiChu: data?.ghiChu || ''
  })

  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof FormDuLieuNguonThaiTrauBoState) => (value: any) => {
    setTrauBo({ ...trauBo, [prop]: value })
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
        const res = await saveData('DuLieuNguonNuocThaiTrauBo/luu', trauBo)
        if (res) {
          // Reset form fields
          setTrauBo({
            id: 0,
            idPhanDoanSong: 0,
            soTrau: 0,
            soBo:0,
            heSoSuyGiam: 0,
            ctTrauBoBOD: 0,
            ctTrauBoCOD: 0,
            ctTrauBoAmoni: 0,
            ctTrauBoTongN: 0,
            ctTrauBoTongP: 0,
            ctTrauBoTSS: 0,
            ctTrauBoColiform: 0,
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
    setTrauBo({
      id: 0,
      idPhanDoanSong: 0,
      soTrau: 0,
      soBo:0,
      heSoSuyGiam: 0,
      ctTrauBoBOD: 0,
      ctTrauBoCOD: 0,
      ctTrauBoAmoni: 0,
      ctTrauBoTongN: 0,
      ctTrauBoTongP: 0,
      ctTrauBoTSS: 0,
      ctTrauBoColiform: 0,
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
           value={phanDoanSong?.find((option:any) => option.id === trauBo.idPhanDoanSong) || null}
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
            label='Số trâu'
            fullWidth
            placeholder=''
            value={trauBo.soTrau || ''}
            onChange={event => handleChange('soTrau')(event.target.value)}
          />
        </Grid>  
        <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Số bò'
            fullWidth
            placeholder=''
            value={trauBo.soBo || ''}
            onChange={event => handleChange('soBo')(event.target.value)}
          />
        </Grid>  
        <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            label='Hệ số suy giảm dọc đường hay hệ số dòng chảy'
            fullWidth
            placeholder=''
            value={trauBo.heSoSuyGiam || ''}
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
                  value={trauBo.ctTrauBoBOD || ''}
                  onChange={event => handleChange('ctTrauBoBOD')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='COD'
                  fullWidth
                  placeholder=''
                  value={trauBo.ctTrauBoCOD || ''}
                  onChange={event => handleChange('ctTrauBoCOD')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Amoni'
                  fullWidth
                  placeholder=''
                  value={trauBo.ctTrauBoAmoni || ''}
                  onChange={event => handleChange('ctTrauBoAmoni')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng N'
                  fullWidth
                  placeholder=''
                  value={trauBo.ctTrauBoTongN || ''}
                  onChange={event => handleChange('ctTrauBoTongN')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng P'
                  fullWidth
                  placeholder=''
                  value={trauBo.ctTrauBoTongP || ''}
                  onChange={event => handleChange('ctTrauBoTongP')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng chất rắn lơ lửng TSS'
                  fullWidth
                  placeholder=''
                  value={trauBo.ctTrauBoTSS || ''}
                  onChange={event => handleChange('ctTrauBoTSS')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng coliform'
                  fullWidth
                  placeholder=''
                  value={trauBo.ctTrauBoColiform || ''}
                  onChange={event => handleChange('ctTrauBoColiform')(event.target.value)}
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
            value={trauBo.ghiChu || ''}
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

const ThaiTrauBoForm = ({ data, setPostSuccess, isEdit }: any) => {
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

export default ThaiTrauBoForm
