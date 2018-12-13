const router = require('koa-router')()
const transactionController = require("../controllers/transaction")

router.prefix('/transaction')
router.post("/send", transactionController.transactionSend)

module.exports = router
