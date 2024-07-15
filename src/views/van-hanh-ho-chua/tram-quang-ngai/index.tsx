import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { SyntheticEvent, useState } from "react";
import MonitoringSFChart from "./rain-chart";
import MonitoringSFData from "./rain-data";

const TramQuangNgai = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="ground water reserve">
                    <Tab label="Số liệu nghiên cứu " value="1" />
                    <Tab label="Đồ thị nghiên cứu" value="2" />
                  
                  
                </TabList>
            </Box>
            <TabPanel value="1"><MonitoringSFData /></TabPanel>
            <TabPanel value="2"><MonitoringSFChart /></TabPanel>
           
           
        </TabContext>
    )
}
export default TramQuangNgai
