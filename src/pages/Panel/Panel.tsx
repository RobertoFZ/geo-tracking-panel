import React, { useEffect, useState } from 'react';
import { WithUserProps } from 'hooks/withUser';
import { RouteComponentProps } from 'react-router-dom';
import MainLayout from 'components/layouts/MainLayout';
import { EMenuKeys } from 'shared/constants/menuElements';
import GoogleMaps from 'components/molecules/GoogleMaps/GoogleMaps';
import showMessage, { NoticeType } from 'utils/notifications';
import LocationService from 'api/Location';
import { LastLocation, LocationActivity } from 'api/Location/declarations';
import FloatingContainer from 'components/atoms/FloatingContainer';
import ActivityCollapseContainer from 'components/molecules/ActivityCollapseContainer';
import LocationZoneService from 'api/LocationZone';
import LocationsMap from 'components/molecules/GoogleMaps/LocationsMap';
import { getRandomColor } from 'utils/common';
import { message } from 'antd';



const PanelPage: React.FC<WithUserProps & RouteComponentProps> = (props) => {
  const updateInterval = 60000; // 1 min
  let mapUpdateTimeout: NodeJS.Timeout;
  let usedColors: string[] = [];
  const [locations, setLocations] = useState<LastLocation[]>([]);
  const [locationActivities, setLocationActivities] = useState<LocationActivity[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationActivity | undefined>(undefined);

  const getLastLocations = async () => {
    try {
      let locations = await LocationService.last();
      locations = locations.map((location: LastLocation) => {
        let color = getRandomColor(usedColors);
        location.color = getRandomColor(usedColors);
        usedColors.push(color);
        return location;
      });
      setLocations([...locations]);
    } catch (error) {
      showMessage('Error', error.message, NoticeType.ERROR);
    }
  }

  const getLocationActivity = async () => {
    try {
      const location_activities = await LocationZoneService.activity();
      setLocationActivities([...location_activities]);
    } catch (error) {
      showMessage('Error', error.message, NoticeType.ERROR);
    }
  }

  const initMapUpdate = () => {
    mapUpdateTimeout = setInterval(() => {
      getLocationActivity();
      getLastLocations();
    }, updateInterval);
  }

  const clearSelectedLocation = () => setSelectedLocation(undefined);

  const onMarkerClick = (location: LocationActivity) => {
    if (selectedLocation && selectedLocation.id === location.id) {
      setSelectedLocation(undefined);
    } else {
      setSelectedLocation(location);
    }
  };

  useEffect(() => {
    getLastLocations();
    getLocationActivity();
    initMapUpdate();
    return () => {
      clearInterval(mapUpdateTimeout);
    };
  }, []);

  return (
    <MainLayout {...props} active={EMenuKeys.PANEL}>
      <GoogleMaps>
        <LocationsMap
          locations={locations}
          onMarkerClick={onMarkerClick}
          selectedLocation={selectedLocation}
          onCloseInfoBox={clearSelectedLocation}
        />
      </GoogleMaps>
      <FloatingContainer>
        <ActivityCollapseContainer
          activity={locationActivities}
        />
      </FloatingContainer>
    </MainLayout>
  )
};

export default PanelPage;