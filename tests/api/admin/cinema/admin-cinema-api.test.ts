import { describe, it, expect, vi, beforeEach } from 'vitest';
import axiosClient from '@/api/axios-client';
import {
    getAllCinemasApi,
    getSpecificCinemaApi,
    insertCinemaApi,
    updateCinemaApi,
    insertMovieInCinemaApi,
    deleteMovieInCinemaApi,
    deleteCinemaApi
} from '@/api/admin/cinema/admin-cinema-api'; 

vi.mock('@/api/axios-client', () => {
    return {
        default: {
            get: vi.fn(),
            post: vi.fn(),
            put: vi.fn(),
            delete: vi.fn(),
        }
    };
});

describe('Admin Cinema API Service', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getAllCinemasApi', () => {
        it('should fetch all cinemas without a city_id', async () => {
            const mockCinemas = [{ id: '1', name: 'Cinema 1', cityId: 1, address: '123 St', hotline: '123' }];
            vi.mocked(axiosClient.get).mockResolvedValueOnce({ data: mockCinemas });

            const result = await getAllCinemasApi();
            expect(axiosClient.get).toHaveBeenCalledWith('/api/admin/dashboard/cinemas', {
                params: { city_id: undefined }
            });
            expect(result).toEqual(mockCinemas);
        });

        it('should attach city_id to params when provided', async () => {
            vi.mocked(axiosClient.get).mockResolvedValueOnce({ data: [] });
            await getAllCinemasApi(5);
            expect(axiosClient.get).toHaveBeenCalledWith('/api/admin/dashboard/cinemas', {
                params: { city_id: 5 }
            });
        });
    });

    describe('getSpecificCinemaApi', () => {
        it('should fetch a specific cinema using params', async () => {
            const mockDetail = { id: '1', name: 'Cinema 1', seatType: [], movies: [], screens: [] };
            vi.mocked(axiosClient.get).mockResolvedValueOnce({ data: mockDetail });

            const result = await getSpecificCinemaApi('cinema-123');

            expect(axiosClient.get).toHaveBeenCalledWith('/api/admin/dashboard/cinemas', {
                params: { cinemaId: 'cinema-123' }
            });
            expect(result).toEqual(mockDetail);
        });
    });

    describe('insertCinemaApi', () => {
        it('should send POST request with cinema data', async () => {
            const newCinema = { name: 'New', cityId: 2, address: '456 Ave', hotline: '999' };
            vi.mocked(axiosClient.post).mockResolvedValueOnce({ data: 'success' });

            await insertCinemaApi(newCinema);

            expect(axiosClient.post).toHaveBeenCalledWith('/api/admin/dashboard/cinemas', newCinema);
        });
    });

    describe('updateCinemaApi', () => {
        it('should send PUT request with cinema id in URL and data in body', async () => {
            const updateData = { name: 'Updated', cityId: 2, address: '456 Ave', hotline: '999' };
            vi.mocked(axiosClient.put).mockResolvedValueOnce({ data: 'success' });

            await updateCinemaApi({ data: updateData, cinema_id: 'cinema-123' });

            expect(axiosClient.put).toHaveBeenCalledWith('/api/admin/dashboard/cinemas/cinema-123', updateData);
        });
    });

    describe('insertMovieInCinemaApi', () => {
        it('should send PUT request with movieIds array', async () => {
            vi.mocked(axiosClient.put).mockResolvedValueOnce({ data: 'success' });

            await insertMovieInCinemaApi({ cinema_id: 'cinema-123', movieIds: ['movie-1', 'movie-2'] });

            expect(axiosClient.put).toHaveBeenCalledWith('/api/admin/dashboard/cinemas/movies/cinema-123', {
                movieIds: ['movie-1', 'movie-2']
            });
        });
    });

    describe('deleteMovieInCinemaApi', () => {
        it('should send PUT request to correct nested URL without body', async () => {
            vi.mocked(axiosClient.put).mockResolvedValueOnce({ data: 'success' });

            await deleteMovieInCinemaApi({ cinema_id: 'cinema-123', movieId: 'movie-1' });
            expect(axiosClient.put).toHaveBeenCalledWith('/api/admin/dashboard/cinemas/movies/cinema-123/movie-1');
        });
    });

    describe('deleteCinemaApi', () => {
        it('should send DELETE request to specific cinema URL', async () => {
            vi.mocked(axiosClient.delete).mockResolvedValueOnce({ data: 'success' });

            await deleteCinemaApi('cinema-123');

            expect(axiosClient.delete).toHaveBeenCalledWith('/api/admin/dashboard/cinemas/cinema-123');
        });
    });
});