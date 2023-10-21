import { genSalt, hash as _hash } from 'bcrypt';
import User, { findOne } from '../models/User';

export function register(req, res, next) {
    let { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
        return res.status(500).json({
            errors: [
                {
                    error: "Email and password are required"
                }
            ]
        });
    }

    //Check if the user already exists
    findOne({ email: email }).then(user => {
        if (user) {
            return res.status(422).json(
                {
                    errors: [
                        {
                            error: "User with this email already exists"
                        }
                    ]
                }   
            )
        }
        else {
            let user = new User({
                email: email,
                password: password
            })
            //Using bycrypt to encrypt passwords
            genSalt(10, function (err, salt) {
                _hash(password, salt, function (err, hash) {
                    if (err)
                        throw err;
                    user.password = hash;
                    user.save().then(response => {
                        res.status(200).json({
                            success: true,
                            result: response
                        })
                    }).catch(err => {
                        res.status(500).json({
                            errors: [{ error: err }]
                        })
                    }
                    );
                })
            });
        }
    }).catch(err => {
        res.status(500).json({
            errors: [{ error: 'Something went wrong' }]
        })
    })
}