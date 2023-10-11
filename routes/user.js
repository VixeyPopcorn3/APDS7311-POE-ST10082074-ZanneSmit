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
      const hashedPassword = await hashPassword(req.body.password);
  
      const user = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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
        const user = await User.findOne({ username: req.body.username });
    
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
          { username: user.username, userid: user._id },
          'secret',
          { expiresIn: '1 Hour' }
        );
    
        res.status(200).json({ token: token });
      } catch (err) {
        return res.status(401).json({
          message: 'Authentication Failure fail',
        });
      }
    });
module.exports = router