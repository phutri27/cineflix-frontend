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

export default function CinemaChart(){
    const { data: datas, isLoading } = useAdminTransaction.useGetCinemaRevenue()

    const labels = datas?.map((d) => d.cinemaName) || []
    const revenue = datas?.map((d) => d.totalRevenue) || []
    const options = optionsPick('Cinema')

    const data: ChartData<'bar'> = {
        labels,
        datasets: [
            {
                label: "Revenue",
                data: revenue,
                backgroundColor: 'rgba(220, 38, 38, 0.3)',
                borderColor: 'rgba(220, 38, 38, 0.6)',
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