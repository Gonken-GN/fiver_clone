/**
 * Programmer: Raden Fadhil Anugerah Ardiwilaga
 * Filename: 17 June 2023
 * Contact: fadhilanugrah21@upi.edu
 * Date: server.js
 * Description: This is the code for running the servers
 * */

// import mongoose from 'mongoose';
import Gig from '../models/gig.model.js';

export const createGig = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
  next,
) => {
  try {
    if (!req.user.isSeller) {
      const response = res.status(403).json({
        status: 'fail',
        message: 'Only Sellers can create a gig',
      });
      return response;
    }
    const newGig = new Gig({
      userId: req.user.id,
      ...req.body,
    });
    const savedGig = await newGig.save();
    const response = res.status(200).json({
      status: 'success',
      data: savedGig,
    });
    return response;
  } catch (error) {
    const response = res.status(403).json({
      status: 'fail',
      message: error.message,
    });
    return response;
  }
};
export const deleteGig = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
  next,
) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (gig.userId !== req.user.id) {
      const response = res.status(403).json({
        status: 'fail',
        message: 'You can only delete your Gig!',
      });
      return response;
    }
    await Gig.findByIdAndDelete(req.params.id);
    const response = res.status(200).json({
      status: 'success',
      message: 'Gig has been deleted',
    });
    return response;
  } catch (error) {
    const response = res.status(403).json({
      status: 'fail',
      message: error.message,
    });
    return response;
  }
};
export const getGig = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
  next,
) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      const response = res.status(404).json({
        status: 'fail',
        message: 'Gig not found',
      });
      return response;
    }
    const response = res.status(200).json({
      status: 'success',
      data: gig,
    });
    return response;
  } catch (error) {
    const response = res.status(403).json({
      status: 'fail',
      message: error.message,
    });
    return response;
  }
};

export const getGigs = async (
  /* @type import('express').Request */ req,
  /** @type import('express').Response */ res,
  next,
) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: { ...(q.min && { $gt: q.min }), ...(q.max && { $gt: q.max }) },
    }),
    ...(q.search && { title: { $regex: q.search, $options: 'i' } }),
  };
  try {
    const gigs = await Gig.find(filters);
    const response = res.status(200).json({
      status: 'success',
      data: gigs,
    });
    return response;
  } catch (error) {
    const response = res.status(403).json({
      status: 'fail',
      message: error.message,
    });
    return response;
  }
};
