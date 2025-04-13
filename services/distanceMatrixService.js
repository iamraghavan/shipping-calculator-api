import axios from 'axios';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

const DISTANCE_MATRIX_URL = 'https://api.olamaps.io/routing/v1/distanceMatrix/basic';
const apiKey = process.env.API_KEY;

export async function getDistance(origins, destinations) {
    if (!apiKey) {
      logger.error('API key not set in environment variables.');
      throw new Error('Server misconfiguration.');
    }
  
    try {
      const response = await axios.get(DISTANCE_MATRIX_URL, {
        params: {
          origins,
          destinations,
          api_key: apiKey
        },
        headers: {
          'X-Request-Id': `req-${Date.now()}`,
          'X-Correlation-Id': `corr-${Date.now()}`
        }
      });
 
  
      const rows = response?.data?.rows || [];
      const validDistances = [];
  
      for (let i = 0; i < rows.length; i++) {
        const elements = rows[i]?.elements || [];
  
        for (let j = 0; j < elements.length; j++) {
          const element = elements[j];
          const distance = element?.distance;
  
        //   console.log(`[${i}][${j}] - Distance: ${distance}`); Just Check
  
          if (typeof distance === 'number' && distance > 0) {
            validDistances.push(distance);
          }
        }
      }
  
      if (validDistances.length === 0) {
        logger.warn(`No valid distances found for origins: ${origins} and destinations: ${destinations}`);
        throw new Error('Unable to calculate valid distance. Ensure the origin and destination are valid.');
      }
  
      const minDistance = Math.min(...validDistances);
      console.log(`✅ Selected minimum distance: ${minDistance}`);
      return minDistance;
    } catch (error) {
      logger.error(`Distance matrix API error: ${error.message}`);
      throw new Error('Failed to retrieve distance information.');
    }
  }
  