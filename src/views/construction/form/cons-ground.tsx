import { Typography, Grid, Autocomplete, TextField, CircularProgress, Button, MenuItem, InputLabel, FormControl, OutlinedInput, Box } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, FC, useState, Fragment } from 'react'
import { ConstructionItemState, ConstructionLocationState, ConstructionState, MiningPurposeState, emptyConstructionData } from './construction-interface'
import { getData } from 'src/api/axios'
import { useRouter } from 'next/router'
import GetConstructionTypeId from 'src/@core/components/get-construction-type'
import { createConsCode, createConsUser } from 'src/@core/components/cons'
import ConstructionItem from './cons-item'
import { Add } from '@mui/icons-material'
import MiningPurpose from './mining-purpose'
import BoxLoading from 'src/@core/components/box-loading';

interface ConsTypeFieldsetProps {
  props?: any
  onChange: (data: any) => void
}

const GroundWaterField: FC<ConsTypeFieldsetProps> = ({ props, onChange }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false)
  const [construction, setConstruction] = useState<ConstructionState>({});
  const [consType, setconsType] = useState<any>([])
  const [basins, setBasins] = useState<any>([])
  const [districts, setDistrict] = useState<any>([])
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [communes, setCommunes] = useState<any[]>([]);
  const [selectedCommunes, setSelectedCommunes] = useState<string[]>([]);
  const [filteredCommunes, setFilteredCommunes] = useState<any[]>([]);
  const [showDataCons, setShowDataCons] = useState<boolean>(false)
  const isLicensepage = router.pathname.split('/')[3] == "cap-phep";
  const loai_ct = router.pathname.split('/')[4] == "nuoc-duoi-dat" ? router.pathname.split('/')[5] : "";
  const [ds_congtrinh, setDSCongtrinh] = useState<any>([])

  useEffect(() => {
    const getDataConstruction = async () => {
      try {
        setLoading(true)
        if (props !== undefined) {
          const cons = await getData(`cong-trinh/${props}`)
          setConstruction(cons)

          setSelectedDistricts(cons.vitri?.map((location: any) => {
            return `${location.tenHuyen}-${location.idHuyen}`;
          }),)

          setSelectedCommunes(cons.vitri?.map((location: any) => {
            return `${location.tenXa}-${location.idXa}-${location.idHuyen}`;
          }),)
        } else {
          setConstruction({})
        }

        //constructionType
        const consTypes = await getData('loai-ct/danh-sach')
        const filteredData = consTypes.filter((item: any) => item.idCha === GetConstructionTypeId(router))
        setconsType(filteredData)

        //Basin
        const basin = await getData('LuuVucSong/danh-sach')
        setBasins(basin)

        if (isLicensepage) {
          //List construction for license pages
          const dscongtrinh = await getData('cong-trinh/danh-sach', {
            tenct: null,
            loai_ct: construction?.idLoaiCT !== null ? construction?.idLoaiCT : GetConstructionTypeId(router),
            huyen: 0,
            xa: 0,
            song: 0,
            luuvuc: 0,
            tieu_luuvuc: 0,
            tang_chuanuoc: 0,
            tochuc_canhan: 0,
            nguonnuoc_kt: null
          })
          setDSCongtrinh(dscongtrinh)
        }

        //district
        const distric = await getData('hanh-chinh/huyen/danh-sach')
        setDistrict(distric)

        //communes 
        const allCommunes = await getData(`hanh-chinh/xa/danh-sach`);
        setCommunes(allCommunes.flat());
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getDataConstruction()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  useEffect(() => {
    const filterCommunes = () => {
      const selectedHuyenIds = selectedDistricts.map(district => district.split('-')[1]);
      const filtered = communes.filter(commune => selectedHuyenIds.includes(commune.idHuyen));
      setFilteredCommunes(filtered);
    };

    filterCommunes();
  }, [selectedDistricts, communes]);

  useEffect(() => {
    isLicensepage ? setShowDataCons(construction?.id !== null) : setShowDataCons(true);
  }, [construction?.id, isLicensepage])

  const handleChangeDistrict = async (event: SelectChangeEvent<string[]>) => {
    const newDistrictIds = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;
    setSelectedDistricts(newDistrictIds,)
  };

  const handleChangeCommune = (event: SelectChangeEvent<string[]>) => {
    const newCommuneIds = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;
    setSelectedCommunes(newCommuneIds);

    const newVitriArray: ConstructionLocationState[] = newCommuneIds.map(communeStr => {
      const idHuyen = communeStr.split('-')[2];
      const idXa = communeStr.split('-')[1];

      return {
        id: 0, // Temporary ID generation, replace as needed
        idCongTrinh: 0, // Adjust accordingly
        idHuyen: idHuyen,
        idXa: idXa,
      };
    });

    setConstruction(prev => ({
      ...prev,
      vitri: newVitriArray
    }));
  };

  const handleSetCons = (data: any) => {
    const cons: ConstructionState = data;
    setShowDataCons(true)
    setConstruction({ ...cons });
    onChange({ ...construction })
  }

  const handleAddNewCons = () => {
    setShowDataCons(true)
    setConstruction(emptyConstructionData);
  }

  const setNestedProperty = (obj: any, path: string, value: any) => {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    return obj;
  };

  const handleChange = (property: string) => (value: any) => {
    setConstruction((prev) => {
      const newState = { ...prev, maCT: createConsCode({ ...prev, [property]: value }), taiKhoan: createConsUser({ ...prev, [property]: value }) };
      setNestedProperty(newState, property, value);

      return newState;
    });
  };

  const handleMiningPurposeChange = (data: MiningPurposeState[]) => {
    setConstruction((prev) => ({
      ...prev,
      luuluong_theomd: data
    }));
  };

  const handleConsItemChange = (data: ConstructionItemState[]) => {
    setConstruction((prev) => ({
      ...prev,
      hangmuc: data
    }));
  };

  useEffect(() => {
    onChange(construction);
  }, [construction, onChange]);

  return (
    loading ? <BoxLoading />
      :
      <>
        <fieldset>
          <legend>
            <Typography variant={'subtitle1'} className='legend__title'>
              THÔNG TIN CÔNG TRÌNH
            </Typography>
          </legend>
          <Grid container spacing={6} >
            {
              loai_ct == "khai-thac-su-dung" || loai_ct == "tham-do" || loai_ct == "hanh-nghe-khoan" ?
                "" :
                <Grid item xs={12} md={4} sm={12}>
                  <Autocomplete
                    disabled={loading}
                    size='small'
                    options={consType}
                    getOptionLabel={(option: any) => option.tenLoaiCT}
                    value={consType.find((option: any) => option.id === construction?.idLoaiCT) || null}
                    isOptionEqualToValue={(option: any) => option.id}
                    onChange={(_, value) => handleChange('idLoaiCT')(value?.id || 0)}
                    renderInput={params => (
                      <TextField
                        required
                        {...params}
                        fullWidth
                        label='Chọn loại hình công trình'
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <Fragment>
                              {loading && <CircularProgress color='primary' size={20} />}
                              {params.InputProps.endAdornment}
                            </Fragment>
                          )
                        }}
                      />
                    )}
                  />
                </Grid>
            }
            {
              isLicensepage ?
                <Grid item xs={12} md={4} sm={12}>
                  <Autocomplete
                    disabled={loading}
                    size='small'
                    options={ds_congtrinh}
                    getOptionLabel={(option: any) => `${option.tenCT} ${option.donvi_hanhchinh !== null ? `(${option.donvi_hanhchinh?.tenHuyen})` : ''}`}
                    value={ds_congtrinh.find((option: any) => option.tenCT.toLowerCase() === construction?.tenCT?.toLowerCase()) || null}
                    isOptionEqualToValue={(option: any) => option.tenCT}
                    onChange={(_, value) => handleSetCons(value || emptyConstructionData)}
                    renderInput={params => (
                      <TextField
                        required
                        {...params}
                        fullWidth
                        label='Chọn công trình'
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <Fragment>
                              {loading && <CircularProgress color='primary' size={20} />}
                              {params.InputProps.endAdornment}
                            </Fragment>
                          )
                        }}
                      />
                    )}
                  />
                </Grid> : ''
            }
            {
              isLicensepage ?
                <Grid item xs={12} md={4} sm={12}>
                  <Button
                    variant='outlined'
                    sx={{ borderRadius: 0 }}
                    size='small'
                    startIcon={<Add />}
                    onClick={handleAddNewCons}
                  >
                    Thêm công trình mới
                  </Button>
                </Grid>
                : ""
            }
          </Grid>
          {showDataCons ?
            <Grid container spacing={6} mt={0}>
              <Grid item xs={12} md={3} sm={12}>
                <TextField
                  size='small'
                  type='text'
                  label='Tên công trình'
                  fullWidth
                  placeholder=''
                  value={construction?.tenCT || ''}
                  onChange={event => handleChange('tenCT')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12}>
                <TextField
                  size='small'
                  type='text'
                  label='Ký hiệu công trình'
                  fullWidth
                  placeholder=''
                  disabled
                  value={construction?.maCT || ''}
                  onChange={event => handleChange('maCT')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6} sm={12}>
                <TextField
                  size='small'
                  variant='outlined'
                  fullWidth
                  label='Địa điểm công trình'
                  multiline
                  maxRows={4}
                  value={construction?.viTriCT || ''}
                  onChange={event => handleChange('viTriCT')(event.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={5}>
                <FormControl fullWidth>
                  <InputLabel id="district_select_label">Quận/Huyện</InputLabel>
                  <Select
                    labelId="district_select_label"
                    id="district_select"
                    multiple
                    size='small'
                    value={selectedDistricts}
                    onChange={handleChangeDistrict}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {
                          selected.map((value: any, key: number, arr: any[]) => (
                            <Typography key={key} variant='caption' lineHeight={1.3}>
                              {value.split('-')[0]}{key < arr.length - 1 ? ', ' : ''}
                            </Typography>
                          ))
                        }
                      </Box>
                    )}
                  >
                    {districts.map((dict: any) => (
                      <MenuItem
                        key={dict.idHuyen}
                        value={`${dict.tenHuyen}-${dict.idHuyen}`}
                      >
                        {dict.tenHuyen}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={5}>
                <FormControl fullWidth>
                  <InputLabel id="commune_select_label">Xã/Phường/Thị trấn</InputLabel>
                  <Select
                    labelId="commune_select_label"
                    id="commune_select"
                    multiple
                    size='small'
                    value={selectedCommunes}
                    onChange={handleChangeCommune}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {
                          selected.map((value: any, key: number, arr: any[]) => (
                            <Typography key={key} variant='caption' lineHeight={1.3}>
                              {value.split('-')[0]}{key < arr.length - 1 ? ', ' : ''}
                            </Typography>
                          ))
                        }
                      </Box>
                    )}
                  >
                    {filteredCommunes.map((comn: any) => (
                      <MenuItem
                        key={comn.idXa}
                        value={`${comn.tenXa}-${comn.idXa}-${comn.idHuyen}`}
                      >
                        {comn.tenXa}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2} sm={12}>
                <Autocomplete
                  disabled={loading}
                  size='small'
                  options={basins}
                  getOptionLabel={(option: any) => option.tenLVS}
                  value={basins.find((option: any) => option.id === construction?.idLuuVuc) || null}
                  isOptionEqualToValue={(option: any) => option.id}
                  onChange={(_, value) => handleChange('idLuuVuc')(value ? value.id : 0)}
                  renderInput={params => (
                    <TextField
                      required
                      {...params}
                      fullWidth
                      label='Chọn lưu vực sông'
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <Fragment>
                            {loading && <CircularProgress color='primary' size={20} />}
                            {params.InputProps.endAdornment}
                          </Fragment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12}>
                <TextField
                  size='small'
                  type='text'
                  fullWidth
                  placeholder=''
                  label='Toạ độ X (VN2000)'
                  value={construction?.x || ''}
                  onChange={event => handleChange('x')(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12}>
                <TextField
                  size='small'
                  type='text'
                  fullWidth
                  placeholder=''
                  value={construction?.y || ''}
                  onChange={event => handleChange('y')(event.target.value)}
                  label='Toạ độ Y (VN2000)'
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12}>
                <TextField
                  size='small'
                  type='text'
                  fullWidth
                  placeholder=''
                  defaultValue={construction?.namBatDauVanHanh}
                  onChange={event => handleChange('namBatDauVanHanh')(event.target.value)}
                  label='Năm vận hành'
                />
              </Grid>
              <Grid item xs={12} md={3} sm={12}>
                <TextField
                  size='small'
                  type='text'
                  fullWidth
                  placeholder=''
                  defaultValue={construction?.thoiGianHNK}
                  onChange={event => handleChange('thoiGianHNK')(event.target.value)}
                  label='Thời gian hành nghề'
                />
              </Grid>
              {construction?.idLoaiCT === 7 ? (
                <Grid item xs={12} md={3} sm={12}>
                  <TextField
                    size='small'
                    type='text'
                    label='Số giếng khai thác'
                    fullWidth
                    placeholder=''
                    defaultValue={construction?.soLuongGieng}
                    onChange={event => handleChange('soLuongGieng')(event.target.value)}
                  />
                </Grid>
              ) : ""}
              {construction?.idLoaiCT === 7 ? (
                <Grid item xs={12} md={3} sm={12}>
                  <TextField
                    size='small'
                    type='text'
                    label='Tổng lượng nước khai thác(m3/ngày đêm)'
                    fullWidth
                    placeholder=''
                    defaultValue={construction.thongso?.luongNuocKT}
                    onChange={event => handleChange('luongNuocKT')(event.target.value)}
                  />
                </Grid>
              ) : ""}
              {construction?.idLoaiCT === 8 ? (
                <Grid item xs={12} md={3} sm={12}>
                  <TextField
                    size='small'
                    type='text'
                    label='Thời gian thi công'
                    fullWidth
                    placeholder=''
                    defaultValue={construction?.thoiGianXD}
                    onChange={event => handleChange('thoiGianXD')(event.target.value)}
                  />
                </Grid>
              ) : ""}
              {construction?.idLoaiCT === 8 ? (
                <Grid item xs={12} md={3} sm={12}>
                  <TextField
                    size='small'
                    type='text'
                    label='Quy mô khoan thăm dò'
                    fullWidth
                    placeholder=''
                    defaultValue={construction?.quyMoHNK}
                    onChange={event => handleChange('quyMoHNK')(event.target.value)}
                  />
                </Grid>
              ) : ""}
              {construction?.idLoaiCT === 8 ? (
                <Grid item xs={12} md={6} sm={12}>
                  <TextField
                    size='small'
                    type='text'
                    label='Tầng chứa nước thăm dò'
                    fullWidth
                    placeholder=''
                    defaultValue={construction?.quyMoHNK}
                    onChange={event => handleChange('quyMoHNK')(event.target.value)}
                  />
                </Grid>
              ) : ""}

            </Grid> : ''}
        </fieldset>

        {/* check form tram bom */}
        {
          construction?.idLoaiCT === 9 ? (
            <fieldset>
              <legend>
                <Typography variant={'subtitle1'} className='legend__title'>
                  Thông số công trình khoan
                </Typography>
              </legend>
              <Grid container spacing={6}>
                <Grid item xs={12} md={4} sm={12}>
                  <TextField
                    size='small'
                    type='text'
                    label='Lưu trữ khai thác(m3/ngày đêm)'
                    fullWidth
                    placeholder=''
                    defaultValue={construction.thongso?.qktCapNuocSinhHoat}
                    onChange={event => handleChange('qktCapNuocSinhHoat')(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4} sm={12}>
                  <TextField
                    size='small'
                    type='text'
                    label='Chế độ khai thác(giờ/ngày đêm)'
                    fullWidth
                    placeholder=''
                    defaultValue={construction.thongso?.cheDoKT}
                    onChange={event => handleChange('cheDoKT')(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4} sm={12}>
                  <TextField
                    size='small'
                    type='text'
                    label='Thời gian thi công'
                    fullWidth
                    placeholder=''
                    defaultValue={construction?.thoiGianXD}
                    onChange={event => handleChange('thoiGianXD')(event.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={6}>
                <Grid item xs={12} md={6} sm={12}>
                  <TextField
                    size='small'
                    type='text'
                    label='Tầng chứa nước thăm dò'
                    fullWidth
                    placeholder=''
                    defaultValue={construction?.quyMoHNK}
                    onChange={event => handleChange('quyMoHNK')(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6} sm={12}>
                  <TextField
                    size='small'
                    type='text'
                    label='Khối lượng các hạng mục thăm dò'
                    fullWidth
                    placeholder=''
                    defaultValue={construction?.khoiLuongCacHangMucTD}
                    onChange={event => handleChange('khoiLuongCacHangMucTD')(event.target.value)}
                  />
                </Grid>
              </Grid>
            </fieldset>
          ) : (
            ''
          )
        }
        {showDataCons ?
          <Grid item xs={12}>
            {isLicensepage ? loai_ct !== "hanh-nghe-khoan" ? <MiningPurpose data={construction.luuluong_theomd || []} type={GetConstructionTypeId(router)} onChange={handleMiningPurposeChange} /> : "" : ""}
            <ConstructionItem data={construction.hangmuc || []} type={isLicensepage ? GetConstructionTypeId(router) : construction.idLoaiCT} onChange={handleConsItemChange} />
          </Grid> : ""}
      </>
  )
}
export default GroundWaterField
