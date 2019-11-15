<template>
<van-picker class="van-area__picker" active-class="active-class" toolbar-class="toolbar-class" column-class="column-class" show-toolbar value-key="name" :title="title" :loading="loading" :columns="displayColumns" :item-height="itemHeight" :visible-item-count="visibleItemCount" :cancel-button-text="cancelButtonText" :confirm-button-text="confirmButtonText" @change="onChange" @confirm="onConfirm" @cancel="onCancel"></van-picker>
</template>

<script>
import { VantComponent } from '../common/component';
import { pickerProps } from '../picker/shared';
import vanPicker from "../picker/index";

export default {
  data() {
    return {
      areaList: {
        type: Object,
        value: {}
      },
      columnsNum: {
        type: null,
        value: 3
      },
      columns: [{
        values: []
      }, {
        values: []
      }, {
        values: []
      }],
      displayColumns: [{
        values: []
      }, {
        values: []
      }, {
        values: []
      }]
    };
  },

  components: {
    vanPicker
  },
  props: {},
  props: Object.assign(Object.assign({}, pickerProps), {
    value: String,
    areaList: {
      type: Object,
      value: {}
    },
    columnsNum: {
      type: null,
      value: 3
    }
  }),
  methods: {
    mounted() {
      setTimeout(() => {
        this.setValues();
      }, 0);
    },

    getPicker() {
      if (this.picker == null) {
        this.picker = this.selectComponent('.van-area__picker');
      }

      return this.picker;
    },

    onCancel(event) {
      this.emit('cancel', event.detail);
    },

    onConfirm(event) {
      this.emit('confirm', event.detail);
    },

    emit(type, detail) {
      detail.values = detail.value;
      delete detail.value;
      this.$emit(type, detail);
    },

    onChange(event) {
      const {
        index,
        picker,
        value
      } = event.detail;
      this.code = value[index].code;
      this.setValues().then(() => {
        this.$emit('change', {
          picker,
          values: picker.getValues(),
          index
        });
      });
    },

    getConfig(type) {
      const {
        areaList
      } = this;
      return areaList && areaList[`${type}_list`] || {};
    },

    getList(type, code) {
      let result = [];

      if (type !== 'province' && !code) {
        return result;
      }

      const list = this.getConfig(type);
      result = Object.keys(list).map(code => ({
        code,
        name: list[code]
      }));

      if (code) {
        // oversea code
        if (code[0] === '9' && type === 'city') {
          code = '9';
        }

        result = result.filter(item => item.code.indexOf(code) === 0);
      }

      return result;
    },

    getIndex(type, code) {
      let compareNum = type === 'province' ? 2 : type === 'city' ? 4 : 6;
      const list = this.getList(type, code.slice(0, compareNum - 2)); // oversea code

      if (code[0] === '9' && type === 'province') {
        compareNum = 1;
      }

      code = code.slice(0, compareNum);

      for (let i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i;
        }
      }

      return 0;
    },

    setValues() {
      const county = this.getConfig('county');
      let code = this.code || Object.keys(county)[0] || '';
      const province = this.getList('province');
      const city = this.getList('city', code.slice(0, 2));
      const picker = this.getPicker();

      if (!picker) {
        return;
      }

      const stack = [];
      stack.push(picker.setColumnValues(0, province, false));
      stack.push(picker.setColumnValues(1, city, false));

      if (city.length && code.slice(2, 4) === '00') {
        [{
          code
        }] = city;
      }

      stack.push(picker.setColumnValues(2, this.getList('county', code.slice(0, 4)), false));
      return Promise.all(stack).catch(() => {}).then(() => picker.setIndexes([this.getIndex('province', code), this.getIndex('city', code), this.getIndex('county', code)])).catch(() => {});
    },

    getValues() {
      const picker = this.getPicker();
      return picker ? picker.getValues().filter(value => !!value) : [];
    },

    getDetail() {
      const values = this.getValues();
      const area = {
        code: '',
        country: '',
        province: '',
        city: '',
        county: ''
      };

      if (!values.length) {
        return area;
      }

      const names = values.map(item => item.name);
      area.code = values[values.length - 1].code;

      if (area.code[0] === '9') {
        area.country = names[1] || '';
        area.province = names[2] || '';
      } else {
        area.province = names[0] || '';
        area.city = names[1] || '';
        area.county = names[2] || '';
      }

      return area;
    },

    reset(code) {
      this.code = code || '';
      return this.setValues();
    },

    setData: function (obj) {
      let that = this;
      let keys = [];
      let val, data;
      Object.keys(obj).forEach(function (key) {
        keys = key.split('.');
        val = obj[key];
        data = that.$data;
        keys.forEach(function (key2, index) {
          if (index + 1 == keys.length) {
            that.$set(data, key2, val);
          } else {
            if (!data[key2]) {
              that.$set(data, key2, {});
            }
          }

          data = data[key2];
        });
      });
    }
  },
  watch: {
    value(value) {
      this.code = value;
      this.setValues();
    },

    columnsNum(value) {
      this.setData({
        displayColumns: this.columns.slice(0, +value)
      });
    }

  }
};
</script>
<style>
@import "./index.css";
</style>