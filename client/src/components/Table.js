import React, { useState } from 'react';
import ChartPopover from './ChartPopover';

function Table({ data }) {
    const [sortConfig, setSortConfig] = useState({ key: 'percentage_difference', direction: 'desc' });
    const [hoveredCard, setHoveredCard] = useState(null);
    const [selectedCardId, setSelectedCardId] = useState(null);

    const handleSort = (key) => {
        let direction = 'desc';
        if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = [...data]
        .sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

    const handleChartClick = (mtgo_id) => {
        setSelectedCardId(selectedCardId === mtgo_id ? null : mtgo_id);
    };

    return (
        <div className="relative overflow-x-auto">
            <table className="text-xs lg:text-sm w-full text-left rtl:text-right text-zinc-200 md:mb-80 sm:mb-36">
                <thead className="text-zinc-400 text-md uppercase cursor-pointer bg-zinc-950">
                    <tr>
                        <th scope="col" className="lg:block hidden px-3 py-2 hover:text-zinc-100" onClick={() => handleSort('mtgo_id')}>
                            MTGO ID
                        </th>
                        <th scope="col" className="px-3 py-2 hover:text-zinc-100" onClick={() => handleSort('name')}>
                            Name
                        </th>
                        <th scope="col" className="px-3 py-2 hover:text-zinc-100" onClick={() => handleSort('set')}>
                            Set
                        </th>
                        <th scope="col" className="px-3 py-2 hover:text-zinc-100" onClick={() => handleSort('before_tix')}>
                            TIX Before
                        </th>
                        <th scope="col" className="px-3 py-2 hover:text-zinc-100" onClick={() => handleSort('after_tix')}>
                            TIX After
                        </th>
                        <th 
                            scope="col" 
                            className="px-3 py-2 hover:text-zinc-100" 
                            onClick={() => handleSort('percentage_difference')}
                        >
                            TIX Diff %
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData && sortedData.map((card) => (
                        <tr key={card._id} className="odd:bg-zinc-900 even:bg-zinc-800 border-b border-zinc-700 text-zinc-100">
                            <th 
                                scope="row" 
                                className="lg:block hidden px-3 py-4 whitespace-nowrap"
                            >
                                {card.mtgo_id}
                            </th>
                            <td className="px-3 py-4 relative">
                                <a className='hover:underline cursor-pointer' href={card.cardmarket} rel="noreferrer" target='_blank'
                                onMouseEnter={() => setHoveredCard(card)}
                                onMouseLeave={() => setHoveredCard(null)}>
                                    {card.name}
                                </a>
                                {hoveredCard === card && (
                                    <div className="absolute lg:top-4 lg:right-24 md:rounded-xl rounded-lg bg-zinc-600 p-2 lg:w-1/3 md:w-7/12 sm:w-2/3 z-10">
                                        <img src={card.image} alt={card.name} className="md:rounded-xl rounded-lg w-full h-auto" />
                                    </div>
                                )}
                            </td>
                            <td className="px-3 py-4">
                                {<i title={`${card.set.toUpperCase()}`} alt={`${card.set.toUpperCase()}`} className={`w-6 h-6 items-center flex justify-center icon-container bg-zinc-50 rounded-full ss ss-${card.set} ss-${card.rarity}`}></i>}
                            </td>
                            <td className="px-3 py-4">
                                {card.before_tix}
                            </td>
                            <td className="px-3 py-4">
                                {card.after_tix}
                            </td>
                            <td 
                                className="px-3 py-4 cursor-pointer hover:underline"
                                onClick={() => handleChartClick(card.mtgo_id)}
                            >
                                {card.percentage_difference.toFixed(1)} %
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {selectedCardId && (
                <div className="absolute top-16 left-0 z-20">
                    <ChartPopover mtgo_id={selectedCardId} onClose={() => setSelectedCardId(null)} />
                </div>
            )}
        </div>
    );
}

export default Table;
