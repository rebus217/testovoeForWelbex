import React, {useEffect, useState} from 'react';
import moment from "moment";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import './TableScreen.css'
import ControlPanel from "./components/ControlPanel";

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
    const [filteredData, setFilteredData] = useState(data)

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

    useEffect(()=> {
        setFilteredData(data)
    },[data])


    function onSort(option){
     switch (option.id){
         case 'distance_down' :
             setFilteredData([...data].sort((first, second) =>  second.distance - first.distance  ))
             break;
         case 'distance_up' :
             setFilteredData([...data].sort((first, second) => first.distance - second.distance ))
             break;
         case 'count_down' :
             setFilteredData([...data].sort((first, second) =>  second.count - first.count  ))
             break;
         case 'count_up' :
             setFilteredData([...data].sort((first, second) => first.count - second.count ))
             break;
         case 'name_A-Z' :
             setFilteredData([...data].sort((first, second) =>  first.name.localeCompare(second.name)  ))
             break;
         case 'name_Z-A' :
             setFilteredData([...data].sort((first, second) =>  second.name.localeCompare(first.name)  ))
             break;
         case 'initial' :
             setFilteredData([...data])
             break;
         default:
             break
     }
    }

    return (
        <div className={'Container'}>
            <ControlPanel onSort={onSort}/>
            <table >
                <TableHeader columns={columns}/>
                <TableBody data={filteredData}/>
            </table>
        </div>
    );
};

export default TableScreen;
