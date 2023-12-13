const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const slugify = require('slugify');
const {Geocoder} = require('../utils/common');

const Bootcampschema = new mongoose.Schema({
    name : {
        type : String,
        required : [true ,'Please add a name'],
        unique : true,
        trim : true , 
        maxlength : [50,'Name can not be more than 50 characters']
    },
    slug : String,
    description : {
        type : String,
        required : [true , 'Please add a description'],
        maxlength : [500 , 'Description cannot be more than 500 characters']
    },
    website : {
        type : String ,
        match : [ 
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
               ,'Please enter a valid url with HTTP or HTTPS'
            ]
    },
    email : {
        type : String,
        match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ,'Please enter a valid email']
    },
    address : {
        type : String,
        required : [true ,'Please add a address']
    },
    location : {
        //Geo JSON Input 

        type : {
            type : String,
            enum : ['Point'],
        },
        coordinates : {
            type : [Number],
            index : '2dSphere'
        },
        formattedAddress : String,
        street : String,
        city : String,
        zipcode : String,
        country : String,
    },
    careers : {
        type : [String],
        required : true,
        enum : [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'
        ]
    },
    averageRating : {
        type : Number,
        min : [1, 'Rating must be atleast 1 '],
        max : [10 ,'Rating can be max 10'],
    },
    averageCost : {
        type : Number
    },
    photo : {
        type : String,
        default : 'no-photo.jpg',
    },
    housing  : {
        type: Boolean,
        default : false,
    },
    jobAssistance : {
        type : Boolean,
        default : false,
    },
    jobGuarantee : {
        type : Boolean,
        default : false,
    },
    createdAt : {
        type : Date,
        required : true,
        default : Date.now(),
    }

})

//Adding code to update the Slug before db insert.
Bootcampschema.pre('save',function(next){
    this.slug = slugify(this.name , {lower : true});
    next();
})

//Geocode and create location feild
Bootcampschema.pre('save',async function(next){
    console.log('geocoder',Geocoder);
    const loc = await Geocoder.geocode(this.address);
    this.location = {
        type : 'Point',
        coordinates : [loc[0].longitude,loc[0].latitude],
        formattedAddress : loc[0].formattedAddress,
        sreet : loc[0].street,
        city : loc[0].city,
        state : loc[0].state,
        zipcode : loc[0].zipcode,
        country : loc[0].countryCode,
    }

    //since we now don't want to save the address of bootcamp
    //just as per tutes , no suggestions

    this.address = undefined;
    next();
})

module.exports = mongoose.model('Bootcamp', Bootcampschema);
