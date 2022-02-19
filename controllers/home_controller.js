const File= require('../models/file');
// exporting home function
module.exports.home= async function(req,res){
    try{
        let files= await File.find({});
        // rendering home
        return res.render('home',{
            files: files
        });
    }
    catch{
        console.log("Error while fetching files");
    }

}