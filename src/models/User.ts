export interface User {
  createdAt: string;
  avatar: string;
  Bio: string;
  jobTitle: string;
  profile: Profile;
  id: string;
}

interface Profile {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}
