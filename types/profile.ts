export type UserProfile = {
  type: string;
  phoneNumber: string;
  user: {
    name: string;
    email: string;
  };
  school: {
    name: string;
  };
};

export type ProfileData = {
  profile: UserProfile;
};
