import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interface/pagination';
import httpStatus from '../../../shared/httpStatus';
import {
  academicSemesterSearchAbleField,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constants';
import {
  IAcademicSemester,
  IAcademicSemesterFielters,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.modal';

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.CONFLICT, 'Invalid Semester Code');
  }
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
  const whereCondition = andcondition.length < 0 ? { $and: andcondition } : {};
  const result = await AcademicSemester.find(whereCondition)
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

const getSingleSemester = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemester = async (
  id: string,
  paylod: Partial<IAcademicSemester>,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findOneAndUpdate({ id: id }, paylod, {
    new: true,
  });
  return result;
};
export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
};
