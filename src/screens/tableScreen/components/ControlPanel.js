import React, {useEffect, useState} from 'react';
import '../TableScreen.css'

const sortOptions = [
    {
        name: 'Расстояние убывание',
        id: 'distance_down',
    },
    {
        name: 'Расстояние возрастание',
        id: 'distance_up',
    },
    {
        name: 'Колчичество убывание',
        id: 'count_down'
    },
    {
        name: 'Колчичество возрастание',
        id: 'count_up'
    },
    {
        name: 'Название А-Я',
        id: 'name_A-Z'
    },
    {
        name: 'Название Я-А',
        id: 'name_Z-A'
    },

]

const columns = [
    {
        name: 'Расстоянию',
        id: 'distance'
    },
    {
        name: 'Количеству',
        id: 'count'
    },
    {
        name: 'Названию',
        id: 'name'
    },
]

const initialOption = {
    name: 'Сортировать по: ',
    id: 'initial'
}

function ControlPanel(props) {
    const {onSort} = props;
    const [isVisibleSort, setIsVisibleSort] = useState(false);
    const [isVisibleFilterColum, setIsVisibleFilterColumn] = useState(false);
    const [activeOption, setActiveOption] = useState(initialOption);
    const [dropDownContent, setDropDownContent] = useState('dropDownSortContent');
    const [dropDownFilterContent, setDropDownFilterContent] = useState('dropDownFilterContentColumn');


    function onSwitchVisibleDropDown (type) {
        switch (type) {
            case 'sort' :
                setIsVisibleSort(!isVisibleSort)
                break;
            case 'filterColumn':
                setIsVisibleFilterColumn(!isVisibleFilterColum)
        }
    }

    function onClickSortOption (option) {
        onSort(option)
        setIsVisibleSort(!isVisibleSort)
        setActiveOption({...option})
    }

    function onClickColumnFilter (option) {
    }

    function resetFilters () {
        onSort(initialOption)
        setIsVisibleSort(false)
        setActiveOption(initialOption)
    }

    useEffect(()=> {
        if(isVisibleSort) setDropDownContent(dropDownContent + ' show');
        if(!isVisibleSort) setDropDownContent('dropDownSortContent');

        if(isVisibleFilterColum) setDropDownFilterContent(dropDownFilterContent + ' show');
        if(!isVisibleFilterColum) setDropDownFilterContent('dropDownFilterContentColumn');

    },[isVisibleSort, isVisibleFilterColum])

    // console.log('aaaaa', isVisibleSort)
    return (
        <div className={'control_panel_container'}>
            <div className={'sortControls'}>
                <div className={'dropDownSort'}>
                    <button className={'sortButton'} onClick={() => onSwitchVisibleDropDown('sort')}>{activeOption.name}</button>
                    <div id={'dropDownSort'} className={dropDownContent}>
                        {sortOptions.map(option => {
                            return <div key={option.name} onClick={() => onClickSortOption(option) }>{option.name}</div>
                        })}
                    </div>
                </div>
                <div className={'resetSort'} onClick={()=> resetFilters()}>Сбросить</div>
            </div>
            <div className={'filterControls'}>
                <span>Фильтр по: </span>
                <div className={'dropDownSort'}>
                    <button className={'filterColumnButton'} onClick={() => onSwitchVisibleDropDown('filterColumn')}>Колонке</button>
                    <div id={'dropDownSort'} className={dropDownFilterContent}>
                        {columns.map(column => {
                            return <div key={column.name} onClick={() => console.log(column) }>{column.name}</div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ControlPanel;