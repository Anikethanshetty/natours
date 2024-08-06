const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkID = (req,res,next,val)=>{
    console.log(`tour id is ${val}`);

    const ID = req.params.id*1;
    if(ID>tours.length-1){
        return res.status(404).json({
            status : "failed",
            message : "Invalid id"
        })
    }
    next();
}

exports.checkBody = (req,res,next)=>{
    if(!req.body.name || !req.body.price){
        return res.status(200).json({status :"fail",message:"Missing name or price"});
    }
    next();
}


exports.gettingInfo = (req,res)=>{
    res
    .status(200)
    .json({
     status : "sucess",
     length : tours.length,
     data : {tours}
     
    });
};

exports.gettingInfoId = (req,res)=>{
    
    const id  = req.params.id * 1; // to convert any string to a integer type we multiply bu 1 in js
    const tour  = tours.find(el => el.id === id);
    
    res
    .status(200)
    .json({
     status : "sucess",
     date : req.reqTime,
     data : {
         tour
     }
    });
   
};

exports.addingNewInfo = (req,res)=>{
    
    const newID = tours[tours.length -1].id + 1; // tours.length -1 gives the last elemne of the array tours. .id gives acess to the key id inside that element if it has a object.
    const newTour = Object.assign({id:newID},req.body);// object.assign is used combine 2 object inside a single object.
    tours.push(newTour);

    //syntax of writeFile fs.writeFile(filename/path,data which should be written,callbackfunction)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res
        .status(201)
        .json({
            status : "Sucess",
            data:{
                tour : newTour
            }
        });
    });
};

exports.updatingInfo =(req,res)=>{
  
const findTour = tours.find(el=> el.id === ID);
const indexTour = tours.indexOf(findTour);
const updateTour = Object.assign(findTour,req.body);

tours[indexTour]=updateTour;

fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
    res
    .status(200)
    .json({
       status : "sucess",
       data : {
           tour : updateTour
       }
    })
})
};

exports.deltingInfo =(req,res)=>{
  
const findTour = tours.find(el=> el.id === ID);
const indexTour = tours.indexOf(findTour);
tours.splice(indexTour,1);

fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
    res
    .status(204)
    .json({
       status : "sucess",
       data : null
    })
})

};
