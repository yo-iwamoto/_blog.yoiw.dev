import { axios } from '@/lib/axios';
import { ENV } from '@/config/env';
import api from '@/api/$api';
import aspidaAxios from '@aspida/axios';

export const aspida = api(aspidaAxios(axios, { baseURL: ENV.API_HOST }));
