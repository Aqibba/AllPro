<template>
  <section class="m-istyle">
    <dl @mousemove="over">
      <dt>有格调</dt>
      <dd :class="{active:kind==='all'}" kind="all" keyword="景点">
        全部
      </dd>
      <dd :class="{active:kind==='part'}" kind="part" keyword="美食">
        约会聚餐
      </dd>
      <dd :class="{active:kind==='spa'}" kind="spa" keyword="丽人">
        丽人SPA
      </dd>
      <dd :class="{active:kind==='movie'}" kind="movie" keyword="电影">
        电影演出
      </dd>
      <dd :class="{active:kind==='travel'}" kind="travel" keyword="旅游">
        品质出游
      </dd>
    </dl>
    <ul class="ibody">
      <li v-for="(item, index) of artistic" :key="index">
        <el-card shadow="never">
          <img :src="item.img" class="image"></img>
          <ul class="cbody">
            <li class="title">
              {{ item.title }}
            </li>
            <li class="pos">
              <span>{{ item.pos }}</span>
            </li>
            <li class="price">
              ￥<em>{{ item.price }}</em><span>/起</span>
            </li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data () {
    return {
      kind: 'all',
      list: {
        all: [{
          title: '日升昌酒店',
          pos: '学校周边',
          price: '530',
          img: require('../../assets/img/hotel1.jpg'),
          url: ''
        }, {
          title: '日升昌酒店',
          pos: '学校周边',
          price: '530',
          img: require('../../assets/img/hotel1.jpg'),
          url: ''
        }, {
          title: '日升昌酒店',
          pos: '学校周边',
          price: '530',
          img: require('../../assets/img/hotel1.jpg'),
          url: ''
        }, {
          title: '日升昌酒店',
          pos: '学校周边',
          price: '530',
          img: require('../../assets/img/hotel1.jpg'),
          url: ''
        }],
        part: [{
          title: '美甲美瞳',
          pos: '学校周边',
          price: '360',
          img: require('../../assets/img/food1.jpg'),
          url: ''
        }, {
          title: '美甲美瞳',
          pos: '学校周边',
          price: '10',
          img: require('../../assets/img/food2.jpg'),
          url: ''
        }, {
          title: '美甲美瞳',
          pos: '学校周边',
          price: '40',
          img: require('../../assets/img/food3.jpg'),
          url: ''
        }, {
          title: '美甲美瞳',
          pos: '学校周边',
          price: '10',
          img: require('../../assets/img/food2.jpg'),
          url: ''
        }],
        spa: [{
          title: '涮羊肉',
          pos: '学校周边',
          price: '350',
          img: require('../../assets/img/food4.jpg'),
          url: ''
        }, {
          title: '涮羊肉',
          pos: '学校周边',
          price: '350',
          img: require('../../assets/img/food4.jpg'),
          url: ''
        }, {
          title: '涮羊肉',
          pos: '学校周边',
          price: '350',
          img: require('../../assets/img/food4.jpg'),
          url: ''
        }, {
          title: '涮羊肉',
          pos: '学校周边',
          price: '350',
          img: require('../../assets/img/food4.jpg'),
          url: ''
        }, {
          title: '涮羊肉',
          pos: '学校周边',
          price: '350',
          img: require('../../assets/img/food4.jpg'),
          url: ''
        }],
        movie: [
          {
            title: '哪吒',
            pos: '保利影院',
            price: '40',
            img: require('../../assets/img/movie3.jpg'),
            url: ''
          }, {
            title: '哪吒',
            pos: '保利影院',
            price: '40',
            img: require('../../assets/img/movie3.jpg'),
            url: ''
          }, {
            title: '哪吒',
            pos: '保利影院',
            price: '40',
            img: require('../../assets/img/movie3.jpg'),
            url: ''
          }, {
            title: '哪吒',
            pos: '保利影院',
            price: '40',
            img: require('../../assets/img/movie3.jpg'),
            url: ''
          }
        ],
        travel: [{
          title: '希腊',
          pos: '学校周边',
          price: '122220',
          img: require('../../assets/img/other1.jpg'),
          url: ''
        }, {
          title: '希腊',
          pos: '学校周边',
          price: '122220',
          img: require('../../assets/img/other1.jpg'),
          url: ''
        }, {
          title: '希腊',
          pos: '学校周边',
          price: '122220',
          img: require('../../assets/img/other1.jpg'),
          url: ''
        }, {
          title: '希腊',
          pos: '学校周边',
          price: '122220',
          img: require('../../assets/img/other1.jpg'),
          url: ''
        }]
      }
    }
  },
  computed: {
    artistic () {
      return this.list[this.kind]
    }
  },
  methods: {
    over (e) {
      // 判断节点名称,如果不是就不发生变化
      if (e.target.nodeName === 'DD') {
        this.kind = e.target.getAttribute('kind')
      }
      // console.log(this.kind)
    }
  }
}
</script>
<style lang="scss">
  @import "@/assets/css/index/artistic.scss";
  .el-card__body {
    padding: 0 !important
  }
</style>
