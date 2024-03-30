// import config from '../../../config';
// import { AcademicSemester } from '../academicSemester/academicSemester.modal';
// import { IStudent } from '../student/student.interface';
// import { IUser } from './user.interface';

// const createStudent = async (
//   student: IStudent,
//   user: IUser,
// ): Promise<IUser | null> => {
//   // set default student password
//   if (!user.password) {
//     user.password = config.default_student_pass as string;
//   }
//   // set role
//   user.role = 'Student';
//   const academicSemester = await AcademicSemester.findById(
//     student.academicSemester,
//   ).lean();
// };

// export const UserService = {
//   createStudent,
// };
