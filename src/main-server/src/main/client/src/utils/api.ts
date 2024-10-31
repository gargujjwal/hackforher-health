import {
  ApiErrorCls,
  BaseError,
  ensureError,
  RefreshAuthError,
  ValidationError,
} from "./error";

import { env } from "@/env";
import { ApiResponse, RefreshAuthResponse } from "@/types/backend-stubs";

export class AccessToken {
  private static readonly ACCESS_TOKEN_KEY = "access-token";

  public static getAccessToken(): string | null {
    return localStorage.getItem(AccessToken.ACCESS_TOKEN_KEY);
  }

  public static setAccessToken(token: string): void {
    localStorage.setItem(AccessToken.ACCESS_TOKEN_KEY, token);
  }

  public static clearAccessToken(): void {
    localStorage.removeItem(AccessToken.ACCESS_TOKEN_KEY);
  }
}

async function refreshSession() {
  try {
    const res = await fetch(`${env.API_BASE_URL}/auth/refresh`, {
      method: "GET",
      credentials: "include",
    });
    const jsonResponse = (await res.json()) as ApiResponse<RefreshAuthResponse>;

    if (!res.ok) {
      throw new BaseError("Failed to refresh session", {
        context: jsonResponse,
      });
    }

    // set access token in local storage
    if (!jsonResponse.error) {
      AccessToken.setAccessToken(jsonResponse.data.accessToken);
    }
  } catch (err) {
    const error = ensureError(err);

    throw new RefreshAuthError("Failed to refresh session", error);
  }
}

export async function fetchWithAuth<T>(url: string, options: RequestInit = {}) {
  const accessToken = AccessToken.getAccessToken();

  try {
    const response = await fetch(env.API_BASE_URL + url, {
      ...options,
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 401) {
      await refreshSession();

      return fetchWithAuth<T>(url, options);
    }

    return handleApiResponse<T>(response);
  } catch (err) {
    throw ensureError(err);
  }
}

export async function fetchWithoutAuth<T>(
  url: string,
  options: RequestInit = {},
) {
  try {
    const response = await fetch(env.API_BASE_URL + url, {
      ...options,
      headers: { ...options.headers, "Content-Type": "application/json" },
    });

    return handleApiResponse<T>(response);
  } catch (err) {
    throw ensureError(err);
  }
}

async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorResponse: ApiResponse<null>;

    try {
      errorResponse = await response.json();
    } catch (error) {
      const err = ensureError(error);

      throw new BaseError("Failed to parse API error response", {
        cause: err,
        context: { endpoint: response.url },
      });
    }

    // Handle Validation Errors (Code: ERROR_008)
    if (!errorResponse.error) {
      throw new BaseError(
        "Invalid API response, non-success status code without error field in response",
        { context: { endpoint: response.url, errorResponse } },
      );
    }
    if (errorResponse.error.code === "ERROR_008") {
      const validationErrors = errorResponse.error.validationErrors!;

      throw new ValidationError("Validation error", validationErrors, {
        endpoint: response.url,
      });
    }

    // Handle General API Errors
    const apiError = errorResponse.error;

    throw new ApiErrorCls(apiError, { endpoint: response.url });
  }

  // return successful response
  const successResponse = (await response.json()) as ApiResponse<T>;

  return successResponse.data!;
}
