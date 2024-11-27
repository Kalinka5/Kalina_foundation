import React, { ReactNode, Dispatch, SetStateAction } from "react";

// AuthContext.tsx
export type AuthContextType = {
  auth: boolean | null; // `auth` can be null or boolean
  setAuth: Dispatch<SetStateAction<boolean | null>>; // `setAuth` manages `auth` state
};
export type AuthProviderProps = {
  children: ReactNode; // Children can be any valid ReactNode
};

// ProtectedRoute.tsx
export type DecodedToken = {
  exp: number;
};
export type ProtectedRouteProps = {
  children: ReactNode;
};

// App.tsx
export type HeaderContextType = {
  auth: boolean;
  authLinks: { id: number; urlLink: string; urlName: string }[];
  notAuthLinks: { id: number; urlLink: string; urlName: string }[];
};

// Login.tsx
export type LoginContextType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

// Register.tsx
export type RegistrationStatus = "success" | "failed" | null;
export type RegisterContextType = {
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
export type ProfileContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  image_url: string;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setImageURL: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

// Header Component
export type HeaderProps = {
  fixed?: "pos-fixed";
};

// Items Component
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

// Items.tsx and Donators.tsx
export type HeaderSectionProps = {
  title: string;
  className: string;
  children?: JSX.Element[];
};

// DonatorImg.tsx
export type DonatorImgProps = {
  image: string;
};

// EditItemButton.tsx
export type EditItemButtonProps = {
  id: number;
};

// ItemCard.tsx
export type ItemCardProps = {
  items: Item[];
  isSuperUser: boolean;
};

// ItemDescription.tsx
export type ItemDescriptionProps = {
  title: string;
};

// ItemImage.tsx
export type ItemImageProps = {
  image: string;
  index: number;
};

// MoneyLandscape.tsx and MoneyPortrait.tsx
export type MoneyProps = {
  donated: string;
};

// Pedestal.tsx
export type PedestalProps = {
  donators: User[];
  orientation: "landscape" | "portrait";
};

// Place.tsx
export type PlaceProps = {
  index: number;
};

// Username.tsx
export type UsernameProps = {
  username: string;
};

// Header.tsx
export type LogRegHeaderProps = {
  text: "login-head" | "registration-head";
};

// Link.tsx
export type LogRegLinkProps = {
  link: string;
  textLink: "register-now" | "login-now";
  question: "login-q" | "register-q";
};

// LoginField.tsx
export type LoginFieldProps = {
  label: "email" | "password";
  value: string;
  placeholder: "your-email" | "your-password";
  type: "email" | "password";
  onChange: Dispatch<SetStateAction<string>>;
};

// RegisterField.tsx
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

// SubmitButton.tsx
export type SubmitButtonProps = {
  text: "register-now" | "login-button";
  loading: boolean;
};

// DeleteUserModal.tsx
export type DeleteUserModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

// InputField.tsx in Profile
export type ProfileInputFieldProps = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  label: string;
  tLabel: string;
  type: "email" | "text";
  placeholder: string;
  icon: React.ReactNode;
};

// ProtectedRoute.tsx
export type TokenResponse = {
  access?: string;
  refresh?: string;
};

// Slider.tsx
export type SliderProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

// Items.tsx
export type ItemsProps = {
  page: number;
};

// EvailVerify
export type EmailVerify = {
  status: string;
  message: string;
};
