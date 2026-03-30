<script setup lang="ts">
import DoodleHeading from "@/components/common/DoodleHeading.vue";
import CouponImage from "@/assets/esim-coupon.png";
</script>

<template>
  <div class="ticket-page">
    <DoodleHeading
      font-size="28px"
      font-weight="700"
      line-height="44px"
      letter-spacing="5%"
      stroke-width="4px"
      width="336px"
      min-height="100px"
    >
      <span class="doodle-highlight">３人へのシェア</span><br />
      ありがとうございます！
    </DoodleHeading>
    <img :src="CouponImage" alt="coupon" class="coupon-image">

    <div class="notes">
      <div class="notes-title">注意事項
        <div class="underline-title"></div>
      </div>
      <ul class="notes-list">
        <li>
          引換券の獲得はおひとり様1回限りです。<br />診断結果を3人以上にシェアいただいた場合でも、追加の引換券は発行されません。
        </li>
        <li>本キャンペーンは4 月 9 日-5 月 10 日までの期間限定です。</li>
        <li>引換券の有効期限は発行日より1年間です。</li>
        <li>
          引換券の譲渡はできません。引換券を獲得されたご本人様のみご利用いただけます。
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ticket-page {
  padding: 30px 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: linear-gradient(180deg, #ffffb3 0%, #e2ffb3 100%);
  .coupon-image {
    width: 100%;
    height: auto;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .notes {
    background: #fff;
    width: 100%;
    padding: 25px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .notes-title {
      color: #000;
      font-family: "M PLUS 1", "Noto Sans JP", sans-serif;
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      .underline-title {
        width: 50px;
        margin: 5px auto;
        height: 5px;
        background: #FCEE21;
      }
    }
    .notes-list {
      list-style: none;
      margin: 0;
      padding: 0;
      margin-top: 10px;
      color: #4D4D4D;
      li {
        font-family: "M PLUS 1", "Noto Sans JP", sans-serif;
        font-size: 12px;
        line-height: 20px;
        letter-spacing: 0%;
        padding-left: 16px;
        position: relative;
        &::before {
          content: "・";
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }
}
</style>
