import React from 'react';
import { View , StyleSheet} from 'react-native';

const Card = () => {
	return (
		<View style = {styles.containerStyle}>
			
		</View>
	);
};

const styles = StyleSheet.create ({
	containerStyle : {
		borderWidth: 0.5,
		borderRadius : 2,
		borderColor: '#ddd',
		borderBottomWidth : 0,
		shadowColor : '#000',
		shadowOffset : {width : 0, height : 1},
		shadowOpacity : 0.1,
		shadowRadius : 2,
		elevation : 1,



	}
});

export default Card;