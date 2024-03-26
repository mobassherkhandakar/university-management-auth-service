import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.modal';

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemester = async () => {
  const result = await AcademicSemester.find({});
  return result;
};
export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
};
