import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {RootStackParamList} from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({navigation}: Props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Favourite')}>
        <Text>Go to Favs</Text>
      </TouchableOpacity>
    </View>
  );
};
