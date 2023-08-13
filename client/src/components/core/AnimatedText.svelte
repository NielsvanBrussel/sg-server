<script>
    import { onMount, onDestroy } from 'svelte';

    export let text
    let textElement
    let typerInterval

    onMount(async () => {
		textElement = document.querySelector(".text")
        console.log(textElement)
        animateText()
	});

    onDestroy(async () => {
        clearInterval(typerInterval);  
	});

    const animateText = () => {
        console.log("animating text")
        let i = 0;

        typerInterval = setInterval(function () {
            if (i != text.length) {
                i += 1;
                textElement.textContent = text.substr(0, i);
            } else {
                clearInterval(typerInterval);   
            }
        }, 70);
    }

</script>

<div>
    <p class="text"></p>
</div>
<style>
    .text {
        font-family: 'PS2P';
    }
</style>