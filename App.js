import { useState } from "react";
import {
	StyleSheet,
	View,
	FlatList,
	TextInput,
	Pressable,
	Text,
} from "react-native";

import ListItem from "./components/ListItem.js";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import uuid from "uuid";

import Words from "./constants/Dictonary.js";

export default function App() {
	// Initialisation of the state
	const [search, setSearch] = useState("");
	const [listItems, setListItems] = useState([]);
	const [filteredListItems, setFilteredListItems] = useState([]);

	// adds a new item to the list
	function addItemHandler(newListItem) {
		newListItem = Words[Math.floor(Math.random() * Words.length)]; // selects a random word from the Words file
		setListItems((currentListItems) => [
			...currentListItems,
			{ text: newListItem, key: uuid.v4() },
		]);
		setFilteredListItems(listItems);
	}

	// filtering the items in the list
	function searchInputHandler(enteredQuery) {
		const filteredData = listItems.filter((items) => {
			return items.text.toLowerCase().includes(search.toLowerCase()); // Filters the list items based on the search
		});
		setFilteredListItems(filteredData);
		setSearch(enteredQuery);
		if (enteredQuery.length == 0) {
			// if the search bar is empty, present all the list items
			setFilteredListItems(listItems);
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.utilityContainer}>
				<TextInput
					style={styles.searchInput}
					placeholder="Search"
					onChangeText={searchInputHandler}
					value={search}
				/>
				<View style={styles.addButtonContainer}>
					<Pressable
						android_ripple={{ color: "#f4f4f4", borderless: false }}
						style={styles.addButton}
						onPress={addItemHandler}
					>
						<FontAwesome size={16} color={"#fff"} name="plus" />
					</Pressable>
				</View>
			</View>
			<View style={styles.listContainer}>
				<FlatList
					data={filteredListItems}
					renderItem={(itemData) => {
						return (
							<ListItem id={itemData.item.key} text={itemData.item.text} />
						);
					}}
					ListEmptyComponent={() => {
						return (
							<View style={styles.emptyContainer}>
								<Text>No Items in the list</Text>
							</View>
						);
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		paddingHorizontal: 16,
		flex: 1,
	},

	listContainer: {
		flex: 5,
	},
	utilityContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#cccccc",
		paddingBottom: 24,
		marginBottom: 24,
	},
	searchInput: {
		borderWidth: 1,
		borderColor: "#cccccc",
		width: "70%",
		marginRight: 8,
		padding: 8,
	},
	addButtonContainer: {
		width: "20%",
		fontSize: 24,
		borderLeftWidth: 1,
		borderColor: "#cccccc",
		paddingLeft: 16,
		paddingVertical: 8,
	},
	addButton: {
		width: 48,
		height: 48,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "steelblue",
	},
	emptyContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
});
