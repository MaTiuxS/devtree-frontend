import { isAxiosError } from "axios";
import { api } from "../config/axios";
import type { TUser, UserHandle } from "../types";

export async function getUser() {
  try {
    const { data } = await api<TUser>("/user");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateProfile(formdata: TUser) {
  try {
    const {
      data: { message },
    }: { data: { message: string } } = await api.patch("/user", formdata);
    return message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function uploadImage(file: File) {
  let formData = new FormData();
  formData.append("file", file);

  try {
    const {
      data: { image },
    }: { data: { image: string } } = await api.post("/user/image", formData);
    return image;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getUserByHandle(handle: string) {
  try {
    const { data } = await api<UserHandle>(`/${handle}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function searchByHandle(handle: string) {
  try {
    const { data } = await api.post<string>("/search", { handle });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
