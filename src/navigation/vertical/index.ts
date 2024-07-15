// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { ArrowBack, PeopleAltOutlined, Tv } from '@mui/icons-material'

const navigation = (router: any): VerticalNavItemsType => {

  //quan tri
  if (router.pathname.includes('quan-tri')) {
    return [
      {
        title: 'Trang chủ',
        icon: HomeOutline,
        path: '/'
      },
      {
        title: 'Quản lý',
        primaryPath: 'quan-tri',
        children: [
          {
            title: 'Người dùng',
            icon: AccountCogOutline,
            primaryPath: 'nguoi-dung',
            path: '/quan-tri/he-thong/nguoi-dung'
          },
          {
            title: 'Vai trò người dùng',
            icon: PeopleAltOutlined,
            primaryPath: 'nhom-nguoi-dung',
            path: '/quan-tri/he-thong/nhom-nguoi-dung'
          },
          {
            title: 'Trang truy cập',
            icon: Tv,
            primaryPath: 'trang-truy-cap',
            path: '/quan-tri/he-thong/trang-truy-cap'
          },
        ]
      },
      {
        title: 'Phân quyền',
        primaryPath: 'quan-tri',
        children: [
          {
            title: 'Người dùng',
            icon: AccountCogOutline,
            primaryPath: 'nguoi-dung',
            path: '/quan-tri/phan-quyen/nguoi-dung'
          },
          {
            title: 'Vai trò người dùng',
            icon: PeopleAltOutlined,
            primaryPath: 'nhom-nguoi-dung',
            path: '/quan-tri/phan-quyen/nhom-nguoi-dung'
          }
        ]
      },
    ]
  }

  //van hanh lien ho chua
  if (router.pathname.includes('tai-nguyen-nuoc/van-hanh')) {
    return [
      {
        title: 'Tài nguyên nước',
        icon: ArrowBack,
        path: '/tai-nguyen-nuoc'
      },
      {
        title: 'Thông tin chung',
        primaryPath: 'thong-tin-chung-van-hanh-ho',
        children: [
          {
            title: 'Dữ liệu lưu vực',
            path: '/tai-nguyen-nuoc/van-hanh/luu-vuc-song-van-hanh'
          },

          {
            title: 'Dữ liệu hồ chứa',
            path: '/tai-nguyen-nuoc/van-hanh/ho-chua-van-hanh/thong-so-ky-thuat'
          },

          {
            sectionTitle: 'Quy định vận hành liên hồ',
          },
          {
            title: 'Đầy đủ',
            path: '/tai-nguyen-nuoc/van-hanh/van-hanh-lien-ho/quy-dinh/day-du'
          },
          {
            title: 'Rút gọn',
            path: '#'
          },
        ]
      },
      {
        title: 'VH mùa lũ (1/9 ~ 15/12)',
        primaryPath: 'van-hanh-mua-lu',
        children: [
          {
            title: 'Hình thế gây mưa lớn',
            path: '/tai-nguyen-nuoc/van-hanh/luong-mua/mua-lu/hinh-the-thoi-tiet'
          },

          {
            title: 'Mưa hiện tại',
            path: '/tai-nguyen-nuoc/van-hanh/luong-mua/mua-lu/hien-tai'
          },

          {
            title: 'Mưa dự báo',
            path: '#'
          },
          {
            title: 'Dự báo Q đến hồ',
            path: '#'
          },
          {
            title: 'Mực nước hồ',
            path: '#'
          },
          {
            title: 'Mực nước sông',
            path: '/tai-nguyen-nuoc/van-hanh/muc-nuoc-song'
          },
          {
            title: 'Vận hành hồ chứa',
            children: [
              {
                title: 'Đakđrinh',
                path: '/tai-nguyen-nuoc/van-hanh/luu-vuc-song-van-hanh'
              },
              {
                title: 'Nước Trong',
                path: '/tai-nguyen-nuoc/van-hanh/luu-vuc-song-van-hanh'
              },
              {
                title: 'Sơn Trà 1',
                path: '/tai-nguyen-nuoc/van-hanh/luu-vuc-song-van-hanh'
              },
              {
                title: 'Đăk Re',
                path: '/tai-nguyen-nuoc/van-hanh/luu-vuc-song-van-hanh'
              },
              {
                title: 'Sơn Tây',
                path: '/tai-nguyen-nuoc/van-hanh/luu-vuc-song-van-hanh'
              },
            ]
          },
        ]
      },

      {
        title: 'VH mùa cạn (16/12 ~ 31/8)',
        children: [
          {
            sectionTitle: 'Lượng mưa',
          },
          {
            title: 'Mưa hiện tại',
            path: '/tai-nguyen-nuoc/van-hanh/luong-mua/mua-can/hien-tai'
          },
          {
            title: 'Mưa dự báo',
            path: '/tai-nguyen-nuoc/van-hanh/luong-mua/mua-can/du-bao'
          },

          {
            title: 'HTTT gây mưa lớn ',
            path: '/tai-nguyen-nuoc/van-hanh/luong-mua/mua-can/hinh-the-thoi-tiet'
          },

          //
          {
            sectionTitle: 'VH hồ chứa',
          },
          {
            title: 'Quy định chung',
            path: '/tai-nguyen-nuoc/van-hanh/VH-hoc-chua/quy-dinh-chung'
          },

          {
            title: 'Vận hành liên hồ',

            path: '/tai-nguyen-nuoc/van-hanh/van-hanh-lien-ho'
          },

          //
          {
            sectionTitle: 'SLQT tại trạm TV',
          },
          {
            title: 'Trạm thủy văn',
            path: '/tai-nguyen-nuoc/van-hanh/tram-thuy-van'
          },
        ]
      },
    ]
  }

  //thong tin du lieu
  if (router.pathname.includes('tai-nguyen-nuoc/thong-tin-du-lieu')) {
    return [
      {
        title: 'Tài nguyên nước',
        icon: ArrowBack,
        path: '/tai-nguyen-nuoc'
      },
      {
        title: 'Nguồn nước',
        primaryPath: 'tai-nguyen-nuoc/thong-tin-du-lieu/nguon-nuoc',
        children: [
          {
            title: 'Lưu vực sông',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/nguon-nuoc/luu-vuc-song'
          },
          {
            title: 'Nguồn nước',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/nguon-nuoc/nguon-nuoc'
          },
          {
            title: 'Ao, hồ đầm phá không được san lấp',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/ao-khong-san-lap'
          },
          {
            title: 'Hành lang bảo vệ NN',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/nguon-nuoc/hanh-lang-bao-ve-nguon-nuoc'
          },
          {
            title: 'Chức năng nguồn nước',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/nguon-nuoc/chuc-nang-nguon-nuoc'
          },
          {
            title: 'Dòng chảy tối thiểu',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/dong-chay-toi-thieu'
          },
          {
            title: 'Ngưỡng khai thác NDĐ',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/nguong-khai-thac-nuoc-duoi-dat'
          },
          {
            title: 'Vùng cấm, hạn chế KTNDĐ',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/vung-cam-KT-nuoc-duoi-dat'
          },
          {
            title: 'Mặt cắt sông, suối',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/mat-cat-song-suoi'
          },]
      },
      {
        title: 'Số lượng, chất lượng nước',
        primaryPath: 'tai-nguyen-nuoc/thong-tin-du-lieu/',
        children: [
          {
            title: 'Số lượng nước',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/so-luong-nuoc'
          },
          {
            title: 'Chất lượng nước',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/chat-luong-nuoc'
          },
        ]
      },
      {
        title: 'SL điều tra KTSDN',
        primaryPath: 'tai-nguyen-nuoc/thong-tin-du-lieu/',
        children: [
          {
            title: 'Điều tra KTSD nước mặt',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/dieu-tra/nuoc-mat'
          },
          {
            title: 'Điều tra KTSD NDĐ',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/dieu-tra/nuoc-duoi-dat'
          },
          {
            title: 'Điều tra xả thải vào NN',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/dieu-tra/xa-thai'
          },
        ]
      },
      {
        title: 'Công trình KTSD TNN',
        primaryPath: 'tai-nguyen-nuoc/thong-tin-du-lieu/',
        children: [
          {
            title: 'Phải có giấy phép',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/cong-trinh-ktsd-tnn/ktsd-phai-co-giay-phep'
          },
          {
            title: 'Phải kê khai',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/cong-trinh-ktsd-tnn/ktsd-phai-ke-khai'
          },
          {
            title: 'Phải đăng ký ',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/cong-trinh-ktsd-tnn/ktsd-phai-dang-ky'
          },
        ]
      },
      {
        title: 'HSKT Trạm',
        primaryPath: 'tai-nguyen-nuoc/thong-tin-du-lieu/',
        children: [
          {
            title: 'Nước mặt',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/hskt-tram/nuoc-mat'
          },
          {
            title: 'Nước dưới đất',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/hskt-tram/nuoc-duoi-dat'
          },
        ]
      },
      {
        title: 'Danh mục NN nội tỉnh',
        primaryPath: 'tai-nguyen-nuoc/thong-tin-du-lieu/',
        children: [
          {
            title: 'Danh mục NN liên tỉnh',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/danh-muc-lien-tinh'
          },
          {
            title: 'Danh mục NN nội tỉnh',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/danh-muc-mnnt'
          }
        ]
      }
    ]
  }

  if (router.pathname.includes('tai-nguyen-nuoc')) {
    return [
      {
        title: 'Trang chủ',
        icon: HomeOutline,
        path: '/'
      },
      {
        title: 'Giám sát',
        primaryPath: 'tai-nguyen-nuoc/giam-sat',
        children: [
          {
            sectionTitle: 'Công trình'
          },
          {
            title: 'Bản đồ công trình',
            path: '/tai-nguyen-nuoc/giam-sat/cong-trinh'
          },
          {
            title: 'Nước mặt',
            path: '/tai-nguyen-nuoc/giam-sat/cong-trinh/nuoc-mat'
          },
          {
            title: 'Nước dưới đất',
            path: '/tai-nguyen-nuoc/giam-sat/cong-trinh/nuoc-duoi-dat'
          },
          {
            title: 'Xả thải',
            path: '/tai-nguyen-nuoc/giam-sat/cong-trinh/xa-thai'
          },

          {
            sectionTitle: 'Quan trắc'
          },
          {
            title: 'Nước mặt',
            path: '/tai-nguyen-nuoc/giam-sat/quan-trac/nuoc-mat'
          },
          {
            title: 'Nước dưới đất',
            path: '/tai-nguyen-nuoc/giam-sat/quan-trac/nuoc-duoi-dat'
          },
          {
            title: 'Xả thải',
            path: '/tai-nguyen-nuoc/giam-sat/quan-trac/xa-thai'
          },

          {
            sectionTitle: 'Giám sát'
          },
          {
            title: 'Đăng ký kết nối',
            path: '/tai-nguyen-nuoc/giam-sat/giam-sat/yeu-cau-ket-noi'
          },
          {
            title: 'QL đăng ký kết nối',
            path: '/tai-nguyen-nuoc/giam-sat/giam-sat/quan-ly-yeu-cau-ket-noi'
          },
          {
            title: 'KTSD nước mặt',
            path: '/tai-nguyen-nuoc/giam-sat/giam-sat/nuoc-mat'
          },
          {
            title: 'KTSD nước dưới đất',
            path: '/tai-nguyen-nuoc/giam-sat/giam-sat/nuoc-duoi-dat'
          },
          {
            title: 'Xả thải',
            path: '/tai-nguyen-nuoc/giam-sat/giam-sat/xa-thai'
          },

          {
            sectionTitle: 'Thông báo - cảnh báo'
          },
          {
            title: 'Thông báo',
            path: '/tai-nguyen-nuoc/giam-sat/thong-bao'
          },
          {
            title: 'Cảnh báo',
            path: '/tai-nguyen-nuoc/giam-sat/canh-bao'
          }
        ]
      },
      {
        title: 'Cấp phép',
        primaryPath: 'tai-nguyen-nuoc',
        children: [
          {
            sectionTitle: 'Giấy phép'
          },
          {
            title: 'Kết quả cấp phép',
            path: '/tai-nguyen-nuoc/thong-tin-du-lieu/ket-qua-cap-phep'
          },
          {
            title: 'Nước mặt',
            path: '/tai-nguyen-nuoc/cap-phep/giay-phep/nuoc-mat'
          },
          {
            title: 'KTSD Nước dưới đất',
            path: '/tai-nguyen-nuoc/cap-phep/giay-phep/nuoc-duoi-dat/khai-thac-su-dung'
          },
          {
            title: 'Thăm dò nước dưới đất',
            path: '/tai-nguyen-nuoc/cap-phep/giay-phep/nuoc-duoi-dat/tham-do'
          },
          {
            title: 'HNK nước dưới đất',
            path: '/tai-nguyen-nuoc/cap-phep/giay-phep/nuoc-duoi-dat/hanh-nghe-khoan'
          },
          {
            title: 'Xả thải',
            path: '/tai-nguyen-nuoc/cap-phep/giay-phep/xa-thai'
          },
          {
            sectionTitle: 'Tiền cấp quyền'
          },
          {
            title: 'Bộ cấp',
            path: '/tai-nguyen-nuoc/cap-phep/tien-cap-quyen/bo-cap'
          },
          {
            title: 'Tỉnh cấp',
            path: '/tai-nguyen-nuoc/cap-phep/tien-cap-quyen/tinh-cap'
          }
        ]
      },
      {
        title: 'Kiểm kê TNN',
        primaryPath: 'tai-nguyen-nuoc',
        children: [
          {
            sectionTitle: 'Nước mưa'
          },
          {
            title: 'Kiểm kê nước mưa',
            path: '/tai-nguyen-nuoc/kiem-ke/nuoc-mua'
          },

          {
            sectionTitle: 'Nước mặt'
          },
          {
            title: 'Số lượng nguồn nước mặt',
            path: '/tai-nguyen-nuoc/kiem-ke/nuoc-mat/so-luong'
          },
          {
            title: 'Tổng lượng nước mặt',
            path: '/tai-nguyen-nuoc/kiem-ke/nuoc-mat/tong-luong'
          },
          {
            title: 'Chất lượng nước mặt',
            path: '/tai-nguyen-nuoc/kiem-ke/nuoc-mat/chat-luong-nuoc'
          },
          {
            title: 'KTSD nước mặt',
            path: '/tai-nguyen-nuoc/kiem-ke/nuoc-mat/ktsd-nuoc-mat'
          },

          {
            sectionTitle: 'Nước dưới đất'
          },
          {
            title: 'Số lượng NDĐ',
            path: '/tai-nguyen-nuoc/kiem-ke/nuoc-duoi-dat/so-luong'
          },
          {
            title: 'Tổng lượng NDĐ',
            path: '/tai-nguyen-nuoc/kiem-ke/nuoc-duoi-dat/tong-luong'
          },
          {
            title: 'Chất lượng NDĐ',
            path: '/tai-nguyen-nuoc/kiem-ke/nuoc-duoi-dat/kiem-ke-CLN-duoi-dat'
          },

          {
            sectionTitle: 'Nước biển'
          },
          {
            title: 'Kiểm kê nước biển',
            path: '/tai-nguyen-nuoc/kiem-ke/kiem-ke-nuoc-bien'
          },

          {
            sectionTitle: 'Xả thải'
          },
          {
            title: 'Kiểm kê nước mưa',
            path: '/tai-nguyen-nuoc/kiem-ke/nuoc-mua'
          },
        ]
      },
      {
        title: 'Thông tin dữ liệu',
        path: '/tai-nguyen-nuoc/thong-tin-du-lieu'
      },
      {
        title: 'Báo cáo biểu mẫu',
        primaryPath: 'tai-nguyen-nuoc',
        children: [
          {
            title: 'Báo cáo biểu mẫu TNN',
            primaryPath: '/tai-nguyen-nuoc/bao-cao'
          },
          {
            title: 'kế hoạch KTSDN',
            primaryPath: '#',
          },
        ]
      },
      {
        title: 'Vận hành liên hồ chứa',
        path: '/tai-nguyen-nuoc/van-hanh'
      },
      {
        title: 'Xả thải',
        primaryPath: 'tai-nguyen-nuoc',
        children: [
          {
            sectionTitle: 'KNTN nước thải sông,suối'
          },
          {
            title: 'QCVN_08_2023',
            path: '/tai-nguyen-nuoc/xa-thai/nguon-nuoc-song/cln'
          },
          {
            title: 'Phân đoạn sông',
            path: '/tai-nguyen-nuoc/xa-thai/nguon-nuoc-song/phan-doan-song'
          },
          {
            title: 'Dữ liệu nguồn nước nhận',
            path: '/tai-nguyen-nuoc/xa-thai/nguon-nuoc-song/du-lieu-nguon-nhan'
          },
          {
            title: 'Dữ liệu nguồn nước thải',
            path: '/tai-nguyen-nuoc/xa-thai/nguon-nuoc-song/du-lieu-nguon-thai'
          },
          {
            title: 'Tải lượng ô nhiễm',
            path: '/tai-nguyen-nuoc/xa-thai/nguon-nuoc-song/tai-luong-o-nhiem'
          },
          {
            title: 'Khả năng TNNT sông,suối',
            path: '/tai-nguyen-nuoc/xa-thai/nguon-nuoc-song/kha-nang-tiep-nhan-nuoc-thai-song'
          },
          {
            title: 'Dự báo KNTNNT sông,suối',
            path: '/tai-nguyen-nuoc/xa-thai/nguon-nuoc-song/du-bao-kntnnt'
          },

          {
            sectionTitle: 'KNTN nước thải ao,hồ'
          },
          {
            title: 'QCVN_08_2023',
            path: '/tai-nguyen-nuoc/xa-thai/nguon-nuoc-ao/cln'
          },
          {
            title: 'Thông tin ao,hồ',
            path: '/tai-nguyen-nuoc/xa-thai/nguon-nuoc-ao/thong-tin-ao-ho'
          },
          {
            title: 'Khả năng TNNT ao,hồ',
            path: '/tai-nguyen-nuoc/xa-thai/nguon-nuoc-ao/kha-nang-tiep-nhan-ao-ho'
          },
          {
            title: 'Dự báo KNTNNT ao,hồ',
            path: '/tai-nguyen-nuoc/xa-thai/nguon-nuoc-ao/du-bao'
          },
        ]
      },
    ]
  }

  //dat dai
  if (router.pathname.includes('dat-dai')) {
    return [
      {
        title: 'Trang chủ',
        icon: HomeOutline,
        path: '/'
      },
      {
        title: "Bản đồ địa chính",
        path: '#',
      },
      {
        title: "Đăng ký đất đai",
        path: "#",
      },
      {
        title: "Kiểm kê đất đai",
        path: "#",
      },
      {
        title: "Quy hoạch SDĐ",
        path: "#",
      },
      {
        title: "Giá đất",
        path: "#",
      },

    ]
  }

  //dai chat khoang san
  if (router.pathname.includes('dcks')) {
    return [
      {
        title: 'Trang chủ',
        icon: HomeOutline,
        path: '/'
      },
      {
        title: "Báo cáo địa chất",
        path: '#',
      },
      {
        title: "Tiền cấp quyền KTKS",
        path: "#",
      },
      {
        title: "Cấp phép KTKS",
        path: "#",
      },
      {
        title: "Giám sát KTKS",
        path: "#",
      },
      {
        title: "Khu vực dự trữ KS",
        path: "#",
      },
    ]
  }

  //moi-truong
  if (router.pathname.includes('moi-truong')) {
    return [
      {
        title: 'Trang chủ',
        icon: HomeOutline,
        path: '/'
      },
      {
        title: "Hiện trạng môi trường",
        path: '#',
      },
      {
        title: "Đa dạng sinh học",
        path: "#",
      },
      {
        title: "Quy hoạch môi trường",
        path: "#",
      },
      {
        title: "Nguồn thải ô nhiễm",
        path: "#",
      },
      {
        title: "Xử lý chất thải",
        path: "#",
      },
      {
        title: "Tranh chấp, khiếu nại",
        path: "#",
      },
    ]
  }

  return []
}

export default navigation
