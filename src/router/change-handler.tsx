import { FC, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FeatureRouter, FeaturesRouter } from './types';

interface RouteChangeHandlerProps {
  features: FeaturesRouter;
}

const RouteChangeHandler: FC<RouteChangeHandlerProps> = ({ features }) => {
  const location = useLocation();

  const handle = useCallback((path: string, features: FeaturesRouter) => {
    for (const key in features) {
      const feature = features[key as keyof FeaturesRouter] as FeatureRouter;

      if (feature.match(path)) {
        feature.handle(location);
        break;
      }
    }
  }, [location]);

  useEffect(() => {
    handle(location.pathname, features);
  }, [location, features, handle]);

  return null;
};

export default RouteChangeHandler;
