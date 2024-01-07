import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.modal';

const createFaculty = async (
  paylod: IAcademicFaculty,
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(paylod);
  return result;
};

export const AcademicFacultyService = {
  createFaculty,
};
