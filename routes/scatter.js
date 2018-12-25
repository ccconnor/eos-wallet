const router = require('koa-router')()
const scatterController = require("../controllers/scatter")

router.prefix('/scatter')
router.post("/transfer", scatterController.transfer)
router.post("/transaction", scatterController.transaction)
router.get("/identity", scatterController.getIdentity)
router.post("/identity", scatterController.forgetIdentity)

module.exports = router
