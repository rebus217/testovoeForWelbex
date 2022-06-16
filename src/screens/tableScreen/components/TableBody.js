import React from 'react';
import moment from "moment";
import '../TableScreen.css'

const TableBody = ({data}) => {
    return (
        <tbody>
        {data.map(row => {
            const rowKeys = Object.keys(row)
            return (
                <tr>
                    {rowKeys.map(key => {
                        let cellData = key === 'date' ? moment(row[key]).format("MMM Do YY") : row[key]
                        return <td>{cellData}</td>
                    })}
                </tr>
            )
        })}
        </tbody>
    )
};

export default TableBody;
