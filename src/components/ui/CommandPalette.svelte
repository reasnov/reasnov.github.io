<script lang="ts">
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";

	export let lang: string = "en";

	let isOpen = false;
	let query = "";
	let selectedIndex = 0;

	const items = [
		{ id: "home", title: "Go to Home", icon: "icon-[tabler--home]", action: () => (window.location.href = `/${lang}/`) },
		{ id: "blog", title: "Browse Blog", icon: "icon-[tabler--news]", action: () => (window.location.href = `/${lang}/blog/`) },
		{ id: "theme", title: "Toggle Theme", icon: "icon-[tabler--sun-moon]", action: () => document.getElementById("theme-toggle")?.click() },
		{ id: "github", title: "View GitHub", icon: "icon-[tabler--brand-github]", action: () => window.open("https://github.com/reasnov", "_blank") },
		{ id: "linkedin", title: "Connect LinkedIn", icon: "icon-[tabler--brand-linkedin]", action: () => window.open("https://linkedin.com/in/reasnov", "_blank") },
	];

	$: filteredItems = items.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));

	function toggle() {
		isOpen = !isOpen;
		if (isOpen) {
			query = "";
			selectedIndex = 0;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if ((e.ctrlKey || e.metaKey) && e.key === "k") {
			e.preventDefault();
			toggle();
		}

		if (e.key === "/" && !isOpen) {
			const target = e.target as HTMLElement;
			if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
				e.preventDefault();
				toggle();
			}
		}

		if (!isOpen) return;

		if (e.key === "Escape") toggle();
		
		if (e.key === "ArrowDown") {
			e.preventDefault();
			selectedIndex = (selectedIndex + 1) % filteredItems.length;
		}
		
		if (e.key === "ArrowUp") {
			e.preventDefault();
			selectedIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
		}

		if (e.key === "Enter") {
			e.preventDefault();
			if (filteredItems[selectedIndex]) {
				filteredItems[selectedIndex].action();
				toggle();
			}
		}
	}

	onMount(() => {
		window.addEventListener("keydown", handleKeydown);
		return () => window.removeEventListener("keydown", handleKeydown);
	});
</script>

{#if isOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div 
		class="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[15vh] bg-black/60 backdrop-blur-sm"
		on:click|self={toggle}
		transition:fade={{ duration: 150 }}
	>
		<div 
			class="w-full max-w-xl tui-window overflow-hidden"
			transition:fly={{ y: -20, duration: 200 }}
		>
			<div class="tui-window-header">
				<span>COMMAND_PALETTE.SYS</span>
				<span>[ESC] TO EXIT</span>
			</div>

			<div class="p-2 bg-neutral-950">
				<div class="flex items-center gap-3 px-3 py-2 border-b border-neutral-800 mb-2">
					<span class="icon-[tabler--terminal] text-primary"></span>
					<input 
						bind:value={query}
						placeholder="Type a command..."
						class="flex-1 bg-transparent text-white outline-none font-mono text-sm uppercase tracking-widest placeholder:text-neutral-700"
						autofocus
					/>
				</div>

				<div class="max-h-[300px] overflow-y-auto custom-scrollbar">
					{#each filteredItems as item, i}
						<button 
							class="w-full flex items-center gap-4 px-3 py-2 text-left text-xs font-bold uppercase tracking-widest transition-colors
								   {i === selectedIndex ? 'bg-primary text-black' : 'text-neutral-500 hover:bg-neutral-900'}"
							on:click={() => { item.action(); toggle(); }}
						>
							<span class={item.icon}></span>
							<span class="flex-1">{item.title}</span>
							{#if i === selectedIndex}
								<span class="text-[10px] font-black">[ENTER]</span>
							{/if}
						</button>
					{:else}
						<div class="px-3 py-8 text-center text-neutral-700 font-bold uppercase italic">
							No commands found...
						</div>
					{/each}
				</div>

				<div class="mt-2 p-2 border-t border-neutral-800 flex justify-between items-center text-[10px] text-neutral-600 font-bold">
					<span>↑↓ TO NAVIGATE</span>
					<div class="flex gap-4">
						<span>[ENTER] TO SELECT</span>
						<span>[ESC] TO CLOSE</span>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #262626;
	}
</style>
