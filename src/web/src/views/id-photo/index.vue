<template>
  <div ref="idPhotoEl" class="id-photo-wrapper">
    <div class="div-body">
      <el-row class="row-area">
        <el-col class="col-photo" :span="16">
          <el-row class="row-photo">
            <el-col :span="12" style="text-align: center;">
              <img class="img_photo" :src="leftPhotoSrc"/>
            </el-col>
            <el-col :span="12" style="text-align: center;">
              <img class="img_photo" :src="rightPhotoSrc"/>
            </el-col>
          </el-row>
          <div class="div-upload">
            <el-upload
              class="btn-upload"
              ref="upload"
              accept=".jpg, .jpeg, .png"
              :action="uploadUrl"
              enctype="multipart/form-data"
              :limit="1"
              :multiple="false"
              :before-upload="beforeUpload"
              :on-exceed="outOfLimit"
              :on-success="importSuccess"
              :file-list="fileList"
              :auto-upload="true">
              <el-button slot="trigger" size="small" type="primary">上传照片</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpeg、jpg、png文件</div>
            </el-upload>
            <div class="div-select-color">
              <div class="div-select-title">
                选择底色
              </div>
              <div class="div-color-list div-list">
                <div @click="setColor(0)" :class="[makePhotoReq.color === 0 ? divSelected:divColor, divWhite]"/>
                <div @click="setColor(1)" :class="[makePhotoReq.color === 1 ? divSelected:divColor, divRed]"/>
                <div @click="setColor(2)" :class="[makePhotoReq.color === 2 ? divSelected:divColor, divBlue]"/>
              </div>
            </div>
            <div class="div-select-size">
              <div class="div-select-title">
                选择尺寸
              </div>
              <div class="div-size-list div-list">
                <el-radio-group v-model="makePhotoReq.size">
                  <el-radio style="display: block" v-for="(item, index) in sizeList" :key="index" :label="item.label">{{ item.value }}</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div class="div-download">
              <el-button  @click="makeIdPhotoClick" :disabled="isBlank(makePhotoReq.img_id)" class="btn-id-photo" type="primary">生成证件照</el-button>
              <el-button @click="downloadFile" :disabled="isBlank(makePhotoReq.img_id) || isBlank(rightPhotoSrc)" class="btn-download" type="primary">下载证件照</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    import * as idPhotoApi from '@/api/idPhoto.js'
    export default {
      name: 'IdPhoto',
      data() {
        return {
          leftPhotoSrc: '',
          rightPhotoSrc: '',
          // loading: false,
          sizeList: [
            { label: 0, value: '1⼨       295*413px' },
            { label: 1, value: '⼤1⼨   389*566px' },
            { label: 2, value: '⼩2⼨   413*531px' },
            { label: 3, value: '2⼨       413*579px' },
            { label: 4, value: '⼤2⼨    413*626px' },
            { label: -1, value: '原图大小' }
          ],
          makePhotoReq: {
            size: 0,
            color: 0,
            img_id: null
            // img_id: 'efd78b7a68707b1dc07e03a20b6d3cfe'
          },
          uploadUrl: process.env.VUE_APP_PROXY + '/upload_image',
          fileList: [],
          idPhotoEl: null,
          fileName: '',
          divSelected: 'div-selected',
          divColor: 'div-color',
          divWhite: 'div-white',
          divRed: 'div-red',
          divBlue: 'div-blue'
        }
      },
      mounted() {
        this.idPhotoEl = this.$refs['idPhotoEl']
        console.log('url', this.uploadUrl)
      },
      methods: {
        isBlank(str) {
          return this.$options.filters.isBlank(str)
        },
        importSuccess(resp, file, fileList) {
          // console.log('suc', file)
          // console.log(resp)
          if (resp.code === 0) {
            this.makePhotoReq.img_id = resp.img_id
            this.showLeftPhoto(file.raw)
            this.fileName = file.name.substring(0, file.name.lastIndexOf('.'))
            console.log(this.fileName)
            this.$message.success('上传成功')
          } else {
            this.$message.error(resp.msg)
          }
          this.$refs['upload'].clearFiles()
        },
        beforeUpload(file) {
          // console.log('bef', file)
          // this.showLeftPhoto(file)
          const fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
          if (fileType !== 'jpg' && fileType !== 'jpeg' && fileType !== 'png') {
            this.$message.error('上传文件只能是.jpg、.jpeg、.png格式!')
            return false
          }
          return true
        },
        outOfLimit(files, fileList) {
          this.$message.error('一次只能上传一张照片！照片上传中，请稍后...')
        },
        makeIdPhotoClick() {
          const loading = this.$loading(this.idPhotoEl)
          idPhotoApi.makeIdPhoto(this.makePhotoReq).then(resp => {
            console.log(resp)
            this.rightPhotoSrc = resp.img;
          }).finally(() => { loading.close() })
        },
        setColor(v) {
          this.makePhotoReq.color = v
        },
        downloadFile() {
          const aLink = document.createElement('a')
          const blob = this.base64ToBlob(this.rightPhotoSrc) // new Blob([content]);

          const evt = document.createEvent('HTMLEvents')
          evt.initEvent('click', true, true)// initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
          aLink.download = this.fileName + '(证件照)'
          aLink.href = URL.createObjectURL(blob)

          // aLink.dispatchEvent(evt);
          aLink.click()
        },
        base64ToBlob(code) {
          const parts = code.split(';base64,')
          const contentType = parts[0].split(':')[1]
          const raw = window.atob(parts[1])
          const rawLength = raw.length

          const uInt8Array = new Uint8Array(rawLength)

          for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i)
          }
          return new Blob([uInt8Array], { type: contentType })
        },
        showLeftPhoto: function(file) {
          let url = ''
          const reader = new FileReader()
          reader.readAsDataURL(file)
          const that = this
          reader.onload = function(e) {
            url = this.result.substring(this.result.indexOf(',') + 1)
            that.leftPhotoSrc = 'data:image/png;base64,' + url
            // that.$refs['imgimg'].setAttribute('src','data:image/png;base64,'+url);
          }
        }
      }
    }
