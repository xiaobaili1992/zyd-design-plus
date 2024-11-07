<template>
  <div class="container-h" v-if="direction == 'h'">
    <div
      class="left"
      :style="{ width: leftWidth + 'px', maxWidth, minWidth: leftWidth == 0 ? 0 : minWidth }"
    >
      <slot name="left" />
    </div>
    <div class="divider-h" @mousedown="startDrag" v-if="leftWidth != 0"></div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
  <div class="container-v" v-else>
    <div
      class="top"
      :style="{
        height: topHeight + 'px',
        minHeight: topHeight == 0 ? 0 : minWidth,
        maxHeight: maxWidth,
      }"
    >
      <slot name="left" />
    </div>
    <div class="divider-v" @mousedown="startDrag"></div>
    <div class="bottom">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted, onUnmounted } from 'vue';
  const props = defineProps({
    /**
     *  默认的宽度或高度
     */
    width: {
      default: 280,
    },
    /**
     * 最小宽度
     */
    minWidth: {
      default: '250px',
    },
    /**
     *  最大宽度或高度
     */
    maxWidth: {
      default: '500px',
    },
    /**
     *  水平或垂直
     * @values h/v
     */
    direction: {
      type: String,
      default: 'h',
    },
  });

  const emit = defineEmits(['update:width', 'change']);

  const { width, direction, minWidth, maxWidth } = props;
  
  const leftWidth = ref(width); // 左边区域的宽度
  const topHeight = ref(width); // 顶部区域的高度
  const startX = ref(0); // 水平拖动开始时的鼠标位置
  const startY = ref(0); // 垂直拖动开始时的鼠标位置
  const startLeftWidth = ref(0); // 水平拖动开始时的左边区域宽度
  const startTopHeight = ref(0); // 垂直拖动开始的顶部区域高度
  const dragging = ref(false); // 是否正在拖动

  onMounted(() => {
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', endDrag);
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', endDrag);
  });

  
  const startDrag = (e) => {
    dragging.value = true;
    if (direction == 'h') {
      startX.value = e.clientX;
      startLeftWidth.value = leftWidth.value;
    } else {
      startY.value = e.clientY;
      startTopHeight.value = topHeight.value;
    }
  };

  const onDrag = (e) => {
    if (dragging.value) {
      if (direction == 'h') {
        // 计算水平拖动的距离
        const delta = e.clientX - startX.value;
        // 更新左边区域的宽度
        leftWidth.value = startLeftWidth.value + delta;
        /**
         * 更新宽度
         */
        emit('update:width', leftWidth.value);
        /**
         * 拖动变化时候返回宽度状态
         */
        emit('change', leftWidth.value);
      } else {
        // 计算垂直拖动的距离
        const delta = e.clientY - startY.value;
        // 更新上下区域的高度
        topHeight.value = startTopHeight.value + delta;
      }
    }
  };

  const endDrag = () => {
    dragging.value = false;
  };


  watch(
    () => width,
    (v) => {
      if (direction == 'h') {
        leftWidth.value = v;
      } else {
        startLeftWidth.value = v;
      }
    }
  );
</script>

<style lang="scss" scoped>
.container-h {
  display: flex;
  width: 100%;
  height: 100%;
  .left {
    height: 100%;
    min-width: 300px;
  }

  .right {
    height: 100%;
    flex: 1;
  }
  .divider-h {
    width: 2px;
    cursor: col-resize;
    box-sizing: border-box;
    &:hover {
      border-left: 1px dashed skyblue;
    }
  }
}
.container-v {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
  }
  .bottom {
    width: 100%;
    flex: 1;
  }
  .divider-v {
    height: 2px;
    width: 100%;
    cursor: row-resize;
    box-sizing: border-box;
    &:hover {
      border-top: 1px dashed skyblue;
    }
  }
}
</style>

