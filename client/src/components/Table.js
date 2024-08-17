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
            <table className="text-sm w-full text-left rtl:text-right text-amber-200 md:mb-80 sm:mb-36">
                <thead className="text-amber-400 text-md uppercase cursor-pointer bg-amber-950">
                    <tr>
                        <th scope="col" className="px-6 py-3 hover:text-amber-100" onClick={() => handleSort('mtgo_id')}>
                            MTGO ID
                        </th>
                        <th scope="col" className="px-6 py-3 hover:text-amber-100" onClick={() => handleSort('name')}>
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 hover:text-amber-100" onClick={() => handleSort('set')}>
                            Set
                        </th>
                        <th scope="col" className="px-6 py-3 hover:text-amber-100" onClick={() => handleSort('before_tix')}>
                            TIX Before
                        </th>
                        <th scope="col" className="px-6 py-3 hover:text-amber-100" onClick={() => handleSort('after_tix')}>
                            TIX After
                        </th>
                        <th 
                            scope="col" 
                            className="px-6 py-3 hover:text-amber-100" 
                            onClick={() => handleSort('percentage_difference')}
                        >
                            TIX Diff %
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData && sortedData.map((card) => (
                        <tr key={card._id} className="odd:bg-amber-900 even:bg-amber-800 border-b border-amber-700 text-amber-100">
                            <th 
                                scope="row" 
                                className="px-6 py-4 whitespace-nowrap"
                            >
                                {card.mtgo_id}
                            </th>
                            <td className="px-6 py-4 relative">
                                <a className='hover:underline cursor-pointer' href={card.cardmarket} rel="noreferrer" target='_blank'
                                onMouseEnter={() => setHoveredCard(card)}
                                onMouseLeave={() => setHoveredCard(null)}>
                                    {card.name}
                                </a>
                                {hoveredCard === card && (
                                    <div className="absolute lg:top-4 lg:right-24 md:rounded-xl rounded-lg bg-amber-600 p-2 lg:w-1/3 md:w-7/12 sm:w-2/3 z-10">
                                        <img src={card.image} alt={card.name} className="md:rounded-xl rounded-lg w-full h-auto" />
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {<i title={`${card.set.toUpperCase()}`} alt={`${card.set.toUpperCase()}`} className={`p-2 icon-container bg-amber-50 rounded-full ss ss-${card.set} ss-${card.rarity}`}></i>}
                            </td>
                            <td className="px-6 py-4">
                                {card.before_tix}
                            </td>
                            <td className="px-6 py-4">
                                {card.after_tix}
                            </td>
                            <td 
                                className="px-6 py-4 cursor-pointer hover:underline"
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
