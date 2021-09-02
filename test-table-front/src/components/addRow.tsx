import React, {FC} from 'react';
import {tableBlockProps} from "../types/type";
import axios from "axios";
import AddIcon from '@material-ui/icons/Add';
const AddRow:FC<tableBlockProps> = ({setTableData,tableData,setTableList,tableList}) => {
    const fetchAddUser = async () => {
        const resposne = await axios.post('http://localhost:5000/api/table', {...tableData},
            {
                headers: {
                    'Content-Type' : 'application/json'
                }

            })
    }
    const inputHandler = (e:React.ChangeEvent<HTMLInputElement>) => {

            setTableData({...tableData, [e.target.name]: e.target.value})



    }
    const addHandler = () => {
        setTableList([...tableList, tableData])
        fetchAddUser()
        setTableData({
            date: '',
            quantity: '',
            name: '',
            distance: ''
        })
    }
    // @ts-ignore
    return (
        <>
            <h2>Добавить таблицу</h2>
            <div className='input-block'>

                <input type="text" value={tableData.name} name='name' placeholder="Введите название" onChange={inputHandler}/>
                <input type="date"  value={tableData.date} name='date' placeholder='Введите дату' onChange={inputHandler}/>
                <input type="number" value={tableData.distance} name='distance' placeholder='Введите растояние' onChange={inputHandler}/>
                <input type="number" value={tableData.quantity} name='quantity' placeholder='Введите количество' onChange={inputHandler}/>
                <div className='btn' onClick={addHandler}><AddIcon/></div>
            </div>
            </>

    );
};

export default AddRow;