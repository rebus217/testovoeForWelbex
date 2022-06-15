import React from 'react';

const TableBody = ({data}) => {
    return (
        <tbody>
        {data.map(row => {
            const rowKeys = Object.keys(row)
            return (
                <tr>
                    {rowKeys.map(key => {
                        return <td>{row[key]}</td>
                    })}
                </tr>
            )
        })}
        </tbody>
    )
};

export default TableBody;
