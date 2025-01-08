import { useEffect } from "react";

const useFindMarker = (markers, latitude, longitude, entity, openSheet, uniqueId) => {
  useEffect(() => {
    if (latitude && longitude) {
      const matchingMarker = markers.find(
        (marker) =>
          marker.coordinate.latitude === latitude &&
          marker.coordinate.longitude === longitude
      );

      if (matchingMarker) {
        openSheet(matchingMarker, entity);
      }
    }
  }, [latitude, longitude, markers, entity, openSheet, uniqueId]);
};

export default useFindMarker;