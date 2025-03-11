import type { Schema, Struct } from '@strapi/strapi';

export interface CommonSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_common_social_links';
  info: {
    displayName: 'Social Links';
    icon: '';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.social-links': CommonSocialLinks;
    }
  }
}
