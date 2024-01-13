import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interface/common';
import { IPaginationOptions } from '../../../interface/pagination';
import { academicDepartmentSearchAbleFields } from './academicDepertment.constant';
import {
  IAcademicDepartmentFilters,
  IAcademicDepertment,
} from './academicDepertment.interface';
import { AcademicDepartment } from './academicDepertment.model';

const createDepertment = async (
  paylod: IAcademicDepertment,
): Promise<IAcademicDepertment> => {
  const result = (await AcademicDepartment.create(paylod)).populate(
    'academicFaculty',
  );
  return result;
};
const getAllDepartment = async (
  pagination: IPaginationOptions,
  filters: IAcademicDepartmentFilters,
): Promise<IGenericResponse<IAcademicDepertment[]>> => {
  const { searchTerm, ...filterData } = filters;
  const andCondition = [];
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(pagination);
  const sortCondition: { [kay: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  if (searchTerm) {
    andCondition.push({
      $or: academicDepartmentSearchAbleFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.entries(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await AcademicDepartment.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartment.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleDeparment = async (
  id: string,
): Promise<IAcademicDepertment | null> => {
  const result = await AcademicDepartment.findById(id);
  return result;
};
export const AcademicDepartmentService = {
  createDepertment,
  getAllDepartment,
  getSingleDeparment,
};
