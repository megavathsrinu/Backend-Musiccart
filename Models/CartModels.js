const mongoose = require("mongoose");

const databaseSchema =  new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        default:1,
    },
    price:{
        type:Number,
        required:true,
    },
    rating:{
        type:String,
        required:true,
    },
    ratingInfo:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    color:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    features:[{type:String}],
    available:{
        type:String,
        required:true,
    },
    images:[{type:String}],
    featured:{
        type:Boolean,
        required:true,
    }, 
});

module.exports = mongoose.model("Items",databaseSchema);