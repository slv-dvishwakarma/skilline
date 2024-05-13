// import { signOut } from "next-auth/react";
import { getCookie } from "cookies-next";
type MethodType = "GET" | "POST" | "OPTIONS" | "PATCH" | "DELETE";
type HeaderType = Record<string, string>;

type ConfigType = {
  method: MethodType;
  headers: HeaderType;
  body?: any;
  next?: { revalidate: number };
  cache?: string;
};

type ServerActionsType = {
  url: string;
  id: string;
  method: MethodType;
  data?: any;
  directLink?: boolean;
  cache?: boolean;
  mock?: string;
};

async function apiCalling({
  url,
  id,
  method,
  data,
  cache = false,
  directLink = false,
  mock,
}: ServerActionsType) {
  try {
    //Init Header
    const headers: HeaderType = {
      "Content-Type": "application/json",
    };

    const token = getCookie("token");

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (data && data instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    }

    //Init Api Parameter
    let config: any = {
      method: method,
      headers: headers,
      next: { revalidate: cache ? 0 : 3600 },
    };
    if (cache) {
      config = { ...config, cache: "no-store" };
    } else {
      config = { ...config, next: { revalidate: 3600 } };
    }
    //Add Data if Data Available
    if (data) {
      //Check If data contains Any one upload
      if (data instanceof FormData) {
        config.body = data;
      } else {
        config.body = JSON.stringify(data);
      }
    }

    //render API IP Address
    const BASE_URL = directLink
      ? ""
      : mock
      ? mock
      : process.env.NEXT_PUBLIC_API_KEY;
    const slashUrl = url.startsWith("/") ? url : `/${url}`;
    //Check if url is full url or only entity name
    const API_URL =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `${BASE_URL}${slashUrl}`;
    const startTime = performance.now();
    // console.log(API_URL);
    const response = await fetch(API_URL, config);
    const endTime = performance.now();

    const elapsedTime = endTime - startTime;

    //Check API Error
    if (!response.ok) {
      //Logout If TOken Expired
      //   if (response.status === 403) {
      //     signOut({ callbackUrl: "/", redirect: true });
      //   }
      const error: any = {
        type: response.type,
        url: response.url,
        status: response.status,
        statusText: response.statusText,
        error: true,
      };

      //Set Validation Error
      if (response.status === 400) {
        const formError = await response.json();
        error["formError"] = formError;
      }

      // Return Error
      return { [id]: { error: error } };
    }

    // Check API Response Type
    const contentType = await response?.headers
      ?.get("Content-Type")
      ?.includes("json");
    if (contentType) {
      return { [id]: { success: await response.json() } };
    } else {
      return { [id]: { success: await response.blob() } };
    }
  } catch (error) {
    console.log(error);
  }
}

export const serverActions = async (actions: Array<ServerActionsType>) => {
  try {
    const fetchPromises = actions.map(async (action: ServerActionsType) => {
      const {
        url,
        id,
        method,
        data,
        cache = false,
        directLink = false,
        mock,
      } = action;
      const response = await apiCalling({
        url,
        id,
        method,
        data,
        cache,
        directLink,
        mock,
      });
      return { [id]: response };
    });

    const responses = await Promise.all(fetchPromises);
    const newData = responses.reduce((acc, curr) => {
      const key = Object.keys(curr)[0];
      const value: any = curr[key];
      if (value[key] && !value[key].error) {
        acc[key] = value[key];
      } else {
        acc[key] = value[key] || value;
      }
      return acc;
    }, {});

    return newData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {}; // Return empty data in case of error
  }
};
