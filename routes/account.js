const router = require('koa-router')()
const accountController = require("../controllers/account")

router.prefix('/account')
router.post("/list", accountController.accountList)
router.post("/create", accountController.createAccount)
router.post("/balance", accountController.accountBalance)
router.post("/info", accountController.accountInfo)
router.post("/switch", accountController.switchAccount)

module.exports = router
