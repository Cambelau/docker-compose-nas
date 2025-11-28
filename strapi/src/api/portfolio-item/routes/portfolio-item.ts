/**
 * portfolio-item router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::portfolio-item.portfolio-item' as any, {
  config: {
    find: {
      middlewares: ['api::portfolio-item.populate-middleware'],
    },
    findOne: {
      middlewares: ['api::portfolio-item.populate-middleware'],
    },
  },
});

// Add custom routes
export const customRoutes = {
  routes: [
    {
      method: 'GET',
      path: '/portfolio-items/featured',
      handler: 'portfolio-item.getFeatured',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/portfolio-items/seasonal',
      handler: 'portfolio-item.getSeasonal',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
