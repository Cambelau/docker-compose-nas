/**
 * portfolio-item service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::portfolio-item.portfolio-item', ({ strapi }) => ({
  // Custom service methods can be added here

  async findWithMedia(params = {}) {
    return await strapi.entityService.findMany('api::portfolio-item.portfolio-item', {
      ...params,
      populate: {
        media: true,
        localizations: {
          populate: {
            media: true
          }
        }
      },
    });
  },

  async findOneWithMedia(id: number, params = {}) {
    return await strapi.entityService.findOne('api::portfolio-item.portfolio-item', id, {
      ...params,
      populate: {
        media: true,
        localizations: {
          populate: {
            media: true
          }
        },
        seo: true
      },
    });
  },

  async findFeatured(params = {}) {
    return await strapi.entityService.findMany('api::portfolio-item.portfolio-item', {
      ...params,
      filters: {
        featured: true,
        publishedAt: { $notNull: true },
        ...params.filters,
      },
      populate: {
        media: true,
        localizations: {
          populate: {
            media: true
          }
        }
      },
    });
  },

  async findSeasonal(params = {}) {
    return await strapi.entityService.findMany('api::portfolio-item.portfolio-item', {
      ...params,
      filters: {
        seasonal: true,
        publishedAt: { $notNull: true },
        ...params.filters,
      },
      populate: {
        media: true,
        localizations: {
          populate: {
            media: true
          }
        }
      },
    });
  },

  async findPublished(params = {}) {
    return await strapi.entityService.findMany('api::portfolio-item.portfolio-item', {
      ...params,
      filters: {
        publishedAt: { $notNull: true },
        ...params.filters,
      },
      populate: {
        media: true,
        localizations: {
          populate: {
            media: true
          }
        }
      },
    });
  }
}));
