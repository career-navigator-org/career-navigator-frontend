import { apiFetch, authToken } from "../../../shared/api/client";

export const signUp = (payload) =>
  apiFetch("/api/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const signIn = async (payload) => {
  const data = await apiFetch("/api/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  authToken.set(data.token);
  return data;
};

export const getCurrentUser = () => apiFetch("/api/auth/me");

export const getCurrentProfile = () => apiFetch("/api/profile/me");

export const saveOnboardingProfile = (payload) =>
  apiFetch("/api/profile/me", {
    method: "PUT",
    body: JSON.stringify(payload)
  });
