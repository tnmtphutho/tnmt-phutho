import { Fragment, useEffect, useState } from 'react'
import { Add, Edit, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, TextField, CircularProgress, Tooltip, Autocomplete } from '@mui/material'
import { getData, saveData } from 'src/api/axios'
import { FormDuLieuNguonNhanState } from './wasteWaterInterface'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [phanDoanSong, setPhanDoanSong] = useState([]);

  const [report1Data, setreport1Data] = useState<FormDuLieuNguonNhanState>({
    id: data?.id || 0,
    idPhanDoanSong: data?.idPhanDoanSong || 0,
    luuLuongDongChay: data?.luuLuongDongChay || 0,
    cnnBOD: data?.cnnBOD || 0,
    cnnCOD: data?.cnnCOD || 0,
    cnnAmoni: data?.cnnAmoni || 0,
    cnnTongN: data?.cnnTongN || 0,
    cnnTongP: data?.cnnTongP || 0,
    cnnTSS: data?.cnnTSS || 0,
    cnnColiform: data?.cnnColiform || 0,
    cqcBOD: data?.cqcBOD || 0,
    cqcCOD: data?.cqcCOD || 0,
    cqcAmoni: data?.cqcAmoni || 0,
    cqcTongN: data?.cqcTongN || 0,
    cqcTongP: data?.cqcTongP || 0,
    cqcTSS: data?.cqcTSS || 0,
    cqcColiform: data?.cqcColiform || 0,
    ghiChu: data?.ghiChu || ''
  })

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
  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof FormDuLieuNguonNhanState) => (value: any) => {
    setreport1Data({ ...report1Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('DuLieuNguonNuocNhan/luu', report1Data)
        if (res) {
          // Reset form fields
          setreport1Data({
            id: 0,
            idPhanDoanSong: 0,
            luuLuongDongChay: 0,
            cnnBOD: 0,
            cnnCOD: 0,
            cnnAmoni: 0,
            cnnTongN: 0,
            cnnTongP: 0,
            cnnTSS: 0,
            cnnColiform: 0,
            cqcBOD: 0,
            cqcCOD: 0,
            cqcAmoni: 0,
            cqcTongN: 0,
            cqcTongP: 0,
            cqcTSS: 0,
            cqcColiform: 0,
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
    setreport1Data({
      id: 0,
      idPhanDoanSong: 0,
      luuLuongDongChay: 0,
      cnnBOD: 0,
      cnnCOD: 0,
      cnnAmoni: 0,
      cnnTongN: 0,
      cnnTongP: 0,
      cnnTSS: 0,
      cnnColiform: 0,
      cqcBOD: 0,
      cqcCOD: 0,
      cqcAmoni: 0,
      cqcTongN: 0,
      cqcTongP: 0,
      cqcTSS: 0,
      cqcColiform: 0,
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
           value={phanDoanSong?.find((option:any) => option.id === report1Data.idPhanDoanSong) || null}
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
            label='Lưu lượng dòng chảy'
            fullWidth
            placeholder=''
            value={report1Data.luuLuongDongChay || ''}
            onChange={event => handleChange('luuLuongDongChay')(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <fieldset>
            <legend>Kết quả phân tích thông số chất lượng nước mặt</legend>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='BOD5'
                  fullWidth
                  placeholder=''
                  value={report1Data.cnnBOD || ''}
                  onChange={event => handleChange('cnnBOD')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='COD'
                  fullWidth
                  placeholder=''
                  value={report1Data.cnnCOD || ''}
                  onChange={event => handleChange('cnnCOD')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Amoni'
                  fullWidth
                  placeholder=''
                  value={report1Data.cnnAmoni || ''}
                  onChange={event => handleChange('cnnAmoni')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng N'
                  fullWidth
                  placeholder=''
                  value={report1Data.cnnTongN || ''}
                  onChange={event => handleChange('cnnTongN')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng P'
                  fullWidth
                  placeholder=''
                  value={report1Data.cnnTongP || ''}
                  onChange={event => handleChange('cnnTongP')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng chất rắn lơ lửng TSS'
                  fullWidth
                  placeholder=''
                  value={report1Data.cnnTSS || ''}
                  onChange={event => handleChange('cnnTSS')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng coliform'
                  fullWidth
                  placeholder=''
                  value={report1Data.cnnColiform || ''}
                  onChange={event => handleChange('cnnColiform')(event.target.value)}
                />
              </Grid>
            </Grid>
          </fieldset>
        </Grid>
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <fieldset>
            <legend>GIÁ TRỊ GIỚI HẠN THÔNG SỐ CHẤT LƯỢNG NƯỚC THEO TIÊU CHUẨN QCVN 08:2023/BTNMT</legend>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='BOD5'
                  fullWidth
                  placeholder=''
                  value={report1Data.cqcBOD || ''}
                  onChange={event => handleChange('cqcBOD')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='COD'
                  fullWidth
                  placeholder=''
                  value={report1Data.cqcCOD || ''}
                  onChange={event => handleChange('cqcCOD')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Amoni'
                  fullWidth
                  placeholder=''
                  value={report1Data.cqcAmoni || ''}
                  onChange={event => handleChange('cqcAmoni')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng N'
                  fullWidth
                  placeholder=''
                  value={report1Data.cqcTongN || ''}
                  onChange={event => handleChange('cqcTongN')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng P'
                  fullWidth
                  placeholder=''
                  value={report1Data.cqcTongP || ''}
                  onChange={event => handleChange('cqcTongP')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng chất rắn lơ lửng TSS'
                  fullWidth
                  placeholder=''
                  value={report1Data.cqcTSS || ''}
                  onChange={event => handleChange('cqcTSS')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12} sx={{ my: 2 }}>
                <TextField
                  size='small'
                  type='text'
                  label='Tổng coliform'
                  fullWidth
                  placeholder=''
                  value={report1Data.cqcColiform || ''}
                  onChange={event => handleChange('cqcColiform')(event.target.value)}
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
            value={report1Data.ghiChu || ''}
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

const CreateWasteForm = ({ data, setPostSuccess, isEdit }: any) => {
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

export default CreateWasteForm
