<template>
  <div id="app">
    <van-nav-bar title="药大咖" />
    <div class="bgc">
      <img class="banner" src="@/assets/WechatIMG99.jpeg" alt="" />
      <img class="pic1" src="@/assets/pic1.png" alt="" />
      <img class="pic2" src="@/assets/pic2.png" alt="" />
      <img class="pic3" src="@/assets/pic3.png" alt="" />
      <img class="pic4" src="@/assets/pic4.png" alt="" />
      <img class="pic5" src="@/assets/pic5.png" alt="" />

      <!-- 点击领取按钮 -->
      <div class="btn1">
        <van-button
          @click="showPopup"
          class="btn"
          round
          type="info"
          size="normal"
          >免费申请医疗直播</van-button
        >
      </div>
      <div class="company-detail">
        <p>北京浩方达科技发展有限公司</p>
        <p>地址：北京海淀区安宁庄东路18号院2号楼</p>
        <p>联系电话：400-676-6605 13522491212</p>
        <p>地址：湖南省长沙市芙蓉广场湘域国际中心</p>
        <p>联系电话：400-676-6605 13974892388</p>
        <p class="p1">备案号：京ICP备08102777号-1</p>
      </div>
      <div class="morebtn1">
        <van-button plain hairline color="#189AFE" @click="getmore">
          了 解 更 多 >
        </van-button>
      </div>
      <div class="morebtn2">
        <van-button plain hairline color="#189AFE" @click="getmore">
          了 解 更 多 >
        </van-button>
      </div>
      <div class="morebtn3">
        <van-button plain hairline color="#189AFE" @click="getmore">
          了 解 更 多 >
        </van-button>
      </div>
    </div>
    <div class="get-gift-card">
      <van-button plain hairline color="#3268E5" @click="getservice"
        >电话咨询</van-button
      >
      <van-button color="#3268E5" @click="showPopup"
        >领2000直播代金券</van-button
      >
    </div>
    <!-- 弹出层，填写信息区域 -->
    <div class="popup1">
      <van-popup
        v-model="show"
        round
        closeable
        close-icon-position="top-left"
        position="bottom"
        :style="{ height: '335px' }"
      >
        <van-cell>免费申请医疗直播</van-cell>
        <!-- 活动力度展示 -->
        <div class="gift-card">
          <div class="gift-cart-top">
            <img src="@/assets/giftleft.png" alt="" />
            <span>恭喜您获得</span>
            <img src="@/assets/giftright.png" alt="" />
          </div>
          <div class="gift-cart-bottom">
            <span>价值</span>
            <span style="color:#1368F4">2000元</span>
            <span>医疗直播基础服务</span>
          </div>
        </div>
        <!-- 手机,验证码 -->
        <div class="mobile-form">
          <van-form @submit="onSubmit" ref="loginForm">
            <van-field
              name="mobile"
              v-model="user.mobile"
              placeholder="请输入手机号"
              type="number"
              maxlength="11"
              :rules="[{ validator }]"
            >
            </van-field>
            <van-field
              v-model="user.code"
              name="code"
              placeholder="请输入验证码"
              type="number"
              maxlength="6"
              :rules="userFormRules.code"
            >
              <template #button>
                <van-button v-if="isCountDownShow" class="time-format">
                  <van-count-down
                    :time="1000 * 60"
                    format="sss重新获取"
                    @finish="isCountDownShow = false"
                  >
                  </van-count-down>
                </van-button>
                <van-button
                  v-else
                  native-type="button"
                  @click="onSendSms"
                  class="send-sms-btn"
                  type="primary"
                  >获取验证码</van-button
                >
              </template>
            </van-field>
            <div>
              <van-button
                class="login-btn"
                block
                type="info"
                native-type="submit"
                >立即领取</van-button
              >
            </div>
          </van-form>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getmobile, getLiftCard } from "@/api/user";

