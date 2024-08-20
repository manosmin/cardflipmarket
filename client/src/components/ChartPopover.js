import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function ChartPopover({ mtgo_id }) {
    const [priceHistory, setPriceHistory] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchPriceHistory = async () => {
            try {
                const response = await axios.get(`/api/scryfall/${mtgo_id}`);
                setLoading(false);
                setPriceHistory(response.data);
            } catch (error) {
                console.error('Error fetching price history:', error);
            }
        };
        fetchPriceHistory();
    }, [mtgo_id]);

    
    const chartData = priceHistory ? {
        labels: priceHistory.tixPriceHistory.map(entry => new Date (entry.date).toISOString().slice(0, 10)),
        datasets: [{
            data: priceHistory.tixPriceHistory.map(entry => entry.tix),
            borderColor: 'rgb(52 211 153)'
        }]
    } : null;

    
    const chartOptions = {
        maintainAspectRatio: true,
        scales: {
            x: {
                display: true,
                ticks: {
                    color: 'rgb(244 244 245)',
                },
                grid: {
                    color: 'rgb(212 212 216)',
                },
            },
            y: {
                display: true,
                ticks: {
                    color: 'rgb(244 244 245)',
                },
                grid: {
                    color: 'rgb(212 212 216)',
                },
            },
        },
        plugins: {
            legend: {
              display: false
            }
          }
    };

    return (
            <div className="flex items-center md:min-h-80 min-h-48 justify-center md:w-1/3 w-fit p-2 text-zinc-100 mx-auto">
                {loading ? <p>Loading...</p> : ( chartData ?
                    <Line data={chartData} options={chartOptions} />
                :
                    <p>No price history data found.</p>
                )}
            </div>
    );
}

export default ChartPopover;
