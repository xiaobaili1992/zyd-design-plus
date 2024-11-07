<template>
  <div class="type-exchange-wrap">
    <div
      :class="curActiveKey === item.key ? 'type-item type-item-active' : 'type-item'"
      v-for="item in sourceData"
      :key="item.key"
      @click="handleClick(item)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps({
  /**
   * 列表切换项
   */
  sourceData: {
    type: Array,
    default: () => [
      {
        key: 1,
        label: '日',
      },
      {
        key: 2,
        label: '月',
      },
      {
        key: 3,
        label: '年',
      },
    ],
  },
  /**
   * 当前选中的项
   */
  activeKey: {
    type: Number,
    default: 1,
  },
});

const { activeKey } = props;

const emits = defineEmits(['change']);

const curActiveKey = ref(1)

onMounted(() => {
  curActiveKey.value = activeKey;
})

function handleClick(item) {
  if (item.key === curActiveKey.value) return;
  /**
   * 更新activeKey
   */
  curActiveKey.value = item.key;
  /**
   * 更新事件
   */
  emits('change', item);
}
</script>

<style lang="scss" scoped>
.type-exchange-wrap {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 3px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  .type-item {
    min-width: 40px;
    height: 24px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    color: #999;
    font-size: 14px;
    cursor: pointer;
    padding: 0 4px;
    box-sizing: border-box;
  }
  .type-item-active {
    background: #2355d8;
    color: #fff;
  }
}
</style>

