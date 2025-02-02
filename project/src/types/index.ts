    // Общие типы
    export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

    // Интерфейсы для API
    export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    }

    // Параметры пагинации
    export interface PaginationParams {
    page: number;
    limit: number;
    total?: number;
    }

    // Параметры фильтрации
    export interface FilterParams {
    search?: string;
    category?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    }

    // Интерфейсы для данных
    export interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    category: string;
    image?: string;
    }

    export interface Specialist {
    id: number;
    name: string;
    position: string;
    experience: number;
    description: string;
    photo?: string;
    services: number[]; // ID услуг
    }

    export interface Review {
    id: number;
    attributes: {
        name: string;
        rating: number;
        comment: string;
        published: boolean;
        createdAt: string;
    };
    }

    export interface Booking {
    id: number;
    clientName: string;
    clientPhone: string;
    serviceId: number;
    specialistId?: number;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    message?: string;
    }

    // Интерфейсы для форм
    export interface BookingFormData {
    name: string;
    phone: string;
    service: string;
    specialist?: string;
    date: string;
    time: string;
    message?: string;
    }

    export interface ReviewFormData {
    name: string;
    rating: number;
    text: string;
    serviceId?: number;
    specialistId?: number;
    }

    export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    message: string;
    }

    export interface SolicitudFormData {
    nombre: string;
    telefono: string;
    tipo: 'llamada' | 'presupuesto';
    fecha: string;
    estado: 'pendiente' | 'completada' | 'cancelada';
    }

    export interface Project {
    id: number;
    documentId: string;
    Title: string;
    Description: string;
    Category: string;
    Orden: number;
    Slug: string;
    Image: {
        id: number;
        url: string;
        formats: {
        thumbnail: { url: string };
        small: { url: string };
        medium: { url: string };
        large: { url: string };
        };
    };
    Gallery: Array<{
        id: number;
        url: string;
        formats: {
        thumbnail: { url: string };
        small: { url: string };
        medium: { url: string };
        large: { url: string };
        };
    }>;
    } 