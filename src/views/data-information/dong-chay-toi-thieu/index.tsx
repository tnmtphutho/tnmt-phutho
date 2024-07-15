import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { SyntheticEvent, useState } from "react";
import DongChayToiThieuSongPage from "./SongSuoi/DongChayToiThieuSong";
import DongChayToiThieuHo from "./Ho/DongChayToiThieuHo";

const DongChayToiThieu = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="ground water reserve">
                    <Tab label="Giá trị dòng chảy tối thiểu sông, suối " value="1" />
                    <Tab label="Giá trị dòng chảy tối thiểu hạ du hồ chứa, đập dâng" value="2" />
                  
                  
                </TabList>
            </Box>
            <TabPanel value="1"><DongChayToiThieuSongPage  /></TabPanel>
            <TabPanel value="2"><DongChayToiThieuHo /></TabPanel>
           
           
        </TabContext>
    )
}
export default DongChayToiThieu
