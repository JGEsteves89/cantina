import Main from "./dishes/Main";
import Salad from "./dishes/Salad";
import Side from "./dishes/Side";
import Soup from "./dishes/Soup";

export default interface Menu {
	id: string,
	soup: Soup,
	main: Main,
	side?: Side,
	salad?: Salad
}