export interface PagesNavigationType {
    name: string
    path: string
    logo?: string
    children?: PagesNavigationType[]
}

const pagesNavigation = (): PagesNavigationType[] => {

    return [
        {
            name: "Đất đai",
            path: "/dat-dai",
            logo: '/images/so1.png',
        },
        {
            name: "Tài nguyên nước",
            path: "/tai-nguyen-nuoc",
            logo: '/images/so2.png',
        },
        {
            name: "Địa chất - Khoáng sản",
            path: "/dcks",
            logo: '/images/so3.png',
        },
        {
            name: "Môi trường",
            path: "/moi-truong",
            logo: '/images/so4.png',
        },
        {
            name: "Khí tượng thủy văn",
            path: "#",
            logo: '/images/so5.png',
        },
        {
            name: "Biến đổi khí hậu",
            path: "/tai-nguyen-nuoc/cap-phep",
            logo: '/images/so6.png',
        },
        {
            name: "Đo đạc bản đồ",
            path: "#",
            logo: '/images/so7.png',
        },
        {
            name: "Bản đồ và viễn thám",
            path: "#",
            logo: '/images/so8.png',
        },
        {
            name: "Biển & Hải đảo",
            path: "#",
            logo: '/images/so9.png',
        }
    ]
}
export default pagesNavigation