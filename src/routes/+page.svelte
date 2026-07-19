<script lang="ts">
	import { profile, experience, projects, skills } from '$lib/data';

	let open = $state(false);
</script>

<svelte:window on:keydown={(e) => e.key === 'Escape' && (open = false)} />


<svelte:head>
	<title>{profile.name} — {profile.role}</title>
	<meta name="description" content={profile.tagline} />
	<meta property="og:title" content={`${profile.name} — ${profile.role}`} />
	<meta property="og:description" content={profile.tagline} />
	<meta property="og:type" content="website" />
</svelte:head>

<header>
	<nav class="wrap">
		<a class="brand" href="#top">dhapoer.xyz</a>
		<button
			class="burger"
			aria-expanded={open}
			aria-controls="nav-links"
			aria-label="Menu"
			onclick={() => (open = !open)}
		>
			<span class:x={open}></span>
			<span class:x={open}></span>
		</button>
		<!-- Close on link click. On <a> not the wrapper, so keyboard activation closes it too. -->
		<div id="nav-links" class="links" class:open>
			<a href="#about" onclick={() => (open = false)}>About</a>
			<a href="#experience" onclick={() => (open = false)}>Experience</a>
			<a href="#work" onclick={() => (open = false)}>Work</a>
			<a href="#contact" onclick={() => (open = false)}>Contact</a>
		</div>
	</nav>
</header>

<main id="top">
	<!-- Hero -->
	<section class="hero">
		<div class="wrap">
			<p class="muted role">{profile.role} · {profile.location}</p>
			<h1>{profile.name}</h1>
			<p class="tagline">{profile.tagline}</p>
			<a class="cta" href="#contact">Get in touch</a>
		</div>
	</section>

	<!-- About -->
	<section id="about">
		<div class="wrap">
			<h2>About</h2>
			{#each profile.bio as p}<p>{p}</p>{/each}
			<p class="muted interests">
				Off the clock: {#each profile.interests as i, idx}{i}{idx < profile.interests.length - 1 ? ' · ' : ''}{/each}
			</p>
		</div>
	</section>

	<!-- Experience -->
	<section id="experience">
		<div class="wrap">
			<h2>Experience</h2>
			{#each experience as job}
				<div class="item">
					<div class="item-head">
						<h3>{job.title} · {job.company}</h3>
						<span class="muted">{job.period}</span>
					</div>
					<p class="muted">{job.summary}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Projects -->
	<section id="work">
		<div class="wrap">
			<h2>Selected work</h2>
			<div class="grid">
				{#each projects as p}
					<article class="card">
						<h3>{p.name}</h3>
						<p class="muted">{p.summary}</p>
						<p class="stack">{p.stack.join(' · ')}</p>
						<div class="card-links">
							{#if p.demo}<a href={p.demo}>Live demo</a>{/if}
							{#if p.repo}<a href={p.repo}>Code</a>{/if}
						</div>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Skills -->
	<section id="skills">
		<div class="wrap">
			<h2>Skills</h2>
			<div class="grid">
				{#each skills as s}
					<div class="card">
						<h3>{s.group}</h3>
						<p class="muted">{s.items.join(' · ')}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Contact -->
	<section id="contact">
		<div class="wrap">
			<h2>Contact</h2>
			<p>Want to work together or just talk shop? Reach out.</p>
			<a class="cta" href={`mailto:${profile.email}`}>{profile.email}</a>
			<div class="socials">
				{#each profile.socials as s}<a href={s.href}>{s.label}</a>{/each}
			</div>
		</div>
	</section>
</main>

<footer>
	<div class="wrap muted">© {profile.name}. Built with SvelteKit.</div>
</footer>

<style>
	header {
		position: sticky;
		top: 0;
		background: color-mix(in srgb, var(--bg) 88%, transparent);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid var(--border);
		z-index: 10;
	}
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.85rem 1.25rem;
	}
	.brand { font-weight: 700; text-decoration: none; color: var(--text); }
	.links { display: flex; gap: 1.1rem; flex-wrap: wrap; }

	/* Desktop: no burger. Shown only inside the 600px query below. */
	.burger {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 40px;
		height: 40px;
		padding: 0;
		background: none;
		border: 0;
		cursor: pointer;
	}
	.burger span {
		display: block;
		height: 2px;
		width: 22px;
		background: var(--text);
		transition: transform 0.2s ease;
	}
	/* Two bars, not three — they cross into an X with no third to hide. */
	.burger span.x:first-child { transform: translateY(3.5px) rotate(45deg); }
	.burger span.x:last-child { transform: translateY(-3.5px) rotate(-45deg); }

	@media (prefers-reduced-motion: reduce) {
		.burger span { transition: none; }
	}
	.links a { text-decoration: none; color: var(--muted); }
	.links a:hover { color: var(--text); }

	.hero { padding-top: 5rem; padding-bottom: 4rem; }
	.hero .role { margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.8rem; }
	.hero h1 { font-size: clamp(2.2rem, 6vw, 3.4rem); margin: 0 0 0.75rem; }
	.tagline { font-size: 1.15rem; max-width: 40ch; }

	.cta {
		display: inline-block;
		margin-top: 0.5rem;
		padding: 0.65rem 1.2rem;
		background: var(--accent);
		color: #0b0d12;
		font-weight: 600;
		border-radius: 8px;
		text-decoration: none;
	}

	h2 { font-size: 1.6rem; margin: 0 0 1.25rem; }

	.item { padding: 0.9rem 0; border-bottom: 1px solid var(--border); }
	.item-head { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; }
	.item h3 { margin: 0; font-size: 1.05rem; }

	.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
	.card {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 1.1rem;
	}
	.card h3 { margin: 0 0 0.4rem; }
	.stack { font-size: 0.85rem; color: var(--accent); }
	.card-links { display: flex; gap: 1rem; margin-top: 0.6rem; }

	.socials { display: flex; gap: 1.2rem; margin-top: 1rem; }
	.interests { margin-top: 1rem; }

	footer { padding: 2rem 1.25rem; border-top: 1px solid var(--border); }

	@media (max-width: 600px) {
		nav { flex-wrap: wrap; padding: 0.75rem 1.1rem; }
		.burger { display: flex; }

		/* Collapsed by default; .open reveals it as a full-width column. */
		.links {
			display: none;
			flex-basis: 100%;
			flex-direction: column;
			gap: 0.9rem;
			padding: 0.75rem 0 0.25rem;
		}
		.links.open { display: flex; }

		.hero { padding-top: 2.5rem; padding-bottom: 2.5rem; }
		.tagline { font-size: 1.05rem; }

		/* Date sits under the title instead of stranded at the far right. */
		.item-head { flex-direction: column; gap: 0.2rem; }

		/* Comfortable tap target without stretching edge to edge. */
		.cta { padding: 0.75rem 1.4rem; }
		footer { padding: 1.5rem 1.1rem; }
	}
</style>
