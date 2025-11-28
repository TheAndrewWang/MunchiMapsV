<script lang="ts">
    import { sidebarOpen, selectedLocation } from './stores/SidebarStore';
    import PopupContent from './SidebarContent.svelte';
    
    function closeSidebar() {
        sidebarOpen.set(false);
    }
</script>

<style>
    .sidebar {
        position: fixed;
        top: 80px; /* Start below navbar */
        left: 0;
        height: calc(100vh - 80px); /* Full height minus navbar */
        width: 500px;
        background-color: white;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
        z-index: 500; /* Below navbar (1000) but above map */
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
        overflow-y: auto;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* Internet Explorer and Edge */
    }
    
    .sidebar::-webkit-scrollbar {
        display: none; /* Chrome, Safari, and Opera */
    }
    
    .sidebar.open {
        transform: translateX(0);
    }
    
    :global(.dark) .sidebar {
        background-color: rgb(17, 24, 39);
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
    }
    
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
    
    :global(.dark) .close-button {
        color: #ddd;
    }
    
    :global(.dark) .close-button:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: #fff;
    }
    
    .sidebar-content {
        padding: 1rem;
    }
</style>

<div class="sidebar" class:open={$sidebarOpen}>
    <button class="close-button" onclick={closeSidebar} aria-label="Close">
        ✕
    </button>
    <div class="sidebar-content">
        {#if $selectedLocation}
            <PopupContent 
                name={$selectedLocation.label} 
                description={$selectedLocation.desc}
                location={$selectedLocation.location}
            />
        {/if}
    </div>
</div>
