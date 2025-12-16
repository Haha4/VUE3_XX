<template>
  <div class="main-container-div">
    <div class="main-head-div">
      <img src="@/assert/img/login/logo1.png" />
    </div>
    <div class="main-content-div">
      <div class="main-content-inner-div">
        <div class="login-photo-div">
          <img src="../../assert/img/login/img.png" />
        </div>
        <div class="login-content-div">
          <div class="login-pop-div">
            <div class="login-head-div">
              <div
                class="button-style-div cursor-pointer"
                @click="currentLabel = 2"
              >
                <span
                  class="login-label"
                  :class="{ 'current-label': currentLabel == 2 }"
                  >账号登录</span
                >
              </div>
            </div>

            <div class="login-input-container" v-if="currentLabel == 2">
              <div class="input-line-div">
                <img class="img-label" src="@/assert/img/login/user.png" />
                <input
                  type="text"
                  style="width: 100%"
                  placeholder="用户名"
                  v-model.trim="userName"
                  @blur="getChildCount"
                  @keydown.enter="getChildCount"
                />
                <select-component
                  v-if="selectData.data.length > 0"
                  selectStyle="marginLeft:5px;width:110px;flexShrink:0"
                  :selectData="selectData"
                  :selectId="selectId"
                  @getSelectValue="getSelectValue"
                />
              </div>

              <div class="input-line-div">
                <img class="img-label" src="@/assert/img/login/lock.png" />
                <input type="password" placeholder="密码" v-model="password" />
              </div>

              <div class="input-line-div" style="margin-top: 40px">
                <div class="flex-style">
                  <div class="remember-user-div flex-style">
                    <img
                      class="remember-img"
                      src="@/assert/img/login/wxz.png"
                      v-if="!rememberUserStatus"
                      @click="rememberUserStatus = !rememberUserStatus"
                    />
                    <img
                      class="remember-img"
                      src="@/assert/img/login/xz.png"
                      v-else
                      @click="rememberUserStatus = !rememberUserStatus"
                    />
                    <span class="login-s-label">记住账号</span>
                  </div>

                  <div
                    class="remember-user-div flex-style"
                    style="margin-left: 20px"
                  >
                    <img
                      class="remember-img"
                      src="@/assert/img/login/wxz.png"
                      v-if="!rememberPasswordStatus"
                      @click="rememberPasswordStatus = !rememberPasswordStatus"
                    />
                    <img
                      class="remember-img"
                      src="@/assert/img/login/xz.png"
                      v-else
                      @click="rememberPasswordStatus = !rememberPasswordStatus"
                    />
                    <span class="login-s-label">记住密码</span>
                  </div>

                  <div
                    class="remember-user-div flex-style"
                    style="margin-left: 20px"
                    @click="
                      () => {
                        showForce.value = true;
                        initAliNc();
                      }
                    "
                  >
                    <span>新版登录</span>
                  </div>
                </div>
              </div>

              <div class="login-button-div" @click="loginSystem">登录</div>
            </div>
            <div class="er-wei-ma-div" v-if="currentLabel == 1">
              <img src="" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="copy-right-div">Copyright © 2004-2018 Grasp.com 版权所有</div>

    <div class="shade-style" v-if="popData.length > 1">
      <div class="pop-user-code-div">
        <div
          class="select-one-div"
          v-for="item in popData"
          :key="item.UserCode"
          @click="changeCheckId(item.UserCode)"
        >
          {{ item.UserName }}({{ item.UserCode }})
        </div>
      </div>
    </div>

    <div class="shade-style" v-if="IEBrowser">
      <div class="browser-recommend-div">
        <i class="fa fa-times close-pop" @click.stop="IEBrowser = false"></i>
        <img class="chrome-img" src="@/assert/img/login/chromeImg.png" />
        <div class="download-line-div">
          <a href="https://pc.qq.com/detail/1/detail_2661.html" target="_blank">
            <span class="download-button">立即下载</span>
          </a>
        </div>
        <div class="font-size-20">
          为了获得最佳体验，推荐使用 Chrome 浏览器。
        </div>
      </div>
    </div>

    <!-- 三要素登录弹窗 -->
    <ishop-dialog
      v-model:visible="showForce"
      title="挡路"
      width="600px"
      :append-to-body="false"
      :modal-append-to-body="false"
      :showFooter="false"
    >
      <div class="force-login-content">
        <el-tabs v-model="loginName">
          <el-tab-pane label="密码登录" name="account">
            <el-form ref="formRef" :model="loginForm" label-width="110px">
              <el-form-item label="租户手机号">
                <el-input v-model="loginForm.tMobile" />
              </el-form-item>
              <el-form-item label="userCode">
                <el-input v-model="loginForm.userCode" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="loginForm.password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="() => forceLogin('account')"
                  >登录</el-button
                >
                <el-button
                  @click="
                    () => {
                      loginForm = { code: '123456' };
                      showForce.value = false;
                    }
                  "
                  >取消</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="验证码登录" name="mobile">
            <el-form ref="formRef2" :model="loginForm" label-width="110px">
              <el-form-item label="租户手机号">
                <el-input v-model="loginForm.tMobile" />
              </el-form-item>
              <el-form-item label="userCode">
                <el-input v-model="loginForm.userCode" />
              </el-form-item>
              <el-form-item label="验证码">
                <el-input v-model="loginForm.code" />
              </el-form-item>
              <el-form-item>
                <div id="aliNc"></div>
              </el-form-item>
              <el-form-item>
                <el-button id="CodeBtn" type="primary" @click="sendCode"
                  >发送验证码</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="() => forceLogin('mobile')"
                  >登录</el-button
                >
                <el-button
                  @click="
                    () => {
                      loginForm = { code: '123456' };
                      showForce.value = false;
                    }
                  "
                  >取消</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </ishop-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, watch, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import hex_md5 from "@/extra/md5.js";
