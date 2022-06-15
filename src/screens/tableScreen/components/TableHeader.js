import React from 'react';

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
