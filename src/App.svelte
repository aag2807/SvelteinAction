<script>
	import page from 'page'

	import Login from "./components/Login.svelte";
	import Checklist from "./components/Checklist.svelte";
	import NotFound from './components/NotFound.svelte'



	let component = Login;

	page.redirect('/', '/login')
	page('/login', () => (component = Login))
	page('/checklist', () => (component = Checklist))
	page('*', () => (component = NotFound))
	page.start();

</script>

<style>
	:global(body) {
		padding: 0;
		background-color: cornflowerblue;
	}
	.hero {
		--height: 7rem;
		background-color: orange;
		color: white;
		font-size: 4rem;
		height: var(--height);
		line-height: var(--height);
		margin: 0 0 3rem 0;
		text-align: center;
		vertical-align: middle;
		width: 100vw;
	}
	main {
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
</style>


<main>
	<h1 class="hero">Travel Packing Checklist</h1>
	<svelte:component 
		this={component}
		on:login={() => page.show('/checklist')}
		on:logout={() => page.show('/login')}
	/>
</main>
