<script lang="ts">
    import vendingmachine1 from './assets/vendingmachine1.png';
    import cookie from './assets/CookieFavicon.png';
    let {name, description} = $props();
    
    
</script>

<style> 
    .name {
        text-align: center;
        font-size: 48px;
    }
    .vending {
        width: 250px;
        padding-right: 50px;
        padding-left: 40px;
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
    .desc {
        padding-bottom: 90px;
        font-size: 24;
    }
    .cookie {
        width: 45px;
        filter: brightness(40%);
        float: right;
    }
    .cookie:hover {
        filter: brightness(100%);
        transform: scale(1.5);
    }

</style>

<div class="popup">
    <h1 class="name">Hello {name}</h1>
    <div class="row1">
        <img class="vending" src={vendingmachine1} alt="vending machine 1">
        <div class="col1">
            <h2 class="desc"> {description} </h2> 
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
    <div class="cookie-rating">
        <img class="cookie" src={cookie} alt="cookie 1">
        <img class="cookie" src={cookie} alt="cookie 2">
        <img class="cookie" src={cookie} alt="cookie 3">
        <img class="cookie" src={cookie} alt="cookie 4">
        <img class="cookie" src={cookie} alt="cookie 5">
    </div>
    <div>
    <button class="submit-button">Submit</button>
    </div>
</div>

