import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FeatureRouter, FeaturesRouter } from './types';

interface RouteChangeHandlerProps {
  features: FeaturesRouter;
}

const RouteChangeHandler: FC<RouteChangeHandlerProps> = ({ features }) => {
  const location = useLocation();

  const handle = (path: string, features: FeaturesRouter) => {
    for (const key in features) {
      const feature = features[key as keyof FeaturesRouter] as FeatureRouter;

      if (feature.match(path)) {
        feature.handle(location);
        break;
      }
    }
  };

  useEffect(() => {
    handle(location.pathname, features);
  }, [location]);

  return null;
};

export default RouteChangeHandler;
