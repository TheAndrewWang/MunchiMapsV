<script lang="ts">
    import vendingmachine1 from './assets/vendingmachine1.jpg';
    let {name} = $props();
    
</script>

<style> 
    .name {
        text-align: center;
    }
    .vending {
        width: 200px;

    }
    .row1 {
        display: flex;
        align-items: center;
    }
    .col1 {
        flex-direction: column;
    }
    .submit-button {
        padding: 5px 10px;
        border: 2px solid black;
        border-radius: 5px;
        float: right;
    }
    .submit-button:hover {
        background-color: #000000;
        color: white;
        cursor: pointer;
    }
</style>

<div class="popup">
    <h1 class="name">Hello {name}</h1>
    <div class="row1">
        <img class="vending" src={vendingmachine1} alt="vending machine 1">
        <div class="col1">
            <h2> This is the Sage Vending Machine located on the second floor </h2> 
            <input 
                type="text"
                id="name"
                name="name"
                placeholder="Enter review"
                required
                minlength="4"
                maxlength="8"
                size="10"
            />
        </div>
    </div>
    <button class="submit-button">Submit</button>
</div>

