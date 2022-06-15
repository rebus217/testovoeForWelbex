import React from 'react';
import moment from "moment";

const dataFromBack = [
    {
        date: moment(new Date()).format("MMM Do YY"),
        name: 'test',
        count: 16,
        distance: 5000,
    },
    {
        date: moment(new Date()).format("MMM Do YY"),
        name: 'test2',
        count: 16,
        distance: 6000,
    },
    {
        date: moment(new Date()).format("MMM Do YY"),
        name: 'test3',
        count: 16,
        distance: 7000,
    }
]

const TableScreen = () => {

    const TableHeader = () => {
        const columns = ['Дата', 'Название', 'Количество', 'Расстояние']
        return (
            <thead>
            <tr>
                {columns.map(column => <th key={column}>{column}</th>)}
            </tr>
            </thead>
        )
    }

    const TableBody = ({data}) => {

        return data.map(row => {
            const rowKeys = Object.keys(row)
            return (
                <tr>
                    {rowKeys.map(key => {
                        return <td>{row[key]}</td>
                    })}
                </tr>
            )
        })
    }


    return (
        <div>
            <table>
                <TableHeader/>
                <tbody>
                </tbody>
                <TableBody data={dataFromBack}/>
            </table>
        </div>
    );
};

export default TableScreen;
