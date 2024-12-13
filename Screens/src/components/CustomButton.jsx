import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const CustomButton = ({ flatListRef, flatListIndex, dataLength, onFinish,navigation }) => {

  // Animated style for the button width and height change
  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(140)  // Wider button on the last page
          : withSpring(60),  // Narrow button on other pages
      height: 60,
    };
  });

  // Animated style for the arrow icon movement and opacity
  const arrowAnimationStyle = useAnimatedStyle(() => {
    return {
      width: 30,
      height: 30,
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(100) // Move the arrow out of view on the last page
              : withTiming(0),
        },
      ],
    };
  });

  // Animated style for the button text change
  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)  // Text comes into view on the last page
              : withTiming(-100),  // Move text out of view on other pages
        },
      ],
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          // Scroll to next page if not on the last page
          flatListRef.current.scrollToIndex({ index: flatListIndex.value + 1 });
        } else {
          // Complete onboarding and navigate to Login screen
          onFinish();  // Trigger the finish handler passed from OnboardingScreen
          navigation.navigate('Login');
        }
      }}>
      <Animated.View style={[styles.container, buttonAnimationStyle]}>
        {/* Text "Get Started" appears on the last page */}
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          Get Started
        </Animated.Text>

        {/* Arrow icon animations */}
        <Animated.Image
          source={require('../assets/ArrowIcon.png')}
          style={[styles.arrow, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  arrow: {
    position: 'absolute',
  },
  textButton: { color: 'white', fontSize: 16, position: 'absolute' },
});
