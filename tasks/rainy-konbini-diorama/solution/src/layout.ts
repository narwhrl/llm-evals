// Shared scene layout constants. All coordinates are world units on a square
// base spanning [-BASE_HALF, BASE_HALF] on both axes with its top at y = 0.
export const BASE_HALF = 6.5;

// East-west street in front of the store.
export const ROAD_A = { z0: 1.9, z1: 4.7 };

// North-south street along the store's east facade.
export const ROAD_B = { x0: 1.9, x1: 4.7 };

// The convenience store occupies the inner corner of the L-shaped intersection.
export const STORE = { x0: -4.3, x1: 1.3, z0: -3.7, z1: 1.3, h: 2.85, wall: 0.12 };

// Two-floor apartment block west of the alley.
export const APARTMENT = { x0: -6.4, x1: -4.9, z0: -2.3, z1: 1.05, h: 3.5 };

// Narrow service alley between the apartment and the store.
export const ALLEY = { x0: -4.9, x1: -4.3, z0: -2.3, z1: 1.3 };
