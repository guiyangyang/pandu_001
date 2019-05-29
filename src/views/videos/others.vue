<template>
    <div class="literature-box">
        <el-container>
        <el-main>
            <el-row>
                <el-col :span="6" v-for="(book,index) in bookLists" :key="index" >
                    <div class="book-col">
                        <div class="div-img">
                            <img :src="book.img" v-if="book.img.length > 10" alt="">
                            <div v-else class="text-box" ><span>video</span></div>
                        </div>
                        <!-- <div><img :src="'/static/images/books/'+book.img" alt=""></div> -->
                        <div class="book-name" :title="book.title">{{book.title}}</div>
                        <div class="bookbtn">
                            <span @click="getDetails(index)">详情</span>
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
            <!-- 详情 -->
            <el-dialog
            title="资源详情"
            :visible.sync="dialogDetail"
            width="30%">
            <div class="dialogdetail-box">
                <div>
                    <img :src="getBookList.img" alt="">
                </div>
                <div>
                    <div class="detail-title">
                        <div> 标题：</div>
                        <div>{{getBookList.title}}</div></div>
                    <div class="detail-introduce">
                       <div> 简介：</div>
                       <div>{{getBookList.introduce}}</div>
                       </div>
                    <div class="upload-time">上传时间:{{getBookList.uploadtime | dateToFormatter}}</div>
                </div>

            </div>
            </el-dialog>
            <!-- 获取 -->
            <el-dialog
            title="资源分享"
            :visible.sync="dialogVisible"
            width="30%">
            <div class="dialog-box">
                <img src="/static/bdwp.jpg" alt="">
            
                <div>分享链接：
                 <a :href="getBookList.link" target="_blank">{{getBookList.link}}</a>   
                </div>
                <div>分享密码：{{getBookList.password || '无'}}</div>
            </div>
            </el-dialog>
        </el-main>
        <el-aside class="aside-container">
            <div>
                <el-input placeholder="请输入关键词"
                 v-model="param.searchContent" 
                 clearable
                 size="small" >
                    <el-button slot="append" icon="el-icon-search" size="small" @click="searchBook"></el-button>
                </el-input>
            </div>
            <div class="latest-share">
                <h3>最新分享榜</h3>
                <div v-for = "(item,index) in latestShareList" :key="index" @click="shareBook(index)">
                    {{ item.uploadtime | dateToFormatter }} | {{item.title}}</div>
            </div>
            <div class="latest-share">
                <h3>最新排行榜</h3>
                <div v-for = "(item,index) in shareRankList" :key="index" @click="shareBook(index)">
                    {{ item.uploadtime | dateToFormatter }} | {{item.title}}</div>
            </div>
            <div class="appreciate">
                <img src="../../../static/dshm.png" alt="">
                <span>打赏1块钱，帮我买杯咖啡！</span>
            </div>
        </el-aside>
        </el-container>
    </div>
</template>
<script>
import axios from 'axios'
import { getVideos, getLatestShare, addShareNum, shareRank } from '@/api/videos'
import {dateTimeFormatter , dateFormatter} from '@/utils/public'
export default {
    name:'BooksVue',
    data () {
        return {
          dialogVisible:false,
          dialogDetail:false,
          getBookList:{},
          bookLists:[],
          param:{
              pagenum:1,
              pagesize:12,
              searchType:'others',
              searchContent:''
          },
          currentPage:1,
          total:100,
          latestShareList:[],//最新分享
          shareRankList:[],//分享排行
          radio1:'',
        }
        
    },
    created() {
      this.dataInit();
    },
    filters:{
      dateToFormatter(val) {
          return  dateFormatter(val)  
      }
    },
    mounted (){
    },
    methods:{
        getBook (index) {
            this.getBookList = this.bookLists[index];
            this.dialogVisible = true; 
            addShareNum({'id':this.getBookList.id}).then(res => {
            }).catch(err => {
                console.log('err')
            })
        },
        dataInit (){
            this.getVideoLists()
            this.getLatestShareList()
            this.getShareRankList()
        },
        getVideoLists() {
            getVideos(this.param).then((res) => {
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
                }
            }).catch((err) => {
                console.log('err')
            })
        },
        getLatestShareList() {
          getLatestShare({'size':8}).then((res) => {
              if(res.status == '200000'){
                this.latestShareList = res.result.data;
              }
          }).catch(err => {
              console.log('err')
          })
        },
        getShareRankList() { //分享排行
           shareRank({'size':8}).then(res => {
             if(res.status == '200000'){
                 this.shareRankList = res.result.data;
             }
           }).catch(err => {
               console.log('err')
           })
        },
        getDetails(index) {
            this.getBookList = this.bookLists[index];
            this.dialogDetail = true;
            this.getShareRankList();
        },
        handleCurrentChange(val) {//分页
           this.param.pagenum = val;
           this.getVideoLists();
        },
        searchBook() {
            let searchContent = this.param.searchContent.trim();
            if(searchContent == '') return false;
            this.param.pagenum = 1;
            this.getVideoLists();
        
        },
        shareBook(index) {
            this.getBookList = this.latestShareList[index];
            this.dialogVisible = true; 
        }
    }
}
</script>
<style lang="scss">
.literature-box {
.el-dialog__body{
    padding:0 20px 20px;
}
.el-dialog__header{
    padding:20px 20px 0;
}
}
</style>

<style lang="scss" scoped>
@import '@/assets/styles/bookCommon.scss';
.literature-box {
    .text-box{
        width: 120px;
        height: 150px;
        border: 1px solid #eee;
        box-sizing: border-box;
        margin-left: 15px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        background: #fbd14b;
        span{
            display: block;
            margin-top: 50px;
            font-size: 20px;
            color: transparent;
            -webkit-text-stroke: 1px #7b6d07;
            letter-spacing: 0.04em;
        }
    }
}
</style>



