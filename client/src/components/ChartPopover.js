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
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="relative bg-zinc-800 border border-zinc-600 rounded-xl md:w-1/2 w-fit p-8 text-zinc-100">
            <div className='flex mb-4 font-medium justify-between'>
                <p>Price History</p>
                <button onClick={onClose}><IoClose size={25} /></button></div>
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
