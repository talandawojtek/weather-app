<template>
  <div class="circles">
    <div class="circle circle-one"></div>
    <div class="circle circle-two"></div>
    <div class="circle circle-three"></div>
  </div>
</template>

<script>
export default {
  name: 'Circles',
}
</script>
<style scoped lang="scss">
@mixin animation{
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.41, 2.41, 1, 1);
}
.circle{
  z-index: 0;
  border-radius:50%;
  position: absolute;
  transition: all .5s linear;
  background: linear-gradient(to right, rgba(255,255,255,0.2) 0%, rgba(246,246,246,0.1) 47%, rgba(255,255,255,0.02) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff', GradientType=1 );
}
.circle-one{
    width: 200px;
    height: 200px;
    top:10vh;
    left:-15%;
    transform: rotate(30deg);
    animation-name: circle_one;
    animation-duration: 25s;
    @include animation()
}
@keyframes circle_one {
  0% {transform: translate(0,0)};
  25% {transform: translate(20%,15%)};
  50% {transform: translate(40%,30%)};
  75% {transform: translate(20%,15%)};
  100% {transform: translate(0,0)};
}
.circle-two{
    width: 120px;
    height: 120px;
    top:50vh;
    left:-20%;
    transform: rotate(10deg);
    animation-name: circle_two;
    animation-duration: 35s;
    @include animation()
}
@keyframes circle_two {
  0% {transform: translate(0,0)};
  25% {transform: translate(40%,-30%)};
  50% {transform: translate(80%,-60%)};
  75% {transform: translate(40%,-30%)};
  100% {transform: translate(0,0)};
}
.circle-three{
    width: 160px;
    height: 160px;
    top:10px;
    left:50%;
    transform: rotate(90deg);
    animation-name: circle_three;
    animation-duration: 10s;
    @include animation()
}
@keyframes circle_three {
  0% {transform: translate(0,0)};
  25% {transform: translate(5%,-5%)};
  50% {transform: translate(10%,-10%)};
  75% {transform: translate(5%,-5%)};
  100% {transform: translate(0,0)};
}
@media (min-width: 768px){
  .circle-one{
    width: 320px;
    height: 320px;
  }
  .circle-two{
    width: 240px;
    height: 240px;
  }
  .circle-three{
    width: 260px;
    height: 260px;
  }
}
@media (min-width: 1366px){
  .circle-one{
    width: 500px;
    height: 500px;
  }
  .circle-two{
    width: 350px;
    height: 350px;
  }
  .circle-three{
    width: 330px;
    height: 330px;
  }
}
</style>
