<script lang="ts">
  import db from "$lib/pocketbase";
  import { onMount } from "svelte";

  let posts = db.collection("posts");
  let postArray: any[] = [];
  
  onMount(async () => {
    try {
      postArray = await posts.getFullList();
      postArray = postArray.map((post) => ({
        ...post,
        created: new Date(post.created).toLocaleDateString(),
      }));
      postArray.sort((a, b) => b.views - a.views);
      postArray = postArray.slice(0, 3);
      postArray = postArray.filter((post) => post.views !== 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
</script>

<main class="m-5">
  <div class="my-10">
    <h1 class="text-lg mb-5 font-thin uppercase text-white/70"><i class="ri-hashtag relative"></i> Top 3 Posts</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {#each postArray as post (post.id)}
        <div class="bg-[#161616] p-4 rounded transition-all duration-300">
          <h2 class="text-lg mb-2 font-thin">{post.title}</h2>
          {#if post.views > 1000}
            <p class="text-xs font-thin text-white/70">{(post.views / 1000).toFixed(1)}k views</p>
          {:else}
            <p class="text-xs font-thin text-white/70">{post.views} views</p>
          {/if}
          <hr class="my-3 opacity-5">
          <div class="line-clamp-3">
            <p class="text-sm font-thin">{@html post.description}</p>
          </div>
          <hr class="my-3 opacity-5">
          <div class="flex justify-between items-center">
            <p class="text-xs font-thin text-white/70">{post.created}</p>
            <a href="/post/{post.id}" class="text-xs font-thin p-2 px-5 md:px-2 lg:px-5 rounded-full bg-[#1e1e1e] text-white/70">Read more</a>
            <p class="text-xs font-thin text-white/70">{post.author}</p>
          </div>
        </div>
      {/each}
      {#if postArray.length === 0}
        <div class="text-sm text-white/70 font-thin">
          <p>No posts found</p>
        </div>
      {/if}
    </div>
  </div>
</main>
