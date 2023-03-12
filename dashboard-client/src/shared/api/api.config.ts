import { environment } from "@/environments/environment";

export const BASE_URL = `${environment.baseURL}/api`;

export const loginUrl = BASE_URL + '/auth/admin/login';

export const getProductsUrl = BASE_URL + '/products';
export const getAutosUrl = BASE_URL + '/autos'
export const getAutoBrandsUrl = BASE_URL + '/autos/brands'
