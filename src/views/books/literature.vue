<template>
    <div class="literature-box">
        <el-container>
        <el-main>
            <el-row>
                <el-col :span="6" v-for="(book,index) in bookLists" :key="index" >
                    <div class="book-col">
                        <div><img :src="'/static/images/books/'+book.img" alt=""></div>
                        <div class="book-name" :title="book.title">{{book.title}}</div>
                        <div class="bookbtn">
                            <span @click="getDetails">详情</span>
                            <span @click.self='getBook(index)'>获取</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row class="fen-page">
                <el-col :span="24">
                    <div>
                        <el-pagination
                            background
                            layout="prev, pager, next"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="param.pagesize"
                            :total="total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
            <el-dialog
            title="快乐分享"
            :visible.sync="dialogVisible"
            width="40%">
            <div class="dialog-box">
                <img src="/static/bdwp.jpg" alt="">
            
                <div>百度盘链接：
                 <a :href="getBookList.link" target="_blank">{{getBookList.link}}</a>   
                </div>
                <div>百度盘链接：{{getBookList.password}}</div>
            </div>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span> -->
            </el-dialog>
        </el-main>
        <el-aside class="aside-container">
            <div>
                <el-input placeholder="请输入内容" v-model="param.searchContent" size="small" >
                    <el-button slot="append" icon="el-icon-search" size="small" @click="searchBook"></el-button>
                </el-input>
            </div>
            <div class="latest-share">
                <h3>最新分享榜</h3>
                <div v-for = "(item,index) in latestShareList" :key="index" @click="shareBook(index)">
                    {{ item.uploadtime | dateToFormatter }} | {{item.title}}231231231313213213213213213213213213213213213123123123</div>
                
            </div>
            <div>
                <h3>最新排行榜</h3>
                <ul>
                    <li>123123</li>
                    <li>123123</li>
                    <li>123123</li>
                    <li>123123</li>
                    <li>123123</li>
                </ul>
            </div>
        </el-aside>
        </el-container>
    </div>
</template>
<script>
import axios from 'axios'
import { getLiterature, getLatestShare } from '@/api/books'
import {dateTimeFormatter , dateFormatter} from '@/utils/public'
export default {
    name:'BooksVue',
    data () {
        // 本地 测试 数据
        const bookDatas = [
              {
                  bookid:'books-literature-1', 
                  img:'rshhh.jpg',
                  title:'人生海海',
                  link:'http://www.1539.ink',
                  password:'111'
              },
              {
                  bookid:'books-literature-2', 
                  img:'zhxhy.jpg',
                  title:'知行合一知行合一知行合一知行合一知行合一知行合一',
                  link:'http://www.1539.ink',
                  password:'222'
              },
              {
                  bookid:'books-literature-3', 
                  img:'ajsqn.jpg',
                  title:'埃及四千年',
                  link:'http://www.1539.ink',
                  password:'333'
              },
              {
                  img:'jd.jpg',
                  title:'简单',
                  link:'http://www.1539.ink',
                  password:'333'
              },
              {
                  img:'jdsxdsndq.jpg',
                  title:'决定上限是你的情',
                  link:'http://www.1539.ink',
                  password:'333'
              },
              {
                  img:'lj.jpg',
                  title:'联结',
                  link:'http://www.1539.ink',
                  password:'333'
              },
              {
                  img:'rshhh.jpg',
                  title:'人生海海',
                  link:'http://www.1539.ink',
                  password:'333'
              },
              {
                  img:'yjzs.jpg',
                  title:'易经杂说',
                  link:'http://www.1539.ink',
                  password:'333'
              }
          ]
        return {
          dialogVisible:false,
          getBookList:{},
          bookLists:[],
          param:{
              pagenum:1,
              pagesize:12,
              searchType:'literature',
              searchContent:''
          },
          currentPage:1,
          total:100,
          latestShareList:[]
        }
        
    },
    created() {
this.dataInit();
    },
    computed:{
    //    total() {dateFormatter

    //    }
    },
    filters:{
      dateToFormatter(val) {
          return  dateFormatter(val)  
      }
    },
    mounted (){
    //   this.dataInit();

    },
    methods:{
        getBook (index) {
            this.getBookList = this.bookLists[index];
            this.dialogVisible = true; 
        },
        dataInit (){
            this.getLiteratureList()
            this.getLatestShareList()
        },
        getLiteratureList() {
            getLiterature(this.param).then((res) => {
                if(res.status == '200000'){
                    this.bookLists = res.result.docs;
                    this.bookLists.forEach((item,index) => {
                        if(item.img == '' || item.img == undefined){
                            item.img = 'jd.jpg'
                        }
                    });
                    this.total = res.result.total;
                }
                if(res.status == '200004'){
                    this.$message({
                        message:'暂无数据，请稍后再试！',
                        type:'success'
                    })
                    // console.log(res.msg)
                }
            }).catch((err) => {
                console.log('err')
            })
        },
        getLatestShareList() {
          getLatestShare({size:5}).then((res) => {
              if(res.status == '200000'){
                console.log('最新 分享')
                console.log(res)
                this.latestShareList = res.result.docs;
              }
          }).catch(err => {
              console.log('err')
          })
        },
        getDetails() {
            console.log('点击详情')
            getLiterature(this.param).then((res) => {
                if(res.status == '200000'){

                }
                console.log(res)
            }).catch((err) => {
            })
        },
        handleCurrentChange(val) {//分页
           console.log(`当前页数：${val}`)
           this.param.pagenum = val;
           this.getLiteratureList();
        },
        searchBook() {
            let searchContent = this.param.searchContent.trim();
            if(searchContent == '') return false;
            this.param.pagenum = 1;
            this.getLiteratureList();
        
        },
        shareBook(index) {
            this.getBookList = this.latestShareList[index];
            this.dialogVisible = true; 
        }
    }
}
</script>
<style lang="scss" scoped>
$fontColor:#909399;
.literature-box {
    // border:1px solid red;
    padding:20px;
    // background-color: #E9EEF3;
    font-family: Arial;
    font-size: 14px;
}
aside.el-aside {
    // background-color: #fff;
    color: #333;
    width: 280px;
    padding: 14px;
    // text-align: center;
    // line-height: 200px;
    border:1px solid #E9EEF3;
    // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.el-main {
    // background-color: #fff;
    color: #333;
    // text-align: center;
    // line-height: 160px;
    margin-right: 20px;
    border:1px solid #E9EEF3;
    // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.book-col{
    width: 150px;
    // background: #cccccc;
    height: 200px;
    overflow: hidden;
    text-align: center;
    // :hover{
    //     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    // }
}
.book-name{
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: none;
    word-break: keep-all;
    padding: 0 20px;
}
.bookbtn{
    margin-top: 2px;
    color:$fontColor;
    span{
        cursor: pointer;
    }
    span:first-child{
        margin-right: 10px;
    }
    span:hover{
        color:red;
    }
}
.fen-page{
    text-align: right;
    margin-top: 20px;
}
.dialog-box{
    text-align: center;
    div {
        width: 200px;
        margin: 0 auto;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
.latest-share{
    h3{
        margin:20px 0 6px;
    }
  div{
      height: 20px;
      line-height: 20px;
      margin-left: 8px;
      color:$fontColor;
      text-decoration-line: underline;
      cursor:pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

  }
}
</style>



