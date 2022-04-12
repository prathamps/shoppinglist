import { StyleSheet, View, Text } from "react-native";

function ListItem(props) {
	return (
		<View key={props.id} style={styles.listItem}>
			<Text style={styles.listItemText}>{props.text}</Text>
		</View>
	);
}

export default ListItem;

const styles = StyleSheet.create({
	listItem: {
		margin: 8,
		padding: 8,
		borderBottomWidth: 1,
		borderRadius: 6,
		backgroundColor: "#f4f4f4",
	},
	listItemText: {
		fontSize: 16,
	},
});
