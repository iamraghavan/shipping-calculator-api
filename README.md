
# Shipping Calculator API (OLA MAPS)

A lightweight Node.js-based shipping calculator service that uses the [Ola Maps API](https://olamaps.io/) to:
- Geocode user addresses
- Calculate distances between origin and destination
- Compute shipping charges based on distance (first 10 km free, ₹4/km after)

---

##  Features

 
- Address geocoding using Ola Maps
- Accurate distance calculation via Distance Matrix API
- Configurable shipping charge logic
- Graceful error handling & logging
---

## Setup
### 1. Clone this repo

  

```bash

git  clone  https://github.com/iamraghavan/shipping-calculator-api.git
cd  shipping-calculator-api

```

  

2. Install dependencies

```bash
npm  install
```

4. Add .env file

Create a .env file at the root of your project with the following content:

  

```bash
API_KEY=your_olamaps_api_key
```

  

▶️ Running the Server

```bash
node  index.js
```

## 📬 API Endpoint

**GET**  `/calculate-shipping?address=`

| Name | Type | Required |

|----------|--------|----------|

| address | string | ✅ |

  
### Response


```json
{

"address": "Chennai Central Railway Station",
"distanceInKm": "15.30",
"shippingCharges": "21.20",
"currency": "INR"
}
```

  
## Authors
- [@iamraghavan](https://www.github.com/iamraghavan)
  
## License


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)