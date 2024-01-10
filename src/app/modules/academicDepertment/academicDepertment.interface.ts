import { ObjectId } from 'mongoose';
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface';

export type IAcademicDepertment = {
  title: string;
  academicFaculty: ObjectId | IAcademicFaculty;
};
export type IAcademicDepartmentFilters = {
  searchTerm?: string;
};
