import { useEffect, useState } from 'react';

interface LocationInterface {
  loaded: boolean,
  coordinates?: {
    lat: any,
    lng: any,
  },
  error?: any,
}

const useGeoLocation = () => {
  const [location, setLocation] = useState<LocationInterface>({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location: any) => {
    setLocation({
      loaded: true,
      coordinates: { 
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
      error: null,
    });
  };

  const onError = (error: any) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
}

export { useGeoLocation };