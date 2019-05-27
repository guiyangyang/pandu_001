<template>
    <div class="ebook">
      <!-- <title-bar :ifTitleAndMenuShow='ifTitleAndMenuShow'></title-bar> -->
        <div class="read-wrapper">
          
            <div id="read"></div>
            <div class="mask">
              <div class="left" @click="prevPage">
                <div id="prev" class="arrow disabled">‹</div>
              </div>
              <div class="center" @click="toggleTitleAndMenu">
                
              </div>
              <div class="right" @click="nextPage">
                <div id="next" class="arrow">›</div>
              </div>
            </div>
        </div>
        <menu-bar ref="menuBar" 
        :ifTitleAndMenuShow='ifTitleAndMenuShow' 
        :fontSizeList='fontSizeList'
        :defaultFontSize='defaultFontSize'
        :themeList='themeList'
        :defaultTheme='defaultTheme'
        :bookAvailable='bookAvailable'
        :navigation='navigation'
        @setFontSize='setFontSize'
        @setTheme='setTheme'
        @onProgressChange='onProgressChange'
        @jumpTo='jumpTo'
        ></menu-bar>
        <!-- <transition name="slide-up">
          <div class="menu-wrapper" v-show="ifTitleAndMenuShow">
            <div class="icon-wrapper">
              <span class="icon-menu icon"></span>
            </div>
            <div class="icon-wrapper">
              <span class="icon-sun icon"></span>
            </div>
            <div class="icon-wrapper">
              <span class="icon-share icon"></span>
            </div>
            <div class="icon-wrapper">
              <span class="icon-a icon">A</span>
            </div>
          </div>
        </transition> -->
    </div>
</template>
<script>
import TitleBar from './components/TitleBar';
import MenuBar from './components/MenuBar';
import Epub from 'epubjs';
const DOWLOAD_URL = '/static/cyk.epub';
global.ePub = Epub;
export default {
    data() {
      return {
        epubRul:'',
        ifTitleAndMenuShow:false,
        fontSizeList:[
          {fontSize:12},
          {fontSize:14},
          {fontSize:16},
          {fontSize:18},
          {fontSize:20},
          {fontSize:22},
          {fontSize:24}
        ],
        defaultFontSize:16,
        themeList:[
          {
            name:'default',
            style:{
              body:{
                'color':'#000','background':'#fff'
              }
            }
          },
          {
            name:'eye',
            style:{
              body:{
                'color':'#000','background':'#ceeaba'
              }
            }
          },
          {
            name:'night',
            style:{
              body:{
                'color':'#fff','background':'#000'
              }
            }
          },
          {
            name:'gold',
            style:{
              body:{
                'color':'#000','background':'rgb(241,236,226)'
              }
            }
          }
        ],
        defaultTheme:0, 
        //图书是否处于可用状态
        bookAvailable:false,
        navigation:{}
      }
    },
    components:{
      TitleBar,
      MenuBar
    },
    mounted() {
      this.epubRul = '/static/'+this.$route.query.id;
      this.showEpub();


      // let _this = this;
      // window.onresize = () => {
        // document.getElementsByClassName('read-wrapper')[0].style.height='600px';
        // document.getElementsByClassName('read-wrapper')[0].style.width = '1000px';
        // window.reload();
        // _this.showEpub();
        // if(_this.rendition){
        // }
      // }
    },
    methods:{
        // 1. 电子书 解析 渲染
        showEpub() {
          let epubRul = this.epubRul;
          //1.1 生成 book
          this.book = new Epub(epubRul);
          //1.2 生成 rendition
          // this.rendition = this.book.renderTo('read',{ method: "default", width: window.innerWidth,height: window.innerHeight })
           this.rendition = this.book.renderTo('read',{ method: "default", width:1120,height:600 })
          //  this.rendition = this.book.renderTo('read',{ method: "default", width:'100%',height:'100%' })
         
          //1.3 通过 rendition.display 渲染 电子书
          this.rendition.display()
          //1.4 获取 theme 对象
          this.themes = this.rendition.themes
          //设置 默认字体
          this.setFontSize(this.defaultFontSize)
          //1.5 自定义主题
          // this.themes.register(name,style) //注册 自定义 主题
          // this.themes.select(name)   // 选择 主题
          this.registerTheme();//注册 主题
          // this.themes.select('eye');// 选择 主题
          this.setTheme(this.defaultTheme);// 选择 主题
          //1.6 获取 locations 对象 通过epub函数实现
          this.book.ready.then(() => {
            this.navigation = this.book.navigation;
            return this.book.locations.generate();
          }).then(result => {
            this.locations = this.book.locations;
            // this.onProgressChange(100);
            this.bookAvailable = true;
          })
          
        },
        prevPage() {
          if(this.rendition){
            this.rendition.prev();
          }
        },
        nextPage() {
          if(this.rendition){
            this.rendition.next();
          }
        },
        toggleTitleAndMenu() {
          this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow;
          if(!this.ifTitleAndMenuShow){
            this.$refs.menuBar.hideSetting();
          }
        },
        setFontSize(fontSize) {
          this.defaultFontSize = fontSize;
          if(this.themes){
            this.themes.fontSize(fontSize + 'px');
          }
        },
        registerTheme() {
          this.themeList.forEach(theme => {
            this.themes.register(theme.name,theme.style)
          })
        },
        setTheme(index) {
          this.themes.select(this.themeList[index].name);
          this.defaultTheme = index;
        },
        onProgressChange(progerss) {
          const percentage = progerss / 100 ;
          const location = percentage>0? this.locations.cfiFromPercentage(percentage) : 0 ;
          this.rendition.display(location);
        },
        //章节 跳转
        jumpTo(href) {
          this.rendition.display(href);
          this.hideTitleAndMenu()
        },
        hideTitleAndMenu() {
          this.ifTitleAndMenuShow = false;
          this.$refs.menuBar.hideSetting();
          this.$refs.menuBar.hideContent();
        }

    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/global.scss';

.ebook{
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  // background: red;
  .read-wrapper{
      width: 1120px;
      height: 600px;
      // width: 98%;
      // height: 96%;
      margin: 1% auto 0;
      // border:1px solid red;
      box-shadow: 0 0 4px #ccc;
      border-radius: 6px;
      position: relative;
      overflow: hidden;
      &:after{
        position: absolute;
        width: 1px;
        border-right: 1px #000 solid;
        height: 90%;
        z-index: 1;
        left: 50%;
        margin-left: -1px;
        top: 5%;
        opacity: .15;
        box-shadow: -2px 0 15px rgba(0, 0, 0, 1);
        content: "";
      }
    #read{
      width: 100%;
      height: 100%;
      // border: 1px solid red;
    }
    .mask{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    width: 100%;
    height: 100%;
    cursor: pointer;
    // background-color: yellow;
    .left{
      flex:0 0 16%;
      // background-color: yellow;
      &:hover{
        #prev{
          opacity: 1;
        }
      }
    }
    .center{
      flex:1;
      // background-color: red;
    }
    .right{
      flex:0 0 16%;
      &:hover{
        #next{
          opacity: 1;
        }
      }
      // background-color: orange;
    }
    .arrow {
    position: absolute;
    top: 50%;
    margin-top: -32px;
    font-size: 64px;
    color: #E2E2E2;
    font-family: arial, sans-serif;
    font-weight: bold;
    
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    opacity: 0;
    }
    #prev{
      left:16px;
    }
    #next{
      right: 16px;
    }

  }

  }
  
  

}
</style>

