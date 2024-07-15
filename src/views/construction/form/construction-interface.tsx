export interface ConstructionState {
  id?: number | null | undefined;
  idLoaiCT?: number | null | undefined;
  idSong?: number | null | undefined;
  idLuuVuc?: number | null | undefined;
  idTieuLuuVuc?: number | null | undefined;
  idTangChuaNuoc?: number | null | undefined;
  tenCT?: string | null | undefined;
  maCT?: string | null | undefined;
  viTriCT?: string | null | undefined;
  x?: number | null | undefined;
  y?: number | null | undefined;
  capCT?: string | null | undefined;
  namBatDauVanHanh?: number | null | undefined;
  nguonNuocKT?: string | null | undefined;
  mucDichKT?: string | null | undefined;
  phuongThucKT?: string | null | undefined;
  thoiGianKT?: string | null | undefined;
  thoiGianHNK?: string | null | undefined;
  mucDichHNK?: string | null | undefined;
  mucDichhTD?: string | null | undefined;
  quyMoHNK?: string | null | undefined;
  thoiGianXD?: string | null | undefined;
  soLuongGiengKT?: number | null | undefined;
  soLuongGiengQT?: number | null | undefined;
  soDiemXaThai?: number | null | undefined;
  soLuongGieng?: number | null | undefined;
  khoiLuongCacHangMucTD?: number | null | undefined;
  qktThietKe?: number | null | undefined;
  qktThucTe?: number | null | undefined;
  viTriXT?: string | null | undefined;
  taiKhoan?: string | null | undefined;
  chuThich?: string | null | undefined;
  hangmuc?: ConstructionItemState[] | null | undefined;
  luuluong_theomd?: MiningPurposeState[] | null | undefined;
  thongso?: ConstructionSpecState | null | undefined;
  vitri?: ConstructionLocationState[] | null | undefined;
}

export interface ConstructionItemState {
  id: number | null | undefined;
  idCT?: number | null | undefined;
  idTangChuaNuoc?: number | null | undefined;
  tenHangMuc?: string | null | undefined;
  viTriHangMuc?: string | null | undefined;
  x?: number | null | undefined;
  y?: number | null | undefined;
  chuThich?: string | null | undefined;
  daXoa?: boolean | null | undefined;
  thongso?: ConstructionSpecState | null | undefined;
}

export interface MiningPurposeState {
  id: number | null | undefined;
  idCT?: number | null | undefined;
  idMucDich?: number | null | undefined;
  mucDich?: string | null | undefined;
  luuLuong?: number | null | undefined;
  donViDo?: string | null | undefined;
  ghiChu?: string | null | undefined;
  daXoa?: boolean | null | undefined;
}

export interface ConstructionLocationState {
  id: number | null | undefined;
  idCongTrinh?: number | null | undefined;
  idXa?: string | null | undefined;
  idHuyen?: string | null | undefined;
}

export interface ConstructionSpecState {
  id: number | null | undefined;
  idCT: null | null | undefined;
  idHangMucCT: number | null | undefined;
  caoTrinhCong?: string | null | undefined;
  cheDoKT?: string | null | undefined;
  caoTrinhDap?: string | null | undefined;
  cheDoXT?: string | null | undefined;
  nguonNuocXT?: string | null | undefined;
  chieuCaoDap?: number | null | undefined;
  chieuDaiCong?: number | null | undefined;
  chieuDaiDap?: number | null | undefined;
  duongKinhCong?: string | null | undefined;
  chieuRongDap?: number | null | undefined;
  nguongTran?: number | null | undefined;
  chieuSauDoanThuNuocDen?: number | null | undefined;
  chieuSauDoanThuNuocTu?: number | null | undefined;
  congSuatBom?: number | null | undefined;
  congSuatDamBao?: number | null | undefined;
  congSuatLM?: number | null | undefined;
  dienTichLuuVuc?: number | null | undefined;
  dienTichTuoiThietKe?: number | null | undefined;
  dienTichTuoiThucTe?: number | null | undefined;
  dungTichChet?: number | null | undefined;
  dungTichHuuIch?: number | null | undefined;
  dungTichToanBo?: number | null | undefined;
  hBeHut?: number | null | undefined;
  hDatOngLocDen?: number | null | undefined;
  hDatOngLocTu?: number | null | undefined;
  hDoanThuNuocDen?: number | null | undefined;
  hDoanThuNuocTu?: number | null | undefined;
  hDong?: number | null | undefined;
  hgieng?: number | null | undefined;
  hGiengKT?: number | null | undefined;
  hHaLuu?: number | null | undefined;
  hHaThap?: number | null | undefined;
  hlu?: number | null | undefined;
  hmax?: number | null | undefined;
  hmin?: number | null | undefined;
  hThuongLuu?: number | null | undefined;
  hTinh?: number | null | undefined;
  htoiThieu?: number | null | undefined;
  kichThuocCong?: string | null | undefined;
  kqKf?: number | null | undefined;
  luongNuocKT?: number | null | undefined;
  mnc?: number | null | undefined;
  mndbt?: number | null | undefined;
  mnlkt?: number | null | undefined;
  mnltk?: number | null | undefined;
  muaTrungBinhNam?: number | null | undefined;
  mucNuocDong?: number | null | undefined;
  mucNuocTinh?: number | null | undefined;
  phuongThucXT?: string | null | undefined;
  qBomLonNhat?: number | null | undefined;
  qBomThietKe?: number | null | undefined;
  qDamBao?: number | null | undefined;
  qKhaiThac?: number | null | undefined;
  qktCapNuocSinhHoat?: number | null | undefined;
  qktLonNhat?: number | null | undefined;
  qLonNhatTruocLu?: number | null | undefined;
  qMaxKT?: number | null | undefined;
  qmaxNM?: number | null | undefined;
  qMaxXaThai?: number | null | undefined;
  qThietKe?: number | null | undefined;
  qThucTe?: number | null | undefined;
  qTrungBinhNam?: number | null | undefined;
  qtt?: number | null | undefined;
  qXaThai?: number | null | undefined;
  qXaThaiLonNhat?: number | null | undefined;
  qXaThaiTB?: number | null | undefined;
  qXaTran?: number | null | undefined;
  soLuongMayBom?: number | null | undefined;
  thoiGianBomLonNhat?: string | null | undefined;
  thoiGianBomNhoNhat?: string | null | undefined;
  thoiGianBomTB?: string | null | undefined;
  daXoa?: boolean;
}


