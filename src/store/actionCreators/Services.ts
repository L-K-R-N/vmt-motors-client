import { createAction } from '@reduxjs/toolkit';

export const updateIsFavorite = createAction<{ serviceId: number }>(
   'services/updateIsFavorite',
);
