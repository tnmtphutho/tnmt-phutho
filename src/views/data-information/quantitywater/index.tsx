import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { SyntheticEvent, useState } from "react";
import SFInformation from "./SufaceIF";
import GRInformation from "./GroundIF";
import AverageFlowSF from "./AverageFlow";

const QuantitySFWater = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="ground water reserve">
                    <Tab label="TỔNG LƯỢNG NƯỚC MẶT " value="1" />
                    <Tab label="DÒNG CHẢY TRUNG BÌNH THÁNG, NĂM" value="2" />
                    <Tab label="TỔNG DUNG TÍCH HỒ CHỨA" value="3" />
                    <Tab label="Nước dưới đất" value="3" />
                </TabList>
            </Box>
            <TabPanel value="1"><SFInformation /></TabPanel>
            <TabPanel value="2"><AverageFlowSF /></TabPanel>
            <TabPanel value="3"><GRInformation /></TabPanel>
           
        </TabContext>
    )
}
export default QuantitySFWater
