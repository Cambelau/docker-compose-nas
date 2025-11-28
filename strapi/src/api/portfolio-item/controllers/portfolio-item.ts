/**
 * portfolio-item controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::portfolio-item.portfolio-item' as any, ({ strapi }) => ({
  // Custom controller methods can be added here
  
  async find(ctx) {
    // Add custom logic before calling default find
    const { query } = ctx;

    // Default population for media and localizations
    const populateQuery = {
      ...query,
      populate: {
        media: true,
        localizations: {
          populate: {
            media: true
          }
        },
        ...(query.populate && typeof query.populate === 'object' ? query.populate : {}),
      },
    };

    const data = await strapi.entityService.findMany('api::portfolio-item.portfolio-item' as any, populateQuery);
    
    // Use sanitized query for count
    const countQuery = { ...query };
    delete countQuery.populate;
    const meta = { total: await strapi.db.query('api::portfolio-item.portfolio-item').count(countQuery) };

    return { data, meta };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    // Default population for single item
    const populateQuery = {
      ...query,
      populate: {
        media: true,
        localizations: {
          populate: {
            media: true
          }
        },
        seo: true,
        ...(query.populate && typeof query.populate === 'object' ? query.populate : {}),
      },
    };

    const data = await strapi.entityService.findOne('api::portfolio-item.portfolio-item' as any, id, populateQuery);

    return { data };
  },

  // Method to get featured items
  async getFeatured(ctx) {
    const { query } = ctx;

    const populateQuery = {
      ...query,
      filters: {
        featured: true,
        publishedAt: { $notNull: true },
        ...(query.filters && typeof query.filters === 'object' ? query.filters : {}),
      },
      populate: {
        media: true,
        localizations: {
          populate: {
            media: true
          }
        },
        ...(query.populate && typeof query.populate === 'object' ? query.populate : {}),
      },
    };

    const data = await strapi.entityService.findMany('api::portfolio-item.portfolio-item' as any, populateQuery);
    
    // Use sanitized query for count
    const countQuery = { 
      filters: {
        featured: true,
        publishedAt: { $notNull: true },
        ...(query.filters && typeof query.filters === 'object' ? query.filters : {}),
      }
    };
    const meta = { total: await strapi.db.query('api::portfolio-item.portfolio-item').count(countQuery) };

    return { data, meta };
  },

  // Method to get seasonal items
  async getSeasonal(ctx) {
    const { query } = ctx;

    const populateQuery = {
      ...query,
      filters: {
        seasonal: true,
        publishedAt: { $notNull: true },
        ...(query.filters && typeof query.filters === 'object' ? query.filters : {}),
      },
      populate: {
        media: true,
        localizations: {
          populate: {
            media: true
          }
        },
        ...(query.populate && typeof query.populate === 'object' ? query.populate : {}),
      },
    };

    const data = await strapi.entityService.findMany('api::portfolio-item.portfolio-item' as any, populateQuery);
    
    // Use sanitized query for count
    const countQuery = { 
      filters: {
        seasonal: true,
        publishedAt: { $notNull: true },
        ...(query.filters && typeof query.filters === 'object' ? query.filters : {}),
      }
    };
    const meta = { total: await strapi.db.query('api::portfolio-item.portfolio-item').count(countQuery) };

    return { data, meta };
  }
}));
