import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { SyntheticEvent, useState } from "react";
import ChucNangNguonNuocTangCN  from "./TangChuaNuoc/ChucNangNNTangChuaNuoc";
import ChucNangNguonNuocHo from "./Ho/ChucNangNNHo";
import ChucNangNguonNuocSong from "./SongSuoi/ChucNangNNSong";

const ChucNangNguonNuoc = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="ground water reserve">
                    <Tab label="Chức năng nguồn nước sông,suối " value="1" />
                    <Tab label="Chức năng nguồn nước hồ" value="2" />
                    <Tab label="Chức năng tầng chứa nước" value="3" />
                  
                </TabList>
            </Box>
            <TabPanel value="1"><ChucNangNguonNuocSong  /></TabPanel>
            <TabPanel value="2"><ChucNangNguonNuocHo /></TabPanel>
            <TabPanel value="3"><ChucNangNguonNuocTangCN   /></TabPanel>
           
        </TabContext>
    )
}
export default ChucNangNguonNuoc