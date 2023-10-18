import { useEffect, useRef, useMemo, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

type Props = {
  address: Object,
};

const Map: React.FC<Props> = (props) => {

  const mapRef = useRef(null);
  const [geocoder, setGeocoder] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });

    loader.load().then(() => {
      setGeocoder(new google.maps.Geocoder());
    });
  }, []);


  useEffect(() => {

    if (geocoder) {
      geocoder.geocode({ address: props.address }, (results, status) => {
        if (status === "OK") {
          const map = new google.maps.Map(mapRef.current, {
            center: results[0].geometry.location,
            zoom: 8,
          });
          const marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
          });
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    };
  }, [props.address, geocoder]);


  return <div style={{ height: "400px" }} ref={mapRef} />;
}

export default Map;