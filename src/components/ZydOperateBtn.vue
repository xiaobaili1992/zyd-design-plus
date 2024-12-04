<template>
  <div class="zyd-operate-btn">
    <span v-for="(item, index) in topThreeConfig" :key="item.key">
      <el-button
        type="text"
        v-bind="item.attrs || {}"
        @click="(e) => commonFn(item, 'click', e)"
      >
        {{ item.label }}
      </el-button>
      <el-divider
        class="zyd-operate-vertical-line"
        direction="vertical"
        v-if="index !== topThreeConfig.length - 1"
      />
    </span>
    <el-divider
      class="zyd-operate-vertical-line"
      direction="vertical"
      v-if="remainConfig.length > 0"
    />
    <el-tooltip
      v-if="remainConfig.length > 0"
      placement="bottom"
      effect="light"
      popper-class="operate-tooltip"
    >
      <template #content>
        <div v-for="(item, index) in remainConfig" :key="item.key">
          <el-button type="text" @click="(e) => commonFn(item, 'click', e)">
            {{ item.label }}
          </el-button>
          <div class="zyd-operate-line" v-if="index !== remainConfig.length - 1"></div>
        </div>
      </template>
      <el-button type="text">
        <i class="el-icon-more" style="color: #ccc; font-size: 12px" />
      </el-button>
    </el-tooltip>
  </div>
</template>
<script setup>
  import { onMounted, ref } from 'vue';
  const props = defineProps({
    /**
     * 操作按钮配置
     */
    operateBtnConfig: {
      type: Array,
      default: () => {
        return [];
      },
    },
    /**
     * 分割数
     */
    partitionNum: {
      type: Number,
      default: 3,
    },
    /**
     * 传入的数据，鼠标点击操作按钮会传出，不做任何处理
     */
     dataSource: {
      type: Object,
      default: () => {
        return {};
      },
    },
  });

  const { operateBtnConfig, partitionNum, dataSource } = props;

  const topThreeConfig = ref([]);
  const remainConfig = ref([]);

onMounted(() => {
    const showOperateBtnConfig = getShowOperateBtnConfig();
    topThreeConfig.value = showOperateBtnConfig.slice(0, partitionNum);
    remainConfig.value = showOperateBtnConfig.slice(partitionNum);
  })

  const commonFn = (item, type, e) => {
    item?.events?.[type]?.(dataSource, e);
  };

  const getShowOperateBtnConfig = () => {
    return (
      operateBtnConfig.filter((item) => {
        return typeof item.show === 'undefined' || item.show;
      }) || []
    );
  };

</script>

<style lang="scss" scoped>
.zyd-operate-btn {
  .zyd-operate-vertical-line {
    background-color: #f0f0f0 !important;
  }
}
</style>
<style lang="scss">
.operate-tooltip {
  border-color: #fff !important;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  padding: 2px 10px;
  .popper__arrow {
    border-bottom-color: #fff !important;
  }
  .el-button {
    font-family: PingFangSC, PingFang SC;
    font-size: 14px;
    color: #666666;
  }
  .zyd-operate-line {
    width: 100%;
    height: 1px;
    background: #f0f0f0;
  }
}
</style>
