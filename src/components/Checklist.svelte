<script>
	import { createEventDispatcher } from "svelte";

	//Components
	import { flip } from "svelte/animate";
	import Category from "./Category.svelte";
	import Dialog from "./Dialog.svelte";
	
	//Utilities
	import { getGuid, sortOnName } from "./Util";

	const dispatch = createEventDispatcher();
	const options = { duration: 700 };

	let categoryArray = [];
	let categories = {};
	let categoryName;
	let dialog = null;
	let message = "";
	let show = "all";

	$: categoryArray = sortOnName(Object.values(categories));

	let dragAndDrop = {
		drag(event, categoryId, itemId) {
			const data = { categoryId, itemId };
			event.dataTransfer.setData("text/plain", JSON.stringify(data));
		},
		drop(event, categoryId) {
			const json = event.dataTransfer.getData("text/plain");
			const data = JSON.parse(json);
			const category = categories[data.categoryId];
			const item = category.items[data.itemId];
			delete category.items[data.itemId];
			categories[categoryId].items[data.itemId] = item;
			categories = categories;
		},
	};

	const addCategory = () => {
		const duplicate = Object.values(categories).some(
			(cat) => cat.name === categoryName
		);
		if (duplicate) {
			message = `The category "${categoryName}" already exists.`;
			dialog.showModal();
			return;
		}
		const id = getGuid();
		categories[id] = { id, name: categoryName, items: {} };
		categories = categories; // trigger update
		categoryName = ""; // clear the input
	};

	const clearAllChecks = () => {
		for (const category of Object.values(categories)) {
			for (const item of Object.values(category.items)) {
				item.packed = false;
			}
		}
		categories = categories;
	};

	const deleteCategory = (category) => {
		if (Object.values(category.items).length) {
			message = "This category is not empty.";
			dialog.showModal();
			return;
		}
		delete categories[category.id];
		categories = categories;
	};

	restore();

	$: if (categories) persist();

	function persist () {
		localStorage.setItem("travel-packing", JSON.stringify(categories));
	};

	function restore () {
		const text = localStorage.getItem("travel-packing");
		if (text && text !== "{}") {
			categories = JSON.parse(text);
		}
	};
</script>

<style>
	.categories {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	/* .clear {
		margin-left: 30px;
	} */

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

	.animate {
		display: inline-block;
	}

	.wrapper {
		display: inline;
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
			<button class="logout-btn" on:click={() => dispatch('logout')}>
				Log Out
			</button>
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
			<div class="wrapper" animate:flip={options}>
				<Category
					dnd={dragAndDrop}
					bind:category
					{categories}
					{show}
					on:persist={persist}
					on:delete={deleteCategory(category)} />
			</div>
		{/each}
	</div>
</section>

<Dialog title="Checklist" bind:dialog>
	<div>{message}</div>
</Dialog>
