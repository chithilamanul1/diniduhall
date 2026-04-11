export interface StrapiImage {
  data: {
    attributes: {
      url: string;
      alternativeText: string;
      caption: string;
    };
  };
}

export interface Hall {
  id: number;
  attributes: {
    title: string;
    description: string;
    capacity: number;
    price: string;
    image: StrapiImage;
    features: string[];
    seo_title?: string;
    seo_description?: string;
  };
}

export interface Service {
  id: number;
  attributes: {
    title: string;
    description: string;
    icon: string;
    slug: string;
    image: StrapiImage;
  };
}

export interface GalleryItem {
  id: number;
  attributes: {
    title: string;
    category: 'wedding' | 'corporate' | 'party' | 'other';
    image: StrapiImage;
  };
}

export interface SiteSettings {
  id: number;
  attributes: {
    site_name: string;
    contact_email: string;
    contact_phone: string;
    address: string;
    facebook_url: string;
    instagram_url: string;
  };
}
