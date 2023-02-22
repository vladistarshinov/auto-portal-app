'use strict';

/**
 * promotion service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::promotion.promotion');
