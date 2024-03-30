import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import httpStatus from '../../../shared/httpStatus';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.modal';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  // set default student password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // set role
  user.role = 'Student';
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  ).lean();

  let newUserData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester as IAcademicSemester);
    user.id = id;
    student.id = id;
    // new student
    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failde to create student');
    }
    // set stududent --> id into user.student
    user.student = newStudent[0]._id;
    //create new user
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failde to crteate user');
    }
    newUserData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error as string);
  }
  if (newUserData) {
    newUserData = await User.findOne({ id: newUserData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserData;
};

const createFaculty = async (
  faculty: IFaculty,
  user: IUser,
): Promise<IUser | null> => {
  //ser default pass
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }
  //ser role
  user.role = 'Faculty';
  let newUserData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;
    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Faculty');
    }
    user.faculty = newFaculty[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }
    newUserData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error as string);
  }
  if (newUserData) {
    newUserData = await User.findOne({ id: newUserData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserData;
};

export const UserService = {
  createStudent,
  createFaculty,
};
