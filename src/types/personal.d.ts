export type ProfileInfo = {
  titles: string[];
  slogan: string;
  about: string;
  image: string;
};

export type GeneralInfo = {
  firstName: string;
  lastName: string;
  university: string;
  degree: string;
  graduated: string;
};

export type ContactInfo = {
  email: string;
  links: {
    github: string;
    linkedin: string;
  };
};
