import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { SyntheticEvent, useState } from "react";
import KTNMPhaiCoGiayPhep from "./nuoc-mat/KTNM-phai-co-giay-phep";
import KTNBIENPhaiCoGiayPhep from "./nuoc-bien/KTNBIEN-phai-co-giay-phep";
import KTNDDPhaiCoGiayPhep from "./ndd/KTNNDD-phai-co-giay-phep";

const KTSDPhaiCoGiayPhep = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="ground water reserve">
                    <Tab label="1. Khai thác nước mặt" value="1" />
                    <Tab label="2. Khai thác nước biển" value="2" />
                    <Tab label="3. Khai thác NDĐ" value="3" />
                </TabList>
            </Box>
            <TabPanel value="1"><KTNMPhaiCoGiayPhep /></TabPanel>
            <TabPanel value="2"><KTNBIENPhaiCoGiayPhep /></TabPanel>
            <TabPanel value="3"><KTNDDPhaiCoGiayPhep /></TabPanel>
           
        </TabContext>
    )
}
export default KTSDPhaiCoGiayPhep