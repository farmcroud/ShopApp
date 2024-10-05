const { Router } = require("express");
const {userModel} = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "sdf;lksdf;k"

function generateUniqueID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueID = '';
    
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueID += characters[randomIndex];
    }
    return uniqueID;
}


const userRouter = Router();

userRouter.post("/registration", async(req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const shopName = req.body.shopName;
    const adhar = req.body.adhar;
    const panCard = req.body.panCard;
    const voterId = req.body.voterId;
    const mobile = req.body.mobile;
    const prabhagNumber = req.body.prabhagNumber;
    const wardNumber = req.body.wardNumber;
    const googleMapsLink = req.body.googleMapsLink;

    try{
        const user = await userModel.findOne({ email });
        if(!user){
            let uniqueId = generateUniqueID();
            await userModel.create({
                email, password, firstName, lastName, shopName, adhar, panCard, voterId, mobile, prabhagNumber, wardNumber, googleMapsLink, uniqueId
            })
            res.json({
                message: "Data saved successfully!"
            })
        }
        else{
            res.json({
                message: "User Already exist!",
            })
        }
    }
    catch{
        res.json({
            message: "Something went wrong!"
        })
    }


});

// userRouter.post("/signup", async function(req, res) {

//     const { email, password, firstName, lastName} = req.body;

//     await userModel.create({
//         email,
//         password,
//         firstName, 
//         lastName
//     });

//     res.json({
//         message: "signedup Successfully!"
//     })
// })

userRouter.post("/signin", async function(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({
        email,
        password
    });
    if(user){
        const token = jwt.sign({email}, JWT_SECRET);
        res.json({
            message: "Signed in Successfully!",
            token: token,
            id: user.uniqueId,
            firstName: user.firstName,
            lastName: user.lastName
        });
    }
    else{
        res.status(403).json({message: "Incorrect Credentials!"});
    }
})

userRouter.get("/purchases", function(req, res) {
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}