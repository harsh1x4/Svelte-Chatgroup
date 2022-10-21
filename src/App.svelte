<script>
	import { auth, googleProvider } from "./firebase";
	import { authState } from "rxfire/auth";
    import Chatroom from "./Chatroom.svelte";

	let user;

	const unsubscribe = authState(auth).subscribe((usr) => user = usr);


	function login() {
		auth.signInWithPopup(googleProvider);
	}

	function logout() {
		auth.signOut();
	}
</script>

<main>
	<!-- Namaste World -->
	{#if user}
		<Chatroom user={user} logout={logout}/>
	{:else}
		<div class="login-form">
			<button on:click={login}>
				<i class="fa fa-google"></i>
				Sign In with Google
			</button>
		</div>
	{/if}
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30px;
		width: 100%;
		height: 100%;
		max-width: 400px;
		max-height: 600px;
		border-radius: 10px;
		background: #fff;
		border: 1px solid #eee;
		box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
	}
	.login-form{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.login-form button{
		padding: 10px;
		outline: none;
		cursor: pointer;
		border: 1px solid #bbb;
		border-radius: 5px;
	}
	.login-form button i.fa{
		padding-right: 10px;
		border-radius: 1px solid #ddd;
		color: #555;
	}
</style>
