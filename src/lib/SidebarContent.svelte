<script lang="ts">
    import vendingmachine1 from './assets/vendingmachine1.png';
    import cookie from './assets/favicon.png';
    
    let {name, description, location} = $props();
    let showSnacks = $state(false);
    
    function toggleSnacks() {
        showSnacks = !showSnacks;
    }
    import { supabase } from '../routes/supabaseClient';

    interface Snack {
        name: string;
        price: number;
        id: number;
    }

    let snacks: Snack[] = $state([]);
    let loading = $state(false);
    let vendingMachineId: number | null = $state(null);
    let showInsertModal = $state(false);
    let allSnacks: Snack[] = $state([]);
    let selectedSnackIds: Set<number> = $state(new Set());
    let insertLoading = $state(false);


    // Use $effect to refetch snacks whenever the vending machine name changes
    $effect(() => {
        if (name) {
            fetchSnacks();
        }
    });

    async function fetchSnacks() {
        loading = true;
        try {
            console.log('Searching for vending machine:', name);
            
            // Step 1: Get vending machine ID by name
            const { data: vendingMachineData, error: vendingError } = await supabase
                .from('vending_machines')
                .select('id')
                .eq('name', name)
                .single();

            if (vendingError) {
                console.error('Error finding vending machine:', vendingError);
                return;
            }

            if (!vendingMachineData) {
                console.log('Vending machine not found');
                return;
            }

            vendingMachineId = vendingMachineData.id;
            console.log('Found vending machine ID:', vendingMachineId);

            // Step 2: Get snack IDs from vending_machine_snacks junction table
            const { data: vendingSnacksData, error: vendingSnacksError } = await supabase
                .from('vending_machine_snacks')
                .select('snack_id')
                .eq('vending_machine_id', vendingMachineId);

            if (vendingSnacksError) {
                console.error('Error fetching vending machine snacks:', vendingSnacksError);
                return;
            }

            if (!vendingSnacksData || vendingSnacksData.length === 0) {
                console.log('No snacks found for this vending machine');
                snacks = [];
                return;
            }

            const snackIds = vendingSnacksData.map(item => item.snack_id);
            console.log('Found snack IDs:', snackIds);

            // Step 3: Get snack details from snack table
            const { data: snacksData, error: snacksError } = await supabase
                .from('snacks')
                .select('name, price')
                .in('id', snackIds);

            if (snacksError) {
                console.error('Error fetching snack details:', snacksError);
                return;
            }

            if (snacksData) {
                snacks = snacksData.map((snack: any) => ({
                    name: snack.name,
                    price: snack.price,
                    id: snack.id
                }));
                console.log('Fetched snacks:', snacks);
            }

        } catch (error) {
            console.error('Unexpected error fetching snacks:', error);
        } finally {
            loading = false;
        }
    };

    async function fetchAllSnacks() {
        try {
            const { data: allSnacksData, error } = await supabase
                .from('snacks')
                .select('id, name, price');

            if (error) {
                console.error('Error fetching all snacks:', error);
                return;
            }

            if (allSnacksData) {
                allSnacks = allSnacksData.map((snack: any) => ({
                    id: snack.id,
                    name: snack.name,
                    price: snack.price
                }));
            }
        } catch (error) {
            console.error('Error fetching all snacks:', error);
        }
    }

    function openInsertModal() {
        showInsertModal = true;
        selectedSnackIds.clear();
        fetchAllSnacks();
    }

    function closeInsertModal() {
        showInsertModal = false;
        selectedSnackIds.clear();
    }

    function toggleSnackSelection(snackId: number) {
        const newSelected = new Set(selectedSnackIds);
        if (newSelected.has(snackId)) {
            newSelected.delete(snackId);
        } else {
            newSelected.add(snackId);
        }
        selectedSnackIds = newSelected;
    }

    async function insertSelectedSnacks() {
        if (!vendingMachineId || selectedSnackIds.size === 0) return;
        
        insertLoading = true;
        try {
            // Prepare data for insertion
            const insertData = Array.from(selectedSnackIds).map(snackId => ({
                vending_machine_id: vendingMachineId,
                snack_id: snackId
            }));

            const { error } = await supabase
                .from('vending_machine_snacks')
                .insert(insertData);

            if (error) {
                console.error('Error inserting snacks:', error);
                alert('Error adding snacks to vending machine');
                return;
            }

            console.log('Successfully added snacks to vending machine');
            alert(`Successfully added ${selectedSnackIds.size} snacks to the vending machine!`);
            
            // Refresh the snacks display and close modal
            await fetchSnacks();
            closeInsertModal();

        } catch (error) {
            console.error('Error inserting snacks:', error);
            alert('Unexpected error occurred');
        } finally {
            insertLoading = false;
        }
    }
    let session = $state<any>(null);
    const fetchSession = async () => {
		const {
			data: { session: newSession }
		} = await supabase.auth.getSession();
		session = newSession;
	};

	$effect(() => {
		fetchSession();

		// Listen for auth changes
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event, newSession) => {
			session = newSession;
		});

		return () => subscription.unsubscribe();
	});
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
    .show-snacks-button {
        padding: 8px 16px;
        border: 2px solid #667eea;
        border-radius: 5px;
        background-color: transparent;
        color: #667eea;
        cursor: pointer;
        font-size: 14px;
        margin-top: 10px;
        margin-left: 10px;
        transition: all 0.2s ease;
        
    }
    .show-snacks-button:hover {
        background-color: #667eea;
        color: white;
    }
    :global(.dark) .show-snacks-button {
        border-color: #8b9dc3;
        color: #8b9dc3;
    }
    :global(.dark) .show-snacks-button:hover {
        background-color: #8b9dc3;
        color: #1a1a1a;
    }
    .snacks-section {
        width: 100%;
        max-width: 600px;
        margin-top: 20px;
        padding: 20px;
        border-radius: 12px;
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    :global(.dark) .snacks-section {
        background: #2a2a2a;
        border-color: #555;
    }
    .snacks-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 15px;
        text-align: center;
        color: #1a1a1a;
    }
    :global(.dark) .snacks-title {
        color: #f0f0f0;
    }
    .snacks-table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        max-height: 300px;
        overflow-y: auto;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* Internet Explorer and Edge */
    }
    .snacks-table::-webkit-scrollbar {
        display: none; /* Chrome, Safari, and Opera */
    }
    :global(.dark) .snacks-table {
        background: #1a1a1a;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    .snacks-table th,
    .snacks-table td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #dee2e6;
    }
    :global(.dark) .snacks-table th,
    :global(.dark) .snacks-table td {
        border-bottom-color: #555;
    }
    .snacks-table th {
        background-color: #f8f9fa;
        font-weight: 600;
        color: #495057;
    }
    :global(.dark) .snacks-table th {
        background-color: #343a40;
        color: #f8f9fa;
    }
    .snacks-table td {
        color: #1a1a1a;
    }
    :global(.dark) .snacks-table td {
        color: #f0f0f0;
    }
    .empty-state {
        text-align: center;
        padding: 40px 20px;
        color: #6c757d;
        font-style: italic;
    }
    :global(.dark) .empty-state {
        color: #adb5bd;
    }

    .insert-snacks-button {
        padding: 8px 16px;
        border: 2px solid #28a745;
        border-radius: 5px;
        background-color: transparent;
        color: #28a745;
        cursor: pointer;
        font-size: 14px;
        margin-top: 10px;
        margin-left: 10px;
        transition: all 0.2s ease;
    }
    .insert-snacks-button:hover {
        background-color: #28a745;
        color: white;
    }
    :global(.dark) .insert-snacks-button {
        border-color: #34d058;
        color: #34d058;
    }
    :global(.dark) .insert-snacks-button:hover {
        background-color: #34d058;
        color: #1a1a1a;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal {
        background: white;
        border-radius: 12px;
        padding: 24px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    :global(.dark) .modal {
        background: #2a2a2a;
        color: #f0f0f0;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        border-bottom: 1px solid #dee2e6;
        padding-bottom: 12px;
    }
    :global(.dark) .modal-header {
        border-bottom-color: #555;
    }

    .modal-title {
        font-size: 20px;
        font-weight: 600;
        margin: 0;
    }

    .close-modal-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .close-modal-btn:hover {
        color: #000;
    }
    :global(.dark) .close-modal-btn {
        color: #aaa;
    }
    :global(.dark) .close-modal-btn:hover {
        color: #fff;
    }

    .snacks-list {
        margin-bottom: 20px;
        max-height: 300px;
        overflow-y: auto;
    }

    .snack-item {
        display: flex;
        align-items: center;
        padding: 12px;
        border: 1px solid #dee2e6;
        border-radius: 6px;
        margin-bottom: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .snack-item:hover {
        background-color: #f8f9fa;
        border-color: #667eea;
    }
    .snack-item.selected {
        background-color: #e7f3ff;
        border-color: #667eea;
    }
    :global(.dark) .snack-item {
        border-color: #555;
        background-color: #1a1a1a;
    }
    :global(.dark) .snack-item:hover {
        background-color: #333;
        border-color: #8b9dc3;
    }
    :global(.dark) .snack-item.selected {
        background-color: #2d3748;
        border-color: #8b9dc3;
    }

    .snack-checkbox {
        margin-right: 12px;
    }

    .snack-info {
        flex-grow: 1;
    }

    .snack-name {
        font-weight: 500;
        margin-bottom: 2px;
    }

    .snack-price {
        color: #666;
        font-size: 14px;
    }
    :global(.dark) .snack-price {
        color: #aaa;
    }

    .modal-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
    }

    .modal-btn {
        padding: 8px 16px;
        border-radius: 5px;
        border: 2px solid;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease;
    }

    .modal-btn.primary {
        background-color: #667eea;
        border-color: #667eea;
        color: white;
    }
    .modal-btn.primary:hover {
        background-color: #5a67d8;
        border-color: #5a67d8;
    }
    .modal-btn.primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .modal-btn.secondary {
        background-color: transparent;
        border-color: #6c757d;
        color: #6c757d;
    }
    .modal-btn.secondary:hover {
        background-color: #6c757d;
        color: white;
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
        <button class="show-snacks-button" onclick={toggleSnacks}>
            {showSnacks ? 'Hide Snacks' : 'Show Snacks'}
        </button>
        {#if session}
            <button class="insert-snacks-button" onclick={openInsertModal}>
                Insert Snacks
            </button>
        {/if}
    </div>
    
    {#if showSnacks}
        <div class="snacks-section">
            <h2 class="snacks-title">Available Snacks</h2>

            <table class="snacks-table">
                <thead>
                    <tr>
                        <th>Snack Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {#if loading}
                        <tr>
                            <td colspan="2" class="empty-state">
                                Loading snacks...
                            </td>
                        </tr>
                    {:else if snacks.length === 0}
                        <tr>
                            <td colspan="2" class="empty-state">
                                No snacks available for this vending machine
                            </td>
                        </tr>
                    {:else}
                        {#each snacks as snack}
                            <tr>
                                <td>{snack.name}</td>
                                <td>${snack.price.toFixed(2)}</td>
                            </tr>
                        {/each}
                    {/if}
                </tbody>
            </table>
        </div>
    {/if}
</div>

{#if showInsertModal}
    <div class="modal-overlay" onclick={closeInsertModal}>
        <div class="modal" onclick={(e) => e.stopPropagation()}>
            <div class="modal-header">
                <h3 class="modal-title">Add Snacks to Vending Machine</h3>
                <button class="close-modal-btn" onclick={closeInsertModal}>×</button>
            </div>
            
            <div class="snacks-list">
                {#each allSnacks as snack}
                    <div 
                        class="snack-item" 
                        class:selected={selectedSnackIds.has(snack.id!)}
                        onclick={() => toggleSnackSelection(snack.id!)}
                    >
                        <input 
                            type="checkbox" 
                            class="snack-checkbox"
                            checked={selectedSnackIds.has(snack.id!)}
                            onchange={() => toggleSnackSelection(snack.id!)}
                        />
                        <div class="snack-info">
                            <div class="snack-name">{snack.name}</div>
                            <div class="snack-price">${snack.price.toFixed(2)}</div>
                        </div>
                    </div>
                {/each}
            </div>
            
            <div class="modal-actions">
                <button class="modal-btn secondary" onclick={closeInsertModal}>
                    Cancel
                </button>
                <button 
                    class="modal-btn primary" 
                    onclick={insertSelectedSnacks}
                    disabled={selectedSnackIds.size === 0 || insertLoading}
                >
                    {insertLoading ? 'Adding...' : `Add ${selectedSnackIds.size} Snack${selectedSnackIds.size === 1 ? '' : 's'}`}
                </button>
            </div>
        </div>
    </div>
{/if}

