//React Imports

import React, { SyntheticEvent } from 'react'
import { useState } from 'react'
import ThongTinHoChuaVanHanh from '././thong-tin-ho-chua-van-hanh'


import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material'

import { Paper, Button, Box, Tab, Select, MenuItem } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

//import dynamic from 'next/dynamic'

import dynamic from 'next/dynamic'
import { TabContext, TabList, TabPanel } from '@mui/lab'

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const ThongTinHoChua = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const [mapCenter] = useState([15.012172, 108.676488])
  const [mapZoom] = useState(9)
  const [selected, setSelected] = useState(true)

  const [layer, setLayer] = useState('ban-do')

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='ground water reserve'>
              <Tab label='Thông số kỹ thuật hồ chứa ' value='1' />
              <Tab label='Quan hệ mực nước - dung tích' value='2' />

            </TabList>
          </Box>

          <TabPanel value='1'>
            <Grid xs={12} md={12} sx={{ height: 'calc(50vh - 82px)' }}>
              <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
                <Select
                  className='toggle-legend'
                  value={layer}
                  size='small'
                  onChange={(e) => setLayer(e.target.value)}
                >
                  <MenuItem value={'ban-do'}>Bản đồ</MenuItem>
                  <MenuItem value={'so-do-thang'}>Sơ đồ thẳng</MenuItem>
                </Select>
                {
                  layer && layer == 'ban-do' ?
                    <Map center={mapCenter} zoom={mapZoom} showLabel={false} mapData={null} loading={false} />
                    : <>Ảnh sơ đồ thẳng</>
                }

              </Paper>
            </Grid>
            <Grid>
              <ThongTinHoChuaVanHanh />
            </Grid>
          </TabPanel>

          <TabPanel value='2'>
            <Grid xs={12} md={12} sx={{ height: 'calc(50vh - 82px)' }}>
              <Paper elevation={3} sx={{ height: '100%', position: 'relative' }}>
                <Button
                  className='toggle-legend'
                  variant='outlined'
                  onClick={() => {
                    setSelected(!selected)
                  }}
                >
                  {selected ? <KeyboardDoubleArrowDown /> : <KeyboardDoubleArrowUp />}
                </Button>
                <Map center={mapCenter} zoom={mapZoom} showLabel={false} mapData={null} loading={false} />
              </Paper>
            </Grid>
            <Grid>

            </Grid>
          </TabPanel>

        </TabContext>
      </Grid>
    </Grid>
  )
}

export default ThongTinHoChua
