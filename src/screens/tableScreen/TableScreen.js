import React from 'react';
import moment from "moment";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";

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
        count: 10,
        distance: 6000,
    },
    {
        date: moment(new Date()).format("MMM Do YY"),
        name: 'test3',
        count: 5,
        distance: 7000,
    }
]
const columns = ['Дата', 'Название', 'Количество', 'Расстояние']

const TableScreen = () => {

    return (
        <div>
            <table>
                <TableHeader columns={columns}/>
                <TableBody data={dataFromBack}/>
            </table>
        </div>
    );
};

export default TableScreen;
