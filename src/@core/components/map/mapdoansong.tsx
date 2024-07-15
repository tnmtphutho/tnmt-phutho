import React, { useState, useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, LayersControl, Marker, Tooltip, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import ReactLeafletKml from 'react-leaflet-kml'
import { BingLayer } from '../bingmap'
import { fetchAndParseKML } from './utils'
import { Typography } from '@mui/material'
import DoanSongPopup from './popup-river'

const { BaseLayer } = LayersControl

export default function MapDoanSong({ center, zoom, selectedKmlFile, mapData }: any) {
  const [bing_key] = useState('AuhiCJHlGzhg93IqUH_oCpl_-ZUrIE6SPftlyGYUvr9Amx5nzA-WqGcPquyFZl4L')
  const [defaultKmls, setDefaultKmls] = useState<(Document | null)[]>([])
  const [selectedKmlData, setSelectedKmlData] = useState<Document | null>(null)
  const kmlKey = useMemo(
    () => (selectedKmlFile ? `selected-${Date.now()}` : `default-${Date.now()}`),
    [selectedKmlFile]
  )

  useEffect(() => {
    const kmlFiles = ['/kml/doansong/phandoansong79song_QN.kml', '/kml/tinh-quangngai.kml']
    const loadKmlFiles = async () => {
      const loadedKmls = await Promise.all(kmlFiles.map(file => fetchAndParseKML(file)))
      setDefaultKmls(loadedKmls.filter(kml => kml !== null))
    }
    loadKmlFiles()
  }, [])

  useEffect(() => {
    if (selectedKmlFile) {
      const loadSelectedKml = async () => {
        const kmlDoc = await fetchAndParseKML(`${selectedKmlFile}`)
        setSelectedKmlData(kmlDoc)
      }
      loadSelectedKml()
    }
  }, [selectedKmlFile])

  // Create icon for map marker
  const createIcon = (url: any) => {
    return new L.Icon({
      iconUrl: url,
      iconSize: [18, 18],
      iconAnchor: [18, 18],
      popupAnchor: [-9, -18]
    })
  }

  return (
    <MapContainer attributionControl={false} center={center} zoom={zoom} style={{ height: '100%' }} key={kmlKey}>
      <LayersControl position='topright'>
        <BaseLayer name='Bản đồ hành chính'>
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        </BaseLayer>
        <BaseLayer name='Bản đồ đường'>
          <BingLayer bingkey={bing_key} type='Road' />
        </BaseLayer>
        <BaseLayer checked name='Bản đồ vệ tinh'>
          <BingLayer bingkey={bing_key} type='AerialWithLabels' />
        </BaseLayer>
      </LayersControl>
      {selectedKmlFile != null ? (

        <Marker icon={createIcon('/images/icon/marker.png')} key={1} position={center}>
    

          <Tooltip direction='top' offset={[-10, -18]} opacity={1}>
          {mapData.phanDoan}
          </Tooltip>
          <Popup>
            <Typography sx={{ color: '#035291', textAlign: 'center', fontWeight: 'bold', margin: '0 !important' }}>
            {mapData.phanDoan}
            </Typography>
            <DoanSongPopup popupData={mapData} />
          </Popup>
        </Marker>
      ) : (
        ''
      )}

      {defaultKmls.map((kml, index) => kml && <ReactLeafletKml key={`default-${index}`} kml={kml} />)}
      {selectedKmlData && <ReactLeafletKml kml={selectedKmlData} key={`selected-${Date.now()}`} />}
    </MapContainer>
  )
}
