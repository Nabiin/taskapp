const express = require("express");
const router = new express.Router()

const taskmodel = require("../db/task");

/* require("../db/mongo");
//to parse post json
router.use(express.json()); */
router.get("/task",async (req, res) => {
    try {
   const task = await  taskmodel.find({})
   res.send(task);
      
    } catch (error) {
      res.status(500).send();
      
    }
  });
  
  router.get("/task/:id",async (req, res) => {
    try {
    const _id = req.params.id;
    const task = await taskmodel.findById(_id)
    if (!task) return res.status(404).send();
    res.send(task)
  
    } catch (error) {
      res.status(404).send();
    }
  });
  
  router.post("/task", async ({ body }, res) => {
    try {
    const mytask =await new taskmodel(body);
    await mytask.save()
    res.status(300).send(mytask)
    } catch (error) {
      res.status(400).send(error)
    }
  });
  
  


router.patch('/task/:id' , async (req, res)=>{
    const updates  = Object.keys(req.body)
    const Proname = ['completed' , 'description']
    const isValue = updates.every((update)=> Proname.includes(update))
    if(!isValue){
      return res.status(401).send({error : 'Invalid request'})    
    }
    try {
      const task = await taskmodel.findByIdAndUpdate(req.params.id , req.body , { new : true , runValidators: true})
      if(!task)  return res.status(401).send()    
     res.status(200).send(task)
    } catch (error) {
   res.status(401).send(error)    
    } 
  })
  

  
router.delete('/task/:id' , async (req,res)=>{
    try {
      const task = await taskmodel.findByIdAndDelete(req.params.id)
      if(!task) return res.status(404).send() 
      res.status(200).send(task)
  
    } catch (error) {
      res.status(500).send() 
    }
  })

  module.exports = router
  
  
  