import SelectComponent from "@/components/select-component.vue";
import IsHopDialog from "@/components/ishop-dialog.vue";

// setup refs / reactive state
const currentLabel = ref(2);
const userName = ref("");
const password = ref("");
const rememberUserStatus = ref(false);
const rememberPasswordStatus = ref(false);
const selectData = reactive({
  data: [],
});
const selectId = ref(null);

const popData = ref([]);
const IEBrowser = ref(false);
const loginButton = ref(false);
const loginUrl = ref("https://pclogintest.graspishop.com");
const showForce = ref(false);
let loginForm = reactive({ code: "123456" });
const loginName = ref("account");
const SceneId = ref("pr4umq2r");
const captchaVerifyParam = ref(null);

// template refs
const formRef = ref(null);
const formRef2 = ref(null);

// hooks
const router = useRouter();
const store = useStore();
const { proxy } = getCurrentInstance();

// utility functions
function getRandomString(length = 16) {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function IEVersion() {
  const ua = window.navigator.userAgent;
  const isIE = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
  if (isIE) {
    return 11;
  }
  return -1;
}

// lifecycle
onBeforeMount(() => {
  // set loginUrl from store if available
  loginUrl.value = store.state?.baseData?.microServicesAjax || loginUrl.value;

  // change socket status
  store.commit && store.commit("changeSocketStatus", false);

  if (IEVersion() != -1) {
    IEBrowser.value = true;
  }

  const savedUserName = localStorage.getItem("userName");
  const savedPassword = localStorage.getItem("password");
  let userListData = [];

  if (localStorage.getItem("userListData")) {
    try {
      userListData = JSON.parse(localStorage.getItem("userListData"));
    } catch (e) {
      userListData = [];
    }
  }

  if (savedUserName) {
    rememberUserStatus.value = true;
    userName.value = savedUserName;

    if (userListData.length === 0) {
      getChildCount();
    } else {
      if (userListData.length > 1) {
        for (let i = 0; i < userListData.length; i++) {
          const tempData = userListData[i];
          selectData.data.push({
            value: tempData.UserName,
            id: tempData.UserCode,
          });
        }
        selectId.value = userListData[0].UserCode;
      } else {
        selectId.value = userListData[0]?.UserCode;
      }
    }

    const UserCode = localStorage.getItem("UserCode");
    if (UserCode) selectId.value = UserCode;
  }

  if (savedPassword) {
    rememberPasswordStatus.value = true;
    password.value = savedPassword;
  }

  sessionStorage.removeItem("loginInfo");
  sessionStorage.removeItem("componentTabList");
});

// watch
watch(
  () => userName.value,
  (v) => {
    if (!v) {
      selectData.data = [];
      selectId.value = null;
    }
  }
);

// methods (converted to async/normal functions)

function changeCheckId(UserCode) {
  popData.value = [];
  selectId.value = UserCode;
}

async function getChildCount() {
  if (!userName.value) return false;

  try {
    const res = await fetch(`${loginUrl.value}/identitysvc/userInfo/userList`, {
      method: "POST",
      headers: {
        "client-src": "pcweb",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile: userName.value }),
    });
    const data = await res.json();
    const { RetCode, RetObject, RetMessage } = data;
    if (RetCode === 0) {
      localStorage.setItem(
        "userListData",
        JSON.stringify(RetObject.users || [])
      );
      selectData.data = [];

      if ((RetObject.users || []).length > 1) {
        popData.value = RetObject.users;
        selectId.value = RetObject.users[0].UserCode;

        for (let i = 0; i < RetObject.users.length; i++) {
          const tempData = RetObject.users[i];
          selectData.data.push({
            value: tempData.UserName,
            id: tempData.UserCode,
          });
        }
      } else {
        selectId.value = RetObject.users?.[0]?.UserCode || null;
        if (loginButton.value) loginSystem();
      }
    } else {
      const dialogData = {
        dialogDisplayContent: RetMessage,
        buttonOne: { value: "确认" },
      };
      // assume global action dispatch available
      proxy?.$store?.dispatch
        ? proxy.$store.dispatch("dialogOpen", dialogData)
        : store.dispatch && store.dispatch("dialogOpen", dialogData);
    }
  } catch (err) {
    console.error(err);
  }
}

