import { environment } from "@/environments/environment";

export const BASE_URL = `${environment.baseURL}/api`;

export const loginUrl = BASE_URL + '/auth/admin/login'

export const getProductsUrl = BASE_URL + '/products'
