<script>
    export let component;
    export let style;
</script>

<style>
    
</style>

<div style={style}>
    <svelte:component this={component} on:login on:logout />
</div>