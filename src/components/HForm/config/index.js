/*
 * @Author: Ygm
 * @Date: 2023-07-20 14:59:56
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-20 14:59:56
 * @Description: 表单数据默认配置项
 */
import { deepAssign } from "@/utils/util"

/******* 公共配置项 *******/
const HFormOptions = {
  obj_id: "", // id
  value: "", // 输入框的值
  unit: "", // 单位
  title: "标题", // 标题
  default_data: "", // 默认值
  data_list: [], // 数据列表
  right: "w", // 标题对齐方式
  field: "UNIT_NAME", // 字段名
  widgets_type: "f_input", // 控件类型
  data_type: "varchar", // 数据类型
  data_type_format: "", // 数据类型格式
  placeholder: "请输入", // 占位符
  visible: true, // 是否显示
  require: true, // 是否必填
  data_list_type: "", // 数据列表类型
  // 校验规则
  check_rule: {
    regExpText: "", // 正则校验文字
    regExp: null // 正则表达式
  },
  // 后缀图标样式
  suffixIconStyle: {
    fontSize: "28rpx",
    marginTop: "6rpx",
    color: "#c8c9cc"
  }
}

/******* 输入框配置项 *******/
const FInputOptions = deepAssign(
  {
    props: {
      disabled: false, // 是否禁用
      readonly: false, // 是否只读
      clearable: true, // 是否可清空
      password: false, // 是否是密码类型
      maxlength: 20, // 最大输入长度(-1不限制最大长度)
      type: "text", // 输入框类型(text | number | idcard | digit | password)
      inputAlign: "right", // 输入框内容对齐方式(left | center | right)
      fontSize: "28rpx", // 字体大小
      textColor: "#616366", // 字体颜色
      disabledColor: "#8f8f94", // 禁用时的颜色
      border: "none" // 边框类型 surround-四周边框 | bottom-底部边框 | none-无边框
    }
  },
  HFormOptions
)

/******* 文本域配置项 *******/
const FTextareaOptions = deepAssign(
  {
    props: {
      inputAlign: "left", // 对齐方式(left | right)
      height: 240, // 显示模式(default/list/button/tag)
      count: true, // 是否显示统计字数
      maxlength: 200, // 最大输入字数，设置为 -1 的时候不限制最大长度
      border: "surround", // 边框类型，surround-四周边框，none-无边框，bottom-底部边框
      disabled: false, // 是否禁用
      autoHeight: false, // 是否自动增高，设置auto-height时，style.height不生效
      fontSize: "28rpx", // 字体大小
      textColor: "#616366" // 字体颜色
    }
  },
  HFormOptions
)

/******* 单列、多列级联选择器配置项 *******/
const FDataPickerOptions = deepAssign(
  {
    props: {
      disabled: false, // 是否禁用
      disabledColor: "#8f8f94", // 禁用时的颜色
      border: "none", // 边框类型 surround-四周边框 | bottom-底部边框 | none-无边框
      inputAlign: "right", // 输入框内容对齐方式(left | center | right)
      fontSize: "28rpx", // 字体大小
      textColor: "#616366" // 字体颜色
    }
  },
  HFormOptions
)

/******* 时间日期选择器 *******/
const FDatetimePickerOptions = deepAssign(
  {
    props: {
      mode: "date", // date为日期选择，time为时间选择，year-month为年月选择
      pickerTitle: "选择时间", // 选择器标题
      itemHeight: "90", // 日期行高
      visibleItemCount: "6", // 可见的日期个数
      inputAlign: "right", // 输入框内容对齐方式(left | center | right)
      border: "none", // 边框类型 surround-四周边框 | bottom-底部边框 | none-无边框
      fontSize: "28rpx", // 字体大小
      textColor: "#616366", // 字体颜色
      disabledColor: "#8f8f94", // 禁用时的颜色
      showToolbar: true, // 是否显示工具栏
      disabled: false, // 是否禁用
      readonly: true // 是否只读
    }
  },
  HFormOptions
)

/******* 单选|多选组件配置项 *******/
const FCheckboxOptions = deepAssign(
  {
    props: {
      mode: "default", // 显示模式(default/list/button/tag)
      placement: "row", // 选项排列方式(row/column)
      inputAlign: "right", // 对齐方式(left | right)
      min: 0, // 最小选择个数 ，multiple为true时生效
      max: 0, // 最大选择个数 ，multiple为true时生效
      multiple: false, // 是否多选
      wrap: false, // 是否换行
      fontSize: "28rpx", // 字体大小
      textColor: "#616366", // 字体颜色
      selectedColor: "#007aff", // 选中的颜色
      selectedTextColor: "#333", // 选中的文字颜色
      map: { text: "text", value: "value" } // 字段映射，将text/value映射到数据中的其他字段
    }
  },
  HFormOptions
)

/******* 日历选择组件配置项 *******/
const FCalendarOptions = deepAssign(
  {
    props: {
      mode: "multiple", // 选择模式 single-单选 | multiple-多选 | range-范围选择
      monthNum: 3, // 展示的月份数量
      rowHeight: "120", // 日期行高
      showLunar: false, // 是否显示农历
      disabled: false, // 是否禁用
      readonly: true, // 是否只读
      clearable: true, // 是否可清空
      inputAlign: "right", // 输入框内容对齐方式(left | center | right)
      fontSize: "28rpx", // 字体大小
      textColor: "#616366", // 字体颜色
      disabledColor: "#8f8f94", // 禁用时的颜色
      border: "none" // 边框类型 surround-四周边框 | bottom-底部边框 | none-无边框
    }
  },
  HFormOptions
)

export {
  FInputOptions,
  FTextareaOptions,
  FCheckboxOptions,
  FCalendarOptions,
  FDataPickerOptions,
  FDatetimePickerOptions
}
