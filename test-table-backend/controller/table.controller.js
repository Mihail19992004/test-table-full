
const db = require('../db')

class TableController {
    async createTable (req,res) {
        const {name, date, quantity, distance} = req.body
        const newTable = await db.query(`INSERT INTO data_table (name, date, quantity, distance) values ($1, $2, $3, $4) RETURNING *`, [name, date, +quantity, +distance])
    }
    async getTables(req, res) {
        const {page} = req.params
        const length = await db.query(`SELECT * From data_table`)
        const tables = await db.query(`SELECT * From data_table OFFSET ${(page-1) * 10} FETCH FIRST 10 ROW ONLY`)
        //
        await res.json({table: tables.rows, total: Math.ceil(length.rows.length / 10)})
    }

    async deleteTable(req, res) {
            const {name} = req.params
        const table = await db.query(`DELETE FROM data_table where name = $1`, [name])
        await res.json(table.rows[0])
    }
    async filterTable(req, res) {
        let {nameColumn, condition,value=''} = req.body
        if (condition === 'LIKE') {
            value = '\'' + `%${value}%` + '\''
        }
        if (nameColumn === 'name') {
            if (condition !== 'LIKE') {
                value = '\'' + value + '\''
            }
            const filteredTable = await db.query(`SELECT * From data_table WHERE ${nameColumn} ${condition} ${value}`)
            return  res.json({filteredTable: filteredTable.rows})
        } else if (nameColumn !== 'name') {
            if (condition === "LIKE") {
                const query1 = `SELECT * From data_table WHERE CAST (${nameColumn} AS varchar(10)) ${condition} ${value}`
                const filteredTable = await db.query(query1)
                return  res.json({filteredTable: filteredTable.rows})
            } else if (condition !== "LIKE") {
                const filteredTable = await db.query(`SELECT * From data_table WHERE ${nameColumn} ${condition} ${value}`)
                return  res.json({filteredTable: filteredTable.rows})
            }
        }
    }
    async sortedTable(req,res) {
        const type = req.body
        const tables = await db.query(`SELECT * From data_table ORDER BY ${type.string} ASC`)
        await res.json({table:tables.rows})
    }

}
module.exports = new TableController()