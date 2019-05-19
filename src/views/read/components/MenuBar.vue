<template>
<div class="menu-bar">
    <transition name="slide-up">
        <div class="menu-wrapper"
        :class="{'hide-box-shadow':ifSettingShow || !ifTitleAndMenuShow}"
         v-show="ifTitleAndMenuShow">
        <div class="icon-wrapper">
            <span class="icon-menu icon" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
            <span class="icon-progress icon" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
            <span class="icon-bright icon" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
            <span class="icon-a icon" @click="showSetting(0)">A</span>
        </div>
        </div>
    </transition> 
    <transition name="slide-up">
    <div class="setting-wrapper" v-show="ifSettingShow">
        <!-- 字体设置 -->
        <div class="setting-font-size" v-if="showTag === 0">
            <div class="preview"
            :style="{fontSize:fontSizeList[0].fontSize + 'px'}">A</div>
            <div class="select">
                <div class="select-wrapper" 
                v-for="(item,index) in fontSizeList"
                :key="index"
                @click="setFontSize(item.fontSize)">
                    <div class="line"></div>
                    <div class="point-wrapper">
                        <div class="point"
                        v-show="item.fontSize == defaultFontSize">
                            <div class="small-point"></div>
                        </div>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
            <div class="preview"
            :style="{fontSize:fontSizeList[fontSizeList.length - 1].fontSize + 'px'}"
            >A</div>
        </div>
        <!-- 主题设置 -->
        <div class="setting-theme" v-else-if="showTag === 1">
            <div class="setting-theme-item"
            v-for="(item,index) in themeList"
            :key="index">
                <div class="preview" 
                :style="{background:item.style.body.background}"
                :class="{'no-border':item.style.body.background !=='#fff'}"
                @click="setTheme(index)"></div>
                <div class="text"
                :class="{'selected':index === defaultTheme}">{{item.name}}</div>
            </div>
        </div>
        <!-- 进度条 -->
        <div class="setting-progress" v-else-if="showTag === 2">
            <div class="progress-wrapper">
                <input type="range" class="progress"
                max="100"
                min="0"
                step="1"
                @change='onProgressChange($event.target.value)'
                @input="onProgressInput($event.target.value)"
                :value="progress"
                :disabled="!bookAvailable"
                ref="progress"
                >  
            </div>
            <div class="text-wrapper">
                <span>{{bookAvailable? progress + '%' : '加载中...'}}</span>
            </div>

        </div>

    </div>
    </transition>
    <content-view
    :ifShowContent="ifShowContent"
    v-show="ifShowContent"
    :navigation="navigation"
    :bookAvailable="bookAvailable"
    @jumpTo="jumpTo"></content-view>
    <transition name="fade">
        <div class="content-mask"
        v-show="ifShowContent"
        @click="hideContent">

        </div>
    </transition>    

</div>        
</template>
<script>
import ContentView from './Content'
export default {
    props:{
        ifTitleAndMenuShow:{
            type:Boolean,
            default:false
        },
        fontSizeList:{
            type:Array
        },
        defaultFontSize:{
            type:Number
        },
        themeList:Array,
        defaultTheme:Number,
        bookAvailable:{
           type: Boolean,
           default:false
        },
        navigation:Object
    },
    data() {
        return {
          ifShowContent:false,
          showTag:0,  
          ifSettingShow:false,
          progress:0,

        }
    },
    components:{
        ContentView
    },
    methods:{
        showSetting(tag) {
            this.showTag = tag;
            if(this.showTag === 3){
                this.ifSettingShow = false;
                this.ifShowContent = true;
            }else{
                this.ifSettingShow = true;
            }
        },
        hideSetting() {
            this.ifSettingShow = false;
        },
        setFontSize(fontSize) {
          this.$emit('setFontSize',fontSize)
        },
        setTheme(index) {
          this.$emit('setTheme',index);
        },
        onProgressInput(progress) {
            this.progress = progress;
            this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`;
        },
        onProgressChange(progress) {
            this.$emit('onProgressChange',progress);
        },
        hideContent() {
          this.ifShowContent = false;
        },
        jumpTo(target){
            this.$emit('jumpTo',target);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.menu-bar{
    .menu-wrapper{
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 101;
        display: flex;
        width: 100%;
        height:48px;
        background-color: white;
        box-shadow: 8px 0  8px rgba(0,0,0,0.15);
        &.hide-box-shadow{
            box-shadow: none;
        }
    .icon-wrapper{
      flex:1;
      @include center;
    }
  }
    .setting-wrapper{
        position: absolute;
        bottom: 48px;
        left: 0;
        width: 100%;
        height: 60px;
        z-index: 101;
        background-color: white;
        box-shadow:  0 -8px 8px rgba(0,0,0,0.15);
        .setting-font-size{
            display: flex;
            height: 100%;
            .preview{
              flex: 0 0 40px;
              @include center;
            }
            .select{
              flex:1;
              display: flex;    
             .select-wrapper{
              flex:1;
              display: flex;
              align-items: center;
              &:first-child{
                  .line{
                      &:first-child{
                          border-top: none;
                      }
                  }
              }
              &:last-child{
                  .line{
                      &:last-child{
                          border-top: none;
                      }
                  }
              }
              .line{
                flex:1;
                height: 0;
                border-top:1px solid #ccc;
              }
              .point-wrapper{
                position: relative;  
                flex:0 0 0;
                width:0;
                height: 7px;    
                border-left:1px solid #ccc;
                .point{
                  position: absolute;  
                  top:-8px;
                  left:-10px;
                  width: 20px;
                  height:20px;
                  border-radius: 50%;
                  background: white;
                  border:1px solid #ccc;
                  box-shadow: 0 4px 4px rgba(0,0,0,0.15);
                  @include center;
                  .small-point{
                    width: 5px;
                    height: 5px;
                    background-color: #000;
                    border-radius: 50%;
                  }
                }
              }
            }
            }
            

        }
        .setting-theme{
            display: flex;
            height: 100%;
          .setting-theme-item{
            flex:1;
            display: flex;  
            flex-direction: column;
            padding: 5px;
            box-sizing: border-box;
              .preview{
                flex:1;
                border:1px solid #ccc;
                box-sizing: border-box;
                &.no-border{
                    border:none;
                }
              }
              .text{
                flex:0 0 20px;
                font-size: 14px;
                color:#ccc;
                @include center;
                &.selected{
                  color:#333;    
                }
              }
          }  
        }
        .setting-progress{
            position: relative;
            width: 100%;
            height:100%;
            .progress{
            // .progress-wrapper{
                width: 100%;
                -webkit-appearance: none;
                height: 2px;
                background: -webkit-linear-gradient(#999,#999) no-repeat,#ddd;
                background-size: 0 100%;
                &:focus{
                    outline: none;
                }
                &::-webkit-slider-thumb{
                    -webkit-appearance: none;
                    height:20px;
                    width:20px;
                    border-radius: 50%;
                    background: white;
                    box-shadow: 0 4px 4px0 rgba(0,0,0,0.15);
                    border:1px solid #ddd;
                }
            }
        }
    }
    .content-mask{
        position: absolute;
        top: 0;
        left:0;
        z-index: 101;
        display: flex;
        width:100%;
        height:100%;
        background: rgba(51,51,51,0.8);
    }
}

</style>



