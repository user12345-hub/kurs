const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'minimum password length 1 character')
            .isLength({min: 3})
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data'
            })
        }

        const {name, email, password} = req.body

        const candidate = await User.findOne({email})

        if (candidate) {
            return res.status(400).json({message: 'This user alredy exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        console.log(hashedPassword)

        const user = new User({ name, email, password: hashedPassword})
        await user.save()

        const token = jwt.sign(
            {userId: user.id},
            'jwtSecret',
            {expiresIn: '1h'}
        )

        await res.json({token, userId: user.id})

    } catch (e){
        res.status(500).json({message: 'Something went wrong, try again...'})
    }
})


router.post(
    '/login',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid login data'
            })
        }

        const {email, password} = req.body

        console.log(email)

        const user = await User.findOne({email})

        if (!user){
            return res.status(400).json({message: 'User not found'})
        }

        // bcrypt
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message: 'Incorrect password, try again'})
        }

        const token = jwt.sign(
            {userId: user.id},
            'jwtSecret',
            {expiresIn: '1h'}
        )

        await res.json({token, userId: user.id})

    } catch (e){
        await res.status(500).json({message: 'Something went wrong, try again...'})
    }
})


module.exports = router