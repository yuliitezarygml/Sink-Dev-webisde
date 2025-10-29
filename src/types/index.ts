// Типы Strapi для изображений
export interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface ImageFormats {
  thumbnail?: ImageFormat;
  small?: ImageFormat;
  medium?: ImageFormat;
  large?: ImageFormat;
}

export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Типы для галереи
export interface Photo {
  id: number;
  documentId: string;
  title: string;
  description: string;
  order: number;
  tags: string[] | null;
  image: StrapiImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // Computed fields for display
  thumbnailUrl?: string;
  fullUrl?: string;
  date?: string;
}

export interface Gallery {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  featured: boolean;
  photos: Photo[];
  coverImage?: StrapiImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // Computed fields for display
  photographerName?: string;
  photographerEmail?: string;
  date?: string;
  storageUntil?: string;
}
