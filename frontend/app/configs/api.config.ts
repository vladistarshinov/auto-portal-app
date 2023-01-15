export const API_URL = `${process.env.APP_URL}/api`;

export const getAuthUrl = (str: string) => `/auth/${str}`;
export const getUsersUrl = (str: string) => `/users/${str}`;
export const getProductsUrl = (str: string) => `/products/${str}`;
export const getReviewsUrl = (str: string) => `/reviews/${str}`;