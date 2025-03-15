import { strapiApi, type Review, type ContactSubmission } from './strapi';

type ContactFormData = Pick<ContactSubmission['attributes'], 'name' | 'email' | 'phone' | 'service' | 'message'>;

export async function submitContactForm(data: ContactFormData) {
  return strapiApi.submitContact(data);
}

type ReviewFormData = Pick<NonNullable<Review['attributes']>, 'name' | 'rating' | 'comment' | 'service'>;

export async function submitReview(data: ReviewFormData) {
  return strapiApi.submitReview(data);
}

export async function getReviews() {
  return strapiApi.getReviews();
}

export async function getServices() {
  return strapiApi.getServices();
}

export async function getProjects() {
  return strapiApi.getProjects();
}

export async function getServiceCategories() {
  return strapiApi.getServices();
}
