import { Schema, model, Document, Types } from 'mongoose';

export interface IScheduleSlot {
  dayOfWeek: number; // 0 = Sunday, 6 = Saturday
  startTime: string; // e.g., "17:00"
  endTime: string;   // e.g., "18:00"
}

export interface ITutor extends Document {
  userId: Types.ObjectId;       // reference to User
  languages: string[];
  pricePerHour: number;
  videoDescriptionUrl?: string;
  textDescription?: string;
  isApproved: boolean;
  schedule: IScheduleSlot[];
}

const scheduleSlotSchema = new Schema<IScheduleSlot>({
  dayOfWeek: { type: Number, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
}, { _id: false });

const tutorSchema = new Schema<ITutor>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  languages: { type: [String], required: true },
  pricePerHour: { type: Number, required: true },
  videoDescriptionUrl: { type: String },
  textDescription: { type: String },
  isApproved: { type: Boolean, default: false },
  schedule: { type: [scheduleSlotSchema], default: [] }
});

export const Tutor = model<ITutor>('Tutor', tutorSchema);
