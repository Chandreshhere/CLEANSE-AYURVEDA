const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const GUEST_ID_KEY = "cleanse_guest_id";

// Logger utility for API calls
const logRequest = (method: string, endpoint: string, body?: unknown) => {
  console.log(`[AUTH SERVICE] ${method} ${endpoint}`);
  if (body) {
    console.log("[AUTH SERVICE] Request Body:", JSON.stringify(body, null, 2));
  }
};

const logResponse = (endpoint: string, status: number, data: unknown) => {
  console.log(`[AUTH SERVICE] Response from ${endpoint}`);
  console.log(`[AUTH SERVICE] Status: ${status}`);
  console.log("[AUTH SERVICE] Response Data:", JSON.stringify(data, null, 2));
};

const logError = (endpoint: string, error: unknown) => {
  console.error(`[AUTH SERVICE] Error at ${endpoint}:`, error);
};

export interface UserData {
  _id: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  avatar: string | null;
  status: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginOTPResponse {
  success: boolean;
  data?: {
    user: UserData;
    accessToken: string;
    refreshToken: string;
  };
  error?: string;
  needsRegistration?: boolean;
}

export interface RegisterData {
  firebaseIdToken: string;
  termsAccepted: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  marketingConsent?: boolean;
}

export interface RegisterResponse {
  success: boolean;
  data?: {
    user: UserData;
    accessToken: string;
    refreshToken: string;
  };
  error?: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  data?: AuthTokens;
  error?: string;
}

function getGuestId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(GUEST_ID_KEY);
}

function getAuthHeaders(includeGuestId = true): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (includeGuestId) {
    const guestId = getGuestId();
    if (guestId) {
      headers["x-guest-id"] = guestId;
    }
  }

  return headers;
}

export const authService = {
  /**
   * Login with Firebase ID token (Phone OTP)
   */
  async loginWithOTP(firebaseIdToken: string): Promise<LoginOTPResponse> {
    const endpoint = `${API_BASE_URL}/api/auth/login/otp`;
    const requestBody = { firebaseIdToken };

    logRequest("POST", endpoint, { firebaseIdToken: firebaseIdToken.substring(0, 50) + "..." });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      logResponse(endpoint, response.status, data);

      if (response.status === 200) {
        return {
          success: true,
          data: {
            user: data.data.user,
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
          },
        };
      } else if (response.status === 404) {
        return {
          success: false,
          needsRegistration: true,
          error: data.error || "User not registered",
        };
      } else if (response.status === 401) {
        return {
          success: false,
          error: data.error || "Invalid phone verification",
        };
      } else if (response.status === 403) {
        return {
          success: false,
          error: data.error || "Account suspended",
        };
      } else {
        return {
          success: false,
          error: data.error || "Login failed",
        };
      }
    } catch (error) {
      logError(endpoint, error);
      return {
        success: false,
        error: "Network error. Please try again.",
      };
    }
  },

  /**
   * Register new user with Firebase ID token and profile information
   */
  async register(data: RegisterData): Promise<RegisterResponse> {
    const endpoint = `${API_BASE_URL}/api/auth/register`;
    const logData = {
      ...data,
      firebaseIdToken: data.firebaseIdToken.substring(0, 50) + "...",
    };

    logRequest("POST", endpoint, logData);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      logResponse(endpoint, response.status, responseData);

      if (response.status === 201) {
        return {
          success: true,
          data: {
            user: responseData.data.user,
            accessToken: responseData.data.accessToken,
            refreshToken: responseData.data.refreshToken,
          },
        };
      } else if (response.status === 409) {
        return {
          success: false,
          error: responseData.error || "User already exists",
        };
      } else {
        return {
          success: false,
          error: responseData.error || "Registration failed",
        };
      }
    } catch (error) {
      logError(endpoint, error);
      return {
        success: false,
        error: "Network error. Please try again.",
      };
    }
  },

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const endpoint = `${API_BASE_URL}/api/auth/refresh`;

    logRequest("POST", endpoint, { refreshToken: refreshToken.substring(0, 50) + "..." });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();
      logResponse(endpoint, response.status, data);

      if (response.status === 200) {
        return {
          success: true,
          data: {
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
          },
        };
      } else {
        return {
          success: false,
          error: data.error || "Session expired",
        };
      }
    } catch (error) {
      logError(endpoint, error);
      return {
        success: false,
        error: "Network error. Please try again.",
      };
    }
  },

  /**
   * Logout user and invalidate session
   */
  async logout(accessToken: string): Promise<void> {
    if (!accessToken || !API_BASE_URL) return;

    const endpoint = `${API_BASE_URL}/api/auth/logout`;

    logRequest("POST", endpoint, { accessToken: accessToken.substring(0, 50) + "..." });

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({}),
      });

      const data = await response.json().catch(() => ({}));
      logResponse(endpoint, response.status, data);
    } catch (error) {
      logError(endpoint, error);
    }
  },

  /**
   * Get current user profile
   */
  async getProfile(accessToken: string): Promise<{ success: boolean; data?: UserData; error?: string }> {
    const endpoint = `${API_BASE_URL}/api/auth/profile`;

    logRequest("GET", endpoint);

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      logResponse(endpoint, response.status, data);

      if (response.status === 200) {
        return {
          success: true,
          data: data.data.user,
        };
      } else {
        return {
          success: false,
          error: data.error || "Failed to fetch profile",
        };
      }
    } catch (error) {
      logError(endpoint, error);
      return {
        success: false,
        error: "Network error. Please try again.",
      };
    }
  },
};
