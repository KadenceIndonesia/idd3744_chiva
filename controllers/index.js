const path = require("path")
const session = require("express-session")
const pid = process.env.PID
const axios = require("axios")
require("../library")


exports.getIndex = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        var data = await excelData(pid)
        if(req.query.break==undefined){
            var result = [
                {label: "Mystery Shopping", y: 0, percent: 0, color: "#069E2D"},
                {label: "Mistery Caller", y: 0, percent: 0, color: "#058E3F"},
                {label: "Retail Audit", y: 0, percent: 0, color: "#04773B"},
            ]
            for (let i = 0; i < data.length; i++) {
                for (let x = 0; x < result.length; x++) {
                    if(data[i].skenario == result[x].label){
                        result[x].y = result[x].y+1
                    }
                }
            }
        }else{
            var topBreak = req.query.break
            var result = []
            var resultKota = await topbreak(pid, "Kota");
            for (let i = 0; i < data.length; i++) {
                if(data[i].skenario == topBreak){
                    for (let x = 0; x < resultKota[0].attribute.length; x++) {
                        if(data[i].data.Kota == resultKota[0].attribute[x].code){
                            var findArr = await findObj(result, "code", resultKota[0].attribute[x].code)
                            console.log(findArr)
                            if(findArr==-1){
                                result.push({
                                    code: resultKota[0].attribute[x].code,
                                    label: resultKota[0].attribute[x].label,
                                    y: 1,
                                    percent: 0
                                })
                            }else{
                                result[findArr].y = result[findArr].y+1
                            }
                        }
                    }
                }
            }
        }
        res.render("index",{
            login: login,
            result: result,
            topbreak: req.query.break
        })
    }else{
        res.redirect("./login")
    }
}

exports.getLogin = (req,res)=>{
    res.send("login")
}