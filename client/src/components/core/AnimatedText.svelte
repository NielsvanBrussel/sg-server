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
        
        let i = 0;
        const interval = 2500 / text.length
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

<div class="container">
    <p class="text"></p>
</div>
<style>
    .container {
        width: 100%;
        max-width: 100%;
    }
    .text {
        font-family: 'PS2P';
        margin: 0;
        padding: 0;
        line-height: 1.6;
    }
</style>