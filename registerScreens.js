// registerScreens.js
import { Navigation } from 'react-native-navigation';
import Main from './src/components/Main';
import Slider from './src/components/Slider';
import Mateniment from './src/components/Mateniment';

export function registerScreens() {
  Navigation.registerComponent('Main', () => Main);
  Navigation.registerComponent('Slider', () => Slider);
  Navigation.registerComponent('Mateniment', () => Mateniment);
}
