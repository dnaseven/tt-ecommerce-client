import { Location } from "react-router";
import { Features } from "../entities/features";

export interface FeatureRouter {
    match(url: string): boolean;
    handle(location: Location<any>): void;
}

export interface FeaturesRouter extends Record<Features, FeatureRouter> {}