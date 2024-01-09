import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import { academicFacultySearchAbleFields } from './academicFaculty.constant';
import {
  IAcademicFaculty,
  IAcademicFacultyFielters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.modal';

const createFaculty = async (
  paylod: IAcademicFaculty,
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(paylod);
  return result;
};
const getAllFaculty = async (
  paginationOption: IPaginationOptions,
  filters: IAcademicFacultyFielters,
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const andCondition = [];
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);
  const { searchTerm, ...filtersData } = filters;
  const sortCondition: { [kay: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  //searching
  if (searchTerm) {
    andCondition.push({
      $or: academicFacultySearchAbleFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  //   filtarting
  if (Object.entries(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const AcademicFacultyService = {
  createFaculty,
  getAllFaculty,
};
