const Users = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createUser = async (req, res)=>{

    //step1: check incoming data
    console.log(req.body)

    //step2: destructure json data
    const {firstName, lastName, phone, password} = req.body

    //step3: validate the data
    if(!firstName || !lastName || !phone || !password){
        return res.json({
            success: false,
            message: "Please enter all fields!"
        })
    }

    //step4: try catch
    try {
        //step 5: check existing user
        const existingUser = await Users.findOne({phone: phone})
        if (existingUser){
            return res.json({
                success: false,
                message: "User already exists!"
            })
        }

        //password encryption
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt)

        //step 6: create new user
        const newUser = new Users({ //model name: destructured name
            firstName : firstName,
            lastName : lastName,
            phone : phone,
            password : encryptedPassword
        });

        //step 7: save the user
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Signup Successful!"
        })

    } catch (error) {
        res.status(500).json(error)
    }
}

const loginUser = async (req, res)=>{
    //step1: check incoming data
    console.log(req.body)

    //step2: destructure json data
    const {phone, password} = req.body

    //step3: validate the data
    if(!phone || !password){
        return res.json({
            success: false,
            message: "Please enter all fields!"
        })
    }

    //step4: try catch
    try {
        //step 5: check existing user
        const user = await Users.findOne({phone: phone})
        if (!user){
            return res.json({
                success: false,
                message: "Incorrect Phone Number!"
            })
        } 
        
        const result = await bcrypt.compare(password, user.password)
        if (!result) {
            return res.json({
                success: false,
                message: "Incorrect Password!"
            })
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_TOKEN_SECRET)

        res.status(200).json({
            success: true,
            token: token,
            userData: user,
            message: "Login Successful!"
        })
        

    } catch (error) {
        console.log(error)
        res.json(error)
    }
}

module.exports = {
    createUser, loginUser
}