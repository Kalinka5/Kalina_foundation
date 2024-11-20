// App.tsx
type AuthContextType = {
  auth: boolean;
  authLinks: { id: number; urlLink: string; urlName: string }[];
  notAuthLinks: { id: number; urlLink: string; urlName: string }[];
};

// Login.tsx
type LoginContextType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

// Register.tsx
type RegistrationStatus = "success" | "failed" | null;
type RegisterContextType = {
  registrationStatus: RegistrationStatus;
  setRegistrationStatus: React.Dispatch<
    React.SetStateAction<RegistrationStatus>
  >;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password1: string;
  setPassword1: React.Dispatch<React.SetStateAction<string>>;
  password2: string;
  setPassword2: React.Dispatch<React.SetStateAction<string>>;
};

// Profile.tsx
type ProfileContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  image_url: string;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setImageURL: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  first_name: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  last_name: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
};

// Header Component
type HeaderProps = {
  fixed?: "pos-fixed";
};

// Items Component
type Item = {
  id: number;
  image: string;
  title: string;
};
type ItemsProps = {
  superUser: boolean;
};
