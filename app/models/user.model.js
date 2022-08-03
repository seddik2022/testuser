module.exports = mongoose =>{
    const schema = mongoose.Schema(
        {
        name:String,
        email:String,
        age:Number
    },
    { timestamps: true }
    );
    schema.method("toJSON",function()
{
    const {__v,_id , ...object}=this.toObject();
    object.id=_id;
    return object;
    // detruire les objets aprés leur création
});
const User=mongoose.model("user",schema);
return User;
}