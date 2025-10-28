<script lang="ts">
    import { isOverlayOpen } from './stores/OverlayStore';
    let { children } = $props();
    
    function closeOverlay() {
        isOverlayOpen.set(false);
    }
    
    function handleBackdropClick(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            closeOverlay();
        }
    }
</script>

<style>
    .close-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: transparent;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: all 0.2s;
    }
    
    .close-button:hover {
        background-color: #f0f0f0;
        color: #000;
    }
</style>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div 
    class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center z-[2000]" 
    onclick={handleBackdropClick}
    role="button"
    tabindex="-1"
>
    <div class="bg-white text-black rounded-md px-8 py-10 relative max-w-lg shadow-lg" >
        <button class="close-button" onclick={closeOverlay} aria-label="Close">
            ✕
        </button>
        {@render children?.()}
    </div>
</div>