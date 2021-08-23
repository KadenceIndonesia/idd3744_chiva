const path = require("path")
const session = require("express-session")
const pid = process.env.PID
const axios = require("axios")
const moment = require("moment")
require("../library")

exports.getMsEvd = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        const evidence = await evdByProject("16");
        var result = []
        // for (let i = 0; i < evidence.length; i++) {
        //     if(evidence[i].filename!="NULL"){
        //         result.push({
        //             id: evidence[i].id,
        //             tomo: evidence[i].task.split("_")[1],
        //             area: evidence[i].task.split(" - ")[1],
        //             date: moment(evidence[i].uploadtime).format("DD/MM/YYYY")
        //         })
        //     }
        // }
        res.render("kepo/ms.ejs", {
            login: login,
            data: result
        })
    }else{
        res.redirect("../../login")
    }
}
exports.getMsDetail = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        const idkepo = req.params.id
        const detailEvd = await getEvdById(idkepo)
        console.log(detailEvd)
        res.render("kepo/detail", {
            login: login,
            task: detailEvd
        });
    }else{
        res.redirect("../../../login")
    }
}

exports.getCaller = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        const evidence = await evdByProject("16");
        var result = []
        // for (let i = 0; i < evidence.length; i++) {
        //     if(evidence[i].filename!="NULL"){
        //         result.push({
        //             id: evidence[i].id,
        //             tomo: evidence[i].task.split("_")[1],
        //             area: evidence[i].task.split(" - ")[1],
        //             date: moment(evidence[i].uploadtime).format("DD/MM/YYYY")
        //         })
        //     }
        // }
        res.render("kepo/caller.ejs", {
            login: login,
            data: result
        })
    }else{
        res.redirect("../../login")
    }
}
exports.getCallerDetail = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        const idkepo = req.params.id
        const detailEvd = await getEvdById(idkepo)
        console.log(detailEvd)
        res.render("kepo/detail", {
            login: login,
            task: detailEvd
        });
    }else{
        res.redirect("../../../login")
    }
}


exports.getRetail = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        const evidence = await evdByProject("16");
        var result = []
        for (let i = 0; i < evidence.length; i++) {
            if(evidence[i].filename!="NULL"){
                result.push({
                    id: evidence[i].id,
                    tomo: evidence[i].task.split("_")[1],
                    area: evidence[i].task.split(" - ")[1],
                    date: moment(evidence[i].uploadtime).format("DD/MM/YYYY")
                })
            }
        }

        res.render("kepo/retail.ejs", {
            login: login,
            data: result
        })
    }else{
        res.redirect("../../login")
    }
}

exports.getRetailDetail = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        const idkepo = req.params.id
        const detailEvd = await getEvdById(idkepo)
        console.log(detailEvd)
        res.render("kepo/detail", {
            login: login,
            task: detailEvd
        });
    }else{
        res.redirect("../../../login")
    }
}