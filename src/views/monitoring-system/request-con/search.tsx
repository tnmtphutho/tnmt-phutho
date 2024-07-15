import { Autocomplete, Grid, TextField } from "@mui/material"
import { useEffect, useRef, useState } from 'react';
import { getData } from 'src/api/axios';

const complete1 = [
  { title: 'Chọn loại CT', value: 1 },
  { title: 'Khai thác', value: 8 },
  { title: 'Thăm dò', value: 9 },
  { title: 'Hành nghề khoan', value: 10 },
  { title: 'Công trình khác', value: 23 },
  { title: 'Trám lấp giếng', value: 24 }
]



const SearchRequest = () => {

  const [paramsFilter] = useState({
    so_gp: null,
    cong_trinh: 0,
    coquan_cp: null,
    loaihinh_cp: 0,
    hieuluc_gp: null,
    loai_ct: 0,
    tang_chuanuoc: 0,
    huyen: 0,
    xa: 0,
    tieuvung_qh: 0,
    tochuc_canhan: 0,
    tu_nam: 0,
    den_nam: 0,
  });

  const [loading, setLoading] = useState(false);
  const [resData, setResData] = useState([]);

  const isMounted = useRef(true);

  const getDataLicense = async () => {
    setLoading(true);
    getData('giay-phep/danh-sach', paramsFilter)
      .then((data) => {
        if (isMounted.current) {
          setResData(data);
          console.log(resData);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loading && setLoading(false);
      });
  };

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getDataLicense();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container xs={12} sm={12} md={10} direction='row' justifyContent='start' alignItems='center' spacing={4} sx={{margin: '20px 10px'}}>
      <Grid item xs={12} sm={7} md={4}>
        <Autocomplete
          fullWidth
          size='small'
          options={complete1}
          getOptionLabel={(option: any) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='standard'
              fullWidth

              label='Chọn loại hình CT'
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={7} md={4}>
        <Autocomplete
          size='small'
          options={complete1}
          getOptionLabel={(option: any) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              variant='standard'
              fullWidth

              label='Chọn loại hình CT'
            />
          )}
        />
      </Grid>
    </Grid>
  )
}

export default SearchRequest
