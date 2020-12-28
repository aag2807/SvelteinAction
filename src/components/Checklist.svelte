<script>
	import Category from "./Category.svelte";
	import { getGuid, sortOnName } from "./Util";

	let categoryArray = [];
	let categories = {};
	let categoryName;
	let message = "";
	let show = "all";

	$: categoryArray = sortOnName(Object.values(categories));

	const addCategory = () => {
		const duplicate = Object.values(categories).some(
			(cat) => cat.name === categoryName
		);
		if (duplicate) {
			message = `The category "${categoryName}" already exists.`;
			alert(message);
			return;
		}
		const id = getGuid();
		categories[id] = { id, name: categoryName, items: {} };
		categories = categories;
		categoryName = "";
	};

	const clearAllChecks = () => {
		for (const category of Object.values(categories)) {
			for (const item of Object.values(category.items)) {
				item.packed = false;
			}
		}
		categories = categories;
	};
</script>

<style>
	.categories {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.clear {
		margin-left: 30px;
	}

	input[type="radio"] {
		--size: 24px;
		height: var(--size);
		width: var(--size);
		margin-left: 10px;
	}
	.logout-btn {
		position: absolute;
		right: 20px;
		top: 20px;
	}
	.radios {
		display: flex;
		align-items: center;
	}
	.radios > label:not(:first-of-type) {
		display: inline-flex;
		align-items: center;
		margin-left: 1em;
	}
	.radios > label > input {
		margin-bottom: -3px;
		margin-right: 5px;
	}
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24px;
		margin-top: 1em;
	}
</style>

<!-- markup (zero or more items) goes here -->
<section>
	<header>
		<form on:submit|preventDefault={addCategory}>
			<label>
				New Category
				<input type="text" bind:value={categoryName} />
			</label>
			<button disabled={!categoryName}>Add Category</button>
			<button class="logout-btn"> Log Out </button>
		</form>
		<p>
			Suggested categories include backpack, clothes,
			<br />
			last minute,medicines, running gear, and toiletries
		</p>

		<div class="radios">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label>Show</label>
			<label>
				<input name="show" type="radio" value="all" bind:group={show} />
				All
			</label>
			<label>
				<input name="show" type="radio" value="packed" bind:group={show} />
				Packed
			</label>
			<label>
				<input name="show" type="radio" value="unpacked" bind:group={show} />
				Unpacked
			</label>
		</div>
	</header>

	<div class="categories">
		{#each categoryArray as category (category.id)}
			<Category bind:category {categories} {show} />
		{/each}
	</div>
</section>
