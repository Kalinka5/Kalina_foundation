import React, {
  ReactNode,
  Dispatch,
  SetStateAction,
  MouseEventHandler,
} from "react";

// Hooks
export type EmailVerify = {
  status: string;
  message: string;
};

// Header Component
export type HeaderProps = {
  fixed?: "pos-fixed";
  children?: { id: number; urlLink: string; urlName: string }[] | false;
};

// UpdateButton.tsx
export type UpdateButtonProps = {
  loading: boolean;
};

// DeleteButton.tsx
export type DeleteButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  className: string;
};

// UploadImage.tsx
export type UploadImageProps = {
  imageUrl: string;
  setImage: Dispatch<SetStateAction<File | null>>;
  setImageURL: Dispatch<SetStateAction<string>>;
};

// User
export type User = {
  id: number;
  password: string;
  last_login: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  image: string;
  donated: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  groups: [];
  user_permissions: [];
};

// AuthContext.tsx
export type AuthContextType = {
  isAuthorized: boolean; // `auth` can be null or boolean
  setIsAuthorized: Dispatch<SetStateAction<boolean>>; // `setAuth` manages `auth` state
};
export type AuthProviderProps = {
  children: ReactNode; // Children can be any valid ReactNode
};

// ProtectedRoute.tsx
export type ProtectedRouteProps = {
  children: ReactNode;
};

export type TokenResponse = {
  access?: string;
  refresh?: string;
};

export type DecodedToken = {
  exp: number;
};

// App.tsx
export type HeaderContextType = {
  authLinks: { id: number; urlLink: string; urlName: string }[];
  notAuthLinks: { id: number; urlLink: string; urlName: string }[];
};

// Home Slider component
export type SliderProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};
export type ArrowButtonProps = {
  className: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children?: string;
};
export type TextPartProps = {
  header: string;
  text: string;
  children?: ReactNode;
  className?: string;
  classMobile?: string;
};
export type SliderListProps = {
  classContainer: string;
  classList: string;
  children: string[];
};

// Home Items and Donators components
export type HeaderSectionProps = {
  title: string;
  className: string;
  children?: JSX.Element[];
};

// Home Items component
export type Item = {
  id: number;
  title: string;
  image: string;
  description: string;
  amount: number;
  full_price: number;
  collected: number;
  category_id: number;
};

export type ItemsProps = {
  page: number;
};

export type ItemCardProps = {
  items: Item[];
  isSuperUser: boolean;
};

export type ItemDescriptionProps = {
  title: string;
};

export type ItemImageProps = {
  image: string;
  index: number;
};

export type EditItemButtonProps = {
  id: number;
};

// Home Donators
export type DonatorImgProps = {
  image: string;
};

export type PedestalProps = {
  donators: User[];
  orientation: "landscape" | "portrait";
};

export type MoneyProps = {
  donated: string;
};

export type PlaceProps = {
  index: number;
};

export type UsernameProps = {
  username: string;
};

// Login and Register Title
export type LogRegTitleProps = {
  text: "login-head" | "registration-head";
};

export type LogRegLinkProps = {
  link: string;
  textLink: "register-now" | "login-now";
  question: "login-q" | "register-q";
};

export type SubmitButtonProps = {
  text: "register-now" | "login-button";
  loading: boolean;
};

// Login Page
export type LoginContextType = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
};

export type LoginFieldProps = {
  label: "email" | "password";
  value: string;
  placeholder: "your-email" | "your-password";
  type: "email" | "password";
  onChange: Dispatch<SetStateAction<string>>;
};

// Register Page
export type RegistrationStatus = "success" | "failed" | null;
export type RegisterContextType = {
  registrationStatus: RegistrationStatus;
  setRegistrationStatus: Dispatch<SetStateAction<RegistrationStatus>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password1: string;
  setPassword1: Dispatch<SetStateAction<string>>;
  password2: string;
  setPassword2: Dispatch<SetStateAction<string>>;
};

export type RegisterFieldProps = {
  value: string;
  placeholder: string;
  type: "text" | "email" | "password";
  onChange: Dispatch<SetStateAction<string>>;
  validFields: { string: boolean };
  isValid: string;
  errors: { string: string };
  errorsName: "username" | "email" | "password" | "confirmPassword";
  className: "name-tip" | "email-tip" | "pass-tip" | "confirm-tip";
  tooltipText: "tooltip1" | "tooltip2" | "tooltip3" | "tooltip4";
};

// Profile
export type UsernameFieldProps = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
};

export type ProfileInputFieldProps = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  label: string;
  tLabel: string;
  type: "email" | "text";
  placeholder: string;
  icon: React.ReactNode;
};

export type DeleteUserModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

// Item Edit page
export type TitleProps = {
  children: ReactNode;
};
export type InputProps = {
  value: string | number;
  onChange: Dispatch<SetStateAction<any>>;
  placeholder: "Title" | "Amount" | "1000000" | "100";
  withIcon: boolean;
  styleName?: "input-group-icon";
  type: "text" | "number";
};
export type DescriptionProps = {
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
};
