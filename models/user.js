const  mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
   
    phone:{
        type:String,
        required:true,
        unique:true
    
},
password:{
    //encrypring password
    type:String,
    required:true
},
profilePic:{
    type:String,
    default:""
},

},
{ timestamps: true})


// userSchema,virtual("password")
// .set(function () {
//     _password = password
//     salt = uuid()
//     encry_passwrod = this.securePassword(password)
// })
// .get( function() {

// })

// userSchema.methods = {
//     authenticate:function (plainpsw){
//         return this.securePassword(plainpsw) === this.encry_password
//     },

//     securePassword: function(plainpasswrod){
//         if(!plainpasswrod) return "";

//         try{
//             return crypto.createHmac("sha256", this.salt).upadate(plainpassword).digest('hex')
//         }
    
//     catch(err){
//         console.log(err)
//         return ""
//     }
// }
// }
const User = mongoose.model('User', userSchema)
module.exports = User;