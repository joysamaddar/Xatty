const express = require("express");

const router = express.Router();

router.get("/", (req,res)=>{
    res.send("Xatty API");
})

module.exports = router;