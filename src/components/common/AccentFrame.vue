<template>
  <section class="accent-frame">
    <div class="accent-frame-content">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
// 定义短线数据：(起始百分比, 结束百分比)
$dots: (
  (0, 8), (15, 15.5), (16, 22), (28, 28.5), (29, 35), (42, 43), (44, 58), (65, 72), (72.5, 73), (80, 84), (84.5, 85), (92, 93), (94, 100)
);

@function generate-conic-gradient($dot-list, $color) {
  $gradient: "from 0deg";
  $last-end: 0;

  @each $start, $end in $dot-list {
    // 补充透明间隙
    @if $start > $last-end {
      $gradient: "#{$gradient}, transparent #{$last-end}%, transparent #{$start}%";
    }
    // 补充有色短线 - 使用插值确保不触发数学运算
    $gradient: "#{$gradient}, #{$color} #{$start}%, #{$color} #{$end}%";
    $last-end: $end;
  }

  // 补齐最后的透明部分
  @if $last-end < 100 {
    $gradient: "#{$gradient}, transparent #{$last-end}%, transparent 100%";
  }

  @return unquote("conic-gradient(#{$gradient})");
}

.accent-frame {
  position: relative;
  border: 2px solid #b4d456;
  border-radius: 16px;
  background: #fff;
  box-shadow: 3px 3px 0 #21b20435;
  
  &::after {
    content: "";
    position: absolute;
    inset: -3px;
    border: 3px solid transparent;
    border-radius: inherit;
    pointer-events: none;

    // 调用函数
    background-image: generate-conic-gradient($dots, #53c217);

    /* 核心技巧：只在边框区域显示背景 */
    background-origin: border-box;
    -webkit-mask:
      linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
}

.accent-frame-content {
  position: relative;
  z-index: 1;
  border-radius: 30px;
  background: #fff;
  padding: 15.5px 9.5px;
}
</style>