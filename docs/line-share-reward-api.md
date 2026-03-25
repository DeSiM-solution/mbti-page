# LINE 分享奖励接口说明

## 1. 接口概览

- 控制器：`com.ruoyi.business.line.controller.BLineShareRewardController`
- 基础路径：`/business/lineShareReward`
- 鉴权：3 个接口均为匿名接口，不需要登录态
- 限流：`POST` 接口做了 1 秒防重复提交
- 统一返回结构：

```json
{
  "code": 200,
  "msg": "success",
  "data": {}
}
```

说明：

- `code = 200` 表示成功
- `code != 200` 表示失败，前端直接展示 `msg` 即可
- 当前项目里参数校验失败、业务校验失败，大多数都会返回 `code = 500`

---

## 2. 推荐调用流程

### 2.1 分享者自己先保存答题结果

```text
POST /business/lineShareReward/testResult
```

用途：

- 分享者完成测试后，先把自己的测试结果保存下来
- 后续分享成功确认时，后端会按 `sharerUserId` 回查最近一次测试结果

### 2.2 被分享者打开链接后，确认一次有效分享

```text
POST /business/lineShareReward/confirm
```

用途：

- 记录一次有效分享
- 给被分享者发 20% OFF 优惠券
- 当分享者累计成功分享达到 3 次时，给分享者发免费兑换码

### 2.3 奖励页查询当前分享状态

```text
GET /business/lineShareReward/status?userId=xxx
```

用途：

- 查询当前累计成功分享次数
- 查询是否已有免费兑换码、是否过期、对应商品组

---

## 3. 接口详情

## 3.1 保存分享者答题结果

### 请求

- 方法：`POST`
- 路径：`/business/lineShareReward/testResult`
- Content-Type：`application/json`

请求体：

```json
{
  "sharerUserId": "U123456",
  "testResult": "A",
  "answerContent": "{\"q1\":\"a\",\"q2\":\"b\"}"
}
```

字段说明：

- `sharerUserId`：分享者 LINE userId，必填
- `testResult`：测试结果，必填
- `answerContent`：原始答题内容，选填，建议前端传 JSON 字符串

成功返回示例：

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "id": 123,
    "sharerUserId": "U123456",
    "testResult": "A",
    "savedAt": "2026-03-25 12:00:00"
  }
}
```

`data` 字段说明：

- `id`：本次保存记录 ID
- `sharerUserId`：分享者 LINE userId
- `testResult`：保存的测试结果
- `savedAt`：保存时间

失败场景：

- `分享者ID不能为空`
- `测试结果不能为空`
- `请求过于频繁，请稍后再试`

---

## 3.2 确认一次分享成功

### 请求

- 方法：`POST`
- 路径：`/business/lineShareReward/confirm`
- Content-Type：`application/json`

请求体：

```json
{
  "sharerUserId": "U123456",
  "inviteeUserId": "U999999"
}
```

字段说明：

- `sharerUserId`：分享者 LINE userId，必填
- `inviteeUserId`：被分享者 LINE userId，必填

成功返回示例：

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "shareRecorded": true,
    "successShareCount": 3,
    "inviteeCouponCode": "LS20ABCDEFGH",
    "inviteeCouponSent": true,
    "rewardGranted": true,
    "rewardRedeemCode": "ABCDEF1234",
    "rewardExpireTime": "2026-04-01 12:00:00"
  }
}
```

`data` 字段说明：

- `shareRecorded`：本次分享是否成功入库。只要接口成功，当前基本就是 `true`
- `successShareCount`：分享者当前累计成功分享次数
- `inviteeCouponCode`：发给被分享者的 20% OFF 优惠券码
- `inviteeCouponSent`：LINE 消息是否推送成功
- `rewardGranted`：分享者是否已有免费兑换码奖励
- `rewardRedeemCode`：免费兑换码
- `rewardExpireTime`：免费兑换码过期时间

业务规则：

- 分享者不能分享给自己
- 被分享者只能领取 1 次分享奖励
- 同一对用户不能重复记分享关系
- 调用 `confirm` 之前，分享者必须先调用 `testResult` 保存过答题结果
- 后端使用分享者最近一次保存的 `testResult`
- 累计成功分享满 3 次后，只发 1 次免费兑换码，不会循环发放
- 被分享者优惠券有效期 7 天
- 分享者免费兑换码有效期 7 天

前端注意点：

- `inviteeCouponSent = false` 不代表本次分享失败，只代表 LINE 推送失败
- 只要接口成功，本次分享记录和优惠券创建通常已经完成
- 当累计次数已经大于等于 3 时，后续再次分享成功，接口仍可能返回已有的 `rewardRedeemCode`

失败场景：

- `分享者ID不能为空`
- `被分享者ID不能为空`
- `自己不能分享给自己`
- `该被分享者已领取过分享奖励`
- `该分享关系已存在，不能重复记录`
- `分享者尚未保存答题结果`
- `测试结果未配置商品组映射：xxx`
- `系统配置缺失：lineSharePurchaseUrl`
- `请求过于频繁，请稍后再试`

---

## 3.3 查询分享奖励状态

### 请求

- 方法：`GET`
- 路径：`/business/lineShareReward/status`

请求参数：

- `userId`：分享者 LINE userId，必填

请求示例：

```text
/business/lineShareReward/status?userId=U123456
```

成功返回示例：

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "sharerUserId": "U123456",
    "successShareCount": 3,
    "rewardGranted": true,
    "redeemCode": "ABCDEF1234",
    "expireTime": "2026-04-01 12:00:00",
    "expired": false,
    "productGroupId": 1001,
    "productGroupName": "Japan eSIM"
  }
}
```

`data` 字段说明：

- `sharerUserId`：当前查询的用户 ID
- `successShareCount`：当前累计成功分享次数
- `rewardGranted`：是否存在免费兑换码记录
- `redeemCode`：免费兑换码
- `expireTime`：奖励过期时间
- `expired`：奖励是否已过期
- `productGroupId`：奖励关联的商品组 ID
- `productGroupName`：奖励关联的商品组名称

前端注意点：

- `rewardGranted = true` 只表示“已经生成过奖励记录”
- 奖励是否还能用，必须同时看 `expired`
- 当 `rewardGranted = false` 时，`redeemCode`、`expireTime`、`productGroupId`、`productGroupName` 会是 `null`

失败场景：

- `分享者ID不能为空`

---

## 4. 前端接入建议

### 4.1 可直接使用的页面逻辑

1. 分享者做完测试后，先调用 `testResult`
2. 生成分享链接时，前端自己把 `sharerUserId` 带到链接参数里
3. 被分享者进入页面后，拿到自己的 `inviteeUserId`，调用 `confirm`
4. 奖励页或个人中心调用 `status` 展示累计次数和兑换码状态

### 4.2 文案判断建议

- `successShareCount < 3`：展示“还差 N 次分享可领取免费奖励”
- `rewardGranted = true` 且 `expired = false`：展示兑换码和有效期
- `rewardGranted = true` 且 `expired = true`：展示“兑换码已过期”
- `inviteeCouponSent = false`：不要直接提示“分享失败”，更适合提示“奖励已生成，消息推送可能延迟”

---

## 5. 关键补充说明

- 分享者奖励对应哪个商品组，不是前端传的，是后端根据 `testResult` 映射出来的
- `answerContent` 后端当前只做原样保存，不参与奖励判断
- 当前返回时间字段是后端 `Date` 序列化结果，前端按现有项目时间格式处理即可

