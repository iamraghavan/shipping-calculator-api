import { getUserLocation } from '../services/geolocationService.js';
import { getDistance } from '../services/distanceMatrixService.js';
import { calculateShippingCharges } from '../utils/calculateShipping.js';
import logger from '../utils/logger.js';

const WAREHOUSE_VIEWPORT = {
  southwest: {
    lat: 10.758802358602232,
    lng: 79.83900985054426
  },
  northeast: {
    lat: 10.761317641397767,
    lng: 79.84157014945573
  }
};

export default async function shippingController(req, res) {
  try {
    const userAddress = req.query.address;

    if (!userAddress || typeof userAddress !== 'string' || userAddress.length < 5) {
      logger.warn('Invalid address input received.');
      return res.status(400).json({ error: 'Invalid address provided.' });
    }

    // Get user location (viewport coordinates)
    const userViewport = await getUserLocation(userAddress);

    // Format the user's origin coordinates
    const userOrigin = userViewport; // Already formatted in lat,lng|lat,lng

    // Get destination coordinates (warehouse viewport) in the required format
    const warehouseDestination = `${WAREHOUSE_VIEWPORT.southwest.lat},${WAREHOUSE_VIEWPORT.southwest.lng}|${WAREHOUSE_VIEWPORT.northeast.lat},${WAREHOUSE_VIEWPORT.northeast.lng}`;

    // Calculate distance between user and warehouse location using the Distance Matrix API
    const distanceInMeters = await getDistance(userOrigin, warehouseDestination);
    const distanceInKm = distanceInMeters / 1000;

    // Calculate shipping charges based on the distance
    const charges = calculateShippingCharges(distanceInKm);

    res.status(200).json({
      address: userAddress,
      distanceInKm: distanceInKm.toFixed(2),
      shippingCharges: charges.toFixed(2),
      currency: 'INR'
    });
  } catch (error) {
    logger.error(`Shipping calculation failed: ${error.message}`);
    res.status(500).json({ error: 'Failed to calculate shipping. Please try again later.' });
  }
}
