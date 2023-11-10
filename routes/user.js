const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { hashPassword, isValidPassword} = require('../utils/hash');

router.post('/signup', async (req, res) => 
{
    try 
    {
      const existingUser = await User.findOne({ email: req.body.email });
    
      if (existingUser) {
        return res.status(409).json({
          message: 'Email already exists',
        });
      }

      const hashedPassword = await hashPassword(req.body.password);
  
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
  
      const result = await user.save();
      res.status(201).json({
        message: 'User created',
        user: result,
      });
    } 
    catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  });
  
  router.post('/login', async(req, res) => 
  {
    try {
        const user = await User.findOne({ email: req.body.email });
    
        if (!user) {
          return res.status(401).json({
            message: 'Authentication Failure user',
          });
        }
    
        const passwordMatch = await isValidPassword(req.body.password, user.password);
    
        if (!passwordMatch) {
          return res.status(401).json({
            message: 'Authentication Failure pass',
          });
        }
    
        const token = jwt.sign(
          { email: user.email, userid: user._id },
          'secret',
          { expiresIn: '2 Hour' }
        );
    
        res.status(200).json({ token: token });
      } catch (err) {
        return res.status(401).json({
          message: 'Authentication Failure fail',
        });
      }
    });
module.exports = router