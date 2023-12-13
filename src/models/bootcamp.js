const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const slugify = require('slugify');

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
            required : false,
        },
        coordinates : {
            type : Number,
            required : false,
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

module.exports = mongoose.model('Bootcamp', Bootcampschema);
