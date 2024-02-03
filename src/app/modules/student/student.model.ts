import { Schema } from 'mongoose';
import { IStudent } from './student.interface';

const StudentSchema = new Schema<IStudent>({
  id: {
    type: String,
    required: true,
  },
  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    required: true,
  },
});
