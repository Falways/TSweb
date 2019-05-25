<style lang="less" scoped>
    // 在vue中如果页面中的使用带ID的dom，css要指定为scoped，否则会出现其他css乱码
    .main{
        position: absolute;
        top: 20%;
        left:0px;
        right: 0px;

    }
    .login-footer{
        height:47px;
        text-align: center;
        position: fixed;
        width:100%;
        bottom: 0;
        padding:10px;
        color:#a7a7a7;
        h4{
            font-weight: 100;
            font-weight: bold;
        }
    }
</style>

<template>
    <div>
        <span style="float: right;padding-right: 30px;padding-top: 10px;color: gray;cursor: pointer" @click="login($store.state.userName)">{{topToolTip}}</span>
        <div class="main">
        <h1>IPv6转换规模与复杂度检测工具</h1>
        <Form ref="formInline" :model="formInline"  inline style="margin-top: 4%">
            <FormItem style="width: 30%" prop="domain">
                <Input type="text" v-model="formInline.domain" size="large"  placeholder="例：www.baidu.com"/>
            </FormItem>
            <FormItem>
                <Button @click="toAnalyze" :disabled="disUse">分析</Button>
            </FormItem>
        </Form>
        </div>
        <div class="login-footer">
            <h4>广州赛讯信息技术有限公司</h4>
            <span>Copyright(c) 2018-2020 GuangZhou CyberEX Co.Ltd, All rights reserved</span>
        </div>
        <canvas id="cas" style="z-index: -1"></canvas>
        <Modal v-model="modal" style="text-align: center">
            <h3>登录</h3>
            <br/>
            <Form ref="formInline" :model="loginForm">
                <FormItem prop="username">
                    <Input type="text" v-model="loginForm.username" placeholder="用户名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="loginForm.password" placeholder="密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="info" size="large" long :loading="modal_loading" @click="toLogin">登录</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {CreateElement} from 'vue';
    import {API} from '@/api/m_ips';

    @Component({
        mounted(): void {
        }
    })
    export default class Search extends Vue {
        evaluation :any= {};
        disUse:boolean = false;
        // 处理分析逻辑
        toAnalyze(){
            if (!this.formInline.domain) {
                this.$Message.warning('你尚未输入内容！');
                return;
            }
            if (this.$store.state.userName){
                this.$Message.loading({content:'系统正在分析中...',duration: 0});
                this.disUse = true;
                // 分析网站URL
                API.getRequest('/api/eve/eve_board',{url: this.formInline.domain}).then((success:any) => {
                    this.$Message.destroy();
                    this.$Message.success('分析成功！');
                    this.$router.push({name:'home',query:{'pass':success}})
                    this.disUse = false;
                }).catch( err => {
                    this.$Message.destroy();
                    this.$Message.error(err);
                    this.disUse = false;
                })
                // this.$router.push({name:'home',params:{evaluation:this.evaluation}});
            } else {
                this.$Message.info('请先登录');
                this.modal = true;
            }
        }
        topToolTip:string = '未登录';
        modal_loading:boolean = false;
        // 登陆
        toLogin(){
            if (this.loginForm.username && this.loginForm.password){
                API.postRequest('/api/eve/eve_login',this.loginForm).then( (success:any) =>{
                    this.$Message.info('登录成功');
                    this.$store.commit('setUserInfo',{userName:this.loginForm.username,token:success.token})
                    this.topToolTip=`${this.$store.state.userName}, 退出`;
                    this.modal = false;
                }).catch( err => {
                    this.$Message.error('登录信息有误，请重新登录')
                })
            } else {
                this.$Message.info('用户名或密码格式不对！')
            }
        }
        formInline:any = {
            domain: ''
        }
        loginForm = {
            username:'',
            password:''
        }
        modal:boolean = false;
        login(value:string){
            if (value){
                this.$Modal.confirm({
                    title:'确定是否退出',
                    onOk:()=>{
                        this.$store.commit('setUserInfo',{userName:'',token:''});
                        this.$Message.info('退出登录成功！');
                        this.topToolTip = '登录';
                    },
                    onCancel:()=>{

                    }
                })
            }else {
                this.modal = true;
            }
        }
        mounted() {
            if (this.$store.state.userName){
                this.topToolTip=`${this.$store.state.userName}, 退出`;
            }
            let canvas:any = document.getElementById("cas");
            let ctx = canvas.getContext("2d");
            resize();
            window.onresize = resize;

            function resize() {
                canvas.width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)-100;
                canvas.height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)-100;
            }

            let RAF = (function () {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
            })();
            // 鼠标活动时，获取鼠标坐标
            let warea:any = {x: null, y: null, max: 20000};
            window.onmousemove = function (e) {
                e = e || window.event;
                warea.x = e.clientX;
                warea.y = e.clientY;
            };
            window.onmouseout = function (e) {
                warea.x = null;
                warea.y = null;
            };
            // 添加粒子
            // x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
            let dots:any = [];
            for (let i = 0; i < 150; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                let xa = Math.random() * 2 - 1;
                let ya = Math.random() * 2 - 1;
                dots.push({
                    x: x,
                    y: y,
                    xa: xa,
                    ya: ya,
                    max: 6000
                })
            }
            // 延迟100秒开始执行动画，如果立即执行有时位置计算会出错
            setTimeout(function () {
                animate();
            }, 100);

            // 每一帧循环的逻辑
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // 将鼠标坐标添加进去，产生一个用于比对距离的点数组
                let ndots = [warea].concat(dots);
                dots.forEach(function (dot:any) {
                    // 粒子位移
                    dot.x += dot.xa;
                    dot.y += dot.ya;
                    // 遇到边界将加速度反向
                    dot.xa *= (dot.x > canvas.width || dot.x < 0) ? -1 : 1;
                    dot.ya *= (dot.y > canvas.height || dot.y < 0) ? -1 : 1;
                    // 绘制点
                    ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);
                    // 循环比对粒子间的距离
                    for (let i = 0; i < ndots.length; i++) {
                        let d2 = ndots[i];
                        if (dot === d2 || d2.x === null || d2.y === null) continue;
                        let xc = dot.x - d2.x;
                        let yc = dot.y - d2.y;
                        // 两个粒子之间的距离
                        let dis = xc * xc + yc * yc;
                        // 距离比
                        let ratio;
                        // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
                        if (dis < d2.max) {
                            // 如果是鼠标，则让粒子向鼠标的位置移动
                            if (d2 === warea && dis > (d2.max / 2)) {
                                dot.x -= xc * 0.03;
                                dot.y -= yc * 0.03;
                            }
                            // 计算距离比
                            ratio = (d2.max - dis) / d2.max;
                            // 画线
                            ctx.beginPath();
                            ctx.lineWidth = ratio / 2;
                            ctx.strokeStyle = 'rgba(0,0,0,' + (ratio + 0.2) + ')';
                            ctx.moveTo(dot.x, dot.y);
                            ctx.lineTo(d2.x, d2.y);
                            ctx.stroke();
                        }
                    }
                    // 将已经计算过的粒子从数组中删除
                    ndots.splice(ndots.indexOf(dot), 1);
                });
                RAF(animate);

            }
        }
    }
</script>