export default {
  name: "App",
  data() {
    return {
      show: false,
      // 用户登录数据对象
      user: {
        mobile: "",
        code: ""
      },
      // 用户名和验证码校验规则
      userFormRules: {
        mobile: [
          {
            required: true,
            message: ""
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号输入有误"
          }
        ],
        code: [
          {
            required: true,
            message: ""
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误"
          }
        ]
      },
      // 控制倒计时的显示和隐藏
      isCountDownShow: false
    };
  },
  created() {
    this.browser();
  },
  mounted() {},
  methods: {
    // 弹出pop
    showPopup() {
      this.show = !this.show;
    },
    async onSubmit(values) {
      try {
        const res = await getLiftCard(values);
        console.log(res);
        if (res.status === 200) {
          if (res.data.success === "ok") {
            this.$toast.success("领取优惠券成功！");
            this.showPopup();
          } else {
            this.$toast({
              message: res.data.msg,
              position: "bottom",
              duration: 2500
            });
            this.showPopup();
          }
        } else {
          this.$toast.fail("手机号或验证码错误");
        }
      } catch (err) {
        this.$toast.fail("手机号或验证码错误");
      }
    },
    async onSendSms() {
      try {
        // 1，验证手机验证码
        await this.$refs.loginForm.validate("mobile");
      } catch (err) {
        return console.log("发送验证码失败");
      }
      // 2，验证通过，显示倒计时
      this.isCountDownShow = true;
      // 3，获取短信验证码
      try {
        const res = await getmobile(this.user.mobile);
        if (res.status === 200) {
          this.$toast({
            message: "发送验证码成功！",
            position: "bottom",
            duration: 2500
          });
        } else {
          this.$toast({
            message: "发送失败，请稍后重试！",
            position: "bottom",
            duration: 2500
          });
        }
      } catch (err) {
        this.isCountDownShow = false;
        this.$toast({
          message: "发送失败，请稍后重试！",
          position: "bottom",
          duration: 2500
        });
      }
    },
    validator(val) {
      const x = /^1[3|5|7|8]\d{9}$/.test(val);
      if (!x) {
        this.$toast({
          message: "手机号输入有误",
          position: "bottom",
          duration: 2000
        });
      }
      return x;
    },
    getmore() {
      this.$toast({
        message: "暂无更多！",
        duration: 2000
      });
    },
    getservice() {
      this.$toast({
        message: "咨询电话：400-676-6650",
        duration: 2000
      });
    }
  }
};
</script>

<style lang="less">
#app {
  // height: 6000px;
  background-color: #3268e5;
  .van-button--info {
    color: #3268e5;
    background-color: #ffffff;
    border: 0;
    font-weight: 400;
    font-size: 20px;
  }
  .bgc {
    text-align: center;
    position: relative;
    .btn1 {
      position: absolute;
      top: 400px;
      transform: translateX(50%);
    }
    .morebtn1 {
      position: absolute;
      top: 765px;
      left: 50%;
      transform: translateX(-50%);
      .van-button--plain {
        background-color: #f9fbff;
      }
    }
    .morebtn2 {
      position: absolute;
      top: 1510px;
      left: 50%;
      transform: translateX(-50%);
      .van-button--plain {
        background-color: #f9fbff;
      }
    }
    .morebtn3 {
      position: absolute;
      top: 2000px;
      left: 50%;
      transform: translateX(-50%);
      .van-button--plain {
        background-color: #f9fbff;
      }
    }
    .van-cell {
      font-size: 20px;
    }
    .banner {
      width: 100%;
      height: 477px;
    }
    .pic1 {
      width: 335px;
      height: 347px;
      margin: 0 auto;
      display: block;
    }
    .pic2 {
      display: block;
      margin-top: 50px;
      margin-left: -20px;
      width: 100%;
    }
    .pic3 {
      margin-top: 70px;
      display: block;
      width: 100%;
    }
    .pic4 {
      display: block;
      margin: 100px auto 60px;
      width: 100%;
    }
    .pic5 {
      display: block;
      width: 100%;
    }
    .company-detail {
      box-sizing: border-box;
      padding-top: 40px;
      background-color: #3268e5;
      height: 256px;
      width: 100%;
      p {
        color: #333333;
        margin: 1px auto;
        font-size: 11px;
      }
      .p1 {
        margin-top: 18px;
        color: #999999;
      }
    }
  }
  .get-gift-card {
    position: fixed;
    display: flex;
    background-color: #ffffff;
    height: 65px;
    width: 100%;
    bottom: 0px;
    justify-content: space-around;
    align-items: center;
    .van-button--default {
      width: 180px;
      border-radius: 8px;
    }
    .van-hairline--surround::after {
      border-radius: 14px;
    }
    .van-button--normal {
      font-size: 17px;
    }
  }
  .gift-card {
    margin-top: 25px;
    .gift-cart-top {
      font-size: 20px;
      text-align: center;
      height: 30px;
      line-height: 100%;
      img {
        margin: 0 10px;
        height: 20px;
        width: 20px;
      }
    }
    .gift-cart-bottom {
      margin-top: 8px;
      text-align: center;
      font-size: 20px;
      height: 30px;
      line-height: 100%;
    }
  }
  .popup1 {
    .van-popup--bottom.van-popup--round {
      bottom: -1px;
    }
    .van-popup--bottom {
      width: 101%;
    }
    .mobile-form {
      .van-button--info {
        color: #ffffff;
        background-color: #3268e5;
        margin-top: 30px;
      }
      .time-format {
        background-color: #e1e1e1;
      }
    }
    .van-cell__value--alone {
      text-align: center;
    }
    .van-field__body {
      .van-button--primary {
        background-color: #3268e5;
        border: 1px solid #3268e5;
      }
    }
  }
}
</style>
