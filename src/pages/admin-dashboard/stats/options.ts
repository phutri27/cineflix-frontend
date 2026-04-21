import { type ChartOptions } from 'chart.js'

export function optionsPick(category: string){
    const options: ChartOptions<'bar'> = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 1,
                borderColor: 'rgba(67, 163, 195, 0.4)',
                borderRadius: 4,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false,
                },
                display: false,
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#a3a3a3',
                    font: {
                        size: 13,
                        weight: 'bold',
                        lineHeight: 1.2,
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: `${category} Ranking by Revenue`,
                color: '#ffffff',
                font: {
                    family: 'system-ui, sans-serif',
                    size: 16,
                    weight: 'bold',
                    lineHeight: 1.4,
                },
                padding: {
                    bottom: 20,
                },
            },
            datalabels: {
                anchor: 'end' as const,
                align: 'right' as const,
                color: '#a3a3a3',
                font: {
                    size: 12,
                    weight: 'bold',
                },
                formatter: (value: number) => {
                    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
                },
            },
        },
        layout: {
            padding: {
                right: 100,
            },
        },
    };
    return options
}