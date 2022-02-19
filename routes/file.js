const express= require('express');
const router= express.Router();
const fileController= require('../controllers/file_controller');

router.post('/upload',fileController.upload);
router.get('/:id/delete',fileController.delete);
router.get('/:id',fileController.display);


module.exports= router;