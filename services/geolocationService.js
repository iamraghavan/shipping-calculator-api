import axios from 'axios';
import logger from '../utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const GEOCODE_URL = 'https://api.olamaps.io/places/v1/geocode';
const apiKey = process.env.API_KEY;

export async function getUserLocation(address) {
  if (!apiKey) {
    logger.error('API key not set in environment variables.');
    throw new Error('Server misconfiguration.');
  }

  try {
  
    const response = await axios.get(GEOCODE_URL, {
      params: {
        address,
        language: 'hi',
        api_key: apiKey
      },
      headers: {
        'X-Request-Id': `req-${Date.now()}`
      }
    });

    const viewport = response?.data?.geocodingResults?.[0]?.geometry?.viewport;
    if (!viewport) {
      logger.warn(`Viewport not found for address: ${address}`);
      throw new Error('No viewport data found for the provided address.');
    }

    const { southwest, northeast } = viewport;


    const formattedViewport = `${southwest.lat},${southwest.lng}|${northeast.lat},${northeast.lng}`;

    console.log(formattedViewport);
    
    return formattedViewport;
  } catch (error) {
    logger.error(`Geolocation API error: ${error.message}`);
    throw new Error('Failed to fetch user location.');
  }
}
