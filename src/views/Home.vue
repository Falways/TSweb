<template>
    <div>
        <h1 class="title">IPv6转换规模与复杂度与评估报告</h1>
        <div class="main">
            <Table border stripe :columns="columns" :data="data"></Table>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    //import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
    @Component({
        // 注册钩子函数
        props: [],
        components: {},
        computed: {},
        watch: {},
        mounted () {},
        created () {}
    })
    export default class Home extends Vue {
        // 定义Table Data
        data: object[] = [];
        // 定义表格 columns
        columns: object[] = [
            {
                title: '网站',
                key: 'url',

            },
            {
                title: 'IPv4地址',
                key: 'v4addr'
            },
            {
                title: 'IPv6地址',
                key: 'v6addr'
            }
        ];

        // method
        /*counter() {
            this.timer++
        }*/
        mounted() {
            this.data = [{"url":"www.superhang.top","v4addr":'aa',"v6addr":'bbb'}];
            console.log(99999)
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
