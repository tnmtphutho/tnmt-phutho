import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { SyntheticEvent, useState } from "react";
import MNNTRiver from "./RiverLienTinh";


const DanhMucNguonNuocLienTinh = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="ground water reserve">
                    <Tab label="Sông,suối liên tỉnh " value="1" />
                   
                </TabList>
            </Box>
            <TabPanel value="1"><MNNTRiver /></TabPanel>
           
        </TabContext>
    )
}
export default DanhMucNguonNuocLienTinh