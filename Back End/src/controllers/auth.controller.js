/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

// import mongoose from 'mongoose';
import bcrpyt from 'bcrypt';
import User from '../models/user.models.js';

export const login = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  const { username, password } = req.body;
  try {
    const user = User.findOne({ username });
    if (!user) {
      const response = res.status(404).json({
        status: 'fail',
        message: 'Wrong username or user not found',
      });
      return response;
    }
    const isCorrect = bcrpyt.compareSync(password, user.password);
    if (!isCorrect) {
      const response = res.status(404).json({
        status: 'fail',
        message: 'Wrong password',
      });
      return response;
    }
    const response = res.status(200).json({
      status: 'success',
      data: user,
    });
    return response;
  } catch (error) {
    const response = res.status(400).json({
      status: 'fail',
      message: error.message,
    });
    return response;
  }
};

export const signup = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {
  try {
    const hashPassword = bcrpyt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hashPassword,
    });
    await newUser.save();
    const response = res.status(200).json({
      status: 'fail',
      data: newUser,
    });
    return response;
  } catch (error) {
    const response = res.status(400).json({
      status: 'fail',
      message: error.message,
    });
    return response;
  }
};

export const logout = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
) => {};
