import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Loader } from 'lucide-react-native';

export function Loading({ color = "white" }: { color?: string }) {
	const spinValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.loop(
			Animated.timing(spinValue, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			})
		).start();
	}, [spinValue]);

	const spin = spinValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	return (
		<Animated.View style={{ transform: [{ rotate: spin }], width: 16, height: 16, alignItems: 'center', justifyContent: 'center' }}>
			<Loader color={color} />
		</Animated.View>
	);
}
