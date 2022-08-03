module.exports=app=>{
    const users=require('../controllers/user.controller')
    var router=require('express').Router();
    router.get("/",users.findAll);
    router.get("/:id", users.findOne);
    router.post("/",users.create);
    router.get("/:id", users.findOne);
    router.put("/:id", users.update);
    router.delete("/:id", users.delete);
    router.delete("/", users.deleteAll);
    app.use("/users",router);
}