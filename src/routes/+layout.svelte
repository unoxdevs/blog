<script>
  import "../app.postcss";
</script>

<slot />

<style>
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;500&display=swap');
  
  :global(html),
  :global(body) {
    font-family: 'Outfit', sans-serif;
    background-color: #101010;
    color: white;
  }
</style>