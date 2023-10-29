<script>
    export let changeNumber
    export let enterNumber
    export let error

    export let number


    const AddNumberHandler = (value) => {
        if (number.length < 11) {
            // add - every 3 numbers
            if (number.length === 3 || number.length === 7) {
                var x = number.concat(`-${value}`)
            } else {
                var x = number.concat(`${value}`)
            }
            number = x
            changeNumber(number)            
        }
    }

    const resetNumber = () => {
        number = ""
        changeNumber("") 
    }

</script>


<div class="keypad-container">
    <div class={error ? "display-container error" : "display-container"}>
        <p class="display-text">{number}</p>
    </div>
    <div class="flex-row">
        <button class="button-nav" on:click={() => AddNumberHandler(1)}>1</button>
        <button class="button-nav" on:click={() => AddNumberHandler(2)}>2</button>
        <button class="button-nav" on:click={() => AddNumberHandler(3)}>3</button>
    </div>
    <div class="flex-row">
        <button class="button-nav" on:click={() => AddNumberHandler(4)}>4</button>
        <button class="button-nav" on:click={() => AddNumberHandler(5)}>5</button>
        <button class="button-nav" on:click={() => AddNumberHandler(6)}>6</button>
    </div>
    <div class="flex-row">
        <button class="button-nav" on:click={() => AddNumberHandler(7)}>7</button>
        <button class="button-nav" on:click={() => AddNumberHandler(8)}>8</button>
        <button class="button-nav" on:click={() => AddNumberHandler(9)}>9</button>
    </div>
    <div class="flex-row">
        <button class="button-nav" on:click={() => AddNumberHandler(0)}>0</button>
        <button class="button-nav" on:click={() => resetNumber()}>*</button>
        <button class="button-nav" on:click={() => enterNumber()}>OK</button>
    </div>
</div>





<style>


    @keyframes borderBlink {    
        from, to {    
            border-color: white;    
        }    
        12.5% {    
            border-color: red    
        }
        25% {
            border-color: white;
        }  
        37.5% {    
            border-color: red    
        }
        50% {
            border-color: white;
        }  
        62.5% {    
            border-color: red    
        }
        75% {
            border-color: white;
        }  
        87.5% {    
            border-color: red    
        }   
    } 

    .keypad-container {
        width: 14rem;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
        justify-content: start;
        gap: 1rem;
        margin-bottom: 1rem;
        width: 15rem;
    }

    .display-container {
        border: solid 3px white;
        width: calc(17rem - 4px);
        height: 3rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 1rem;
    }

    .error {
        animation: 2s forwards linear borderBlink;
    }

    .display-text {
        margin: 0 1.5rem;
        font-size: 1.25rem;
        font-family: 'PS2P';
        width: auto;
    }

    .button-nav {
        border: solid 2px #F48C06;
		min-height: 3rem;
		min-width: 5rem;
		color: #F48C06;
		background-color: #CD173F;
        font-family: "PS2P";
	}
	.button-nav:hover {
		scale: 1.02;
        border-color: #faa334;
	}
	button:focus-visible {
  		outline: none !important;
	}
	.button-nav:active{
		-webkit-box-shadow: 2px 2px 0px 2px #91173F inset;
		box-shadow: 2px 2px 0px 2px #91173F inset;
		scale: 1.02;
		border: solid 2px #F48C06;
        opacity: 0.9;
	}

</style>
