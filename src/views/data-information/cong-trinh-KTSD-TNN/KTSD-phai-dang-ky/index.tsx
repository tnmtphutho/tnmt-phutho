import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { SyntheticEvent, useState } from "react";
import KTNMPhaiDangKy from "./nuoc-mat/KTNM-phai-dang-ky";
import KTNBIENPhaiDangKy from "./nuoc-bien/KTNBIEN-phai-dang-ky";
import KTNDDPhaiDangKy from "./ndd/KTNNDD-phai-dang-ky";

const KTNMPhaiDangKyPages = () => {
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
            <TabPanel value="1"><KTNMPhaiDangKy /></TabPanel>
            <TabPanel value="2"><KTNBIENPhaiDangKy  /></TabPanel>
            <TabPanel value="3"><KTNDDPhaiDangKy /></TabPanel>
           
        </TabContext>
    )
}
export default KTNMPhaiDangKyPages