import React, {
    createRef,
    FC,
    useEffect,
    useState
} from 'react';
import {tableBlockProps} from "../types/type";
import axios from "axios";

const TableBlock:FC<tableBlockProps> = ({tableList,setTableList}) => {

    const [option,setOption] = useState({
        nameColumn: 'name',
        condition: '=',
        value: ''
    })
    const [total, setTotal] = useState(1)
    const [activeIndex, setActiveIndex] = useState(1)
    const inputRef = createRef<any>()
    const fetchTable = async (page: number = 1) => {
    const response = await axios.get(`http://localhost:5000/api/table/${page}`)
    setTableList([ ...response.data.table])
        setTotal(response.data.total)
}
    const fetchRemoveTable = async (name: any)=> {
        const response = await axios.delete(`http://localhost:5000/api/table/${name}`)
    }
const removeHandler = (value: any) => {
        setTableList(tableList.filter(e=> e.name !== value))
        fetchRemoveTable(value)
}
const fetchFilter = async ()=> {
        const response = await axios.post('http://localhost:5000/api/table/filter', {...option, value: inputRef.current.value}, {},)
        setTableList([ ...response.data.filteredTable])
}
    const fetchSort = async (string: string)=> {
        const response = await axios.post('http://localhost:5000/api/table/sort', {string}, {},)
        setTableList([ ...response.data.table])
    }


useEffect(()=> {
    fetchTable(activeIndex)
}, [activeIndex])
    
const filterHandler = () => {
    if (!inputRef.current!.value.length) {
      return   fetchTable()
    }
    if (option.nameColumn && option.condition && inputRef.current!.value.length > 0) {
        fetchFilter()
    }
}
    return (
        <>
            <div className="filters-block">
                <h2>Фильтры</h2>
                <form action="" onChange={filterHandler}>
                    <select onChange={(e)=> setOption({...option, nameColumn: e.target.value})} name="" id="">
                        <option value='name'>Название</option>
                        <option value='date'>Дата</option>
                        <option value='distance'>Расстояние</option>
                        <option value='quantity'>Количество</option>
                    </select>
                    <select onChange={(e)=> setOption({...option, condition: e.target.value})} name="" id="">
                        <option value='='>Равно</option>
                        <option value='LIKE'>Содержит</option>
                        <option value='>' disabled={option.nameColumn === 'name'}>Больше</option>
                        <option value='<' disabled={option.nameColumn === 'name'}>Меньше</option>
                    </select>
                    <input type="text" ref={inputRef} value={option.value} onChange={(e)=> setOption({...option, value: e.target.value})}/>
                </form>


            </div>
            <div>

                <table>
                    <tr>
                        <th onClick={()=> fetchSort('name')}>Название</th>
                        <th>Дата</th>
                        <th onClick={()=> fetchSort('distance')}>Расстояние</th>
                        <th onClick={()=> fetchSort('quantity')}>Количество</th>
                    </tr>
                    {tableList && tableList.map((e)=> <tr onClick={()=> removeHandler(e.name)}><td>{e.name}</td><td>{e.date}</td>
                            <td>{e.distance}</td><td>{e.quantity}</td></tr>)}
                </table>
            </div>
            <div className="pagination">
                {
                    Array.from(Array(total)).map((e,i)=> <div className='btn' style={{background: activeIndex=== i+1 ? 'black' : 'gray'}} onClick={()=>(setActiveIndex(i+1))}>{i+1}</div>)
                }
            </div>
        </>

    );
};

export default TableBlock;