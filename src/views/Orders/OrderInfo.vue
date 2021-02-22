<template>
  <div class="orderInfo">
    <Header title="订单详情" :isLeft="true"/>
    <div class="view-body" v-if="orderDetail">
      <div class="status-head">
        <div class="status-text">订单已送达</div>
        <div class="status-title">期待再次光临!</div>
      </div>
      <div class="restaurant-card">
        <!-- 点餐信息 -->
        <CartGroup 
          v-if="orderDetail.orderInfo"
          :orderInfo="orderDetail.orderInfo"
          :totalPrice="orderDetail.totalPrice"
        />
      </div>
      <!-- 配送信息 -->
      <div class="detail-card">
        <div class="title">配送信息</div>
        <ul class="card-list">
          <li class="list-item">
            <span>送达时间：</span>
            {{orderDetail.date}}
          </li>  
        </ul>
      </div>
      <!-- 订单信息 -->
      <div class="detail-card">
        <div class="title">订单信息</div>
        <ul class="card-list">
          <li class="list-item">
            <span>订单号：</span>
            {{orderDetail._id}}
          </li> 
          <li class="list-item">
            <span>支付方式：</span>
            在线支付
          </li>
          <li class="list-item">
            <span>下单时间：</span>
            {{orderDetail.date}}
          </li>
          <li class="list-item" v-if="orderDetail.remarkInfo">
            <span>订单备注：</span>
            <span class="remark">
              {{orderDetail.remarkInfo.remark}}
              {{orderDetail.remarkInfo.tableware}}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header';
import CartGroup from '../../components/Orders/CartGroup';
export default {
  name:"orderInfo",
  data(){
    return {
      orderDetail:null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      vm.orderDetail = to.params;
    })
  },
  computed:{
    userInfo(){
      return this.$store.getters.userInfo;
    },
  },
  components:{
    Header,
    CartGroup
  },
 
  
}
</script>

<style scoped>
.orderInfo {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}

.view-body {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.status-head {
  margin: 2.666667vw;
  box-shadow: 0 0.133333vw 0.266667vw 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  padding: 0 3.2vw 5.333333vw;
}
.status-head .status-text {
  margin: 0 auto 4.266667vw;
  color: #333;
  font-size: 20px;
  text-align: left;
  padding: 4.266667vw 0;
  border-bottom: 0.133333vw solid #ddd;
}
.status-head .status-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 1.866667vw;
}

.restaurant-card {
  margin: 2.666667vw;
  box-shadow: 0 0.133333vw 0.266667vw 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  padding: 0 3.2vw 5.333333vw;
}

/* 配送和订单 */
.detail-card {
  margin: 2.666667vw;
  box-shadow: 0 0.133333vw 0.266667vw 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  padding: 0 3.2vw 5.333333vw;
}

.status-head .status-text {
  margin: 0 auto 4.266667vw;
  color: #333;
  font-size: 24px;
  font-weight: 600;
  text-align: left;
  padding: 4.266667vw 0;
  border-bottom: 0.133333vw solid #ddd;
}
.status-head .status-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 1.866667vw;
}
.title {
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #eee;
  line-height: 10.4vw;
}
.list-item {
  color: #6e6e6e;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: baseline;
  line-height: 4.8vw;
  font-size: 14px;
  padding: 3.2vw 8vw 2.666667vw 0;
}
.list-item .content {
  line-height: 1.5em;
  padding-bottom: 2.666667vw;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.list-item span:first-child {
  flex: none;
}
.remark {
  text-overflow: ellipsis;
  overflow: hidden;
  flex-grow: 1;
  white-space: nowrap;
}
</style>

