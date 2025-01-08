import { ConfigService } from "../services/config";
import axios from 'axios';

export const fetcher = axios.create({
    baseURL: ConfigService.getBaseApiUrl(),
});
