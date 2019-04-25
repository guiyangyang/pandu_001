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
        <el-aside>aside</el-aside>
        </el-container>
    </div>
</template>
<script>
import axios from 'axios'
import { getLiterature } from '@/api/books'
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
          bookLists:bookDatas
        }
    },
    mounted (){
      this.dataInit();
    },
    methods:{
        getBook (index) {
        
        this.getBookList = this.bookLists[index];
        console.log(this.getBookList)
        this.dialogVisible = true; 
        // this.$nextTick(()=>{
        //    this.dialogVisible = true; 
        // })
        },
        dataInit (){
            getLiterature().then((res) => {
                if(res.status == '200000'){
                   this.bookLists = res.result;
                   this.bookLists.forEach((item,index) => {
                      if(item.img == '' || item.img == undefined){
                          item.img = 'jd.jpg'
                      }
                   })

                }
                console.log(res)
            }).catch((err) => {
                console.log('err')
            })
        },
        getDetails() {
            console.log('点击详情')
            getLiterature().then((res) => {
                if(res.status == '200000'){

                }
                console.log(res)
            }).catch((err) => {
                
            })


        }
    }
}
</script>
<style lang="scss" scoped>
.literature-box {
    // border:1px solid red;
    padding:20px;
    // background-color: #E9EEF3;
    font-family: Arial;
    font-size: 14px;
}
.el-aside {
    // background-color: #fff;
    color: #333;
    width: 280px;
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
    color:#909399;
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
</style>



