import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
    name: String,
    path: String,
    keywords: {
        type: [String],
        default: []
    }
}, { _id: false })

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    assistantName: {
        type: String,
        default:'Sana'
    },
    businessName: {
        type: String,
        default:""
    },
    businessType:{
        type:String,
        default:""
    },
    businessDescription:{
        type:String,
        default:""
    },
    tone:{
        type:String,
        enum:["friendly","proffetional","sales"],
        default:"friendly"
    },
    theme:{
        type:String,
        enum:["light","dark","glass","neon"],
        default:"dark"
    },
    enableVoice:{
        type:Boolean,
        default:true
    },
    pages:{
        type:[pageSchema],
        default:[]
    },
    enableNavigation:{
        type:Boolean,
        default:true
    },
    geminiApiKey:{
        type:String,
        default:""
    },
    geminiStatus:{
        type:String,
        enum:['active','quota_exceeded','invalid'],
        default:'active'
    },
    totalMessages:{
        type:Number,
        default:0
    },
    plan:{
        type:String,
        enum:["free","pro"],
        default:'free'
    },
    requestLimit:{
        type:Number,
        default:200
    },
    proExpireAt:{
        type:Date,
        default:null
    },
    isSetupComplate:{
        type:Boolean,
        default:false
    }
    
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)