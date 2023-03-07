export interface Employee {
  EmployeeName: string;
  EmployeeSurname: string;
  EmployeePhoneNumber: string;
  EmployeeEmail: string;
  EmployeeBirthDate: Date;
  EmployeeProfilePictureURL: string;
  EmployeeTitle: string;
  CreationDate: Date;
  PrivacyAccepted: boolean;
  Disabled: boolean;
  FirstVisit: Date;
  LastVisit: Date;
  CategoryId: number;
  CategoryReason: string;
  Comment: string;
  id: number;
}
