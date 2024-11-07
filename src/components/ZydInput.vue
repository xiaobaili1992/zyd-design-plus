<template>
  <div class="zyd-input">
    <el-input
      class="zyd-input"
      ref="zyd-input"
      v-model="inputValue"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <svg-icon
        slot="prefix"
        iconClass="dee-search"
        style="width: 14px; height: 14px; fill: #bfbfbf; position: relative; top: 9px; left: 5px"
      />
    </el-input>
  </div>
</template>
<script setup>
  // import { ref, onMounted } from 'vue';
  // const inputValue = ref('');
  // const extendMethod = () => {
  //   const refMethod = Object.entries(this.$refs['zyd-input']);
  //   for (const [key, value] of refMethod) {
  //     if (!(key.includes('$') || key.includes('_'))) {
  //     }
  //   }
  // }
  // onMounted(() => {
  //   extendMethod()
  // })
</script>
