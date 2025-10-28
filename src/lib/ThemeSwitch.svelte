<script lang="ts">
    import { browser } from '$app/environment';
    import { darkMode } from './stores/ThemeStore';

    function handleSwitchDarkMode() {
        darkMode.update(value => !value);
        
        darkMode.subscribe(value => {
            if (browser) {
                localStorage.setItem('theme', value ? 'dark' : 'light');
                
                if (value) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        });
    }

    if (browser) {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
            darkMode.set(true);
        } else {
            document.documentElement.classList.remove('dark');
            darkMode.set(false);
        }
    }
</script>

<div>
    <input checked={$darkMode} on:click={handleSwitchDarkMode} type="checkbox" id="theme-toggle" />
    <!-- svelte-ignore element_invalid_self_closing_tag -->
    <label for="theme-toggle" />
</div>

<style lang="postcss">
    @reference '../app.css';
    
    #theme-toggle {
        @apply invisible;
    }

    #theme-toggle + label {
        @apply inline-block cursor-pointer h-12 w-12 absolute top-6 right-37 rounded-full duration-300 content-[''];
    }

    #theme-toggle:not(:checked) + label {
        @apply bg-amber-400;
    }

    #theme-toggle:checked + label {
        @apply bg-transparent;
        box-shadow: inset -18px -16px 1px 1px #ddd;
    }
</style>