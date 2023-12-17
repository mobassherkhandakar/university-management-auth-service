import { Schema, model } from 'mongoose';
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterTitle,
} from './academicSemester.constants';
import {
  IAcademicSemester,
  IAcademicSemesterModel,
} from './academicSemester.interface';

const academicSemesterSchema = new Schema<
  IAcademicSemester,
  IAcademicSemesterModel
>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitle,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonth,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
export const AcademicSemester = model<
  IAcademicSemester,
  IAcademicSemesterModel
>('AcademicSemester', academicSemesterSchema);
