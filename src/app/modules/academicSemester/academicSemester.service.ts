import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interface/pagination';
import { academicSemesterSearchAbleField } from './academicSemester.constants';
import {
  IAcademicSemester,
  IAcademicSemesterFielters,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.modal';

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemester = async (
  paginationOptions: IPaginationOptions,
  filters: IAcademicSemesterFielters,
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);
  const { searchTerm, ...filterData } = filters;
  console.log('🚀 ~ filterData:', Object.entries(filterData));
  const andcondition = [];
  // Searching SemesterData
  if (searchTerm) {
    andcondition.push({
      $or: academicSemesterSearchAbleField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  //filtering Data
  if (Object.entries(filterData).length) {
    andcondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // const andcondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  //sorting Semester
  const sortCondition: { [kay: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find({ $and: andcondition })
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
};
