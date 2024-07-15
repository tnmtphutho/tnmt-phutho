import React, { useState } from 'react'
import { Add, Cancel, Edit, Save } from '@mui/icons-material'
import { Button, CircularProgress, DialogActions, Grid, IconButton, Tooltip } from '@mui/material'
import DialogsControlFullScreen from 'src/@core/components/dialog-control-full-screen'
import { useRouter } from 'next/router'
import GroundWaterField from './cons-ground'
import SurfaceWaterField from './cons-suface'
import DischargeWaterField from './cons-discharge'
import { saveData } from 'src/api/axios'
import { ConstructionState } from './construction-interface'

interface FormConstructionProps {
  data: any
  closeDialogs: () => void
  setPostSuccess?: (value: boolean) => void
}

const FormConstruction: React.FC<FormConstructionProps> = ({ data, closeDialogs, setPostSuccess }) => {
  const route = useRouter()

  //Construction
  const [congtrinh, SetCongTrinh] = useState<ConstructionState | null>(data || null)
  const [saving, setSaving] = useState(false)

  const handleConsChange = (updatedData: ConstructionState) => {
    SetCongTrinh(updatedData);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const handleApiCall = async () => {
      try {
        setSaving(true)
        const res = await saveData('cong-trinh/luu', congtrinh)
        if (res) {
          typeof setPostSuccess === 'function' ? setPostSuccess(true) : ''
        }

      } catch (error) {
      } finally {
        setSaving(false)
        closeDialogs()
      }
    }

    // Call the function
    handleApiCall()
  }

  const handleClose = () => {
    SetCongTrinh(null)

    closeDialogs()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container gap={3}>
        <Grid item xs={12}>
          {route.pathname.split('/')[2] == 'nuoc-mat' ? (
            <SurfaceWaterField props={data?.id} onChange={handleConsChange} />
          ) : route.pathname.split('/')[2] == 'nuoc-duoi-dat' ? (
            <GroundWaterField props={data?.id} onChange={handleConsChange} />
          ) : route.pathname.split('/')[2] == 'xa-thai' ? (
            <DischargeWaterField props={data?.id} onChange={handleConsChange} />
          ) : (
            ''
          )}
        </Grid>
      </Grid>

      <DialogActions sx={{ p: 0, mt: 5 }}>
        <Button
          startIcon={<Cancel />}
          variant='outlined'
          color='error'
          size='small'
          onClick={handleClose}>
          Huỷ
        </Button>
        <Button
          startIcon={saving ? <CircularProgress color='inherit' size={20} /> : <Save />}
          variant='outlined'
          color='primary'
          size='small'
          onClick={handleSubmit}
          disabled={saving}>
          Lưu
        </Button>
      </DialogActions>
    </form>
  )
}

interface CreateConstructionProps {
  isEdit: boolean
  data?: any
  setPostSuccess?: (value: boolean) => void
}

const CreateConstruction: React.FC<CreateConstructionProps> = ({ isEdit, data, setPostSuccess }) => {
  const formTitle = isEdit ? 'Sửa thông tin công trình' : 'Thêm công trình mới'

  return (
    <DialogsControlFullScreen>
      {(openDialogs: (content: React.ReactNode, title: React.ReactNode) => void, closeDialogs: () => void) => (
        <>
          {isEdit ? (
            <Tooltip title='Chỉnh sửa thông tin công trình'>
              <IconButton
                onClick={() =>
                  openDialogs(
                    <FormConstruction data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />,
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
                openDialogs(
                  <FormConstruction data={data} closeDialogs={closeDialogs} setPostSuccess={setPostSuccess} />,
                  formTitle
                )
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

export default CreateConstruction
