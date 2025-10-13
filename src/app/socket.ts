import { io } from 'socket.io-client';
import { getLocalUserData } from '../lib/getLocalUserData';

const URL = 'http://localhost:3007';

const user = getLocalUserData()

export const socket = io(URL, {
  autoConnect: false,
  query: {
    userId: user?.id
  }
});