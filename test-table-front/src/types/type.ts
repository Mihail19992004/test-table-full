export interface TableDataProps {
    date: string,
    quantity: string,
    name: string,
    distance: string
    __v?: any
    _id?: any
}
export interface tableBlockProps {
    tableData: TableDataProps
    setTableData: any
    tableList: TableDataProps[]
    setTableList: any
}