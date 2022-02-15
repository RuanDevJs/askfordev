<template>
  <section class="login">
    <div class="login-container">
      <div class="left">
        <div class="title">
          <span>Welcome to</span>
          <h1>Ask For Dev</h1>
          <p> Acesse para perguntar </p>
        </div>
        <form class="sign-in" @submit.prevent="handleSubmit"> 
          <div class="form-wrap">
            <label for="name">Nome</label>
            <input type="text" name="name" id="name" v-model.trim="form.name">
          </div>
          <div class="form-wrap">
            <label for="title">Título da pergunta</label>
            <input type="text" name="title" id="title" v-model.trim="form.title">
          </div>
          <div class="form-wrap">
            <label for="name">Categoria</label>
            <select name="name" id="name" v-model="form.category">
              <option value="Selecione uma categoria" disabled> Selecione uma categoria </option>
              <option value="Escola/Faculdade"> Escola/Faculdade </option>
              <option value="Esportes"> Esportes </option>
              <option value="Programação"> Programação </option>
              <option value="Outros"> Outros </option>
            </select>
          </div>
          <div class="form-wrap">
            <label for="name">Deixe sua pergunta</label>
            <textarea name="name" id="name" cols="30" rows="10" v-model.trim.lazy="form.ask"></textarea>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
      <div class="right">
        <Lottie
          :options="defaultOptions"
          :height="760"
        />
      </div>
    </div>
  </section>
</template>

<script>
import icon from "../assets/lotties/bike.json";
import AsksApi from '../services/AsksApi';

export default {
  name: "Login",
  data(){
    return {
      defaultOptions: { 
        animationData: icon
      },
      animationSpeed: 1,
      anim: null,
      form: {
        name: "",
        title: "",
        category: "",
        ask: ""
      },
      loading: false
    }
  },
  methods: {
    async handleSubmit(){
      const rows = await AsksApi.store(this.form);

      if(rows){
        const parsedTitle = rows.title.trim().split(' ').join('-').toLowerCase();

        window.localStorage.setItem("id-ask", rows._id);
        this.$router.push(`/asks/${parsedTitle}`);
      }
    } 
  }
}
</script>

<style lang="scss" scoped>
  .login {
    padding: 50px 0;
  }

  .login-container {
    max-width: 80%;
    margin: 0 auto;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    justify-content: space-between;
  }

  .left {
    flex: 1;
  }

  .right {
    flex: 1;
    align-self: flex-start;
  }

  .title {
    span {
      margin: 5px 0 0 0;
      font-weight: 200;
      font-size: 24px;
      line-height: 0;
      color: #c2c2c2;
      margin: 0px !important;
    }

    h1 {
      margin: 0px !important;
      padding: 0px !important;
      font-size: 60px;
      font-weight: 900;
      color: rgb(56, 224, 159);
      text-shadow: 0px 0px 16px rgba(56, 224, 159, 12%);
    }

    p {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 10px 0;
      font-weight: 400;
      font-size: 18px;
      line-height: 0;
      color: #c9c9c9;
      margin: 0px !important;
    }

    p::after {
      content: "";
      width: 20px;
      height: 2px;
      background: #c2c2c2;
      display: block;
      margin-left: 10px !important;
    }

    p::before {
      content: "";
      width: 20px;
      height: 2px;
      background: #c2c2c2;
      display: block;
      margin-right: 10px;
    }
  }

  .sign-in {
    width: 100%;
    margin: 10px 0;
    display: flex;
    flex-flow: wrap column;
    align-items: flex-start;
    justify-content: center;

    button {
      margin: 5px 0;
      border-radius: 4px;
      background: #33d590;

      padding: 16px 12px;
      width: 320px;

      border: 0;
      outline: 0;
      font-size: 32px;
      font-weight: 900;
      color: white;

      cursor: pointer;
      transition: .4s ease-in-out;
    }

    button:hover {
      background: rgb(51, 212, 119);
      box-shadow: 0px 0px 50px rgba(51, 212, 119, 100%);
    }
  }

  .form-wrap {
    width: 100%;
    margin: 12px 0;

    display: flex;
    flex-flow: wrap column;
    align-items: flex-start;
    justify-content: center;

    label {
      font-size: 16px;
      font-weight: 400;
      margin: 2px 0;
      color: #c2c2c2;
    }

    input, select {
      margin: 5px 0;
      border-radius: 4px;
      background: #f2f2f2;

      padding: 16px 12px;
      width: 320px;

      border: 0;
      outline: 0;
      border-bottom: 1px solid #c2c2c2;

      font-size: 18px;
      font-weight: 400;
      color: #333;
    }

    textarea {
      margin: 5px 0;
      border-radius: 4px;
      background: #f2f2f2;

      padding: 16px 12px;
      width: 460px;
      height: 150px;

      border: 0;
      outline: 0;
      border-bottom: 1px solid #f9f9f9;

      font-size: 18px;
      font-weight: 400;
      color: #333;

      line-height: 1.5em;
    }

  }
</style>

