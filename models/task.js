const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: String,
    project: String,
    task: String,
    deskripsi: String,
    code: String,
    state: String,
    open: String,
    tmpusername: String,
    filename: Array,
    src: String,
    grp: String,
    uploadtime: String,
    type: String,
    subtype: String
})

module.exports = mongoose.model('Task', taskSchema);