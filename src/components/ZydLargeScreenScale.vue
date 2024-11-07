<template>
  <div
    class="scale-view"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      position: 'fixed',
      top: '50%',
      left: '50%',
      'transform-origin': 'left top',
      transform: `scale(${scale}) translate(-50%, -50%)`,
    }"
  >
    <!-- @slot 需要包裹的主体，也就是设计稿的内容 -->
    <slot></slot>
  </div>
</template>
<script setup>
  import { ref, onMounted } from 'vue';
  const props = defineProps({
    /**
     * 按照设计稿，设计稿多宽就设置多宽
     */
    width: {
      default: 1920,
      type: Number,
    },
    /**
     * 按照设计稿，设计稿多高就设置多高
     */
    height: {
      default: 1080,
      type: Number,
    },
  });

  const { width, height } = props;

  const scale = ref(1);
  let timer = null;
  
  const getScale = () => {
    const { innerWidth, innerHeight } = window;
    scale.value = Math.min(innerWidth / width, innerHeight / height);
  };
  
  onMounted(() => {
    getScale();
    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        getScale();
      }, 200);
    });
  });
</script>
<style lang="scss" scoped>
.scale-view {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 1920px;
  height: 1080px;
  transform-origin: left top;
}
</style>
