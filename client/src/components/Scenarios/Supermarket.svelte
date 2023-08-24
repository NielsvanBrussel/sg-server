<script>
    import { avatar } from "../../stores";
    import ScenarioOption from "../core/ScenarioOption.svelte";

    export let changeIntroText
    let showOptions = true

    const forageHandler = () => {

        const rng = Math.floor(Math.random() * 100)

        if (rng > 90) {
            avatar.changeStats([{ type: 'add item', value: 'cocaine'}])
            changeIntroText('cocaine')
        } else if (rng > 80) {
            avatar.changeStats([{ type: 'add item', value: 'weed'}])
            changeIntroText('weed')
        } else if (rng > 70) {
            avatar.changeStats([{ type: 'add item', value: 'oil'}])
            changeIntroText('oil')
        } else if (rng > 60) {
            avatar.changeStats([{ type: 'add item', value: 'antifreeze'}])
            changeIntroText('antifreeze')
        } else if (rng > 50) {
            avatar.changeStats([{ type: 'add item', value: 'organs'}])
            changeIntroText('organs')
        } else if (rng > 40) {
            avatar.changeStats([{ type: 'add item', value: 'lolly'}])
            changeIntroText('lolly')
        } else if (rng > 30) {
            avatar.changeStats([{ type: 'add item', value: 'seeds'}])
            changeIntroText('seeds')
        } else if (rng > 20) {
            avatar.changeStats([{ type: 'add item', value: 'shotgun'}])
            changeIntroText('shotgun')
        } else if (rng > 10) {
            avatar.changeStats([{ type: 'add item', value: 'shroom'}])
            changeIntroText('shroom')
        } else {
            avatar.changeStats([{ type: 'add item', value: 'turd'}])
            changeIntroText('turd')
        }
    }


</script>

{#if showOptions}
    <div class="options-container">
        <ScenarioOption text="get random shit" eventHandler={() => forageHandler()}/>
    </div>           
{/if}        


<style>
    .options-container {
        width: 40%;
        text-align: left;
    }
</style>