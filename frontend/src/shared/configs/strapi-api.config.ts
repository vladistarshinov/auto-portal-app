export const STRAPI_CMS_URL = `${process.env.STRAPI_CMS_URL}/api`

export const getStrapiMediaUrl = (str: string) => `http://localhost:1337${str}`
export const getHomeCategoryBlockUrl = () => `/home-category-blocks`
export const getArticlesUrl = () => `/articles`
export const getPromotionsUrl = () => `/promotions`