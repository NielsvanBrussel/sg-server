<script>
    import { onMount, onDestroy } from 'svelte';

    export let text
    let textElement
    let typerInterval

    onMount(async () => {
		textElement = document.querySelector(".text")
        animateText()
	});

    $: text && animateText()

    onDestroy(async () => {
        clearInterval(typerInterval);  
	});

    const animateText = () => {
        console.log("animating text")
        let i = 0;
        const interval = 3000 / text.length
        clearInterval(typerInterval)

        typerInterval = setInterval(function () {
            if (i != text.length) {
                i += 1;
                textElement.textContent = text.substr(0, i);
            } else {
                clearInterval(typerInterval);   
            }
        }, interval);
    }

</script>

<div>
    <p class="text"></p>
</div>
<style>
    .text {
        font-family: 'PS2P';
        min-height: 40vh;
    }
</style>