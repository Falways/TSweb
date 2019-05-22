<template>
    <div>
        <h1 class="title">IPv6转换规模与复杂度与评估报告</h1>
        <div class="main">
            <Table :colums="columns" :data="data"></Table>
        </div>
        <Collapse v-model="value1">
            <Panel name="1">
                史蒂夫·乔布斯
                <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
            </Panel>
            <Panel name="2">
                斯蒂夫·盖瑞·沃兹尼亚克
                <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
            </Panel>
            <Panel name="3">
                乔纳森·伊夫
                <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
            </Panel>
        </Collapse>
        <Slider v-model="value1"></Slider>
        <Slider v-model="value2" range></Slider>
        <Slider v-model="value3" range disabled></Slider>
        <!--底部公司信息-->
        <div class="login-footer">
            <h4>广州赛讯信息技术有限公司</h4>
            <span>Copyright(c) 2018-2020 GuangZhou CyberEX Co.Ltd, All rights reserved</span>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import { CreateElement } from "vue";
    //import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

    @Component({
        components: {}
    })

    export default class Home extends Vue {
        value1 = 25
        value2 = [20, 50]
        value3 = [20, 50]
        // 定义Table Data
        data: object[] = [];
        // 定义表格 columns
        columns: object[] = [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '网站',
                key: 'url',
                width: 160,
                align: 'center',
                tooltip:true
            },
            {
                title: 'IPv4地址',
                key: 'v4addr',
                width: 150,
                align: 'center',
            },
            {
                title: 'IPv6地址',
                key: 'v6addr',
                align: 'center',
                tooltip:true
            }
        ];


        timer: number = 0;

        // method
        counter() {
            this.timer++
        }
        mounted(){
            this.data = [{"url":"www.superhang.top","v4addr":'aa',"v6addr":'bbb'}]
        }
    }
</script>

<style lang="less">
    .title{
        margin-top: 5px;
    }
    .main {
        width: 100%;
        height: 100%;
        margin-top: 20px;
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
