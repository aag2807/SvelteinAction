import { action } from "@storybook/addon-actions";
import StyleWrapper from "./StyleWrapper.svelte";
import Login from "../components/Login.svelte";
import "../../public/global.css";

export default {title: 'Login'};

export const basic = () => ({
	Component: StyleWrapper,
	props: {
		component: Login,
		style: `
			background-color: yellow;
			height: 100vh;
			padding: 1rem;
		`
	},
	on: {login: action('login dipatched')}
});