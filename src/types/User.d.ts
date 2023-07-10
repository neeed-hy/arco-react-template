interface UserInfo {
  name: string;
  avatar: string;
  email: string;
  job: string;
  jobName: string;
  organization: string;
  organizationName: string;
  location: string;
  locationName: string;
  introduction: string;
  personalWebsite: string;
  verified: true;
  phoneNumber: RegExp;
  accountId: RegExp;
  registrationTime: string;
  permissions: Record<string, any>;
}
