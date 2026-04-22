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
import { useAdminTransaction } from '@/hooks';
import { optionsPick } from "./options"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export default function UserChart(){
    const { data: datas, isLoading } = useAdminTransaction.useGetUserRevenue()

    const labels = datas?.map((d) => d.email) || []
    const revenue = datas?.map((d) => d.totalSpent) || []
    const options = optionsPick('User')

    const data: ChartData<'bar'> = {
        labels,
        datasets: [
            {
                label: "Revenue",
                data: revenue,
                backgroundColor: 'rgba(168, 85, 247, 0.3)',
                borderColor: 'rgba(168, 85, 247, 0.6)',
                barThickness: 'flex',
            }
        ]
    }

    if (isLoading) {
        return <p className="text-neutral-400 text-sm">Loading chart...</p>
    }

    const chartHeight = Math.max(300, labels.length * 50)

    return (
        <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6">
            <div style={{ height: `${chartHeight}px` }}>
                <Bar data={data} options={options} />
            </div>
            {labels.length === 0 && (
                <p className="text-neutral-500 text-sm text-center py-4">No revenue data available.</p>
            )}
        </div>
    )
}