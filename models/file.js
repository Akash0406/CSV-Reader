const mongoose= require('mongoose');
const multer= require('multer');
const path= require('path');
const FILE_PATH= path.join('/uploads');
// file schema
const fileSchema= mongoose.Schema({
    file_path: {
        type: String,
        required: true
    },
    original_name: {
        type: String,
        required: true
    }
});
// storing file in folder
let storage= multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,path.join(__dirname,'..',FILE_PATH));
    },
    filename: function(req, file, cb){
        cb(null,file.fieldname+'-'+Date.now()+'.csv');
    }
});
fileSchema.statics.uploadedFile = multer({ storage: storage }).single('file');
fileSchema.statics.filePath= FILE_PATH;
const File= mongoose.model('File',fileSchema);

module.exports= File;