import { CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { checkAccessPermission } from 'src/@core/layouts/checkAccessPermission';
import Error401 from "src/pages/401";
import React from "react";
import LuongMuaHienTai from "src/views/van-hanh-ho-chua/mua-hien-tai/LuongMuaHienTai"


const LuongMuaHienTaiPages = () => {
    const router = useRouter();
    const routePath = router.pathname; // Use router.pathname to get the current pathname

    // Split the pathname and get the part you need (in this case, the first segment)
    const routeSegment = routePath.split('/')[1];

    const [accessView, setAccessView] = useState(false);
    const [loading, setLoading] = useState(true)

    async function getAccess() {
        setAccessView(await checkAccessPermission(routeSegment, 'view').finally(() => { setLoading(false) }));
    }

    useEffect(() => {
        getAccess()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Use routeSegment in your conditional rendering
    return loading ? <Typography align='center'><CircularProgress /></Typography> : accessView ? <LuongMuaHienTai /> : <Error401 />;
}

export default LuongMuaHienTaiPages
