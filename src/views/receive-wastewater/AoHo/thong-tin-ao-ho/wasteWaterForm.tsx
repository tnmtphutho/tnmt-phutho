import { Fragment, useEffect, useState } from 'react'
import { Add, Edit, Save } from '@mui/icons-material'
import { Grid, Button, DialogActions, IconButton, TextField, CircularProgress, Tooltip, Autocomplete } from '@mui/material'
import { getData, saveData } from 'src/api/axios'
import { FormThongTinAoHoState } from './wasteWaterInterface'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [hoChua, setHoChua] = useState([]);

  const [thongSoQC, setThongSoQC] = useState([]);
  console.log(thongSoQC);
  
  const [report1Data, setreport1Data] = useState<FormThongTinAoHoState>({
    id: data?.id || 0,
    idHoChua: data?.idHoChua || 0,
    idCLNQC: data?.idCLNQC || 0,
    cnnBOD: data?.cnnBOD || 0,
    cnnCOD: data?.cnnCOD || 0,
    cnnAmoni: data?.cnnAmoni || 0,
    cnnTongN: data?.cnnTongN || 0,
    cnnTongP: data?.cnnTongP || 0,
    cnnTSS: data?.cnnTSS || 0,
    cnnColiform: data?.cnnColiform || 0,
    ghiChu: data?.ghiChu || ''
  })

   //dataselect
   useEffect(() => {
    setLoading(true);
    const getDataForSelect = async () => {
      try {
        const list = await getData('cong-trinh/danh-sach', {loai_ct: 5 });
        const quychuan = await getData('ThongSoCLNAo/danhsach');

        setHoChua(list);
        setThongSoQC(quychuan);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };
    getDataForSelect();
  }, []);
  const [saving, setSaving] = useState(false)

  const handleChange = (prop: keyof FormThongTinAoHoState) => (value: any) => {
    setreport1Data({ ...report1Data, [prop]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      setSaving(true)
      try {
        const res = await saveData('ThongTinAoHo/luu', report1Data)
        if (res) {
          // Reset form fields
          setreport1Data({
            id: 0,
            idHoChua: 0,
            idCLNQC: 0,
            cnnBOD: 0,
            cnnCOD: 0,
            cnnAmoni: 0,
            cnnTongN: 0,
            cnnTongP: 0,
            cnnTSS: 0,
            cnnColiform: 0,
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
      idHoChua: 0,
      idCLNQC: 0,
      cnnBOD: 0,
      cnnCOD: 0,
      cnnAmoni: 0,
      cnnTongN: 0,
      cnnTongP: 0,
      cnnTSS: 0,
      cnnColiform: 0,
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
           options={hoChua}
           getOptionLabel={(option: any) => `${option.tenCT} `}
           value={hoChua?.find((option:any) => option.id === report1Data.idHoChua) || null}
           onChange={(_, value) => handleChange('idHoChua')(value?.id || 0)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Chọn hồ chứa"
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
        <Autocomplete
           size="small"
           options={thongSoQC}
           getOptionLabel={(option: any) => `${option.mucPLCLNuoc} `}
           value={thongSoQC?.find((option:any) => option.id === report1Data.idCLNQC) || null}
           onChange={(_, value) => handleChange('idCLNQC')(value?.id || 0)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Chọn mức phân loại chất lượng nước theo QCVN08/2023"
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
