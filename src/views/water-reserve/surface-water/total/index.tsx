import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { SyntheticEvent, useState } from "react";
import InterprovincialRiverBasin from "./interprovincial-river-basin";
import HydrologyStations from "./hydrology-stations";
import IntraProvincialRiverBasin from "./intra-provincial-river-basin";


const TotalSFWater = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="ground water reserve">
                    <Tab label="Lưu vực sông liên tỉnh" value="1" />
                    <Tab label="Lưu vực sông nội tỉnh" value="2" />
                    <Tab label="Trạm thủy văn" value="3" />
                    <Tab label="Tổng dung tích hồ chứa" value="3" />
                </TabList>
            </Box>
            <TabPanel value="1"><InterprovincialRiverBasin /></TabPanel>
            <TabPanel value="2"><IntraProvincialRiverBasin /></TabPanel>
            <TabPanel value="3"><HydrologyStations /></TabPanel>

        </TabContext>
    )
}
export default TotalSFWater
