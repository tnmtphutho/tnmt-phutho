import React, { FC, Fragment, useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, Typography } from '@mui/material';


interface MapLegendWasteProps {
    onChange: (data: any) => void;
}

const MapLegendWaste: FC<MapLegendWasteProps> = ({ onChange }) => {
    const [filter, setFilter] = useState<any>([]);
    const [initialItems, setInitialItems] = useState<any>(['ltnBod', 'ltnCod','ltnAmoni', 'ltnColiform', 'ltnTSS', 'ltnTongN', 'ltnTongP']);
    const [checkedItems, setCheckedItems] = useState(initialItems);

    useEffect(() => {
        setFilter([
            {id: "ltnBod", label: "BOD5" },
            {id: "ltnCod", label: "COD" },
            {id: "ltnAmoni", label: "Amoni" },
            {id: "ltnTongN", label: "Tổng N" },
            {id: "ltnTongP", label: "Tổng P" },
            {id: "ltnTSS", label: "TSS" },
            {id: "ltnColiform", label: "Coliform" },
        ]);
        setInitialItems(['ltnBod', 'ltnCod','ltnAmoni', 'ltnColiform', 'ltnTSS', 'ltnTongN', 'ltnTongP'])
    }, [])
 
    const handleCheckboxChange = (item: string) => () => {
        setCheckedItems((prevCheckedItems: any) => {
            const currentIndex = prevCheckedItems.indexOf(item);
            let newChecked: string[] = [];

            if (currentIndex === -1) {
                newChecked = [...prevCheckedItems, item];
            } else {
                newChecked = prevCheckedItems.filter((checkedId: any) => checkedId !== item);
            }

            return newChecked
        });
    };

    onChange(checkedItems);

    const renderTree = (nodes: any) => (
        <Fragment>
            {nodes.map((node: any) => {
                const labelId = `checkbox-list-label-${node.id}`;

                return (
                    <Box key={node.id} sx={{ display: "flex", flexDirection: "column", ml: 5 }}>
                        <FormControlLabel
                            control={
                                <Checkbox sx={{ pb: 1, pl: 2 }}
                                    onChange={handleCheckboxChange(node.id)}
                                    edge="start"
                                    checked={checkedItems.includes(node.id)}
                                    indeterminate={
                                        node.children?.some((childId: any) => checkedItems.includes(childId)) &&
                                        !checkedItems.includes(node.id)
                                    }
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            }
                            label={<Typography variant='overline' sx={{ fontWeight: 'bold' }}>{node.label}</Typography>}
                        />
                      
                    </Box>
                );
            })}
        </Fragment>
    );

    return <div>{renderTree(filter)}</div>;
};

export default MapLegendWaste;
