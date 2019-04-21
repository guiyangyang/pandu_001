<template>
    <div class="literature-box">
        <el-container>
        <el-main>
            <el-row>
                <el-col :span="6" v-for="(book,index) in bookLists" :key="index" >
                    <div class="book-col">
                        <div><img :src="'/static/images/books/'+book.bookimg" alt=""></div>
                        <div class="book-name" :title="book.bookname">{{book.bookname}}</div>
                        <div class="bookbtn">
                            <span>详情</span>
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
                 <a :href="getBookList.shareurl" target="_blank">{{getBookList.shareurl}}</a>   
                </div>
                <div>百度盘链接：{{getBookList.sharepassword}}</div>
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
export default {
    name:'BooksVue',
    data () {
        return {
          dialogVisible:false,
          getBookList:{},
          bookLists:[
              {
                  bookid:'books-literature-1', 
                  bookimg:'rshhh.jpg',
                  bookname:'人生海海',
                  shareurl:'http://www.1539.ink',
                  sharepassword:'111'
              },
              {
                  bookid:'books-literature-2', 
                  bookimg:'zhxhy.jpg',
                  bookname:'知行合一知行合一知行合一知行合一知行合一知行合一',
                  shareurl:'http://www.1539.ink',
                  sharepassword:'222'
              },
              {
                  bookid:'books-literature-3', 
                  bookimg:'ajsqn.jpg',
                  bookname:'埃及四千年',
                  shareurl:'http://www.1539.ink',
                  sharepassword:'333'
              },
              {
                  bookimg:'jd.jpg',
                  bookname:'简单',
                  shareurl:'http://www.1539.ink',
                  sharepassword:'333'
              },
              {
                  bookimg:'jdsxdsndq.jpg',
                  bookname:'决定上限是你的情',
                  shareurl:'http://www.1539.ink',
                  sharepassword:'333'
              },
              {
                  bookimg:'lj.jpg',
                  bookname:'联结',
                  shareurl:'http://www.1539.ink',
                  sharepassword:'333'
              },
              {
                  bookimg:'rshhh.jpg',
                  bookname:'人生海海',
                  shareurl:'http://www.1539.ink',
                  sharepassword:'333'
              },
              {
                  bookimg:'yjzs.jpg',
                  bookname:'易经杂说',
                  shareurl:'http://www.1539.ink',
                  sharepassword:'333'
              }
          ]
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
            this.$store.dispatch('getLiterature').then((res) => {
                console.log('获取 文学')
                console.log('res')
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



