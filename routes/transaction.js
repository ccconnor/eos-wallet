const router = require('koa-router')()
const transactionController = require("../controllers/transaction")

router.prefix('/transaction')
router.post("/transfer", transactionController.transfer)
router.post("/pushActions", transactionController.pushActions)

module.exports = router
