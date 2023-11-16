<script lang="ts">
  import { page } from '$app/stores';
  import db from '$lib/pocketbase';
  import { onMount } from 'svelte';
  import Footer from '../../../components/Footer.svelte';

  let id = $page.params.id;
  let postJson: any = {};
  let isLoading = true;

  onMount(async () => {
    try {
      postJson = await db.collection('posts').getOne(id);
      postJson.created = new Date(postJson.created).toLocaleDateString();
      await db.collection('posts').update(id, { views: postJson.views + 1 });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      isLoading = false;
    }
  });
</script>

{#if isLoading}
  <div class="flex justify-center items-center h-screen">
    <div class="animate-spin rounded-full border-t-4 border-gray-500 border-opacity-25 h-12 w-12"></div>
  </div>
{:else}
  <main class="m-10">
    <h1 class="font-thin uppercase text-xl transition-all duration-300">{postJson.title || 'Fetching'}</h1>
    <p class="text-sm my-2 font-thin text-white/50 transition-all duration-300">{postJson.categories?.join(', ') || 'Fetching'}</p>
    <div class="flex justify-between items-center">
      <p class="text-xs font-thin text-white/50 transition-all duration-300">{postJson.created || '01.01.2000'} • {postJson.author || 'User'}</p>
    </div>
    <div class="my-5 flex justify-center items-center">
      <div class="bg-[#161616] p-4 rounded">
        <div>
          <p class="text-sm font-thin transition-all duration-300">{@html postJson.description}</p>
        </div>
      </div>
    </div>
    <a href="/" class="text-xs font-thin p-2 px-5 rounded-full bg-[#1e1e1e] text-white/70 transition-all duration-300">Go back</a>
  </main>

  <Footer />
{/if}
