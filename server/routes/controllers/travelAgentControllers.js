const { TravelAgentsModel, validateTravelAgent } = require("../../model/travelAgentsModel");


exports.getAllTravelAgent = async (req,res)=>{
    const data = await TravelAgentsModel.find({})
    res.json(data)
}

exports.addTravelAgent = async (req,res) =>{
    try{
        const validBody = validateTravelAgent(req.body)
        if(validBody.error){
            return res.status(400).json({ err: validBody.error.details });
        }
        const TravelAgent = new TravelAgentsModel(req.body)
        await TravelAgent.save()
        res.status(201).json(TravelAgent)
    }
    catch(err){
        console.log(err);
        res.status(502).json({err})
    }
}


exports.deleteTravelAgent = async (req, res) => {
    try {
      const { id } = req.params;
    //   if (id == req.tokenData._id) {
    //     return res.status(401).json({ err: "you cant delete your self" });
    //   }
      const data = await TravelAgentsModel.deleteOne({_id: id,});
      res.json(data);
    } catch (err) {
      console.log(err);
      res.status(502).json({ err });
    }
  };
  