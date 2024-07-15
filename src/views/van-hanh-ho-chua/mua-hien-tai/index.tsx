//React Imports

import React, { SyntheticEvent } from 'react'
import { useState } from 'react'


import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material'

import { Paper, Button, Box, Tab } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

//import dynamic from 'next/dynamic'

import dynamic from 'next/dynamic'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import LuongMuaHienTai from './LuongMuaHienTai'
import MuaVrain from './MuaVrain'

const Map = dynamic(() => import("src/@core/components/map"), { ssr: false });

const LuongMuaHienTaiPages = () => {
  const [value, setValue] = useState('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const [mapCenter] = useState([15.012172, 108.676488])
  const [mapZoom] = useState(9)
  const [selected, setSelected] = React.useState(true)

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={12}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='ground water reserve'>
              <Tab label='Mưa tại trạm ' value='1' />
              <Tab label='Mưa Vrain' value='2' />
              </TabList>
          </Box>
          {/* Thêm tab trong trang */}
          <TabPanel value='1'>
            <LuongMuaHienTai />
          </TabPanel>
          <TabPanel value='2'>
            <MuaVrain />
          </TabPanel>

          <TabPanel value='3'>
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

export default LuongMuaHienTaiPages
