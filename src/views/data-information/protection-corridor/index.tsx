import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Box, Tab } from "@mui/material"
import { SyntheticEvent, useState } from "react";
import CorridorRiver from "./SongSuoiNoiTinh/RiverCoridor";
import CorridorLakeNhoHon from "./HoThuyDienNhoHon/LakeCorridorNhoHon";
import CorridorLakeLonHon from "./HoThuyDienLonHon/LakeCorridorLonHon";
import CorridorLake from "./AoHoDamTuNhien/LakeCorridor";

const CategoryCorridor = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="ground water reserve">
                    <Tab label="1. Sông,suối nội tỉnh " value="1" />
                    <Tab label="2. Hồ thủy lợi, thủy điện > 01 triệu m3" value="2" />
                    <Tab label="3. Hồ thủy lợi, thủy điện < 01 triệu m3" value="3" />
                    <Tab label="4. Ao, hồ, đầm tự nhiên, nhân tạo có chức năng điều hòa ở khu dân cư tập trung và các nguồn nước khác" value="4" />
                </TabList>
            </Box>
            <TabPanel value="1"><CorridorRiver /></TabPanel>
            <TabPanel value="2"><CorridorLakeLonHon /></TabPanel>
            <TabPanel value="3"><CorridorLakeNhoHon /></TabPanel>
            <TabPanel value="4"><CorridorLake /></TabPanel>
        </TabContext>
    )
}
export default CategoryCorridor