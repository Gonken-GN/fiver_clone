/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

// import mongoose from 'mongoose';
import Gig from "../models/gig.model.js";
export const createGig = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
  next
) => {
  try {
    if (!req.isSeller) {
      const response = res.status(403).json({
        status: 'fail',
        message: 'Only Sellers can create a gig',
      });
      return response;
    }
    const newGig = new Gig({
      userId: req.userId,
      ...req.body,
    });
    
  } catch (error) {
    next();
  }
};
export const createGig = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
  next
) => {};
export const createGig = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
  next,
) => {};
