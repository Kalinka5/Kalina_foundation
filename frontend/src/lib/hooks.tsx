import { useQuery } from "@tanstack/react-query";

import { Item, User } from "./types";

import api from "./api";

// Get Items data
const getItems = async (n: any): Promise<Item[]> => {
  try {
    console.log("Start getting data of items...");
    console.log(n);
    const response = await api(`items/?page=${n}&format=json`);
    return response as unknown as Item[];
  } catch (error) {
    console.error("Error fetching items:", (error as Error).message);
    return [];
  }
};

export function useItems(n: string) {
  const items = useQuery<Item[]>({
    queryKey: ["items", n],
    queryFn: () => getItems(n),
  });

  return items;
}

// Get User data
const getUser = async (): Promise<User> => {
  try {
    console.log("Start to sending a request to backend /profile");
    const response = (await api("profile")) as unknown as User;
    console.log("The request was sending successfully!");
    return response as unknown as User;
  } catch (error) {
    console.error("Error fetching items:", (error as Error).message);
    throw new Error("Failed to fetch user");
  }
};

export function useUser(auth: boolean) {
  const user = useQuery<User>({
    queryKey: ["user"],
    queryFn: getUser,
    enabled: auth,
  });

  return user;
}

// Get Top 5 Donators data
const getDonators = async (): Promise<User[]> => {
  try {
    console.log("Start getting data of donators...");
    const response = await api("donators?format=json");
    return response as unknown as User[];
  } catch (error) {
    console.error("Error fetching donators:", (error as Error).message);
    return [];
  }
};

export function useDonators() {
  const donators = useQuery<User[]>({
    queryKey: ["donators"],
    queryFn: getDonators,
  });

  return donators;
}
