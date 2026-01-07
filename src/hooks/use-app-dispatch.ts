import {useDispatch} from 'react-redux';
import type {AppDispatch} from '../types/state.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>();
