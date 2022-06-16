import React from 'react';
import '../TableScreen.css'

const TableHeader = ({columns}) => {
    return (
        <thead>
        <tr>
            {columns.map(column => <th key={column}>{column}</th>)}
        </tr>
        </thead>
    )
};

export default TableHeader;
