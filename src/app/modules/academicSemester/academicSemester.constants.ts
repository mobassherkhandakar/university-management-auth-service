import {
  IAcademicSemesterCode,
  IAcademicSemesterMonth,
  IAcademicSemesterTitle,
  academicSemesterCodeMapper,
} from './academicSemester.interface';

export const academicSemesterMonth: IAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const academicSemesterTitle: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemesterCode: IAcademicSemesterCode[] = ['01', '02', '03'];
export const academicSemesterTitleCodeMapper: academicSemesterCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
export const academicSemesterSearchAbleField = ['title', 'code'];
