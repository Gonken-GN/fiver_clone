/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

// import mongoose from 'mongoose';
import User from "../models/user.models.js";

export const deleteUser = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
  next,
) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete( id );
    const response = res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
    return response;
  } catch (error) {
    next();
  }
};
