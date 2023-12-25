const mongoose = require('mongoose');

const Courseschema = new mongoose.Schema({
    title : {
        type : String,
        trim : true,
        required : [true,'Please add a course title']

    },
    description : {
        type : String,
        required : [true ,'Please add a description']
    },
    weeks : {
        type : String,
        required : [true , 'Please enter weeks for the Course']
    },
    tuition : {
        type : Number,
        required : [true , 'Please enter tution fee for the Course']
    },
    minimumSkill : {
        type : String,
        required : [true , 'Please add a minimum Skill'],
        enum : ['beginner','intermediate','advanced']
    },
    scholarshipavailable : {
        type: Boolean,
        default : false,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    },
    bootcamp  :{
        type : mongoose.Schema.ObjectId, //this is going to refer to the object id of Bootcamp
        ref : 'Bootcamp', //this is going to tell about the model we are reffering to 
        required : true,
    }


});


//calculating the average cost of the bootcamp
//defining a static function here
Courseschema.statics.getAverageCost = async function(bootcampId){
    console.log('Entering calculating average cost');
    const obj = await this.aggregate([
        {
            $match : {bootcamp : bootcampId}
        },
        {
            $group : {
                _id : '$bootcamp',
                averageCost : { $avg : '$tuition'},
            }
        }
    ])

    console.log(obj);

    //now since we got the aggregate , we have to persist it in data for Bootcamps
    try {
        await this.model('Bootcamp').findByIdAndUpdate(bootcampId , {
            averageCost : Math.ceil(obj[0].averageCost/10)*10,
        });
    } catch (error) {
        console.log(error);
    }
}

//calculating average cost before saving of courses in DB
Courseschema.post('save', function (){
    console.log('entering after save');
    this.constructor.getAverageCost(this.bootcamp);
});

//calculating average cost before removing of any course
Courseschema.pre('remove', function (){
    console.log('entering before remove');
    this.constructor.getAverageCost(this.bootcamp);
})



module.exports = mongoose.model ('Course',Courseschema)