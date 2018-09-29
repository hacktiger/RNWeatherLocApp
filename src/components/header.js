// imports
import React from 'react';
import { 
	Text,
	StyleSheet, 
	View 
} from 'react-native';

//Make components
const Header = (props) => {
	return (
		<View style = {styles.headerBox}>
			<Text style = {styles.headerTextStyle}> { props.headerText } </Text>
		</View>	
	)
};

const styles = StyleSheet.create({
	headerTextStyle : {
		fontSize : 20,
		color : '#FFFFFF',
	},

	headerBox : {
		backgroundColor :'#3b5998',
		alignItems : 'center',
		justifyContent : 'center',
		height : 60,
		shadowColor : '#000',
		shadowOffset : { width:0 , height : 2 },
		shadowOpacity : 0.2,
		elevation : 2,
		position : 'relative'
	},

});

//Export components (usable in other area)
export default Header;