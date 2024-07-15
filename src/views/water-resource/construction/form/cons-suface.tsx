import { Typography, Grid, Autocomplete, TextField, CircularProgress, Button, FormControl, InputLabel, OutlinedInput, MenuItem, Box } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, FC, useState, Fragment } from 'react'
import { ConstructionItemState, ConstructionLocationState, ConstructionState, MiningPurposeState, emptyConstructionData } from './construction-interface'
import { getData } from 'src/api/axios'
import { useRouter } from 'next/router'
import GetConstructionTypeId from 'src/@core/components/get-construction-type'
import { Add } from '@mui/icons-material'
import { createConsCode, createConsUser } from 'src/@core/components/cons'
import ConstructionItem from './cons-item'
import MiningPurpose from './mining-purpose'
import BoxLoading from 'src/@core/components/box-loading';

interface ConsTypeFieldsetProps {
  props?: any //construction?.id
  onChange: (data: ConstructionState) => void
}

const SurfaceWaterField: FC<ConsTypeFieldsetProps> = ({ props, onChange }) => {

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
  const isLicensepage = router.pathname.split('/')[3] == "giay-phep";
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
          <Grid container spacing={6} mb={4}>
            <Grid item xs={12} md={3} sm={12}>
              <Autocomplete
                disabled={loading}
                size='small'
                options={consType}
                getOptionLabel={(option: any) => option.tenLoaiCT}
                value={consType.find((option: any) => option.id === construction?.idLoaiCT) || null}
                isOptionEqualToValue={(option: any) => option.id}
                onChange={(_, value) => handleChange('idLoaiCT')(value ? value.id : 0)}
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
            {
              isLicensepage ?
                <Grid item xs={12} md={3} sm={12}>
                  <Autocomplete
                    disabled={loading}
                    size='small'
                    options={ds_congtrinh}
                    getOptionLabel={(option: any) => `${option.tenCT} ${option.huyen !== null ? `(${option.huyen?.map((e: any) => (e.tenHuyen))})` : ''}`}
                    value={ds_congtrinh.find((option: any) => option.tenCT?.toLowerCase() === construction?.tenCT?.toLowerCase()) || null}
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
                <Grid item xs={12} md={3} sm={12}>
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
          {
            showDataCons ?
              <Grid container spacing={6}>
                <Grid item xs={12} md={3} sm={12}>
                  <TextField
                    size='small'
                    type='text'
                    label='Tên công trình'
                    fullWidth
                    placeholder=''
                    value={construction?.tenCT || ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('tenCT')(event.target.value)}
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('maCT')(event.target.value)}
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('viTriCT')(event.target.value)}
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
                    variant='outlined'
                    fullWidth
                    label='Năm vận hành'
                    placeholder=''
                    value={construction?.namBatDauVanHanh || ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('namBatDauVanHanh')(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3} sm={12}>
                  <TextField
                    size='small'
                    type='text'
                    fullWidth
                    placeholder=''
                    label='Năm xây dựng'
                    value={construction?.thoiGianXD || ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thoiGianXD')(event.target.value)}
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('x')(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={3} sm={12}>
                  <TextField
                    size='small'
                    type='text'
                    fullWidth
                    placeholder=''
                    value={construction?.y || ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('y')(event.target.value)}
                    label='Toạ độ Y (VN2000)'
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    size='small'
                    type='text'
                    fullWidth
                    placeholder=''
                    multiline
                    maxRows={4}
                    value={construction?.nguonNuocKT || ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('nguonNuocKT')(event.target.value)}
                    label='Nguồn nước khai thác'
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    size='small'
                    type='text'
                    fullWidth
                    placeholder=''
                    multiline
                    maxRows={4}
                    value={construction?.phuongThucKT || ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('phuongThucKT')(event.target.value)}
                    label='Phương thức khai thác'
                  />
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <TextField
                    size='small'
                    type='text'
                    fullWidth
                    placeholder=''
                    value={construction?.thongso?.cheDoKT || ''}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.cheDoKT')(event.target.value)}
                    label='Chế độ khai thác'
                  />
                </Grid>
              </Grid> : ""
          }
        </fieldset>

        {
          showDataCons ?
            construction?.idLoaiCT === 4 || construction?.idLoaiCT === 5 ? (
              <Grid item xs={12}>
                <fieldset>
                  <legend>
                    <Typography variant={'subtitle1'} className='legend__title'>
                      THÔNG Số CÔNG TRÌNH
                    </Typography>
                  </legend>
                  <Grid container spacing={6}>
                    <Grid item xs={12} md={3} sm={12}>
                      <TextField
                        size='small'
                        type='text'
                        label='Cấp công trình'
                        fullWidth
                        placeholder=''
                        value={construction?.capCT || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('capCT')(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                      <TextField
                        size='small'
                        type='text'
                        label='Diện tích lưu vực(km2)'
                        fullWidth
                        placeholder=''
                        value={construction?.thongso?.dienTichLuuVuc || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.dienTichLuuVuc')(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                      <TextField
                        size='small'
                        type='text'
                        label='Lượng mưa trung bình nhiều năm(mm)'
                        fullWidth
                        placeholder=''
                        value={construction?.thongso?.muaTrungBinhNam || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.muaTrungBinhNam')(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                      <TextField
                        size='small'
                        type='text'
                        label='Lưu lượng trung bình nhiều năm(m3/s)'
                        fullWidth
                        placeholder=''
                        value={construction?.thongso?.qTrungBinhNam || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.qTrungBinhNam')(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                      <TextField
                        size='small'
                        type='text'
                        label='Công suất(KW)'
                        fullWidth
                        placeholder=''
                        value={construction?.thongso?.congSuatLM || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.congSuatLM')(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                      <TextField
                        size='small'
                        type='text'
                        label='Công suất đảm bảo'
                        fullWidth
                        placeholder=''
                        value={construction?.thongso?.congSuatDamBao || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.congSuatDamBao')(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                      <TextField
                        size='small'
                        type='text'
                        label='Chiều cao đập(m)'
                        fullWidth
                        placeholder=''
                        value={construction?.thongso?.chieuCaoDap || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.chieuCaoDap')(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                      <TextField
                        size='small'
                        type='text'
                        label='Lưu lượng tối đa(m3/s)'
                        fullWidth
                        placeholder=''
                        value={construction?.thongso?.qMaxKT || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.qMaxKT')(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                      <TextField
                        size='small'
                        type='text'
                        label='Lưu lượng tối thiểu(m3/s)'
                        fullWidth
                        placeholder=''
                        value={construction?.thongso?.qtt || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.qtt')(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                      <TextField
                        size='small'
                        type='text'
                        label='Lưu lượng đảm bảo(m3/s)'
                        fullWidth
                        placeholder=''
                        value={construction?.thongso?.qDamBao || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.qDamBao')(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                      <TextField
                        size='small'
                        type='text'
                        label='hmax'
                        fullWidth
                        placeholder=''
                        value={construction?.thongso?.hmax || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.hmax')(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                      <TextField
                        size='small'
                        type='text'
                        label='Hmin'
                        fullWidth
                        placeholder=''
                        value={construction?.thongso?.hmin || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.hmin')(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                      <TextField
                        size='small'
                        type='text'
                        label='Htt'
                        fullWidth
                        placeholder=''
                        value={construction?.thongso?.htoiThieu || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.htoiThieu')(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                      <TextField
                        size='small'
                        type='text'
                        label='Dung tích toàn bộ(triệu m3)'
                        fullWidth
                        placeholder=''
                        value={construction?.thongso?.dungTichToanBo || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.dungTichToanBo')(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                      <TextField
                        size='small'
                        type='text'
                        label='Dung tích chết(triệu m3)'
                        fullWidth
                        placeholder=''
                        value={construction?.thongso?.dungTichChet || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.dungTichChet')(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} md={3} sm={12}>
                      <TextField
                        size='small'
                        type='text'
                        label='Dung tích hữu ích(triệu m3)'
                        fullWidth
                        placeholder=''
                        value={construction?.thongso?.dungTichHuuIch || ''}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.dungTichHuuIch')(event.target.value)}
                      />
                    </Grid>
                    {
                      construction?.idLoaiCT === 4 ? (
                        <Grid item xs={12} md={3} sm={12}>
                          <TextField
                            size='small'
                            type='text'
                            label='Mực nước chết(m)'
                            fullWidth
                            placeholder=''
                            value={construction?.thongso?.mnc || ''}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.mnc')(event.target.value)}
                          />
                        </Grid>
                      ) : ('')
                    }
                    {
                      construction?.idLoaiCT === 4 ? (
                        <Grid item xs={12} md={3} sm={12}>
                          <TextField
                            size='small'
                            type='text'
                            label='Mực nước dâng bình thường(m)'
                            fullWidth
                            placeholder=''
                            value={construction?.thongso?.mndbt || ''}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.mndbt')(event.target.value)}
                          />
                        </Grid>
                      ) : ('')
                    }
                    {
                      construction?.idLoaiCT === 4 ? (
                        <Grid item xs={12} md={3} sm={12}>
                          <TextField
                            size='small'
                            type='text'
                            label='Mực nước lũ thiết kế(m)'
                            fullWidth
                            placeholder=''
                            value={construction?.thongso?.mnltk || ''}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.mnltk')(event.target.value)}
                          />
                        </Grid>
                      ) : ('')
                    }
                    {construction?.idLoaiCT === 4 ? (
                      <Grid item xs={12} md={3} sm={12}>
                        <TextField
                          size='small'
                          type='text'
                          label='Mực nước lũ kiểm tra(m)'
                          fullWidth
                          placeholder=''
                          value={construction?.thongso?.mnlkt || ''}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.mnlkt')(event.target.value)}
                        />
                      </Grid>
                    ) : (
                      ''
                    )}
                  </Grid>
                </fieldset>
              </Grid>
            ) : construction?.idLoaiCT === 6 ? (
              <fieldset>
                <legend>
                  <Typography variant={'subtitle1'} className='legend__title'>
                    THÔNG Số CÔNG TRÌNH
                  </Typography>
                </legend>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={3} sm={12}>
                    <TextField
                      size='small'
                      type='text'
                      label='Số máy bơm'
                      fullWidth
                      placeholder=''
                      value={construction?.thongso?.soLuongMayBom || ''}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.soLuongMayBom')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12}>
                    <TextField
                      size='small'
                      type='text'
                      label='Diện tích tưới thiết kế(km2)'
                      fullWidth
                      placeholder=''
                      value={construction?.thongso?.dienTichTuoiThietKe || ''}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.dienTichTuoiThietKe')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12}>
                    <TextField
                      size='small'
                      type='text'
                      label='Lượng mưa tưới thực tế'
                      fullWidth
                      placeholder=''
                      value={construction?.thongso?.dienTichTuoiThucTe || ''}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.dienTichTuoiThucTe')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12}>
                    <TextField
                      size='small'
                      type='text'
                      label='Lưu lượng thiết kế(m3/s)'
                      fullWidth
                      placeholder=''
                      value={construction?.thongso?.qThietKe || ''}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.qThietKe')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12}>
                    <TextField
                      size='small'
                      type='text'
                      label='Lưu lượng thực tế(m3/s)'
                      fullWidth
                      placeholder=''
                      value={construction?.thongso?.qThucTe || ''}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.qThucTe')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12}>
                    <TextField
                      size='small'
                      type='text'
                      label={
                        <>
                          Q<sub>tk</sub>(m<sup>3</sup>/<sub>ngày đêm</sub>)
                        </>
                      }
                      fullWidth
                      placeholder=''
                      value={construction?.thongso?.qBomThietKe || ''}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.qBomThietKe')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12}>
                    <TextField
                      size='small'
                      type='text'
                      label={
                        <>
                          Q<sub>max</sub>(m<sup>3</sup>/<sub>ngày đêm</sub>)
                        </>
                      }
                      fullWidth
                      placeholder=''
                      value={construction?.thongso?.qBomLonNhat || ''}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.qBomLonNhat')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12}>
                    <TextField
                      size='small'
                      type='text'
                      label='Mực nước bể hút(m)'
                      fullWidth
                      placeholder=''
                      value={construction?.thongso?.hBeHut || ''}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.hBeHut')(event.target.value)}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            ) : construction?.idLoaiCT === 12 ? (
              <fieldset>
                <legend>
                  <Typography variant={'subtitle1'} className='legend__title'>
                    THÔNG Số CÔNG TRÌNH
                  </Typography>
                </legend>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={3} sm={12}>
                    <TextField
                      size='small'
                      type='text'
                      label='Cao trình cống'
                      fullWidth
                      placeholder=''
                      value={construction?.thongso?.caoTrinhCong || ''}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.caoTrinhCong')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12}>
                    <TextField
                      size='small'
                      type='text'
                      label='Chiều dài cống(m)'
                      fullWidth
                      placeholder=''
                      value={construction?.thongso?.chieuDaiCong || ''}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.chieuDaiCong')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12}>
                    <TextField
                      size='small'
                      type='text'
                      label='Đường kính (m)'
                      fullWidth
                      placeholder=''
                      value={construction?.thongso?.duongKinhCong || ''}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.duongKinhCong')(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={12}>
                    <TextField
                      size='small'
                      type='text'
                      label='Kích thước(rộng*cao)'
                      fullWidth
                      placeholder=''
                      value={construction?.thongso?.kichThuocCong || ''}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange('thongso.kichThuocCong')(event.target.value)}
                    />
                  </Grid>
                </Grid>
              </fieldset>
            ) : '' : ''
        }
        {showDataCons ?
          <Grid item xs={12}>
            {isLicensepage ? <MiningPurpose data={construction?.luuluong_theomd || []} type={GetConstructionTypeId(router)} onChange={handleMiningPurposeChange} /> : ""}
            <ConstructionItem data={construction?.hangmuc || []} type={GetConstructionTypeId(router)} onChange={handleConsItemChange} />
          </Grid>
          : ""
        }
      </>
  )
}
export default SurfaceWaterField
