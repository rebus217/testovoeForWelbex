import React, {useEffect, useState} from 'react';
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
    const [data, setData] = useState([])

    useEffect(()=> {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };
        fetch('http://localhost:8810/api/get_table_data', requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.success){
                    setData(data.data)
                }
            });
    },[])
    return (
        <div>
            <table>
                <TableHeader columns={columns}/>
                <TableBody data={data}/>
            </table>
        </div>
    );
};

export default TableScreen;
