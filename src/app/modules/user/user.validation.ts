import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';

const createStudentZodSchema = z.object({
  body: z.object({
    passaword: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'firstName is required',
        }),
        lastName: z.string({
          required_error: 'lastName is required',
        }),
        middleName: z.string().optional(),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'dateOfBirth is required',
      }),
      email: z.string({
        required_error: 'email is required',
      }),
      contactNo: z.string({
        required_error: 'contactNo is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'emergencyContactNo is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'bloodGroup is required',
      }),
      presentAddress: z.string({
        required_error: 'presendAdress is required',
      }),
      permanentAddress: z.string({
        required_error: 'permanentAddress is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'fatherName is required',
        }),
        motherName: z.string({
          required_error: 'motherName is required',
        }),
        fatherOccupation: z.string({
          required_error: 'fatherOccupation is required',
        }),
        motherOccupation: z.string({
          required_error: 'motherOccupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'motherContactNo is required',
        }),
        address: z.string({
          required_error: 'address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'name is required',
        }),
        occupation: z.string({
          required_error: 'occupation is required',
        }),
        contactNo: z.string({
          required_error: 'contactNo is required',
        }),
        address: z.string({
          required_error: 'address is required',
        }),
      }),
      academicFaculty: z.string({
        required_error: 'academicFaculty is required',
      }),
      academicSemester: z.string({
        required_error: 'academicSemester is required',
      }),
      academicDepartment: z.string({
        required_error: 'academicDepartment is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});
const facultyValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'firstName is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'lastName is required',
        }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender must berequired',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of Birth must be required',
      }),
      email: z
        .string({
          required_error: 'Email must be required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact No must be required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact No must be required',
      }),
      presentAddress: z.string({
        required_error: 'Present Address must be required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address must be required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'bloodgrupe must be requeried',
      }),
      designation: z.string({
        required_error: 'designation is required',
      }),
      academicDepartment: z.string({
        required_error: 'academicDeparment is Required',
      }),
      academicFaculty: z.string({
        required_error: 'academicFaculty is required',
      }),
    }),
  }),
});

export const UserValidation = {
  createStudentZodSchema,
  facultyValidationSchema,
};
