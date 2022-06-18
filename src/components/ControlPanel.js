import React, {useEffect, useState} from 'react';
import '../screens/tableScreen/TableScreen.css'

const columns = [
    {
        name: 'Расстояние',
        id: 'distance'
    },
    {
        name: 'Количество',
        id: 'count'
    },
    {
        name: 'Название',
        id: 'name'
    },
]

const initialColumnFilter = {
    name: 'Колонка',
    id: 'column',
}

const initialMethodFilter = {
    name: 'Условие',
    id: 'method',
}

const methods = [
    {
        name: 'Равно',
        id: 'equally'
    },
    {
        name: 'Содержит',
        id: 'include'
    },
    {
        name: 'Больше',
        id: 'more'
    },
    {
        name: 'Меньше',
        id: 'less'
    },
]



function ControlPanel(props) {
    const {onFilter} = props;
    const [isVisibleFilterColumn, setIsVisibleFilterColumn] = useState(false);
    const [isVisibleMethodFilter, setIsVisibleMethodFilter] = useState(false);
    const [activeColumnFilter, setActiveColumnFilter] = useState(initialColumnFilter);
    const [activeMethodFilter, setActiveMethodFilter] = useState(initialMethodFilter);
    const [inputValue, setInputValue] = useState('');


    function resetFilters () {
        setIsVisibleFilterColumn(false);
        setActiveColumnFilter(initialColumnFilter)
        setActiveMethodFilter(initialMethodFilter)
        setInputValue('')
        onFilter(initialColumnFilter.id, initialMethodFilter.id)
    }


    const DropDownList = (props) => {
        const {
            list,
            setIsVisible,
            isVisible,
            activeOption,
            setActiveOption
        } = props

        function selectOption(option) {
            setActiveOption({...option});
            setInputValue('')
            setIsVisible(!isVisible);
        }

        function showContent() {
            setIsVisibleFilterColumn(false)
            setIsVisibleMethodFilter(false)
            setIsVisible(!isVisible)
        }

        function isHideIncludes (option) {
            return !(activeColumnFilter.id !== 'name' && option.id === 'include')
        }

      return(
              <div className={'dropDownSort'}>
                  <button className={'sortButton'} onClick={() => showContent()}>{activeOption.name}</button>
                  {isVisible && <div id={'dropDownSort'} className={'dropDownSortContent'}>
                      {list.map(option => {
                         if(isHideIncludes(option)){
                             return (
                                 <div
                                     key={option.name}
                                     onClick={() => selectOption(option)}
                                 >
                                     {option.name}
                                 </div>
                             )
                         }
                      })}
                  </div>}
              </div>
          )

    }

    function onChangeInputValue (value) {
        const numberOnly = new RegExp(/\D/)

        if (activeColumnFilter.id !== 'name' && activeColumnFilter.id !== 'column'){
            if (!numberOnly.test(value)) setInputValue(Number(value))
        } else {
            setInputValue(value)
        }
    }

    return (
        <div className={'control_panel_container'}>
            <span className={''}>Фильтр по: </span>
            <DropDownList
                list={columns}
                setIsVisible={setIsVisibleFilterColumn}
                isVisible={isVisibleFilterColumn}
                activeOption={activeColumnFilter}
                setActiveOption={setActiveColumnFilter}
            />
            <DropDownList
                list={methods}
                setIsVisible={setIsVisibleMethodFilter}
                isVisible={isVisibleMethodFilter}
                activeOption={activeMethodFilter}
                setActiveOption={setActiveMethodFilter}
            />
            <input className={'filterInput'} value={inputValue} onChange={(e)=> onChangeInputValue(e.target.value)} />
            <div className={'sortButton'} onClick={()=> onFilter(activeColumnFilter.id, activeMethodFilter.id, inputValue)}>Фильтровать</div>
            <div className={'sortButton'} onClick={()=> resetFilters()}>Сбросить Фильтр</div>
        </div>
    );
}

export default ControlPanel;