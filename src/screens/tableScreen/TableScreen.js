import React, {useEffect, useState} from 'react';
import './TableScreen.css'
import ControlPanel from "../../components/ControlPanel";
import TableBody from "../../components/TableBody";
import {appConfig} from '../../appConfig'


// const dataExample = [
//     {
//         date: new Date(),
//         name: 'test',
//         count: 16,
//         distance: 5000,
//     },
// ]

const columns = ['Дата', 'Название', 'Количество', 'Расстояние']

const TableScreen = () => {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState(data)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(()=> {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`${appConfig.fetch}/api/get_table_data`, requestOptions)
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


    function onFilter (column, method, value) {
        if(column === 'column' || method === 'method') return setFilteredData([...data])
        if (value){
            setFilteredData([...data].filter(row => {
                switch(method){
                    case 'more' : return row[column] > value;
                    case 'less' : return row[column] < value;
                    case 'include': return row[column].includes(value);
                    case 'equally': return row[column] === value;
                }
            }))
        }
    }


    const PagesList = ({rowsCount}) => {
        const pagesCount = Math.ceil(rowsCount/ 10)
        const pages = []
        for (let i = 1; i<= pagesCount; i++){
            pages.push(i)
        }

        return (
            <div className={'pagesContainer'}>
                {pages.length > 1 && pages.map(page => {
                    return (
                        <div
                            className={currentPage === page ? 'pageNumber pageActive' : 'pageNumber'}
                            onClick={()=> setCurrentPage(page)}>{page}
                        </div>
                    )
                }) }
            </div>
        )
    }

    return (
        <div className={'Container'}>
            <ControlPanel onFilter={onFilter}/>
            <TableBody
                data={filteredData}
                currentPage={currentPage}
                columns={columns}
            />
            <PagesList rowsCount={filteredData.length}/>
        </div>
    );
};

export default TableScreen;
