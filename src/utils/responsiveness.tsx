import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const hp = (num: number) => {
  return heightPercentageToDP((num / 812) * 100);
};

export const wp = (num: number) => {
  return widthPercentageToDP((num / 375) * 100);
};
