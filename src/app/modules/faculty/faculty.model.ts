import { Schema, model } from 'mongoose';
import { bloodGroup, gender } from './faculty.constants';
import { IFaculty } from './faculty.interface';

const facultySchema = new Schema<IFaculty>({
  id: { type: String, required: true, unique: true },
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  gender: { type: String, enum: gender, required: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true, unique: true },
  emergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: bloodGroup,
    required: true,
  },
  designation: { type: String, required: true },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
    required: true,
  },
});

export const Faculty = model('Faculty', facultySchema);
