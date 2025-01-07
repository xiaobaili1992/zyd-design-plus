<template>
  <div class="button">
    <el-button type='primary'>导入</el-button>
  </div>
  <ZydUpload
    ref="uploadRef" 
    v-model="visible" 
    :downloadTemplate="downloadTemplate" 
    :before-upload="handleBeforeUpload"
    :http-request="handleHttpRequest" 
    :submit="toLead" 
  />

</template>
<script lang="ts">
import { ZydUpload } from '../index.js'
import { ref } from 'vue'

const visible = ref(false)
const downloadTemplate = {
  url: '/files/template/网关导入模板.xlsx',
  name: '请下载网关导入模版',
}

const handleBeforeUpload = (file) => {
  const { type, size } = file || {};
  if (type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    if (size > 1024 * 1024 * 15) {
      ElMessage.error(`文件不得大于15M!`);
      return false;
    }
  } else {
    ElMessage.error('请上传扩展名为.xlsx的文件');
    return false;
  }
  return true;
};

const handleHttpRequest = async (file) => {
  const res = await uploadFile({ file: file.file, dir });
  if (res.code === 200) {
    return {
      url: res.uploadUrl,
      name: res.fileName,
    };
  } else {
    ElMessage.error(res.error);
  }
};


</script>