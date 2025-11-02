import { Request, Response } from 'express';
import {Tutor}  from '../models/tutor';
import User from "../models/user.js";

// Submit or update tutor application
export const applyTutor = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
  return res.status(401).json({ message: "Unauthorized: user not found" });
}

    const userId = req.user.id; // from auth middleware
    const { languages, pricePerHour, videoDescriptionUrl, textDescription, schedule } = req.body;

    let tutor = await Tutor.findOne({ userId });
    if (tutor) {
      // update existing
      tutor.languages = languages;
      tutor.pricePerHour = pricePerHour;
      tutor.videoDescriptionUrl = videoDescriptionUrl;
      tutor.textDescription = textDescription;
      tutor.schedule = schedule;
      tutor.isApproved = false; // reset approval
      await tutor.save();
    } else {
      tutor = new Tutor({ userId, languages, pricePerHour, videoDescriptionUrl, textDescription, schedule });
      await tutor.save();
    }

    res.json({ message: 'Tutor application submitted', tutor });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
// Get tutor's own profile
export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id; // JWT-authenticated user
    const tutor = await Tutor.findOne({ userId });
    if (!tutor) return res.status(404).json({ error: "Tutor profile not found" });

    res.json(tutor);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Admin approves tutor
export const approveTutor = async (req: Request, res: Response) => {
  try {
    const { tutorId } = req.params;
    const tutor = await Tutor.findById(tutorId);
    if (!tutor) return res.status(404).json({ error: 'Tutor not found' });

    tutor.isApproved = true;
    await tutor.save();

    res.json({ message: 'Tutor approved', tutor });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get all approved tutors
export const getApprovedTutors = async (req: Request, res: Response) => {
  try {
    const tutors = await Tutor.find({ isApproved: true }).populate('userId', 'name email');
    res.json(tutors);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


// Pending tutor applications
export const getPendingTutors = async (req: Request, res: Response) => {
  const tutors = await Tutor.find({ isApproved: false }).populate("userId", "name email");
  res.json(tutors);
};

// All tutors
export const getAllTutors = async (req: Request, res: Response) => {
  const tutors = await Tutor.find().populate("userId", "name email");
  res.json(tutors);
};



// Update tutor
export const updateTutor = async (req: Request, res: Response) => {
  const tutor = await Tutor.findById(req.params.tutorId);
  if (!tutor) return res.status(404).json({ error: "Tutor not found" });
  Object.assign(tutor, req.body);
  await tutor.save();
  res.json({ message: "Tutor updated", tutor });
};

// Delete tutor
export const deleteTutor = async (req: Request, res: Response) => {
  const tutor = await Tutor.findById(req.params.tutorId);
  if (!tutor) return res.status(404).json({ error: "Tutor not found" });

  await tutor.deleteOne(); // instead of tutor.remove()
  res.json({ message: "Tutor deleted" });
};
