const  mongoose = require("mongoose")

const olxSchema = mongoose.Schema(
    
	{
		name: String,
		description : String,
		category: String,
		image : String,
		location : String,
		postedAt : Date,
		price : Number
		
	}
)


const olxModel= mongoose.model("olxdata",olxSchema)

module.exports={
   olxModel
}