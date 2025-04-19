const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_id : { type: Number, required: true, unique :true},
    name : { type: String, required :true},
    catgory : {type: String, rquired:true},
    price: {type : Number, required: true},
    stock: {type: Number, default:0},
    specifications : {type: Object, default : {}},
    images : {type : [String], default : [] },
    created_at : {type:Date, default: Date.now()},
    updated_at : {type :Date, default : Date.now()},
    deleted_at :{type : Date, default : null}

})

productSchema.pre("save", function(next){
    this.updated_at= new Date();
    next(); 
})


const Product = mongoose.model("Product", productSchema);
module.exports = Product;s

