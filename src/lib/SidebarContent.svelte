<script lang="ts">
    import vendingmachine1 from './assets/vendingmachine1.png';
    import cookie from './assets/favicon.png';
    let {name, description, location} = $props();
    
    
</script>

<style> 
    .popup {
        color: #1a1a1a;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }
    :global(.dark) .popup {
        color: #f0f0f0;
    }
    .name {
        text-align: center;
        font-size: 28px;
        margin-bottom: 10px;
    }
    .vending {
        width: 150px;
        margin-bottom: 15px;
    }
    .content-section {
        width: 100%;
        max-width: 400px;
    }
    .info-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    :global(.dark) .info-card {
        background: linear-gradient(135deg, #434343 0%, #000000 100%);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    }
    .info-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 12px;
        color: white;
    }
    .info-item:last-child {
        margin-bottom: 0;
    }
    .info-label {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        opacity: 0.9;
        margin-bottom: 4px;
    }
    .info-value {
        font-size: 16px;
        font-weight: 500;
    }
    .review-input {
        width: 100%;
        min-height: 60px;
        padding: 8px;
        border: 2px solid #ccc;
        border-radius: 5px;
        font-size: 14px;
        font-family: inherit;
        resize: vertical;
        margin-bottom: 10px;
    }
    :global(.dark) .review-input {
        background-color: #2a2a2a;
        border-color: #555;
        color: #f0f0f0;
    }
    .submit-button {
        padding: 8px 16px;
        border: 2px solid black;
        border-radius: 5px;
        background-color: transparent;
        cursor: pointer;
        font-size: 14px;
        margin-top: 10px;
    }
    .submit-button:hover {
        background-color: #000000;
        color: white;
    }
    :global(.dark) .submit-button {
        border-color: #f0f0f0;
        color: #f0f0f0;
    }
    :global(.dark) .submit-button:hover {
        background-color: #f0f0f0;
        color: #1a1a1a;
    }
    .button-div {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 15px;
    }
    .cookie-rating {
        display: flex;
        flex-direction: row-reverse;
        justify-content: center;
        margin-top: 10px;
    }
    .cookie {
        width: 35px;
        filter: brightness(40%);
    }
    .cookie:hover {
        filter: brightness(100%);
        transform: scale(1.3);
    }
    .cookie:hover~.cookie {
        filter: brightness(100%);
    }

</style>

<div class="popup">
    <h1 class="name">{name}</h1>
    <img class="vending" src={vendingmachine1} alt="vending machine 1">
    
    <div class="content-section">
        <div class="info-card">
            <div class="info-item">
                <span class="info-label">Status:</span>
                <span class="info-value">{description}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Location:</span>
                <span class="info-value">{location}</span>
            </div>
        </div>
        
        <textarea 
            class="review-input"
            id="review"
            name="review"
            placeholder="Enter your review here..."
            required
            minlength="10"
            maxlength="500"
        ></textarea>
        
        <div class="cookie-rating">
            <img class="cookie" src={cookie} alt="cookie 1">
            <img class="cookie" src={cookie} alt="cookie 2">
            <img class="cookie" src={cookie} alt="cookie 3">
            <img class="cookie" src={cookie} alt="cookie 4">
            <img class="cookie" src={cookie} alt="cookie 5">
        </div>
    </div>
    
    <div class="button-div">
        <button class="submit-button">Submit</button>
    </div>
</div>

