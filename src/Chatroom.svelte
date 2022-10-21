<script>
	import { db } from "./firebase";
	import { collectionData } from "rxfire/firestore";
	import { startWith } from "rxjs/operators";

	export let user;
	export let logout;

	let message = "";

	const query = db.collection("chats").orderBy("sentAt");
	const chats = collectionData(query, "id").pipe(startWith([]));

	function sendMessage() {
		db.collection("chats").add({
			uid: user.uid,
			message: message,
			avatar: user.photoURL,
			sentAt: +new Date(),
		});
		message = "";
	}

</script>

<main>
	<div class="header">
		<div class="logo">Chatroom</div>
		<button on:click={logout}>Logout</button>
	</div>
	<div class="messages">
		{#each $chats as chat}
			{#if user.uid == chat.uid}
				<div class="message my-message">
					<div class="text">
						{chat.message}
					</div>
				</div>
			{:else}
				<div class="message other-message">
					<div class="avatar">
						<img src={chat.avatar} alt="Avatar" />
					</div>
					<div class="text">
						{chat.message}
					</div>
				</div>
			{/if}
		{/each}
	</div>
	<div class="form">
		<input type="text" bind:value={message} />
		<button on:click={sendMessage}>
			<i class="fa fa-paper-plane" />
		</button>
	</div>
</main>

<style>
	main {
		height: 100%;
		width: 90%;
	}
	.header {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0px 10px;
		border-bottom: 1px solid #ddd;
	}
	.header .logo {
		font-size: 15px;
		font-weight: 600;
		color: #111;
	}
	.header button {
		background: red;
		padding: 5px 10px;
		border: 1px solid #ddd;
		color: #fff;
		outline: none;
		border: none;
		border-radius: 5px;
		font-size: 15px;
		cursor: pointer;
	}
	.form {
		display: flex;
		width: 100%;
		height: 40px;
		border-top: 1px solid #ddd;
	}
	.form input {
		flex: 1;
		border: none;
		outline: none;
		font-size: 16px;
		color: #111;
		padding: 10px;
	}
	.form button {
		margin-top: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 8px;
		font-size: 20px;
		/* color: #333; */
		color: #5f1ebe;
		background: transparent;
		border-radius: 5px;
		/* border: 1.5px solid #333; */
		border: 1.5px solid #5f1ebe;
		outline: none;
		cursor: pointer;
		transition: all 0.3s ease;
	}
	.form button:hover {
		/* background: #333; */
		background: #5f1ebe;
		color: #fff;
	}
	.messages {
		width: 100%;
		height: calc(100% - 90px);
		padding: 10px;
		overflow-y: auto;
	}
	.messages::-webkit-scrollbar {
		width: 4px;
		background: #fff;
	}
	.messages::-webkit-scrollbar-thumb {
		width: 4px;
		background: #888;
	}
	.messages .message {
		margin: 10px 0px;
		display: flex;
	}
	.messages .my-message {
		justify-content: flex-end;
	}
	.messages .message .avatar {
		width: 30px;
		height: 30px;
		margin-right: 8px;
	}
	.messages .message .text {
		padding: 10px;
		/* background: #f0f4f7;
        color: #333; */
		background: #333;
		color: #fff;
		font-size: 14px;
		max-width: fit-content;
		flex: 1;
		border-radius: 5px;
	}
	.messages .message .avatar img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.messages .my-message .text {
		/* background: #333;
		color: #fff; */
		background: #5f1ebe;
		color: #fff;
	}
</style>
