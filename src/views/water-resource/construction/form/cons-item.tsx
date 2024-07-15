import { FC, useEffect, useState } from 'react';
import { Alert, Backdrop, Box, Button, ButtonGroup, Fade, Grid, IconButton, Modal, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { ConstructionItemState, ConstructionSpecState } from './construction-interface';
import { Add, Cancel, Delete, Edit, Save } from '@mui/icons-material';

interface ConstructionItemFieldProps {
  data?: ConstructionItemState[]
  type?: any
  onChange: (data: ConstructionItemState[]) => void
}

const ConstructionItem: FC<ConstructionItemFieldProps> = ({ data, type, onChange }) => {

  const [constructionItems, setConstructionItems] = useState<ConstructionItemState[]>(data ?? []);

  const [newConsItemIndex, setNewConsItemIndex] = useState(-1)
  const [newConsItem, setNewConsItem] = useState<ConstructionItemState>({
    id: null,
    idCT: null,
    tenHangMuc: null,
    viTriHangMuc: null,
    x: null,
    y: null,
    thongso: {
      id: null,
      idCT: null,
      idHangMucCT: null,
      daXoa: false
    }
  })

  const [deleteConfirmAnchorEl, setDeleteConfirmAnchorEl] = useState<HTMLButtonElement | null>(null);
  const deleteConfirmOpen = Boolean(deleteConfirmAnchorEl);
  const [deleteTargetIndex, setDeleteTargetIndex] = useState<number | null>(null);

  const [required, setRequire] = useState<string | null>(null)

  const DeleteRowData = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    setDeleteConfirmAnchorEl(event.currentTarget);
    setDeleteTargetIndex(index);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmAnchorEl(null);
  };

  const handleDeleteConfirm = () => {
    if (deleteTargetIndex !== null) {
      deleteItem(deleteTargetIndex); // Pass the index here
      setDeleteTargetIndex(null);
    }

    setDeleteConfirmAnchorEl(null);
  };

  const deleteItem = (index: number) => {
    setConstructionItems((prevItems) => {
      const newItems = prevItems.map((item, idx) => {
        if (idx === index) {
          // Mark as deleted by setting daXoa to true

          return { ...item, daXoa: true };
        }

        return item;
      });

      return newItems;
    });

    onChange([...constructionItems].map((item, idx) => idx === index ? { ...item, daXoa: true } : item));
    setDeleteConfirmAnchorEl(null);
  };


  const handleChange = (prop: keyof ConstructionItemState | keyof ConstructionSpecState) => (value: any) => {
    setNewConsItem(prevItem => {
      const newItem: ConstructionItemState = { ...prevItem };

      if (prop in newItem) {
        (newItem as any)[prop] = value;
      }

      if (newItem.thongso && prop in newItem.thongso) {
        (newItem.thongso as any)[prop] = value;
        (newItem.thongso as any)['daXoa'] = false;
      }

      return newItem;
    });
  }

  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModal = (index: number, e: any, func: "add" | "update") => {
    setOpenModal(true);
    setNewConsItemIndex(index)
    if (func === 'add') {
      setNewConsItemIndex(-1)

      // Set all properties of newConsItem.thongso to null
      const nullThongso = Object.fromEntries(
        Object.keys(newConsItem.thongso || {}).map(key => [key, null])
      );

      setNewConsItem({ id: null, tenHangMuc: null, viTriHangMuc: null, x: null, y: null, daXoa: false, thongso: { ...nullThongso, id: null, idCT: null, idHangMucCT: null } });
    }

    if (func === 'update') {
      setNewConsItem({ ...e });
    }
  }

  const handleSave = () => {
    if (newConsItem.tenHangMuc && newConsItem.tenHangMuc !== null && newConsItem.tenHangMuc !== '') {
      if (newConsItemIndex >= 0) {
        setConstructionItems(prevItems => {
          const updatedItems = [...prevItems];
          updatedItems[newConsItemIndex] = newConsItem;

          return updatedItems;
        });
      } else {
        setConstructionItems(prevItems => [...prevItems, newConsItem]);
      }

      onChange([...constructionItems]);
      setNewConsItemIndex(-1)

      handleCloseModal();
    } else {
      setRequire("Tên hạng mục không được để trống");
    }
  }

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  useEffect(() => {
    onChange(constructionItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constructionItems]);

  return (
    <fieldset>
      <legend>
        <Typography variant={'subtitle1'} className='legend__title'>
          {
            type == 1 ? "CÁC HẠNG MỤC CỦA CÔNG TRÌNH" :
              type == 2 || type == 7 || type == 8 || type == 9 ? "DANH SÁCH GIẾNG" :
                type == 3 ? "CÁC Vị trí xả thải" : "CÁC HẠNG MỤC"
          }

        </Typography>
      </legend>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell size='small' align='center' rowSpan={2} width={50}>
                #
              </TableCell>
              <TableCell size='small' align='center' rowSpan={2} width={350}>
                {type == 1 ? "Tên hạng mục" : "Số hiệu"}
              </TableCell>
              <TableCell size='small' align='center' colSpan={2}>
                Toạ độ(VN2000)
              </TableCell>
              {type == 7 ?
                <TableCell size='small' align='center' rowSpan={2} width={150}>
                  Q  KT<sub>(m3/ngày.đêm)</sub>
                </TableCell>
                : ""
              }
              {type == 7 ?
                <TableCell size='small' align='center' rowSpan={2} width={150}>
                  Chế độ KT
                </TableCell>
                : ""
              }
              {type == 7 ?
                <TableCell size='small' align='center' colSpan={2}>
                  h <sub>đoạn thu nước</sub>
                </TableCell>
                : ""
              }
              {type == 7 ?
                <TableCell size='small' align='center' colSpan={2}>
                  h
                </TableCell>
                : ""
              }
              {type == 7 ?
                <TableCell size='small' align='center' colSpan={2}>
                  h <sub>đặt ống lọc</sub>
                </TableCell>
                : ""
              }
              {type == 3 ?
                <TableCell size='small' align='center' rowSpan={2} width={250}>
                  Vị trí xả thải
                </TableCell>
                : ""
              }
              {type == 3 ?
                <TableCell size='small' align='center' rowSpan={2} width={250}>
                  Nguồn nước xả thải
                </TableCell>
                : ""
              }
              {type == 3 ?
                <TableCell size='small' align='center' rowSpan={2} width={250}>
                  PT xả thải
                </TableCell>
                : ""
              }
              {type == 3 ?
                <TableCell size='small' align='center' rowSpan={2} width={250}>
                  Chế độ xả
                </TableCell>
                : ""
              }
              {type == 3 ?
                <TableCell size='small' align='center' rowSpan={2} width={150}>
                  Q nước thải <sub>(m3/ngày.đêm)</sub>
                </TableCell>
                : ""
              }
              <TableCell size='small' align='center' padding='checkbox' rowSpan={2}>
                <Box>
                  <IconButton aria-label="add" className='tableActionBtn' onClick={() => handleOpenModal(0, null, 'add')}>
                    <Add />
                  </IconButton>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openModal}
                    onClose={handleCloseModal}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                      backdrop: {
                        timeout: 500,
                      },
                    }}
                  >
                    <Fade in={openModal}>
                      <Box sx={{ ...style, width: 600 }}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" align="center" py={3}>
                          {
                            type == 1 ? "HẠNG MỤC CÔNG TRÌNH" :
                              type == 2 || type == 7 || type == 8 || type == 9 ? "HẠNG MỤC GIẾNG" :
                                type == 3 ? "Vị trí xả thải" : "CÁC HẠNG MỤC"
                          }
                        </Typography>
                        {required ? <Alert sx={{ my: 2 }} severity="warning">{required}</Alert> : null}
                        <Grid container spacing={4}>
                          <Grid item md={12}>
                            <TextField
                              name='tenhangmuc'
                              fullWidth
                              label='Tên hạng mục'
                              placeholder='Tên hạng mục'
                              size='small'
                              value={newConsItem.tenHangMuc == null ? '' : newConsItem.tenHangMuc}
                              onChange={event => handleChange('tenHangMuc')(event.target.value)}
                            />
                          </Grid>
                          <Grid item md={6}>
                            <TextField
                              name='x'
                              fullWidth
                              label='Toạ độ X'
                              placeholder='Toạ độ X'
                              size='small'
                              value={newConsItem.x == null ? '' : newConsItem.x}
                              onChange={event => handleChange('x')(event.target.value)}
                            />
                          </Grid>
                          <Grid item md={6}>
                            <TextField
                              name='y'
                              fullWidth
                              label='Toạ độ Y'
                              placeholder='Toạ độ Y'
                              size='small'
                              value={newConsItem.y == null ? '' : newConsItem.y}
                              onChange={event => handleChange('y')(event.target.value)}
                            />
                          </Grid>
                          {type == 2 || type == 7 && (
                            <>
                              <Grid item md={12}>
                                <TextField
                                  name='qKhaiThac'
                                  fullWidth
                                  label='Lưu lượng khai thác'
                                  placeholder='Lưu lượng khai thác'
                                  size='small'
                                  value={newConsItem.thongso?.qKhaiThac == null ? '' : newConsItem.thongso?.qKhaiThac}
                                  onChange={event => handleChange('qKhaiThac')(event.target.value)}
                                  multiline
                                />
                              </Grid>
                              <Grid item md={12}>
                                <TextField
                                  name='cheDoKT'
                                  fullWidth
                                  label='Chế độ khai thác'
                                  placeholder='Chế độ khai thác'
                                  size='small'
                                  value={newConsItem.thongso?.cheDoKT == null ? '' : newConsItem.thongso?.cheDoKT}
                                  onChange={event => handleChange('cheDoKT')(event.target.value)}
                                  multiline
                                />
                              </Grid>
                              <Grid item md={6}>
                                <TextField
                                  name='hDoanThuNuocTu'
                                  fullWidth
                                  label='Mực nước đoạn thu nước từ'
                                  placeholder='Mực nước đoạn thu nước từ'
                                  size='small'
                                  value={newConsItem.thongso?.hDoanThuNuocTu == null ? '' : newConsItem.thongso?.hDoanThuNuocTu}
                                  onChange={event => handleChange('hDoanThuNuocTu')(event.target.value)}
                                />
                              </Grid>
                              <Grid item md={6}>
                                <TextField
                                  name='hDoanThuNuocDen'
                                  fullWidth
                                  label='Mực nước đoạn thu nước đến'
                                  placeholder='Mực nước đoạn thu nước đến'
                                  size='small'
                                  value={newConsItem.thongso?.hDoanThuNuocDen == null ? '' : newConsItem.thongso?.hDoanThuNuocDen}
                                  onChange={event => handleChange('hDoanThuNuocDen')(event.target.value)}
                                />
                              </Grid>
                              <Grid item md={6}>
                                <TextField
                                  name='hTinh'
                                  fullWidth
                                  label='H tĩnh'
                                  placeholder='H tĩnh'
                                  size='small'
                                  value={newConsItem.thongso?.hTinh == null ? '' : newConsItem.thongso?.hTinh}
                                  onChange={event => handleChange('hTinh')(event.target.value)}
                                />
                              </Grid>
                              <Grid item md={6}>
                                <TextField
                                  name='hDong'
                                  fullWidth
                                  label='H động'
                                  placeholder='H động'
                                  size='small'
                                  value={newConsItem.thongso?.hDong == null ? '' : newConsItem.thongso?.hDong}
                                  onChange={event => handleChange('hDong')(event.target.value)}
                                />
                              </Grid>
                              <Grid item md={6}>
                                <TextField
                                  name='hDatOngLocTu'
                                  fullWidth
                                  label='Mực nước đặt ống lọc từ'
                                  placeholder='Mực nước đặt ống lọc từ'
                                  size='small'
                                  value={newConsItem.thongso?.hDatOngLocTu == null ? '' : newConsItem.thongso?.hDatOngLocTu}
                                  onChange={event => handleChange('hDatOngLocTu')(event.target.value)}
                                />
                              </Grid>
                              <Grid item md={6}>
                                <TextField
                                  name='hDatOngLocDen'
                                  fullWidth
                                  label='Mực nước đặt ống lọc đến'
                                  placeholder='Mực nước đặt ống lọc đến'
                                  size='small'
                                  value={newConsItem.thongso?.hDatOngLocDen == null ? '' : newConsItem.thongso?.hDatOngLocDen}
                                  onChange={event => handleChange('hDatOngLocDen')(event.target.value)}
                                />
                              </Grid>
                            </>
                          )}

                          {type == 3 && (
                            <>
                              <Grid item md={12}>
                                <TextField
                                  name='viTriHangMuc'
                                  fullWidth
                                  label='Vị trí xả thải'
                                  placeholder='Vị trí xả thải'
                                  size='small'
                                  value={newConsItem.viTriHangMuc == null ? '' : newConsItem.viTriHangMuc}
                                  onChange={event => handleChange('viTriHangMuc')(event.target.value)}
                                  multiline
                                />
                              </Grid>
                              <Grid item md={12}>
                                <TextField
                                  name='phuongThucXT'
                                  fullWidth
                                  label='Phương thức xả thải'
                                  placeholder='Phương thức xả thải'
                                  size='small'
                                  value={newConsItem.thongso?.phuongThucXT == null ? '' : newConsItem.thongso?.phuongThucXT}
                                  onChange={event => handleChange('phuongThucXT')(event.target.value)}
                                  multiline
                                />
                              </Grid>
                              <Grid item md={12}>
                                <TextField
                                  name='nguonNuocXT'
                                  fullWidth
                                  label='Nguồn nước xả thải'
                                  placeholder='Nguồn nước xả thải'
                                  size='small'
                                  value={newConsItem.thongso?.nguonNuocXT == null ? '' : newConsItem.thongso?.nguonNuocXT}
                                  onChange={event => handleChange('nguonNuocXT')(event.target.value)}
                                  multiline
                                />
                              </Grid>
                              <Grid item md={12}>
                                <TextField
                                  name='cheDoXT'
                                  fullWidth
                                  label='Chế độ xả thải'
                                  placeholder='Chế độ xả thải'
                                  size='small'
                                  value={newConsItem.thongso?.cheDoXT == null ? '' : newConsItem.thongso?.cheDoXT}
                                  onChange={event => handleChange('cheDoXT')(event.target.value)}
                                  multiline
                                />
                              </Grid>
                              <Grid item md={12}>
                                <TextField
                                  name='qXaThai'
                                  fullWidth
                                  label='Lưu lượng nước thải(m3/ngày đêm)'
                                  placeholder='Lưu lượng nước thải(m3/ngày đêm)'
                                  size='small'
                                  value={newConsItem.thongso?.qXaThai == null ? '' : newConsItem.thongso?.qXaThai}
                                  onChange={event => handleChange('qXaThai')(event.target.value)}
                                />
                              </Grid>
                            </>
                          )}

                        </Grid>
                        <Grid item sx={{ display: "flex", justifyContent: "end", py: 2 }}>
                          <Button startIcon={<Save />}
                            sx={{ ml: 1 }}
                            variant='outlined'
                            color='primary'
                            onClick={handleSave}>
                            Lưu
                          </Button>
                          <Button startIcon={<Cancel />}
                            sx={{ ml: 1 }}
                            variant='outlined'
                            color='error'
                            onClick={handleCloseModal}>
                            Huỷ
                          </Button>
                        </Grid>
                      </Box>
                    </Fade>
                  </Modal>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell size='small' align='center' width={150}>
                X
              </TableCell>
              <TableCell size='small' align='center' width={150}>
                Y
              </TableCell>
              {type == 7 ?
                <TableCell size='small' align='center' width={75}>
                  Từ(m)
                </TableCell>
                : ""
              }
              {type == 7 ?
                <TableCell size='small' align='center' width={75}>
                  Đến(m)
                </TableCell>
                : ""
              }
              {type == 7 ?
                <TableCell size='small' align='center' width={75}>
                  H<sub>tĩnh</sub>
                </TableCell>
                : ""
              }
              {type == 7 ?
                <TableCell size='small' align='center' width={75}>
                  H<sub>động</sub>
                </TableCell>
                : ""
              }
              {type == 7 ?
                <TableCell size='small' align='center' width={75}>
                  Từ(m)
                </TableCell>
                : ""
              }
              {type == 7 ?
                <TableCell size='small' align='center' width={75}>
                  Đến(m)
                </TableCell>
                : ""
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {constructionItems.filter(item => !item.daXoa).map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-center  size='small' align-middle font-13">{index + 1}</TableCell>
                <TableCell padding='checkbox'>
                  {item.tenHangMuc}
                </TableCell>
                <TableCell padding='checkbox'>
                  {item.x}
                </TableCell>
                <TableCell padding='checkbox'>
                  {item.y}
                </TableCell>
                {type == 2 || type == 7 ?
                  <TableCell padding='checkbox'>
                    {item.thongso?.qKhaiThac}
                  </TableCell> : ""
                }
                {type == 2 || type == 7 ?
                  <TableCell padding='checkbox'>
                    {item.thongso?.cheDoKT}
                  </TableCell> : ""
                }
                {type == 2 || type == 7 ?
                  <TableCell padding='checkbox'>
                    {item.thongso?.hDoanThuNuocTu}
                  </TableCell> : ""
                }
                {type == 2 || type == 7 ?
                  <TableCell padding='checkbox'>
                    {item.thongso?.hDoanThuNuocDen}
                  </TableCell> : ""
                }
                {type == 2 || type == 7 ?
                  <TableCell padding='checkbox'>
                    {item.thongso?.hTinh}
                  </TableCell> : ""
                }
                {type == 2 || type == 7 ?
                  <TableCell padding='checkbox'>
                    {item.thongso?.hDong}
                  </TableCell> : ""
                }
                {type == 2 || type == 7 ?
                  <TableCell padding='checkbox'>
                    {item.thongso?.hDatOngLocTu}
                  </TableCell> : ""
                }
                {type == 2 || type == 7 ?
                  <TableCell padding='checkbox'>
                    {item.thongso?.hDatOngLocDen}
                  </TableCell> : ""
                }
                {type == 3 ?
                  <TableCell padding='checkbox'>
                    {item.viTriHangMuc}
                  </TableCell> : ""
                }
                {type == 3 ?
                  <TableCell padding='checkbox'>
                    {item.thongso?.nguonNuocXT}
                  </TableCell> : ""
                }
                {type == 3 ?
                  <TableCell padding='checkbox'>
                    {item.thongso?.phuongThucXT}
                  </TableCell> : ""
                }
                {type == 3 ?
                  <TableCell padding='checkbox'>
                    {item.thongso?.cheDoXT}
                  </TableCell> : ""
                }
                {type == 3 ?
                  <TableCell padding='checkbox'>
                    {item.thongso?.qXaThai}
                  </TableCell> : ""
                }
                <TableCell size='small' align='center' padding='checkbox'>
                  <Box display={'flex'}>
                    <IconButton
                      aria-describedby={`${item.tenHangMuc}-${index}`}
                      onClick={() => handleOpenModal(index, item, 'update')}
                      data-row-id={`${item.tenHangMuc}-${index}`}
                    >
                      <Edit className='tableActionBtn' />
                    </IconButton>
                    <IconButton
                      aria-describedby={`${item.tenHangMuc}-${index}`}
                      onClick={(event) => DeleteRowData(event, index)}
                      data-row-id={`${item.tenHangMuc}-${index}`}
                    >
                      <Delete className='tableActionBtn deleteBtn' />
                    </IconButton>
                    <Popover
                      id={deleteConfirmOpen ? `${item.tenHangMuc}-${index}` : undefined}
                      open={deleteConfirmOpen}
                      anchorEl={deleteConfirmAnchorEl}
                      onClose={handleDeleteCancel}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                    >
                      <Alert severity="warning">
                        Xóa bản ghi này ?
                        <Box sx={{ justifyContent: 'center', paddingTop: 4, width: '100%' }}>
                          <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button size="small" onClick={() => handleDeleteConfirm()} >
                              Đúng
                            </Button>
                            <Button color='error' size="small" onClick={() => handleDeleteCancel()} >
                              Không
                            </Button>
                          </ButtonGroup>
                        </Box>
                      </Alert>
                    </Popover>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </fieldset>
  )
}

export default ConstructionItem
