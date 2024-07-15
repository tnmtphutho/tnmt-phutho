import { useState, useEffect } from 'react';
import { Grid } from '@mui/material'
import ReactApexcharts from 'src/@core/components/react-apexcharts';
import { ApexOptions } from "apexcharts";
import { getData } from 'src/api/axios';

interface RainDataProps {
  stationdata: any
}

const Mua6HourChart: React.FC<RainDataProps> = (props) => {
    const [data, setData] = useState<any[]>([])
    const {stationdata} = props;

    useEffect(() => {
      async function getDataTramQuangNgai() {
        await getData(`DuLieuTram/thong-ke-yeu-to-khi-tuong-6-gio/${stationdata.id}`)
          .then(data => {
            setData(data);
            console.log(data)
          })
          .catch(error => {
            console.log(error)
          })
      }
      getDataTramQuangNgai()
    },[stationdata.id])
   
    const options: ApexOptions = {
        chart: {
          type: 'bar',
          zoom: {
            enabled: false
          }
        },
        colors:['#0077DF', '#E91E63', '#9C27B0', '#008000'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        legend: {
          tooltipHoverFormatter: function (val, opts) {
              return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
          },
        },
        title: {
          text: 'Trạm Quảng Ngãi',
          align: 'center'
        },
        grid: {
          borderColor: '#f1f1f1',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: [],
          title: {
            text: "Ngày"
          }
        },
        yaxis: [
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#0077DF"
            },
            labels: {
              style: {
                colors: "#0077DF"
              }
            },
            title: {
              text: "Lượng mưa (mm)",
              style: {
                color: "#0077DF"
              }
            },
          },
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#008000"
            },
            labels: {
              style: {
                colors: "#008000" 
              }
            },
            title: {
              text: "Tốc độ gió (m/s)",
              style: {
                color: "#008000"
              }
            },
          },
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#E91E63"
            },
            labels: {
              style: {
                colors: "#E91E63"
              }
            },
            opposite: true,
            title: {
              text: "Nhiệt độ (°C)",
              style: {
                color: "#E91E63"
              }
            }
          },
          {
            axisTicks: {
              show: true
            },
            axisBorder: {
              show: true,
              color: "#9C27B0"
            },
            labels: {
              style: {
                colors: "#9C27B0"
              }
            },
            opposite: true,
            title: {
              text: "Độ ẩm (%)",
              style: {
                color: "#9C27B0"
              }
            }
          }
        ],
        markers: {
          size: 0,
          hover: {
              sizeOffset: 6 
          }
        },
        tooltip: {
            enabled: true,
            onDatasetHover: {
              highlightDataSeries: true,
            },
            y: [
                {
                    title: {
                        formatter: function (val) {
                            return val;
                        }
                    }
                },
            ]
        },
    };

    const series = [{
        name: "Lượng mưa",
        type:'column',
        data: data[0]?.data
    },{
        name: "Nhiệt độ",
        type:'line',
        data: data[1]?.data
    },{
        name: "Độ ẩm",
        type:'line',
        data: data[2]?.data
    },{
        name: "Tốc độ gió",
        data: data[3]?.data
    }];

    return (
        <Grid>
            <ReactApexcharts options={options} series={series} height={450}/>
        </Grid>
    )
}

export default Mua6HourChart
