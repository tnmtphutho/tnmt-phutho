import React, { useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import pagesNavigation from 'src/navigation/vertical/pages';
import themeConfig from 'src/configs/themeConfig';

const Home = () => {

    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    const navigationItems = pagesNavigation();

    return (
        <Grid container spacing={6} px={25}>
            <Grid item md={12} display={'flex'} alignItems={'center'}>

            </Grid>
            <Grid item md={12} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <img width={68} height={68} src="/images/logos/logo_sotnmt.png" alt="logo" />

                <Typography align='left' variant='h5' py={4} ml={3} fontWeight={700} textTransform={'uppercase'}>
                    {themeConfig.templateName} <br />
                    HỆ THỐNG THÔNG TIN VÀ CƠ SỞ DỮ LIỆU VỀ TÀI NGUYÊN VÀ MÔI TRƯỜNG
                </Typography>

            </Grid>
            <Grid item md={12}>
                <Grid container spacing={5} justifyContent={'center'}>
                    <Grid item md={3}>
                        <Grid container spacing={2}>
                            {
                                navigationItems.map((item, index) => {
                                    return (
                                        <Grid item xs={12} md={12} sm={12} key={index} sx={{
                                            cursor: 'pointer',
                                            height: 'max-content'
                                        }}>
                                            <Link href={item.path} passHref>
                                                <Card sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', py: 2, px: 8 }}>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ width: 50, mr: 4 }}
                                                        image={item.logo}
                                                        alt={item.name}
                                                    />
                                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                                                        <CardContent sx={{ flex: '1 0 auto', p: '.5rem !important' }}>
                                                            <Typography component="div" variant="subtitle1" fontWeight={500} fontSize={18}>
                                                                {item.name}
                                                            </Typography>
                                                        </CardContent>
                                                    </Box>
                                                </Card>
                                            </Link>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                    <Grid item md={7}>
                        <img src="/images/bandohanhchinh.png" alt="" width={'100%'} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={12} alignContent={'center'} >
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <Typography variant='caption' fontWeight={700} color='#ff3a3f'>Bản quyền ©2024 thuộc Sở Tài nguyên và Môi trường Quảng Ngãi | </Typography>
                    <Typography variant='caption'>Cổng thông tin điện tử Quảng Ngãi</Typography>
                    <br />
                    <Typography variant='caption'>Địa chỉ: Số 163 Hùng Vương - TP Quảng Ngãi - Tỉnh Quảng Ngãi</Typography>
                    <br />
                    <Typography variant='caption'>Điện thoại: 0255.3714507; Fax: 0255.3822870; Email: stnmt@quangngai.gov.vn</Typography>
                </Box>
            </Grid>
        </Grid >
    );
};

export default Home;
