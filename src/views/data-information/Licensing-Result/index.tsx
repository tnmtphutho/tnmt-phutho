import {
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material'
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { formatDate } from 'src/@core/components/formater';
import ShowFilePDF from 'src/@core/components/show-file-pdf';
import { getData } from 'src/api/axios';

const LicenseResult = () => {

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

        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
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

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(50)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Grid className='_text_center'>
      <Typography className='font-weight-bold' sx={{ mt: 3 }} variant='h6'>
        THỐNG KÊ KẾT QUẢ CẤP PHÉP
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead className='tableHead'>
            <TableRow>
              <TableCell size='small' align='center'>
                STT
              </TableCell>
              <TableCell size='small' align='center'>
                Số giấy phép
              </TableCell>
              <TableCell size='small' align='center'>
                Tên giấy phép
              </TableCell>
              <TableCell size='small' align='center'>
                Ngày ký giấy phép
              </TableCell>
              <TableCell size='small' align='center'>
                Thời hạn cấp phép
              </TableCell>
              <TableCell size='small' align='center'>
                Cơ quan cấp phép
              </TableCell>
              <TableCell size='small' align='center'>
                Tên chủ giấy phép
              </TableCell>
              <TableCell size='small' align='center'>
                Địa chỉ chủ giấy phép
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className='tableBody'>

            {loading ? <CircularProgress /> : resData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((e: any, i) => {
              return (
                <TableRow key={i}>
                  <TableCell className="text-center  size='small' align-middle font-13">{(page * rowsPerPage + i + 1)}</TableCell>
                  <TableCell className="text-center  size='small' align-middle font-13">{<ShowFilePDF name={e.soGP} src={e.fileGiayPhep} />}</TableCell>
                  <TableCell className="text-center  size='small' align-middle font-13">{e.tenGP}</TableCell>
                  <TableCell className="text-center  size='small' align-middle font-13">{formatDate(e.ngayKy)}</TableCell>
                  <TableCell className="text-center  size='small' align-middle font-13">{e.thoiHan}</TableCell>
                  <TableCell className="text-center  size='small' align-middle font-13">{e.coQuanCapPhep}</TableCell>
                  <TableCell className="text-center  size='small' align-middle font-13">{e.tochuc_canhan?.tenTCCN}</TableCell>
                  <TableCell className="text-center  size='small' align-middle font-13">{e.tochuc_canhan?.diaChi}</TableCell>
                </TableRow>
              )
            })}

          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, resData?.length]}
          component='div'
          count={resData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Grid>
  )
}

export default LicenseResult
