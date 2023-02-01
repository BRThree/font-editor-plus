<template>
  <div
    ref="splitPane"
    class="split-pane"
    :class="[{ row: !column }, { column: column }]"
    :style="`flex-direction: ${column ? 'column' : 'row'}`"
  >
    <div class="pane pane-first" :style="lengthType + ':' + paneLengthValue">
      <slot name="first"></slot>
    </div>

    <div
      class="pane-trigger"
      :style="lengthType + ':' + triggerLengthValue"
      @mousedown.left="(evt) => handleMouseDown(evt)"
    />

    <div class="pane pane-second">
      <slot name="second"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SplitProps {
  column?: boolean;
  min?: number;
  max?: number;
  firstPanePercent?: number;
  triggerLength?: number;
}

interface SplitEmits {
  (e: 'update:firstPanePercent', newPercent: number): void;
}

const props = withDefaults(defineProps<SplitProps>(), {
  column: false,
  min: 10,
  max: 90,
  firstPanePercent: 50,
  triggerLength: 6,
});

const emits = defineEmits<SplitEmits>();

const triggerLeftOffset = ref(0);
const splitPane = ref();

const lengthType = computed<string>(() => (!props.column ? 'width' : 'height'));
const paneLengthValue = computed<string>(() => `calc(${props.firstPanePercent}% - ${props.triggerLength / 2 + 'px'})`);
const triggerLengthValue = computed<string>(() => props.triggerLength + 'px');

// 按下滑动器
const handleMouseDown = (e: MouseEvent) => {
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  if (!props.column) {
    triggerLeftOffset.value = e.pageX - (<HTMLInputElement>e.target).getBoundingClientRect().left;
  } else {
    triggerLeftOffset.value = e.pageY - (<HTMLInputElement>e.target).getBoundingClientRect().top;
  }
};

// 按下滑动器后移动鼠标
const handleMouseMove = (e: MouseEvent) => {
  const clientRect = splitPane.value.getBoundingClientRect();
  let newPercent = 0;

  if (!props.column) {
    const offset = e.pageX - clientRect.left - triggerLeftOffset.value + props.triggerLength / 2;
    newPercent = (offset / clientRect.width) * 100;
  } else {
    const offset = e.pageY - clientRect.top - triggerLeftOffset.value + props.triggerLength / 2;
    newPercent = (offset / clientRect.height) * 100;
  }

  if (newPercent < props.min) {
    newPercent = props.min;
  }
  if (newPercent > props.max) {
    newPercent = props.max;
  }

  emits('update:firstPanePercent', newPercent);
};

// 松开滑动器
const handleMouseUp = () => {
  document.removeEventListener('mousemove', handleMouseMove);
};
</script>

<style scoped lang="scss">
.split-pane {
  height: 200px;
  display: flex;
  .pane {
    padding: 8px;
    border: 1px solid var(--el-border-color);
  }
  .pane-trigger {
    user-select: none;
    border-top: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
    background-color: rgb(235, 235, 235);
  }
  .pane-second {
    flex-grow: 1;
  }
}

.row {
  .pane-trigger {
    cursor: col-resize;
  }
}
.column {
  .pane-trigger {
    cursor: row-resize;
  }
}
</style>
