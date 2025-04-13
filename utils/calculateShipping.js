export function calculateShippingCharges(distanceInKm) {
    const FREE_LIMIT_KM = 10;
    const COST_PER_KM = 4;
  
    if (distanceInKm <= FREE_LIMIT_KM) {
      return 0;
    }
  
    return (distanceInKm - FREE_LIMIT_KM) * COST_PER_KM;
  }
  