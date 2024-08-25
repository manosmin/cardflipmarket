import React, { useState } from 'react';
import ChartPopover from './ChartPopover';

function Table({ data }) {
    const [sortConfig, setSortConfig] = useState({ key: 'percentage_difference_tix', direction: 'desc' });
    const [hoveredCard, setHoveredCard] = useState(null);
    const [expandedCardId, setExpandedCardId] = useState(null);

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

    const toggleExpandRow = (mtgo_id) => {
        setExpandedCardId(expandedCardId === mtgo_id ? null : mtgo_id);
    };

    return (
        <div className="relative overflow-x-auto">
            <table className="text-xs lg:text-sm w-full text-left rtl:text-right text-zinc-200 md:mb-80 sm:mb-36">
                <thead className="text-zinc-400 text-md uppercase cursor-pointer bg-zinc-950">
                    <tr>
                        <th scope="col" className="px-3 py-2 hover:text-zinc-100" onClick={() => handleSort('mtgo_id')}>
                            MTGO ID
                        </th>
                        <th scope="col" className="px-3 lg:min-w-80 py-2 hover:text-zinc-100" onClick={() => handleSort('name')}>
                            Name
                        </th>
                        <th scope="col" className="px-3 py-2 hover:text-zinc-100" onClick={() => handleSort('set')}>
                            Set
                        </th>
                        <th scope="col" className="hidden lg:table-cell px-3 py-2 hover:text-zinc-100" onClick={() => handleSort('before_tix')}>
                            TIX Before
                        </th>
                        <th scope="col" className="hidden lg:table-cell px-3 py-2 hover:text-zinc-100" onClick={() => handleSort('after_tix')}>
                            TIX After
                        </th>
                        <th 
                            scope="col" 
                            className="px-3 py-2 hover:text-zinc-100" 
                            onClick={() => handleSort('percentage_difference_tix')}
                        >
                            TIX Diff %
                        </th>
                        <th scope="col" className="hidden lg:table-cell px-3 py-2 hover:text-zinc-100" onClick={() => handleSort('before_eur')}>
                            EUR Before
                        </th>
                        <th scope="col" className="hidden lg:table-cell px-3 py-2 hover:text-zinc-100" onClick={() => handleSort('after_eur')}>
                            EUR After
                        </th>
                        <th 
                            scope="col" 
                            className="px-3 py-2 hover:text-zinc-100" 
                            onClick={() => handleSort('percentage_difference_eur')}
                        >
                            EUR Diff %
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData && sortedData.map((card) => (
                        <React.Fragment key={card._id}>
                            <tr 
                                className="odd:bg-zinc-900 even:bg-zinc-800 border-b border-zinc-700 text-zinc-100"
                            >
                                <th 
                                    scope="row" 
                                    className="px-3 py-4 whitespace-nowrap"
                                >
                                    {card.mtgo_id}
                                </th>
                                <td className="px-3 py-4 relative">
                                    <a 
                                        className='hover:underline cursor-pointer' 
                                        href={card.cardmarket} 
                                        rel="noreferrer" 
                                        target='_blank'
                                        onMouseEnter={() => setHoveredCard(card)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                    >
                                        {card.name}
                                    </a>
                                    {hoveredCard === card && (
                                        <div className="absolute lg:top-4 lg:right-24 md:rounded-xl rounded-lg bg-zinc-600 p-2 lg:w-2/5 md:w-7/12 sm:w-2/3 z-10">
                                            <img src={card.image} alt={card.name} className="md:rounded-xl rounded-lg w-full h-auto" />
                                        </div>
                                    )}
                                </td>
                                <td className="px-3 py-4">
                                    {<i title={`${card.set.toUpperCase()}`} alt={`${card.set.toUpperCase()}`} className={`w-6 h-6 items-center flex justify-center icon-container bg-zinc-50 rounded-full ss ss-${card.set} ss-${card.rarity}`}></i>}
                                </td>
                                <td className="hidden lg:table-cell px-3 py-4 cursor-pointer"
                                onClick={() => toggleExpandRow(card.mtgo_id)}>
                                    {card.before_tix}
                                </td>
                                <td className="hidden lg:table-cell px-3 py-4 cursor-pointer"
                                onClick={() => toggleExpandRow(card.mtgo_id)}>
                                    {card.after_tix}
                                </td>
                                <td className="px-3 py-4 cursor-pointer"
                                onClick={() => toggleExpandRow(card.mtgo_id)}>
                                    {card.percentage_difference_tix.toFixed(1)+' %'}
                                </td>
                                <td className="hidden lg:table-cell px-3 py-4 cursor-pointer"
                                onClick={() => toggleExpandRow(card.mtgo_id)}>
                                    {card.before_eur !== null ? card.before_eur : <p className='text-rose-600'>No Data</p>}
                                </td>
                                <td className="hidden lg:table-cell px-3 py-4 cursor-pointer"
                                onClick={() => toggleExpandRow(card.mtgo_id)}>
                                    {card.after_eur !== null ? card.after_eur : <p className='text-rose-600'>No Data</p>}
                                </td>
                                <td className="px-3 py-4 cursor-pointer"
                                onClick={() => toggleExpandRow(card.mtgo_id)}>
                                    {card.percentage_difference_eur !== null ? card.percentage_difference_eur.toFixed(1)+' %' : <p className='text-rose-600'>No Data</p>} 
                                </td>
                            </tr>
                            {expandedCardId === card.mtgo_id && (
                                <tr className="odd:bg-zinc-900 even:bg-zinc-800 border-b border-zinc-700" >
                                    <td colSpan="12" className="px-3 p-4">
                                        <ChartPopover mtgo_id={card.mtgo_id} />
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
