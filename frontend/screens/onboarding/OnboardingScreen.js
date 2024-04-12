import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, ImageBackground  } from 'react-native';
import LottieView from 'lottie-react-native';
import { onboardingData } from './onboarding';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const OnboardingItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <LottieView
        source={item.image}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const OnboardingScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigation = useNavigation();
    const ref = useRef(null);

    const onViewRef = useRef(({ viewableItems }) => {
      setCurrentIndex(viewableItems[0].index);
    });

    const skipOnboarding = () => {
      navigation.navigate('Tabs'); 
    };

    const StyledButton = ({ onPress, title }) => (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );

    return (
    <ImageBackground
        // source={require('../../assets/onboardingBackground.png')} 
        // source={require('../../assets/background2.png')} 
        source={require('../../assets/lightblue.png')}
        style={styles.backgroundImage}
      >
        <View style={{ flex: 1 }}>
            <FlatList
            data={onboardingData}
            renderItem={({ item }) => <OnboardingItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            keyExtractor={(item) => item.id}
            onViewableItemsChanged={onViewRef.current}
            ref={ref}
            />
            <View style={styles.buttonContainer}>
            {currentIndex === onboardingData.length - 1? (
                <StyledButton title="Done" onPress={skipOnboarding} />
            ) : (
                <StyledButton title="Skip" onPress={skipOnboarding} />
            )}
            </View>
        </View>
      </ImageBackground>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  itemContainer: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 200,
    backgroundColor: 'white',
  },
  animation: {
    width: width * 0.8,
    height: height * 0.4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4cbc80',
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover', 
  },
});
