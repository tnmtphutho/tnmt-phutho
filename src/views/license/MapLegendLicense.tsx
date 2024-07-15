import React, { Fragment, useEffect, useState } from 'react';
import List from '@mui/material/List';
import { Box, Typography } from '@mui/material';
import GetConstructionTypeId from 'src/@core/components/get-construction-type';
import { useRouter } from 'next/router';

const MapLegendLicenseChild = ({ nodes, checkedItems, onCheck, findItemChildren }: any) => {

    return (
        <List sx={{ p: 0 }}>
            {nodes.map((node: { id: React.Key | null | undefined; label: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; children: string | any[]; }) => {
                return (
                    <Box key={node.id}>
                        <Typography variant='overline' sx={{ fontWeight: 'bold', display: "flex", alignItems: 'center' }}>
                                <img src={`/images/icon/${node.id}.png`} alt="icon" width={20} />
                                <span>&nbsp;{node.label}</span></Typography>
                        {node.children?.length > 0 && (
                            <MapLegendLicenseChild
                                nodes={node.children}
                                checkedItems={checkedItems}
                                onCheck={onCheck}
                                findItemChildren={findItemChildren}
                            />
                        )}
                    </Box>
                );
            })}
        </List>
    );
};


const MapLegendLicense = () => {

    const [consType, setConsType] = useState<any>([]);
    const [initialItems, setInitialItems] = useState<any>(['nuocmat', 'thuydien', 'hochua', 'trambom', 'tramcapnuoc', 'cong', 'nhamaynuoc', 'nuocduoidat', 'khaithac', 'thamdo', 'congtrinhkhac_ndd', 'xathai', 'khu_cumcn_taptrung', 'sx_tieuthu_cn', 'sx_kd_dichvu', 'cs_benhvien', 'khudancu_langnghe', 'channuoi_ntts', 'congtrinhkhac_xt']);
    const [checkedItems, setCheckedItems] = useState(initialItems);

    const router = useRouter();

    useEffect(() => {
        switch (GetConstructionTypeId(router)) {
            case 1:
                setConsType([
                    {
                        id: "nuocmat", label: "NƯỚC MẶT", children: [
                            { label: "Thủy điện", id: "thuydien" },
                            { label: "Hồ chứa", id: "hochua" },
                            { label: "Trạm bơm", id: "trambom" },
                            { label: "Trạm cấp nước", id: "tramcapnuoc" },
                            { label: "Cống lấy nước", id: "cong" },
                            { label: "Nhà máy nước", id: "nhamaynuoc" }
                        ]
                    }
                ]);
                setInitialItems(['nuocmat', 'thuydien', 'hochua', 'trambom', 'tramcapnuoc', 'cong', 'nhamaynuoc'])
                break;
            case 2:
                setConsType([
                    {
                        id: "nuocduoidat", label: "NƯỚC DƯỚI ĐẤT", children: [
                            { label: "Khai thác", id: "khaithac" },
                            { label: "Thăm dò", id: "thamdo" },
                            { label: "Công trình khác", id: "congtrinhkhac_ndd" },
                        ]
                    }
                ]);
                setInitialItems(['nuocduoidat', 'khaithac', 'thamdo', 'congtrinhkhac_ndd'])
                break;
            case 3:
                setConsType([
                    {
                        id: "xathai", label: "XẢ THẢI", children: [
                            { label: "Khu / Cụm CN", id: "khu_cumcn_taptrung" },
                            { label: "SX tiểu thủ CN", id: "sx_tieuthu_cn" },
                            { label: "SX KD dịch vụ", id: "sx_kd_dichvu" },
                            { label: "CS bệnh viện", id: "cs_benhvien" },
                            { label: "Khu dân cư / Làng nghề", id: "khudancu_langnghe" },
                            { label: "Chăn nuôi / NTTS", id: "channuoi_ntts" },
                            { label: "Công trình khác", id: "congtrinhkhac_xt" },
                        ]
                    }
                ]);
                setInitialItems(['xathai', 'khu_cumcn_taptrung', 'sx_tieuthu_cn', 'sx_kd_dichvu', 'cs_benhvien', 'khudancu_langnghe', 'channuoi_ntts', 'congtrinhkhac_xt'])
                break;
            case 7:
                setConsType([
                    {
                        id: "nuocduoidat", label: "NƯỚC DƯỚI ĐẤT", children: [
                            { label: "Khai thác", id: "khaithac" },
                            { label: "Thăm dò", id: "thamdo" },
                            { label: "Công trình khác", id: "congtrinhkhac_ndd" },
                        ]
                    }
                ]);
                setInitialItems(['nuocduoidat', 'khaithac', 'thamdo', 'congtrinhkhac_ndd'])
                break;
            case 8:
                setConsType([
                    {
                        id: "nuocduoidat", label: "NƯỚC DƯỚI ĐẤT", children: [
                            { label: "Khai thác", id: "khaithac" },
                            { label: "Thăm dò", id: "thamdo" },
                            { label: "Công trình khác", id: "congtrinhkhac_ndd" },
                        ]
                    }
                ]);
                setInitialItems(['nuocduoidat', 'khaithac', 'thamdo', 'congtrinhkhac_ndd'])
                break;
            case 9:
                setConsType([
                    {
                        id: "nuocduoidat", label: "NƯỚC DƯỚI ĐẤT", children: [
                            { label: "Khai thác", id: "khaithac" },
                            { label: "Thăm dò", id: "thamdo" },
                            { label: "Công trình khác", id: "congtrinhkhac_ndd" },
                        ]
                    }
                ]);
                setInitialItems(['nuocduoidat', 'khaithac', 'thamdo', 'congtrinhkhac_ndd'])
                break;
            default:
                setConsType([
                    {
                        id: "nuocmat", label: "NƯỚC MẶT", children: [
                            { label: "Thủy điện", id: "thuydien" },
                            { label: "Hồ chứa", id: "hochua" },
                            { label: "Trạm bơm", id: "trambom" },
                            { label: "Trạm cấp nước", id: "tramcapnuoc" },
                            { label: "Cống lấy nước", id: "cong" },
                            { label: "Nhà máy nước", id: "nhamaynuoc" }
                        ]
                    },
                    {
                        id: "nuocduoidat", label: "NƯỚC DƯỚI ĐẤT", children: [
                            { label: "Khai thác", id: "khaithac" },
                            { label: "Thăm dò", id: "thamdo" },
                            { label: "Công trình khác", id: "congtrinhkhac_ndd" },
                        ]
                    },
                    {
                        id: "xathai", label: "XẢ THẢI", children: [
                            { label: "Khu / Cụm CN", id: "khu_cumcn_taptrung" },
                            { label: "SX tiểu thủ CN", id: "sx_tieuthu_cn" },
                            { label: "SX KD dịch vụ", id: "sx_kd_dichvu" },
                            { label: "CS bệnh viện", id: "cs_benhvien" },
                            { label: "Khu dân cư / Làng nghề", id: "khudancu_langnghe" },
                            { label: "Chăn nuôi / NTTS", id: "channuoi_ntts" },
                            { label: "Công trình khác", id: "congtrinhkhac_xt" },
                        ]
                    }
                ]);
                setInitialItems(['nuocmat', 'thuydien', 'hochua', 'trambom', 'tramcapnuoc', 'cong', 'nhamaynuoc', 'nuocduoidat', 'khaithac', 'thamdo', 'congtrinhkhac_ndd', 'xathai', 'khu_cumcn_taptrung', 'sx_tieuthu_cn', 'sx_kd_dichvu', 'cs_benhvien', 'khudancu_langnghe', 'channuoi_ntts', 'congtrinhkhac_xt']);
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const findItemChildren = (parentId: any) => {
        const parentItem = consType.find((item: any) => item.id === parentId);
        if (!parentItem) return [];

        const childrenIds: any = [];

        const traverseChildren = (item: any) => {
            if (item.children?.length === 0) return;
            item.children?.forEach((child: any) => {
                childrenIds.push(child.id);
                traverseChildren(child);
            });
        };

        traverseChildren(parentItem);

        return childrenIds;
    };

    const handleCheckboxChange = (item: string) => () => {
        setCheckedItems((prevCheckedItems: any) => {
            const currentIndex = prevCheckedItems.indexOf(item);
            let newChecked: string[] = [];

            if (currentIndex === -1) {
                newChecked = [...prevCheckedItems, item];
                const childrenIds = findItemChildren(item);
                newChecked.push(...childrenIds.filter((childId: any) => !prevCheckedItems.includes(childId))); // Only push unchecked children
            } else {
                newChecked = prevCheckedItems.filter((checkedId: any) => checkedId !== item);
                const childrenIds = findItemChildren(item);
                newChecked = newChecked.filter((checkedId) => !childrenIds.includes(checkedId));
            }

            return newChecked
        });
    };

    const renderTree = (nodes: any) => (
        <Fragment>
            {nodes.map((node: any) => {
                return (
                    <Box key={node.id} sx={{ display: "flex", flexDirection: "column", ml: 5 }}>
                        {node.children.length > 0 && (
                            <MapLegendLicenseChild
                                nodes={node.children}
                                checkedItems={checkedItems}
                                onCheck={handleCheckboxChange}
                                findItemChildren={findItemChildren}
                            />
                        )}
                    </Box>
                );
            })}
        </Fragment> 
    );

    return <>{renderTree(consType)}</>;
};

export default MapLegendLicense;
