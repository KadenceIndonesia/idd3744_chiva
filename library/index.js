const axios = require("axios")
const Task = require("../models/task")
const fs = require("fs");
const path = require("path");
const xslx = require("xlsx");

global.excelData = function (pid) {
    return new Promise((resolve) => {
      var directoryPath = path.join(process.env.DIRNAME + pid);
      fs.readdir(directoryPath, function (err, files) {
        var dataxls = [];
        var data = [];
        for (var f = 0; f < files.length; f++) {
            var splitFilename = files[f].split("_");
          var workbook = xslx.readFile(directoryPath + "/" + files[f]);
          var sheetname_list = workbook.SheetNames;
          sheetname_list.forEach(async function (y) {
            var worksheet = workbook.Sheets[y];
            var headers = {};
            for (z in worksheet) {
              if (z[0] === "|") continue;
              var tt = 0;
              for (let i = 0; i < z.length; i++) {
                if (!isNaN(z[i])) {
                  tt = i;
                  break;
                }
              }
              var col = z.substring(0, tt);
              var row = parseInt(z.substring(tt));
              var value = worksheet[z].v;
              if (row == 1 && value) {
                headers[col] = value;
                continue;
              }
              if (!data[row]) data[row] = {};
              data[row][headers[col]] = value;
            }
            data.shift();
            data.shift();
            for (var d = 0; d < data.length; d++) {
              dataxls.push({
                  skenario: `${splitFilename[2]} ${splitFilename[3]}`,
                  data: data[d]
              });
            }
          });
        }
        resolve(dataxls);
      });
    });
  };

global.getData = function(pid, qidx){
    return new Promise(resolve => {
        axios.get(process.env.APIURL+"/api/"+pid+"/data/"+qidx)
        .then((response) => {
            resolve(response.data)
        })
        .catch(error => {
            resolve(error)
        })
    })
}

global.getKepoEvd = function(touchpointCode){
    return new Promise(resolve => {
        Task.find({}).exec()
        .then(response => {
            var dt = []
            for (let i = 0; i < response.length; i++) {
                var getCode = response[i].code
                var tostr = ''+getCode
                var getTouchPoint = tostr.substr(0, 2)
                var touchPoint = parseInt(getTouchPoint)
                if(touchPoint == touchpointCode){
                    dt.push(response[i])
                }
            }
            resolve(dt)
        })
        .catch(error => {
            resolve(error)
        })
    })
}

global.getAllEvd = function(){
    return new Promise(resolve => {
        Task.find({}).exec()
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            resolve(error)
        })
    })
}

global.getEvdById = function(id){
    return new Promise(resolve => {
        Task.find({id: id}).exec()
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            resolve(error)
        })
    })
}

global.evdByProject = function(pid){
    return new Promise(resolve => {
        Task.find({project: pid}).exec()
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            resolve(error)
        })
    })
}

global.getAuth = function(pid, email, pass){
    return new Promise(resolve => {
        axios.post(process.env.APIURL+'/auth/login',{
            pid: pid,
            email: email,
            password: pass
        })
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            resolve(error)
        })
    })
}

global.topbreak = function(pid, qidx){
    return new Promise(resolve => {
        axios.get(`${process.env.APIURL}/api/${pid}/topbreak/${qidx}`)
        .then((response) => {
            resolve(response.data)
        })
        .catch(error => {
            resolve(error)
        })
    })
}

global.dataQidx = function(pid, qidx){
    return new Promise(resolve => {
        axios.get(`${process.env.APIURL}/api/${pid}/data/${qidx}`)
        .then((response) => {
            resolve(response.data)
        })
        .catch(error => {
            resolve(error)
        })
    })
}

global.findObj = function(array, attr, value){
    return new Promise(resolve => {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                resolve(i);
            }
        }
        resolve(-1);
    })
}