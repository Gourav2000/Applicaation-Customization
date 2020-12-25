const fs=require('fs')

class Product{
    constructor({name= "",price = "", size= "", description = "", image_b64= "", category=""}){
        this.name = name;
        this.price = price;
        this.size = size;
        this.description = description;
        this.image_b64=image_b64;
        this.category = category;
    }
    display(){
        console.log(
        'name:'+this.name +
        '\nprice:'+this.price +
        '\nsize:'+this.size +
        '\ndescription:'+this.description +
        '\nimage_b64:'+this.image_b64 +
        '\ncategory:'+this.category);
    }
}
module.exports=Product