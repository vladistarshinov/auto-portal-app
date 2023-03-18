import { environment } from "@/environments/environment";

export const STRAPI_URL = `${environment.strapiURL}/api`;

export const getArticlesUrl = STRAPI_URL + `/articles`;
export const getPromotionsUrl = STRAPI_URL + `/promotions`;
