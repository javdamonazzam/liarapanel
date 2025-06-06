import ReactMapGL from 'react-map-gl';
import { useState, useCallback } from 'react';
// components
import { MapControlScale, MapControlGeolocate, MapControlNavigation, MapControlFullscreen } from '@components/map';
//
import ControlPanel from './ControlPanel';

// ----------------------------------------------------------------------

type propTypes = {
  themes?: object;
};

export default function MapChangeTheme({ themes, ...other }: propTypes) {
  const [selectTheme, setSelectTheme] = useState('outdoors');

  const [viewport, setViewport] = useState({
    latitude: 37.785164,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
  });

  const handleChangeTheme = useCallback((value) => setSelectTheme(value), []);

  return (
    <>
      <ReactMapGL {...viewport} onViewportChange={setViewport} mapStyle={themes?.[selectTheme]} {...other}>
        <MapControlScale />
        <MapControlNavigation />
        <MapControlFullscreen />
        <MapControlGeolocate />
      </ReactMapGL>

      <ControlPanel themes={themes} selectTheme={selectTheme} onChangeTheme={handleChangeTheme} />
    </>
  );
}
