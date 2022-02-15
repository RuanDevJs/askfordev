<template>
  <section class="loading">
      <Lottie
        :options="defaultOptions"
        :height= "420"
      />
      <div class="loading-wrap">
        <h2>Carregando...</h2>
        <p> Lorem ipsum dolor sit <br> amet consectetur adipisicing elit.</p>
      </div>
  </section>
</template>

<script>
import icon from "../assets/lotties/loading.json";

export default {
    data(){
      return {
          defaultOptions: { 
          animationData: icon
        },
      }
    }
}
</script>

<style>

.loading {
  height: 80vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.loading-wrap {
  text-align: center;
}

.loading-wrap h2 {
  font-size: 22px;
  font-weight: 400;
  color: #1f1f1f;
  padding: 5px;
}

.loading-wrap p {
  font-size: 16px;
  font-weight: 400;
  color: #c2c2c2;
  padding: 5px;
}

</style>