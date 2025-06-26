import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            required : true,
            lowercase : true,
            trim : true,
            unique : true,
            index : true //searching makes easy and when you want to search this field use index : true
        },
        email : {
            type : String,
            required : true,
            lowercase : true,
            trim : true,
            unique : true,
        },
        password : {
            type : String,
            required : [true , "Password is required"],
                    
        },
        fullname : {
            type : String,
            required : true,
            trim : true,
            index : true
        },
        avatar : {
            type : String,
        },
        coverimage : {
            type : String,
        },
        refreshtoken : {
            type : String,
        },
        watchhistory : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Video"
            }
        ]   
    }
,{timestamps : true});

//Schema Middleware (Hooks)

userSchema.pre("save" , async function (next) {

    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password , 15);
    next()
});


// Instance Methods
// Functions available on a specific document (record).

// Use for:

// Checking passwords

// Generating JWT tokens

// Custom behavior for one record

userSchema.methods.isPasswordCorrect = async function (password) {
  return  await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken =  function () {
   return jwt.sign(
        {
            _id : this._id,
            username : this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.generateRefreshToken =  function () {
   return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}


// Virtual Fields
// Fields that don’t exist in DB but are computed dynamically.

// Use for:

// Full names (from first + last)

// Relationship count

// Derived info (like age from DOB)


// userSchema.virtual("fullName").get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });



export const User = mongoose.model("User" , userSchema)