async function loginSystem() {
  if (!selectId.value) {
    loginButton.value = true;
    await getChildCount();
    return false;
  }

  loginButton.value = false;

  // ESN
  const ESN = getRandomString(16);
  sessionStorage.setItem("ESN", ESN);

  let passwordString = password.value || "";

  passwordString = hex_md5(passwordString).toUpperCase();
  passwordString = hex_md5(passwordString).toUpperCase();

  try {
    const res = await fetch(`${loginUrl.value}/identitysvc/token/login`, {
      method: "POST",
      headers: {
        "client-src": "pcweb",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        esn: ESN,
        mobile: userName.value,
        userCode: selectId.value,
        password: passwordString,
        type: "PC",
      }),
    });
    const result = await res.json();
    const { RetCode, RetObject, RetMessage } = result;

    if (RetCode === 0) {
      if (rememberUserStatus.value) {
        localStorage.setItem("UserCode", selectId.value);
        localStorage.setItem("userName", userName.value);
      } else {
        localStorage.removeItem("UserCode");
        localStorage.removeItem("userName");
      }

      if (rememberPasswordStatus.value) {
        localStorage.setItem("UserCode", selectId.value);
        localStorage.setItem("userName", userName.value);
        localStorage.setItem("password", password.value);
      } else {
        localStorage.removeItem("password");
      }

      RetObject.ESN = ESN;
      RetObject.userName = userName.value;
      RetObject.UserCode = selectId.value;
      RetObject.password = password.value;
      RetObject.rememberUserStatus = rememberUserStatus.value;
      RetObject.rememberPasswordStatus = rememberPasswordStatus.value;

      sessionStorage.setItem("loginInfo", JSON.stringify(RetObject));

      router.push({
        path: "/dataReady",
        query: { postData: encodeURIComponent(JSON.stringify(RetObject)) },
      });
    }

    if (RetCode === -1) {
      const dialogData = {
        dialogDisplayContent: RetMessage,
        buttonOne: { value: "确认" },
      };
      proxy?.$store?.dispatch
        ? proxy.$store.dispatch("dialogOpen", dialogData)
        : store.dispatch && store.dispatch("dialogOpen", dialogData);
    }

    if (RetCode === 98) showLevelUp(userName.value);
  } catch (err) {
    console.error(err);
  }
}

