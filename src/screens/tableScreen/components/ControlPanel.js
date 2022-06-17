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

const initialOption = {
    name: 'Сортировать по: ',
    id: 'initial'
}

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



function ControlPanel(props) {
    const {onSort} = props;
    const [isVisibleSort, setIsVisibleSort] = useState(false);
    const [isVisibleFilterColumn, setIsVisibleFilterColumn] = useState(false);
    const [activeOption, setActiveOption] = useState(initialOption);
    const [activeColumnFilter, setActiveColumnFilter] = useState(initialOption);

    function onClickColumnFilter (option) {
    }

    function resetFilters () {
        onSort(initialOption)
        setIsVisibleSort(false)
    }


    const DropDownList = (props) => {
        const {
            list,
            onClickOption,
            setIsVisible,
            isVisible,
            activeOption,
            setActiveOption
        } = props



        function selectOption(option) {
            setActiveOption({...option});
            onClickOption(option);
            setIsVisible(!isVisible);
        }

      return(
              <div className={'dropDownSort'}>
                  <button className={'sortButton'} onClick={() => setIsVisible(!isVisible)}>{activeOption.name}</button>
                  {isVisible && <div id={'dropDownSort'} className={'dropDownSortContent'}>
                      {list.map(option => {
                          return (
                              <div
                                  key={option.name}
                                  onClick={() => selectOption(option)}
                              >
                                  {option.name}
                              </div>
                          )
                      })}
                  </div>}
              </div>
          )

    }

    return (
        <div className={'control_panel_container'}>
            <div className={'sortControls'}>
                <DropDownList
                    list={sortOptions}
                    onClickOption={onSort}
                    isVisible={isVisibleSort}
                    setIsVisible={setIsVisibleSort}
                    activeOption={activeOption}
                    setActiveOption={setActiveOption}
                />
                <div className={'resetSort'} onClick={()=> resetFilters()}>Сбросить</div>
            </div>
            <span>Фильтр по </span>
            <DropDownList
                list={columns}
                onClickOption={() => console.log('column')}
                setIsVisible={setIsVisibleFilterColumn}
                isVisible={isVisibleFilterColumn}
                activeOption={activeColumnFilter}
                setActiveOption={setActiveColumnFilter}
            />
        </div>
    );
}

export default ControlPanel;