<template>
  <div v-if="ask">
    <section class="ask" >
      <div class="ask-container">
        <div class="ask-header">
          <h1>{{ ask.name }}</h1>
          <span>{{ ask.category }}</span>
        </div>
        <div class="ask-title">
          <h2>{{ ask.title }}</h2>
        </div>
        <div class="ask-content">
          <p>Pergunta: {{ ask.ask }}</p>
          <button @click="modalIsVisible = true">Responder</button>
        </div>
      </div>
      <Modal 
        :_id="_id"
        :modalIsVisible="modalIsVisible"
        @close:modal="modalIsVisible = $event"
      />
  </section>
  <div class="answers">
    <div class="answer" v-for="(answer) of ask.answers" :key="answer.id">
      <div class="answer-header">
        <h2> {{ answer.name }} </h2>
        <p> {{ answer.date | formateDate}}</p>
      </div>
      <div class="answer-content">
        <h1> {{ answer.answer }} </h1>
      </div>
    </div>
  </div>
  </div>
  <Loading
    v-else
  />
</template>

<script>
import Modal from '../components/Modal.vue';
import AsksApi from "../services/AsksApi";

export default {
    props: ["id"],
    data(){
      return {
        ask: null,
        modalIsVisible: false,
      }
    },
    methods: {
      async handleFetch(){
        const _id = window.localStorage.getItem("id-ask");

        const rows = await AsksApi.find(_id);
        setTimeout(() => {
          this.ask = rows;
        }, 200)
      }
    },
    beforeRouteEnter(to, from, next){
      const _id = window.localStorage.getItem("id-ask");
        if(!_id){
          next('/asks');
        }else {
          next();
        }
    },
    created(){
      this.handleFetch();
    },
    computed: {
      _id(){
        const _id = window.localStorage.getItem("id-ask");
        return _id;
      }
    },
    filters: {
      formateDate(value){
        const time = new Date(value).toLocaleDateString('pt-br');
        const date = new Date(value).toLocaleTimeString('pt-br');
        return `${time} - ${date}`;
      }
    },
    components: {
      Modal
    }
}
</script>

<style lang="scss" scoped>
  .ask {
    padding: 32px;
    background: #2EB086;
  }

  .ask-container {
    padding: 12px;
    max-width: 960px;
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-flow: column wrap;
  }

  .ask-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;

    h1 {
      font-size: 24px;
      font-weight: 700;
      color: #f9f9f9;
    }

    span {
      font-size: 16px;
      font-weight: 400;
      color: #EEEEEE;
    }
  }

  .ask-title {
    h2 {
      padding: 4px 0;
      font-size: 32px;
      font-weight: 700;
      color: #EEEEEE;
    }
  }

  .ask-content {
    p {
      padding: 4px 0;
      font-size: 15px;
      color: #f2f2f2;
    }

    button {
      width: 220px;
      margin: 12px 0;

      border: 0;
      outline: 0;

      padding: 12px 6px;
      border-radius: 8px;
      
      background: #1f1f1f;
      color: #f9f9f9;

      font-size: 14px;
      font-weight: 900;
      cursor: pointer;
    }
  }

  .answers {
    padding: 12px;
    max-width: 960px;
    margin: 50px auto;

    display: flex;
    justify-content: center;
    flex-flow: column wrap;
  }

  .answer {
    border-radius: 12px;
    padding: 32px;
    margin: 18px 0;
    width: 100%;
    background: #f9f9f9;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 16%);
    transition: .3s ease-in-out;
  }

  .answer-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    h2 {
      font-size: 18px;
      font-weight: 400;
      color: #333;
      margin: 5px 0;
    }

    p {
      font-size: 14px;
      font-weight: 400;
      color: #c2c2c2;
      margin: 0 8px;
    }
  }

  .answer-content {
      h1 {
        font-size: 21px;
        font-weight: 500;
        color: #111;
        margin: 5px 0;
      }
    }
</style>