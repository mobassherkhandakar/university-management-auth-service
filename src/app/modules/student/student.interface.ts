type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type IStudent = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
};
