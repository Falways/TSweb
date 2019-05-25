<style lang="less" scoped>
    .accessBoard{
        width: 1000px;
        display: inline-block;
        height: 100%;
        margin-top: 20px;
    }
    .h2socre{
        display: block;
        font-size: 1.5em;
        -webkit-margin-before: 0.83em;
        -webkit-margin-after: 0.83em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        font-weight: bold;
    }
    .title{
        margin-top: 30px;
    }
    .main {
        width: 1000px;
        height: 100%;
        margin-top: 20px;
        display: inline-block;
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
    .detail{
        width: 1000px;
        height: 100%;
        margin-top: 20px;
        display: inline-block;
        margin-bottom: 90px;
    }
</style>

<template>
    <div id="pdfDom">
        <h1 class="title">IPv6转换规模与复杂度与评估报告</h1>
        <div style="margin-top: 15px;color: #42b983;font-size: 14px">
            <span>评测时间：{{new Date().Format('yyyy:MM:dd hh:mm:ss')}}</span>
            <Button v-if="showDownloadBtn" type="success" style="margin-left: 10px" @click="downLoad()">下载PDF</Button>
        </div>
        <div class="main">
            <Table border stripe :columns="columns" :data="v46Data"></Table>
            <div class="h2socre">评估结果：该网站{{showMessage}}，综合评分<span v-bind:style="{color:socreColor}">{{score}}</span>分</div>
        </div>

        <div class="accessBoard">
            <h1>IPv6转换规模评估</h1>
            <Table border stripe :columns="detailLinksColumns" :data="linksData"></Table>
        </div>

        <div class="detail">
            <h1>IPv6转换复杂度评估</h1>
            <Table border stripe :columns="detailColumns" :data="detailData"></Table>
        </div>

        <div class="login-footer">
            <h4>广州赛讯信息技术有限公司</h4>
            <span>Copyright(c) 2018-2020 GuangZhou CyberEX Co.Ltd, All rights reserved</span>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {CreateElement} from 'vue';
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
        htmlTitle:string ='IPv6转换规模与复杂度与评估报告';
        showDownloadBtn:boolean = true;
        downLoad(){
            this.showDownloadBtn = false;
            Vue.prototype.getPdf()
        }
        detailColumns:object[]= [
            {
                title:'序号',
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title:'评定项目',
                align:'center',
                key:'evaluateProject'
            },
            {
                title:'数量',
                align:'center',
                key:'number'
            },
            {
                title:'系数',
                align:'center',
                key:'coefficient'
            },
            {
                title:'评估值',
                align:'center',
                key:'evaluateValue'
            }
        ];
        detailData: any[] = [
           /* {
                evaluateProject:'支持HTTPS',
                number:'1',
                coefficient:'1000',
                evaluateValue:'1000'
            },
            {
                evaluateProject:'IP链接',
                number:'20',
                coefficient:'100',
                evaluateValue:'2000'
            }*/
        ];

        detailLinksColumns: object[]=[
            {
                title:'二级站点',
                width:'800',
                key:'link',
                render:(h:CreateElement,params :any) => {
                    let linkArray = params.row.list;
                    return h('div',[
                        h('ul', linkArray.map((item:any,index:any) => {
                            if(index+1==linkArray.length){
                                return h('li', {
                                    style:{
                                        'margin':'0 -18px',
                                        'list-style':'none',
                                        'padding': '9px 9px 9px 20px',
                                        'border-bottom':"none",
                                        'overflow-x': "hidden"
                                    }
                                }, item)
                            }else {
                                return h('li', {
                                    style:{
                                        'margin':'0 -18px',
                                        'list-style':'none',
                                        'padding': '9px 9px 9px 20px',
                                        'border-bottom':"1px solid #EEEEEE",
                                        'overflow-x': "hidden"
                                    }
                                }, item)
                            }

                        }))
                    ])

                }
            },
            {
                title:'总计',
                align:'center',
                key:'total'
            }
        ];
        linksData: LinkModel[] = [];
        score:number=40;
        // 定义Table Data
        v46Data: object[] = [
            /*{
                url:'www.baidu.com',
                supportV4:'是',
                supportV6:'否',
                ipv4_http:'是',
                ipv4_https:'是',
                ipv6_http:'是',
                ipv6_https:'是',
            }*/
        ];
        // 定义表格 columns
        showMessage: string = '不支持IPv6'
        socreColor: string = 'red';
        columns: object[] = [
            {
                title: '检测站点',
                align: 'center',
                key: 'url'
            },
            {
                title: 'DNS支持度',
                align: 'center',
                children:[
                    {
                        title:'IPv4解析',
                        align: 'center',
                        key:'supportV4'
                    },
                    {
                        title:'IPv6解析',
                        align: 'center',
                        key:'supportV6'
                    }
                ]
            },
            {
                title: '网站支持度',
                align: 'center',
                children:[
                    {
                        title:'IPv4 HTTP',
                        align:'center',
                        key:'ipv4_http'
                    },
                    {
                        title:'IPv4 HTTPS',
                        align:'center',
                        key:'ipv4_https'
                    },
                    {
                        title:'IPv6 HTTP',
                        align:'center',
                        key:'ipv6_http'
                    },
                    {
                        title:'IPv6 HTTPS',
                        align:'center',
                        key:'ipv6_https'
                    }
                ]
            }
        ];

        // method
        /*counter() {
            this.timer++
        }*/
        mounted() {
            let pass:any =  this.$route.query.pass;
            pass = pass.data;
            console.log(pass)
            this.detailData = pass.detail;
            this.v46Data = pass.v46;
            this.linksData = pass.links;
            this.score = pass.score;
            if (pass.score>60){
                this.socreColor = 'green';
            }

        }

    }
</script>

