export interface Member {
  MemberName: string;
  MemberSurname: string;
  MemberPhoneNumber: string;
  MemberBirthdate: Date;
  MemberProfilePictureURL: string;
  Admin: boolean;
  Disabled: boolean;
  PrivacyAccepted: boolean;
  realm: string;
  username: string;
  email: string;
  emailVerified: boolean;
  id: number;
}
