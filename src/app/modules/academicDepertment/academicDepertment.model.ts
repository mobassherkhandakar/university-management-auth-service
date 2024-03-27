import { Schema, model } from 'mongoose';
import { IAcademicDepertment } from './academicDepertment.interface';

const academicDepartmentSchema = new Schema<IAcademicDepertment>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
});

export const AcademicDepartment = model<IAcademicDepertment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
