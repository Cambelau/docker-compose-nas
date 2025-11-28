/**
 * portfolio-item service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::portfolio-item.portfolio-item' as any, ({ strapi }) => ({
  // Custom service methods can be added here

  async findWithMedia(params: any = {}) {
    return await strapi.entityService.findMany('api::portfolio-item.portfolio-item' as any, {
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

  async findOneWithMedia(id: number, params: any = {}) {
    return await strapi.entityService.findOne('api::portfolio-item.portfolio-item' as any, id, {
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

  async findFeatured(params: any = {}) {
    return await strapi.entityService.findMany('api::portfolio-item.portfolio-item' as any, {
      ...params,
      filters: {
        featured: true,
        publishedAt: { $notNull: true },
        ...(params.filters && typeof params.filters === 'object' ? params.filters : {}),
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

  async findSeasonal(params: any = {}) {
    return await strapi.entityService.findMany('api::portfolio-item.portfolio-item' as any, {
      ...params,
      filters: {
        seasonal: true,
        publishedAt: { $notNull: true },
        ...(params.filters && typeof params.filters === 'object' ? params.filters : {}),
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

  async findPublished(params: any = {}) {
    return await strapi.entityService.findMany('api::portfolio-item.portfolio-item' as any, {
      ...params,
      filters: {
        publishedAt: { $notNull: true },
        ...(params.filters && typeof params.filters === 'object' ? params.filters : {}),
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
