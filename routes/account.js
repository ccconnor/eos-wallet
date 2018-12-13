const router = require('koa-router')()
const accountController = require("../controllers/account")

router.prefix('/account')
router.post("/listforwallet", accountController.accountList)
router.post("/create", accountController.createAccount)
router.post("/balance", accountController.accountBalance)
router.post("/info", accountController.accountInfo)

module.exports = router
