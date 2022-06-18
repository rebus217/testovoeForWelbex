import React from 'react';
import moment from "moment";
import '../screens/tableScreen/TableScreen.css'

const TableBody = ({data, currentPage, columns}) => {

    const TableHeader = () => {
        return (
            <thead>
            <tr>
                {columns.map(column => <th key={ column }> { column } </th>)}
            </tr>
            </thead>
        )
    };

    const TableRows = () => {

        const RowRender = ({row, index}) => {

            const rowKeys = Object.keys(row)

            const RowDataRender = ({key}) => {
                let cellData = key === 'date' ? moment(row[key]).format("MMM Do YY") : row[key]
                return <td key= { row[key] }>{ cellData }</td>
            }

            // check for render current page
            if (index >= (currentPage - 1) * 10 &&  index < currentPage * 10) {
                return (
                    <tr key={index}>
                        {rowKeys.map(key => <RowDataRender key={key}/>)}
                    </tr>
                )
            }
        }

        return (
            <tbody>
            {data.map((row, index )=> <RowRender row={row} index={index}/>)}
            </tbody>
        )
    }


    return (
        <table>
            <TableHeader/>
            <TableRows/>
        </table>
    )
};

export default TableBody;
