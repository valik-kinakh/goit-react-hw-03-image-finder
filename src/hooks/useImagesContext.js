import { useContext } from 'react';
import { ImagesContext } from '../context/ImagesContext';

export const useImagesContext = () => useContext(ImagesContext);
