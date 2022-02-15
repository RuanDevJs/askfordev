<template>
  <section class="aks" v-if="!loading">
    <div class="asks-container">
      <div class="ask" v-for="(ask) of asks" :key="ask._id">
        <div class="ask-header">
          <h1>{{ ask.title }}</h1>
        </div>
        <div class="ask-content">
          <p>{{ ask.ask }}</p>
        </div>
        <div class="ask-btn">
          <a href="#" @click.prevent="handleClick(ask)">Responder</a>
        </div>
      </div>
    </div>
  </section>
  <Loading 
    v-else
  />
</template>

<script>
import AsksApi from "../services/AsksApi";
export default {
   data(){
     return {
        loading: true,
        asks: []
     }
   },
   methods: {
     async findAll(){
        const rows = await AsksApi.findAll();
        this.asks = rows;
         setTimeout(() => {
        this.loading = false;
      }, 900)
     },
     handleClick({ _id, title = 'string' }){
       const parsedTitle = title.trim().split(' ').join('-').toLowerCase();
       window.localStorage.setItem("id-ask", _id);
       this.$router.push(`/asks/${parsedTitle}`);
     }
   },
   async created(){
      this.findAll();
  }
}
</script>

<style lang="scss" scoped>
  .aks {
    padding: 50px;
  }

  .asks-container {
    max-width: 960px;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
  }

  .ask {
    border-radius: 12px;
    padding: 32px;
    margin: 18px 0;
    width: 100%;
    background: #f9f9f9;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 16%);
    transition: .3s ease-in-out;
  }

  .ask:hover {
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 24%);
    cursor: pointer;
  }
  
  .ask-header {
    padding: 8px 0 6px 0;

    h1 {
      font-size: 22px;
      font-weight: 500;
      color: #222;
    }
  }

  .ask-content {
    p {
      font-size: 14px;
      font-weight: 500;
      color: #333;
      margin-top: 8px;
      margin-bottom: 12px;
    }
  }

  .ask-btn {
    a {
      display: block;
      text-decoration: none;
      font-size: 14px;
      font-weight: 700;
      background: #33d590;
      text-align: center;
      border-radius: 12px;
      width: 160px;
      padding: 8px;
      color: #f9f9f9;
    }

    a:hover {
      background: #11e599 !important;
      color: #fff;
    }
  }

</style>