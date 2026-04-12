import { type ChartOptions } from 'chart.js'

export function optionsPick(category: string){
  const options: ChartOptions<'bar'> = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 3,
    },
  },
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false
      },
      display: false, 
    },
    y: {
      grid: {
        display: false,
      },
      ticks:{
        font: {
          size: 16,
          weight: 'bold',
          lineHeight: 1.2
        }
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: `${category} ranking by revenue`,
      font: {
        family: 'Helvetica',
        size: 20,
        weight: 'bold',
        lineHeight: 1.2,
      },
    },
    datalabels: {
      anchor: 'end' as const, 
      align: 'right' as const, 
      color: '#000000', 
      font: {
        weight: 'bold',
      },
      formatter: (value: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
      }
    },
  },
  layout: {
    padding: {
      right: 80, 
    }
  }
};
  return options
}