export const emptyConstructionData: ConstructionState = {
  id: null,
  idLoaiCT: null,
  idSong: null,
  idLuuVuc: null,
  idTieuLuuVuc: null,
  idTangChuaNuoc: null,
  tenCT: null,
  maCT: null,
  viTriCT: null,
  x: null,
  y: null,
  capCT: null,
  namBatDauVanHanh: null,
  nguonNuocKT: null,
  mucDichKT: null,
  phuongThucKT: null,
  thoiGianKT: null,
  thoiGianHNK: null,
  mucDichHNK: null,
  mucDichhTD: null,
  quyMoHNK: null,
  thoiGianXD: null,
  soLuongGiengKT: null,
  soLuongGiengQT: null,
  soDiemXaThai: null,
  soLuongGieng: null,
  khoiLuongCacHangMucTD: null,
  qktThietKe: null,
  qktThucTe: null,
  viTriXT: null,
  taiKhoan: null,
  chuThich: null,
  hangmuc: null,
  luuluong_theomd: null,
  thongso: null,
  vitri: null,
}

export const emptyConstructionSpec: ConstructionSpecState = {
  id: null,
  idCT: null,
  idHangMucCT: null,
  caoTrinhCong: null,
  cheDoKT: null,
  caoTrinhDap: null,
  cheDoXT: null,
  nguonNuocXT: null,
  chieuCaoDap: null,
  chieuDaiCong: null,
  chieuDaiDap: null,
  duongKinhCong: null,
  chieuRongDap: null,
  nguongTran: null,
  chieuSauDoanThuNuocDen: null,
  chieuSauDoanThuNuocTu: null,
  congSuatBom: null,
  congSuatDamBao: null,
  congSuatLM: null,
  dienTichLuuVuc: null,
  dienTichTuoiThietKe: null,
  dienTichTuoiThucTe: null,
  dungTichChet: null,
  dungTichHuuIch: null,
  dungTichToanBo: null,
  hBeHut: null,
  hDatOngLocDen: null,
  hDatOngLocTu: null,
  hDoanThuNuocDen: null,
  hDoanThuNuocTu: null,
  hDong: null,
  hgieng: null,
  hGiengKT: null,
  hHaLuu: null,
  hHaThap: null,
  hlu: null,
  hmax: null,
  hmin: null,
  hThuongLuu: null,
  hTinh: null,
  htoiThieu: null,
  kichThuocCong: null,
  kqKf: null,
  luongNuocKT: null,
  mnc: null,
  mndbt: null,
  mnlkt: null,
  mnltk: null,
  muaTrungBinhNam: null,
  mucNuocDong: null,
  mucNuocTinh: null,
  phuongThucXT: null,
  qBomLonNhat: null,
  qBomThietKe: null,
  qDamBao: null,
  qKhaiThac: null,
  qktCapNuocSinhHoat: null,
  qktLonNhat: null,
  qLonNhatTruocLu: null,
  qMaxKT: null,
  qmaxNM: null,
  qMaxXaThai: null,
  qThietKe: null,
  qThucTe: null,
  qTrungBinhNam: null,
  qtt: null,
  qXaThai: null,
  qXaThaiLonNhat: null,
  qXaThaiTB: null,
  qXaTran: null,
  soLuongMayBom: null,
  thoiGianBomLonNhat: null,
  thoiGianBomNhoNhat: null,
  thoiGianBomTB: null,
  daXoa: false,
}