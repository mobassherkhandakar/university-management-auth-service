import { Schema, model } from 'mongoose';
import { IAcademicDepartment } from './academicDepertment.interface';

const academicDepartmentSchema = new Schema<IAcademicDepartment>({
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

export const AcademicDepartment = model<IAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
