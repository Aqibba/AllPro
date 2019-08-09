<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item, index) of menu" :key="index" @mouseenter="mouseenter">
        <i :class="item.type" />
        {{ item.name }}
        <span class="arrow" />
      </dd>
    </dl>
    <div v-if="kind" class="detail" @mouseenter="over" @mouseleave="leave">
      <template v-for="(item, index) in curdetail.child">
        <h4 :key="index">
          {{ item.title }}
        </h4>
        <span v-for="items in item.child" :key="items">{{ items }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      kind: '',
      menu: [
        {
          type: 'food',
          name: '美食',
          child: [
            {
              title: '美食',
              child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
            }
          ]
        },
        {
          type: 'takeout',
          name: '外卖',
          child: [
            {
              title: '外卖',
              child: ['美团外卖']
            }
          ]
        },
        {
          type: 'hotel',
          name: '酒店',
          child: [
            {
              title: '酒店星级',
              child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
            }
          ]
        }
      ]
    }
  },
  computed: {
    curdetail () {
      return this.menu.filter(item => item.type === this.kind)[0]
    }
  },
  methods: {
    mouseleave () {
      const self = this
      self._timer = setTimeout(function () {
        self.kind = ''
      }, 150)
    },
    mouseenter (e) {
      this.kind = e.target.querySelector('i').className
    },
    over () {
      clearTimeout(this._timer)
    },
    leave () {
      this.kind = ''
    }
  }
}
</script>

<style></style>