</script>

<style scoped>
.id-photo-wrapper {
  min-height: 100%;
  background: #fff;
  width: 7.5rem;
  margin: 0 auto;
}
.row-area {
  margin-bottom: .1rem;
}
.row-top {
  background-color: white;
  min-height: 100%;
}
h1 {
  color: #0066ff;
  font-size: .45rem;
  text-align: center;
  margin-bottom: .7rem;
}
.div-body {
  height: 100%;
}
.div-desc-list {
  padding-left: .8rem;
}
.div-desc-list i {
  font-size: .28rem;
  color: #f2493c;
  margin-right: .06rem;
}
.div-list-text {
  color: #424853;
  font-size: .24rem;
  margin: .1rem 0;
}
.col-photo {
  width: 100%;
  padding: .2rem .2rem;
  background-color: white;
  box-sizing: border-box;
}
.row-photo{
  height: 5rem;
  background-color: #dcf0ff;
  border-radius: .15rem;
  padding-top: .3rem;
  position: relative;
}
.div-upload {
  margin-top: .2rem;
  text-align: center;
}
.btn-upload {
  margin-top: .1rem;
}
.col-control {
  background-color: white;
  border-radius: .15rem;
  width: 4.23rem!important;
  padding: .15rem;
  height: .6rem;
}
.div-select-color {margin-top: .4rem;}
.div-select-title {
  margin-top: .2rem;
  color: #424853;
  font-size: .18rem;
  font-weight: bolder;
}
.div-list {
  margin: .3rem 0px;
}
.div-color {
  display: inline-block;
  width: .42rem;
  height: .42rem;
  border: 1px gray solid;
  border-radius: 3px;
  cursor: pointer;
}
.div-selected {
  display: inline-block;
  width: .56rem;
  height: .56rem;
  border: 1px gray solid;
  border-radius: 3px;
  cursor: pointer;
}
.div-color-list {
  text-align: center;
}
.div-white {
  background-color: white;
}
.div-blue {
  background-color: #438edb;
}
.div-red {
  background-color: #ff0000;
  margin: 0 .5rem;
}
.div-size-list .el-radio {
  margin-bottom: .2rem;
}
.div-size-list >>> .el-radio__label {
  /*display: inline-block;*/
  font-size: .2rem!important;
  white-space:pre
}
.div-size-list >>> .el-radio__inner {
  width: .2rem;
  height: .2rem;
}
.div-download {
  text-align: center;
}
.img_photo {
  max-height: 4.13rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>
<style>
  .el-notification.right {position: absolute;left: 50%;transform: translateX(-50%);}
  .el-notification__content p{width: 248px;word-wrap: break-word;word-break: break-all;}
  .el-radio-group {text-align: left;}
</style>
