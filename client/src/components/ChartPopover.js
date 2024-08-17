import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { IoClose } from "react-icons/io5";

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function ChartPopover({ mtgo_id, onClose }) {
    const [priceHistory, setPriceHistory] = useState(null);

    useEffect(() => {
        const fetchPriceHistory = async () => {
            try {
                const response = await axios.get(`/api/scryfall/${mtgo_id}`);
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
                    color: 'rgb(255 251 235)',
                },
                grid: {
                    color: 'rgb(254 243 199)',
                },
            },
            y: {
                display: true,
                ticks: {
                    color: 'rgb(255 251 235)',
                },
                grid: {
                    color: 'rgb(254 243 199)',
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
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="relative bg-amber-800 border border-amber-600 rounded-xl md:w-3/6 w-auto md:p-12 p-4 text-amber-400">
                <button className="absolute top-2 right-0 px-4 py-2" onClick={onClose}><IoClose size={25} />
                </button>
                {chartData ? (
                    <Line data={chartData} options={chartOptions} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default ChartPopover;
