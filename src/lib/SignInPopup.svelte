<script lang="ts">
	import { isSignInOpen } from './stores/SignInStore';
	import { supabase } from '../routes/supabaseClient';
	
	function closePopup() {
		isSignInOpen.set(false);
	}
	
	async function handleSignIn(event: Event) {
		event.preventDefault();
		// Sign in logic will go here
		const { data, error } = await supabase.auth.signInWithPassword({
			email: (event.target as HTMLFormElement).email.value,
			password: (event.target as HTMLFormElement).password.value
		});
		if (error) {
			console.error('Sign in error:', error);
			return;
		}
		console.log('Signed in:', data);
	}
	
	function handleSignUp(event: Event) {
		event.preventDefault();
		// Sign up logic will go here
		console.log('Sign up button clicked');
	}
</script>

<style>
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2000;
		animation: fadeIn 0.2s ease-in-out;
	}
	
	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}
	
	.popup {
		background: white;
		border-radius: 16px;
		padding: 2.5rem;
		width: 90%;
		max-width: 400px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		position: relative;
		animation: slideUp 0.3s ease-out;
	}
	
	@keyframes slideUp {
		from {
			transform: translateY(20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
	
	:global(.dark) .popup {
		background: rgb(31, 41, 55);
		color: #f0f0f0;
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
	
	h2 {
		text-align: center;
		margin-bottom: 1.5rem;
		font-size: 1.75rem;
		font-weight: 700;
		color: #1a1a1a;
	}
	
	:global(.dark) h2 {
		color: #f0f0f0;
	}
	
	.form-group {
		margin-bottom: 1.25rem;
	}
	
	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		font-size: 0.9rem;
		color: #1a1a1a;
	}
	
	:global(.dark) label {
		color: #f0f0f0;
	}
	
	input {
		width: 100%;
		padding: 0.75rem;
		border: 2px solid #e5e7eb;
		border-radius: 8px;
		font-size: 1rem;
		transition: all 0.2s;
		box-sizing: border-box;
		color: #1a1a1a;
		background-color: white;
	}
	
	input:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}
	
	:global(.dark) input {
		background-color: rgb(17, 24, 39);
		border-color: #4b5563;
		color: #f0f0f0;
	}
	
	:global(.dark) input:focus {
		border-color: #818cf8;
		box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.1);
	}
	
	.button-group {
		display: flex;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}
	
	button[type="submit"] {
		width: 100%;
		padding: 0.75rem;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		margin-top: 1.5rem;
		cursor: pointer;
		transition: all 0.2s;
	}
	
	button[type="submit"] {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}
	
	button[type="submit"]:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
	}
	
	.signup-button {
		background: transparent;
		border: 2px solid #667eea;
		color: #667eea;
	}
	
	.signup-button:hover {
		background: #667eea;
		color: white;
		transform: translateY(-2px);
	}
	
	:global(.dark) .signup-button {
		border-color: #818cf8;
		color: #818cf8;
	}
	
	:global(.dark) .signup-button:hover {
		background: #818cf8;
		color: white;
	}
	
	.divider {
		text-align: center;
		margin: 1.5rem 0;
		position: relative;
	}
	
	.divider::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		height: 1px;
		background: #e5e7eb;
	}
	
	:global(.dark) .divider::before {
		background: #4b5563;
	}
	
	.divider span {
		background: white;
		padding: 0 1rem;
		position: relative;
		font-size: 0.875rem;
		color: #6b7280;
	}
	
	:global(.dark) .divider span {
		background: rgb(31, 41, 55);
		color: #9ca3af;
	}
	
	.forgot-password {
		text-align: right;
		margin-top: 0.5rem;
	}
	
	.forgot-password a {
		color: #667eea;
		font-size: 0.875rem;
		text-decoration: none;
		transition: color 0.2s;
	}
	
	.forgot-password a:hover {
		color: #764ba2;
		text-decoration: underline;
	}
	
	:global(.dark) .forgot-password a {
		color: #818cf8;
	}
	
	:global(.dark) .forgot-password a:hover {
		color: #a5b4fc;
	}
</style>

<div 
  class="overlay" 
  onclick={closePopup} 
  onkeydown={(e) => e.key === 'Escape' && closePopup()} 
  role="button"
  tabindex="0"
  aria-label="Close dialog"
>
  <div class="popup" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
		<button class="close-button" onclick={closePopup} aria-label="Close">
			✕
		</button>
		
		<h2>Welcome Back!</h2>
		
		<form onsubmit={(e) => { handleSignIn(e); closePopup(); }}> 
			<div class="form-group">
				<label for="email">Email</label>
				<input 
					type="email" 
					id="email" 
					name="email" 
					placeholder="your.email@example.com"
					required
				/>
			</div>
			
			<div class="form-group">
				<label for="password">Password</label>
				<input 
					type="password" 
					id="password" 
					name="password" 
					placeholder="••••••••"
					required
				/>
			</div>
			
			<div class="forgot-password">
				<a href="#forgot">Forgot password?</a>
			</div>
			
			<button type="submit">Sign In</button>
		</form>
		
		<div class="divider">
			<span>or continue with</span>
		</div>
		
		<div class="button-group">
			<button type="button" class="signup-button" style="flex: 1;">Google</button>
			<button type="button" class="signup-button" style="flex: 1;">GitHub</button>
		</div>
	</div>
</div>
