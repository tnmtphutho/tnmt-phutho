import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { SyntheticEvent, useState } from "react";
import KTNNDDPhaikekhai from "./KTNNDD-phai-ke-khai";


const KTNDDPhaiKeKhai = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="ground water reserve">
                    <Tab label="1. KT nước dưới đất của hộ gia đình" value="1" />
                    
                </TabList>
            </Box>
            <TabPanel value="1"><KTNNDDPhaikekhai /></TabPanel>
           
           
        </TabContext>
    )
}
export default KTNDDPhaiKeKhai