const Router = require('express')
const router = new Router()
const tableController = require('../controller/table.controller')

router.post('/table', tableController.createTable)

router.get('/table/:page', tableController.getTables)
router.delete('/table/:name', tableController.deleteTable)
router.post('/table/filter', tableController.filterTable)
router.post('/table/sort', tableController.sortedTable)
module.exports = router