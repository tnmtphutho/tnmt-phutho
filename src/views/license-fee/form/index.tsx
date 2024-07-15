import DialogsControl from 'src/@core/components/dialog-control'
import { Add, CloudUpload, EditNote, Save } from '@mui/icons-material'
import {
  Grid,
  Button,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  CircularProgress,
  IconButton,
  Select,
  Stack,
  OutlinedInput,
  MenuItem,
  Chip,
  FormControl,
  InputLabel
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useRouter } from 'next/router'
import { LicenseFeeState, emptyLicenseFeeData } from './license-fee-interface'
import { VisuallyHiddenInput } from 'src/@core/theme/VisuallyHiddenInput'
import { getData, saveData, uploadFile } from 'src/api/axios'

const Form = ({ data, setPostSuccess, closeDialogs }: any) => {
  const [values, setValues] = useState<LicenseFeeState>({
    id: data?.id || 0,
    idCon: data?.idCon || 0,
    idGiayPhep: data?.idGiayPhep || 0,
    soQDTCQ: data?.soQDTCQ || null,
    ngayKy: dayjs(data?.ngayKy) || null,
    tongTienCQ: data?.tongTienCQ || null,
    filePDF: data?.filePDF || null,
    ghiChu: data?.ghiChu || null
  })
  const [listLicense, setListLicense] = useState([])
  const [licenseId, setLicenseId] = useState<any>([])
  console.log(licenseId)

  const [fileUpload, setFileUpload] = useState<any>()
  const [supplementLicenseFee, setSupplementLicenseFee] = useState(false)
  const [listLicFee, setListLicFee] = useState([])
  const [fetching, setFetching] = useState(false)
  const [saving, setSaving] = useState(false)

  // Hooks
  const router = useRouter()

  const handleChange = (prop: keyof LicenseFeeState) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setValues({ ...values, [prop]: value })
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setFileUpload(file)
  }

  const [filterLicense] = useState({
    so_gp: null,
    cong_trinh: 0,
    coquan_cp: null,
    loaihinh_cp: 0,
    hieuluc_gp: null,
    loai_ct: 0,
    tang_chuanuoc: 0,
    huyen: 0,
    xa: 0,
    tieuvung_qh: 0,
    tochuc_canhan: 0,
    tu_nam: 0,
    den_nam: 0
  })

  useEffect(() => {
    const getDataLicenseFees = async () => {
      setFetching(true)
      try {
        if (router.pathname.split('/')[4] == 'bo-cap') {
          const data = await getData('tien-cap-quyen/danh-sach/bo-cap')
          setListLicFee(data)

          const listLic = await getData('giay-phep/danh-sach/', { ...filterLicense, coquan_cp: 'btnmt' })
          setListLicense(listLic)
        } else {
          const data = await getData('tien-cap-quyen/danh-sach/tinh-cap')
          setListLicFee(data)

          const listLic = await getData('giay-phep/danh-sach/', { ...filterLicense, coquan_cp: 'ubndt' })
          setListLicense(listLic)
        }
      } catch (error) {
        setListLicFee([])
      } finally {
        setFetching(false)
      }
    }
    getDataLicenseFees()
  }, [filterLicense, router.pathname])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      let coquan_cp: string

      if (router.pathname.split('/')[4] == 'bo-cap') {
        coquan_cp = 'BTNMT'
      } else {
        coquan_cp = 'UBNDT'
      }

      const newVal = {
        ...values,
        coQuanCP: coquan_cp,
        ngayKy: values.ngayKy?.toDate(),
        filePDF: `pdf/tien-cap-quyen/${coquan_cp.toLowerCase()}/${values.ngayKy?.year()}/${values.soQDTCQ
          ?.replace(/\//g, '_')
          .toLowerCase()}.pdf`
      }

      const newFile = {
        filePath: `pdf/tien-cap-quyen/${coquan_cp.toLowerCase()}/${newVal.ngayKy?.getFullYear()}`,
        fileName: `${values.soQDTCQ?.replace(/\//g, '_').toLowerCase()}.pdf`,
        file: fileUpload
      }

      setSaving(true)
      try {
        const res = await saveData('tien-cap-quyen/luu', newVal)
        if (res) {
          await uploadFile(newFile)

          // Reset form fields
          setValues(emptyLicenseFeeData)

          typeof setPostSuccess === 'function' ? setPostSuccess(true) : ''
          closeDialogs()
        }
      } catch (error) {
        console.log(error)
      } finally {
        setSaving(false)
      }
    }

    // Call the function
    handleApiCall()
  }

  const handleClose = () => {
    setValues({})
    closeDialogs()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12} md={12} sx={{ my: 2 }}>
          <FormControlLabel
            label='Quyết định bổ xung'
            onChange={() => setSupplementLicenseFee(!supplementLicenseFee)}
            control={<Checkbox checked={supplementLicenseFee} />}
          />
        </Grid>
        {supplementLicenseFee ? (
          <Grid xs={12} md={12} sx={{ my: 2 }}>
            {fetching ? (
              <CircularProgress size={20} />
            ) : (
              <Autocomplete
                onChange={(e: any, v: any) => setValues({ ...values, idCon: v.id })}
                size='small'
                options={listLicFee}
                getOptionLabel={(option: any) => option.soQDTCQ}
                renderInput={params => <TextField {...params} fullWidth label='Chọn quyết định TCQ cần bổ xung' />}
              />
            )}
          </Grid>
        ) : (
          ''
        )}
        <Grid item xs={12} md={12} sm={12} sx={{ my: 2 }}>
          <FormControl sx={{ m: 1, width: 550 }}>
            <InputLabel>Chọn giấy phép</InputLabel>
            <Select
              multiple
              value={licenseId}
              onChange={e => setLicenseId(e.target.value)}
              input={<OutlinedInput label='Chọn giấy phép' />}
              renderValue={selected => (
                <Stack gap={1} direction='row' flexWrap='wrap'>
                  {selected.map((value: number) => {
                    const selectedLicense = listLicense.find((license: any) => license.id === value) as any

                    return selectedLicense ? <Chip key={value} label={selectedLicense.soGP} /> : null
                  })}
                </Stack>
              )}
            >
              {listLicense.map((license: any) => (
                <MenuItem key={license.id} value={license.id} content={license.soGP}>
                  {license.soGP}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            fullWidth
            label='Số quyết định'
            placeholder=''
            value={values?.soQDTCQ || ''}
            onChange={handleChange('soQDTCQ')}
          />
        </Grid>

        <Grid item xs={12} md={12} sx={{ my: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='Ngày ký'
              value={values.ngayKy || null}
              onChange={(newngayKy: any) => setValues({ ...values, ngayKy: newngayKy })}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
              format='DD/MM/YYYY'
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            fullWidth
            label='Tổng tiền'
            placeholder=''
            value={values?.tongTienCQ || 0}
            onChange={handleChange('tongTienCQ')}
          />
        </Grid>
        <Grid item xs={12} md={12} sx={{ my: 2 }}>
          <Button
            className='uploadBtn'
            component='label'
            variant='contained'
            startIcon={<CloudUpload />}
            href={`#file-upload`}
          >
            Upload file
            <VisuallyHiddenInput type='file' onChange={handleFileChange} accept='.pdf' />
          </Button>
        </Grid>
        <Grid item xs={12} md={12} sx={{ my: 2 }}>
          <TextField
            size='small'
            type='text'
            fullWidth
            label='Ghi chú'
            placeholder=''
            value={values?.ghiChu || ''}
            onChange={handleChange('ghiChu')}
          />
        </Grid>
      </Grid>
      <DialogActions sx={{ p: 0 }}>
        <Button onClick={() => handleClose()} className='btn cancleBtn'>
          Hủy
        </Button>
        <Button type='submit' disabled={saving} className='btn saveBtn'>
          {' '}
          {saving ? <CircularProgress color='inherit' size={20} /> : <Save />} &nbsp; Lưu{' '}
        </Button>
      </DialogActions>
    </form>
  )
}

const FormLicenseFee = ({ data, isEdit, setPostSuccess }: any) => {
  const formTitle = isEdit ? 'Thay đổi thông tin tiền cấp quyền' : 'Thêm tiền cấp quyền'

  return (
    <DialogsControl>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          {isEdit ? (
            <IconButton
              onClick={() =>
                openDialogs(
                  <Form data={data} setPostSuccess={setPostSuccess} isEdit={isEdit} closeDialogs={closeDialogs} />,
                  formTitle
                )
              }
            >
              <EditNote className='tableActionBtn' />
            </IconButton>
          ) : (
            <Button
              size='small'
              startIcon={<Add />}
              onClick={() =>
                openDialogs(
                  <Form data={data} setPostSuccess={setPostSuccess} isEdit={isEdit} closeDialogs={closeDialogs} />,
                  formTitle
                )
              }
            >
              Thêm mới
            </Button>
          )}
        </>
      )}
    </DialogsControl>
  )
}

export default FormLicenseFee
