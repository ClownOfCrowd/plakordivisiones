import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/swiper-custom.css';

interface Review {
  id: number | string;
  attributes: {
    name: string;
    rating: number;
    comment: string;
    createdAt?: string;
  };
}

interface ReviewsSliderProps {
  reviews: Review[];
}

/**
 * Customer reviews slider component
 * Features:
 * - Touch-enabled carousel
 * - Autoplay with pause on hover
 * - Responsive design
 */
const ReviewsSlider = ({ reviews }: ReviewsSliderProps) => {
  // Swiper configuration
  const swiperParams = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      spaceBetween={30}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      className="reviews-swiper"
    >
      {reviews && reviews.map((review) => (
        <SwiperSlide key={review.id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl border border-gray-100 relative"
          >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-cyan-500/10" />
            
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < (review?.attributes?.rating || 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed min-h-[80px]">
              "{review?.attributes?.comment}"
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="font-semibold text-gray-800">{review?.attributes?.name}</p>
                {review?.attributes?.createdAt && (
                  <p className="text-sm text-cyan-600 mt-1">
                    {new Date(review.attributes.createdAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                )}
              </div>
              <div className="h-10 w-10 bg-cyan-500/10 rounded-full flex items-center justify-center">
                <span className="text-cyan-600 font-semibold">
                  {review?.attributes?.name.charAt(0)}
                </span>
              </div>
            </div>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ReviewsSlider; 