async function showLevelUp(phone) {
  try {
    const params = { userTel: phone };
    const config = {
      headers: { "client-src": "pcweb" },
      forbiddenPretreat: true,
      forbiddenLoad: false,
    };
    // assume global $getAction exists via proxy or store/util
    const caller = proxy?.$getAction
      ? proxy.$getAction
      : store && store._actions && store._actions["$getAction"]
      ? store._actions["$getAction"]
      : null;
    let res;
    if (proxy?.$getAction) {
      res = await proxy.$getAction(
        "/apc/sys/BuyIShop/GetProduct780",
        params,
        config
      );
    } else if (typeof store.dispatch === "function") {
      // fallback try via store action (project specific)
      res = await store
        .dispatch("getAction", {
          url: "/apc/sys/BuyIShop/GetProduct780",
          params,
          config,
        })
        .catch(() => ({}));
    } else {
      return;
    }
    const { RetCode, RetObject } = res;
    if (RetCode === 0) {
      const { agentType, productModel, userTel } = RetObject;
      const isProxy = agentType == 2 || productModel == 1;
      // use global confirm/message if available
      if (proxy?.$confirm) {
        proxy
          .$confirm(
            "您的系统版本仅支持手机端登录，请购买更高级的版本",
            "温馨提示",
            {
              confirmButtonText: isProxy ? "我知道了" : "去购买",
              cancelButtonText: "关闭",
              showCancelButton: !isProxy,
              type: "warning",
            }
          )
          .then(() => {
            if (!isProxy) {
              const host = window.location.origin;
              const routerMode =
                process.env.NODE_ENV === "development" ? "/#" : "";
              const url = `${host}${routerMode}/valueAdded/mobileOnly?userTel=${userTel}`;
              if (proxy?.openLink) proxy.openLink(url);
              else window.open(url, "_blank");
            } else {
              proxy?.$message?.warning("请联系您的代理商进行购买");
            }
          });
      } else {
        // fallback
        if (!isProxy) {
          const host = window.location.origin;
          const routerMode = process.env.NODE_ENV === "development" ? "/#" : "";
          const url = `${host}${routerMode}/valueAdded/mobileOnly?userTel=${userTel}`;
          window.open(url, "_blank");
        } else {
          proxy?.$message?.warning &&
            proxy.$message.warning("请联系您的代理商进行购买");
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}

function getSelectValue(data) {
  if (selectId.value != data.data.id) {
    password.value = "";
  }
  selectId.value = data.data.id;
}

async function forceLogin(type = "account") {
  const ESN = getRandomString(16);
  sessionStorage.setItem("ESN", ESN);

  let passwordString = loginForm.password || "";

  if (type === "account") {
    passwordString = hex_md5(passwordString).toUpperCase();
    passwordString = hex_md5(passwordString).toUpperCase();
  }

  const url =
    type === "account"
      ? "/identitysvc/token/login"
      : "/identitysvc/login/authCodeLogin";
  try {
    const res = await fetch(`${loginUrl.value}${url}`, {
      method: "POST",
      headers: {
        "client-src": "pcweb",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        esn: ESN,
        mobile: loginForm.tMobile,
        userCode: loginForm.userCode,
        code: loginForm.code,
        password: passwordString,
        type: "PC",
        devicetype: "PCWeb",
      }),
    });
    const result = await res.json();
    const { RetCode, RetObject, RetMessage } = result;
    if (RetCode === 0) {
      RetObject.ESN = ESN;
      RetObject.userName = loginForm.tMobile;
      RetObject.UserCode = loginForm.userCode;
      RetObject.password = loginForm.password;
      RetObject.LoginType = "PWD_LOGIN";

      sessionStorage.setItem("loginInfo", JSON.stringify(RetObject));

      router.push({
        path: "/dataReady",
        query: { postData: encodeURIComponent(JSON.stringify(RetObject)) },
      });
    }

    if (RetCode === -1) {
      const dialogData = {
        dialogDisplayContent: RetMessage,
        buttonOne: { value: "确认" },
      };
      proxy?.$store?.dispatch
        ? proxy.$store.dispatch("dialogOpen", dialogData)
        : store.dispatch && store.dispatch("dialogOpen", dialogData);
    }

    if (RetCode === 98) showLevelUp(loginForm.tMobile);
  } catch (err) {
    console.error(err);
  }
}

async function sendCode() {
  try {
    const res = await fetch(`${loginUrl.value}/identitysvc/token/send/code`, {
      method: "POST",
      headers: {
        "client-src": "pcweb",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: loginForm.tMobile,
        codeType: "LOGIN",
        captchaVerifyParam: captchaVerifyParam.value,
        scene: SceneId.value,
      }),
    });
    const result = await res.json();
    const { RetCode, RetMessage } = result;
    if (RetCode === 0) {
      proxy?.$message?.success
        ? proxy.$message.success("验证码发送成功")
        : console.log("验证码发送成功");
    } else {
      proxy?.$message?.error
        ? proxy.$message.error(RetMessage)
        : console.error(RetMessage);
    }
  } catch (err) {
    console.error(err);
  }
}

// 初始化阿里云滑块验证
function initAliNc() {
  if (!window.initAliyunCaptcha) {
    console.warn("Aliyun captcha init function not found on window");
    return;
  }
  window.initAliyunCaptcha({
    SceneId: SceneId.value,
    prefix: "1beis4",
    mode: "embed",
    element: "#aliNc",
    button: "#CodeBtn",
    success: (data) => {
      captchaVerifyParam.value = data;
    },
    fail: (failCode) => {
      captchaVerifyParam.value = null;
      console.log("captcha fail", failCode);
    },
    slideStyle: {
      width: 320,
      height: 38,
    },
  });
}
</script>

<style scoped>
.main-content {
  width: 100%;
}
.main-head-div {
  width: 840px;
  height: 107px;
  margin: 0 auto;
}
.main-head-div img {
  float: left;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.main-content-div {
  height: 470px;
  width: 100%;
  background: url("../../assert/img/login/bg.png");
  background-size: cover;
  background-repeat: none;
}
.main-content-inner-div {
  width: 840px;
  margin: 0 auto;
}
.login-photo-div {
  float: left;
  width: 50%;
  height: 470px;
  text-align: left;
}
.login-photo-div img {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.login-content-div {
  float: right;
  width: 50%;
  height: 470px;
  display: flex;
  justify-content: flex-end;
}
.login-pop-div {
  width: 368px;
  height: 321px;
  border-radius: 4px;
  /*box-shadow: 0 2px 10px 2px #408CE1;*/
  background-color: white;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.login-head-div {
  width: 100%;
  height: 49px;
  background-color: #efefef;
  border-radius: 4px 4px 0 0;
}
.button-style-div {
  height: 100%;
  width: 100%;
  float: left;
  text-align: center;
  line-height: 49px;
}
.login-label {
  color: #939393;
  font-size: 16px;
}
.current-label {
  color: #353535;
}
.input-line-div {
  width: 300px;
  height: 36px;
  margin: 20px auto 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.input-line-div input {
  width: inherit;
  height: inherit;
  border-radius: 2px;
  border: 1px solid #cccccc;
  padding-left: 40px;
  font-size: 14px;
}
.img-label {
  position: absolute;
  top: 8px;
  left: 10px;
}
.input-line-div input::placeholder {
  color: #7f8c8d;
}
.login-input-container {
  padding-top: 10px;
}
.login-s-label {
  color: #8f8f8f;
  font-size: 14px;
  margin-left: 10px;
}
.input-line-div {
  display: flex;
  justify-content: space-between;
}
.remember-img {
  cursor: pointer;
}
.login-button-div {
  width: 300px;
  height: 36px;
  line-height: 36px;
  background-color: #e75253;
  color: white;
  border-radius: 2px;
  margin: 0 auto;
  cursor: pointer;
}
.forget-color {
  color: #47474f;
  cursor: pointer;
}
.no-account-p {
  color: #474747;
  font-size: 14px;
}
.color-blue {
  color: #186fd5;
}
.er-wei-ma-div {
  width: 367px;
  height: 223px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pop-user-code-div {
  min-height: 60px;
  max-height: calc(58vh);
  overflow-y: auto;
  width: 200px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  background-color: white;
  padding: 20px;
  border-radius: 6px;
  scrollbar-width: none; /* Firefox */
}
.pop-user-code-div::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.select-one-div {
  line-height: 30px;
  cursor: pointer;
  text-align: left;
}
.select-one-div:hover {
  background-color: #186fd5;
  color: white;
}
.browser-recommend-div {
  background-color: white;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -150px;
  width: 400px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
}
.font-size-20 {
  font-size: 20px;
}
.chrome-img {
  height: 100px;
  width: 100px;
  margin-bottom: 20px;
}
.download-line-div {
  padding: 20px 0;
}
.download-button {
  font-size: 14px;
  cursor: pointer;
  color: #186fd5;
}
.download-button:hover {
  text-decoration: underline;
}
.close-pop {
  font-size: 30px;
  right: 20px;
  top: 20px;
  position: absolute;
  transform: rotate(0deg);
  transition: all 0.2s linear;
}
.close-pop:hover {
  transform: rotate(180deg);
}
.copy-right-div {
  color: #666666;
  font-size: 14px;
  line-height: 40px;
}
.force-login-content {
  padding: 20px 60px 60px;
}
.ishop-dialog .el-dialog__body .el-form-item:last-child {
  margin-bottom: 20px;
}
</style>
