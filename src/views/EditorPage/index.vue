<template>
  <div class="editor-page">
    <OperationBar></OperationBar>
    <Split
      class="editor-part"
      :first-pane-percent="firstPanePercent"
      @update:first-pane-percent="(newPercent) => handleUpDateFirstPanePercent(newPercent)"
    >
      <template #first><GlyphEditor /></template>
      <template #second><GlyphList /></template>
    </Split>
  </div>
</template>

<script setup lang="ts">
import GlyphEditor from "./components/GlyphEditor/index.vue";
const firstPanePercent = ref(75);

const handleUpDateFirstPanePercent = (newPercent: number) => {
  firstPanePercent.value = newPercent;
};
</script>

<style scoped lang="scss">
.editor-page {
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  gap: 10px;

  .editor-part {
    flex-grow: 1;
  }
}
</style>
