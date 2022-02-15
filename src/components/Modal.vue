<template>
  <section class="modal" v-if="showModal" @click="closeModal($event)">
      <form class="modal-container">
          <div class="form-wrap">
            <label for="name">
                Nome 
                <span 
                    @click="selectType = 'select'"
                    v-show="selectType === 'input'"
                >
                    Usar nome/email
                </span>
                <span 
                    @click="selectType = 'input'"
                    v-show="selectType === 'select'"
                >
                    Nome alternativo
                </span>
            </label>
            <input type="text" name="name" id="name" v-model="name" v-show="selectType === 'input'">
            <select name="name" id="" v-model="name" v-show="selectType === 'select'" >
                <option :value="getUserName">
                    {{ getUserName }}
                </option>
                <option :value="getUserEmail">
                    {{ getUserEmail }}
                </option>
            </select>
          </div>
          <div class="form-wrap">
            <label for="resposta">Resposta</label>
            <textarea name="resposta" id="resposta" cols="1" rows="1" v-model="answer"></textarea>
          </div>
          <button @click.prevent="handleClick">Responder</button>
      </form>
  </section>
</template>

<script>
import AsksAPi from "../services/AsksApi";

export default {
    name: "Modal",
    props: ["_id", "modalIsVisible"],
    data(){
        return {
            name: "",
            answer: "",
            showModal: this.modalIsVisible,
            selectType: "input"
        }
    },
    methods: {
        async handleClick(){
            const payload = {
                name: this.name,
                answer: this.answer
            }
            await AsksAPi.update(this._id, payload);
            this.showModal = false;
            this.$emit("close:modal", this.showModal);
        },
        closeModal({ target, currentTarget}){
            if(currentTarget === target){
                this.showModal = false
                this.$emit("close:modal", this.showModal);
            }
        }
    },
    computed: {
        getUserName(){
            const name = window.localStorage.getItem('_name');
            return name;
        },
        getUserEmail(){
            const email = window.localStorage.getItem('_email');
            return email;
        }
    },
    watch: {
        modalIsVisible(){
            this.showModal = this.modalIsVisible;
        }
    },
}
</script>

<style lang="scss" scoped>
    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        width: 100%;
        height: 100vh;

        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        background: rgba(0, 0, 0, 30%);
    }

    .modal-container {
        background: #fff;
        border-radius: 4px;
        border: 8px solid #f2f2f2;

        width: 460px;
        padding: 18px;
    }

    .form-wrap {
        margin: 12px 0;
        display: flex;
        flex-flow: column wrap;

        label {
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            font-size: 15px;
            font-weight: 500;
            color: #1f1f1f;
            
            span {
                display: block;
                font-size: 15px;
                font-weight: 300;
                color: #c2c2c2;
                margin-left: 8px;
                cursor: pointer;
            }
        }

        input {
            border: 1px solid #f2f2f2;
            outline: 0;

            padding: 18px;
            background: #eee;

            font-size: 18px;
            font-weight: 400;
            color: #333;

            margin: 4px 0;
        }

        textarea {
            border: 1px solid #f2f2f2;
            outline: 0;

            padding: 18px;
            background: #eee;

            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            font-weight: 400;
            color: #1f1f1f;

            max-width: 100%;
            height: 120px;
        }
    }

    button {
        width: 220px;
        margin: 18px auto;

        display: flex;
        justify-content: center;

        border: 0;
        outline: 0;

        padding: 12px 6px;
        border-radius: 8px;
            
        background: #1f1f1f;
        color: #f9f9f9;

        font-size: 14px;
        font-weight: 900;
        cursor: pointer;

        text-align: center;
    }

    select {
      margin: 5px 0;
      border-radius: 4px;
      background: #f2f2f2;

      padding: 16px 12px;
      width: 320px;

      border: 0;
      outline: 0;
      border-bottom: 1px solid #f9f9f9;

      font-size: 18px;
      font-weight: 400;
      color: #333;
    }
</style>