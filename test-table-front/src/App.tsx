import React, {useState} from 'react';
import TableBlock from "./components/tableBlock";
import AddRow from "./components/addRow";
import {TableDataProps} from "./types/type";

function App() {
    const [tableData, setTableData] = useState({
        date: '',
        quantity: '',
        name: '',
        distance: ''
    })
    const [tableList, setTableList] = useState<TableDataProps[]>([])

    return (
    <div className="App">
        <AddRow setTableList={setTableList} tableList={tableList} tableData={tableData} setTableData={setTableData} />
      <TableBlock tableData={tableData} setTableList={setTableList} tableList={tableList} setTableData={setTableData}/>

    </div>
  );
}

export default App;
