<template>
  <div>
    <section>
    <div class="select">
      <div class="select-area">
        <div data-icon>
          <img src='../assets/icons/Icon awesome-leaf.svg' alt="perguntar" draggable="false" />
        </div>
        <div data-icon>
          <img src='../assets/icons/Icon awesome-question.svg' alt="responder" draggable="false" />
        </div>
      </div>
    </div>
    <transition mode="out-in">
      <keep-alive> 
        <component :is="isComponent" @isLoading="handleIsLoading"></component>
      </keep-alive>
    </transition>
    </section>
  </div>
</template>

<script>
import Student from "../components/Student.vue";
import Teacher from "../components/Teacher.vue";

export default {
  data() {
    return {
      isComponent: "Student",
      loading: false,
    }
  },
  methods: {
    handleClick(){
      const selectIcon = document.querySelectorAll('[data-icon] img');

      /* eslint-disable no-unused-vars */
      const handleTabs = (index) => {
        selectIcon.forEach(el => el.classList.remove('active'))

        selectIcon[index].classList.add('active');

        index === 0 ? this.isComponent = 'Student' : this.isComponent = 'Teacher';
      }

      selectIcon.forEach((el, index) => {
        el.addEventListener('click', () => {
          handleTabs(index)
        });
      });

    },
    handleIsLoading(event){
      this.loading = event
    }
  },
  mounted(){
    this.handleClick();
  },
  components: {
    Student,
    Teacher
  }
}
</script>

<style lang="scss" scoped>
  .v-enter,
  .v-leave-to {
    opacity: 0;
    filter: blur(2px);
    transform: translate3d(0,20px,0);
  }

  .v-enter-active,
  .v-leave-active {
    transition: .4s ease-in-out;
  } 

  .select-area {
    max-width: 80%;
    margin: 20px auto 0 auto;

    display: flex;
    gap: 32px;
    flex-wrap: wrap;

    div img {
      padding: 8px;

      width: 50px;
      height: 50px;

      background: #c2c2c2;
      border-radius: 4px;

      cursor: pointer;
      transition: ease-in-out .3s;
    }

    .active {
      background: rgb(56, 224, 159) !important;
      box-shadow: 0px 0px 50px rgba(51, 212, 119, 100%);
    }
  }

</style>