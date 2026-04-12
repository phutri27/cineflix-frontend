import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { useGetUserRevenue } from '@/hooks/admin/transaction/use-admin-transaction';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);
import { optionsPick } from "./options"

export default function UserChart(){
    const { data: datas } = useGetUserRevenue()

    const labels = datas?.map((d) => d.email) || []
    const revenue = datas?.map((d) => d.totalSpent) || []
    const options = optionsPick('User')
    const data: ChartData<'bar'> = {
        labels,
        datasets: [
            {   
                label: "Revenue",
                data: revenue,
                backgroundColor: `rgba(67, 163, 195, 0.2)`,
                barThickness: 'flex'
            }
        ]
    }

    return (
        <div className='h-50'>
            <Bar
                data={data}
                options={options}
            />
        </div>
    )
}