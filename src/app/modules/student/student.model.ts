import { Schema } from 'mongoose';
import { IStudent } from './student.interface';

const StudentSchema = new Schema<IStudent>({
  id: {
    type: String,
    required: true,
  },
});
