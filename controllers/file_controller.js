const File= require('../models/file');
const fs= require('fs');
const csv= require('csv-parser');
const path= require('path');

//upload function for storing path of csv file in database  
module.exports.upload= function(req,res){
    try{
        File.uploadedFile(req,res,function(err){
            if(err)
            console.log("multer error!!!!");
            if(req.file){
                File.create({
                    file_path:req.file.path,
                    original_name: req.file.originalname
                },function(err){
                    if(err){
                        console.log("Error in uploading file");
                        return res.redirect('back');
                    }else{
                        return res.redirect('back');
                    }
                });
            }
        });
    }
    catch{
        console.log("Error while displaying files");
        return res.redirect('back');
    }
}
// function for deleting uploaded files
module.exports.delete= async function(req,res){
    try{
        let file= await File.findByIdAndDelete(req.params.id);
        if(file){
            fs.unlinkSync(file.file_path,function(err){
                if(err){
                    console.log("error occurred in unlinking");
                    return res.redirect('back');
                }else{
                    console.log("Successfully deleted");
                }
            });
            return res.redirect('back');
        }
    }
    catch{
        console.log("error while deleting file");
        return res.redirect('back');
    }
}
// function to display list of uploaded files
module.exports.display= async function(req,res){
    try{
        
        let file= await File.findById(req.params.id);
        console.log(file);
        const header= [];
        const rows= [];
        fs.createReadStream(file.file_path)
        .pipe(csv())
        .on('headers',(headers)=>{
            headers.map((head)=>{
                console.log(head);
                header.push(head);
            });
        })
        .on('data',(data)=>rows.push(data))
        .on('end',()=>{
            console.log(header);
            console.log(rows);
            return res.render('file',{
                headers:header,
                datas: rows
            });
        });
    }
    catch{
        console.log("Error while fetching file");
        return res.redirect('back');

    }
}