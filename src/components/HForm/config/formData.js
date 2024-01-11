/*
 * @Author: Ygm
 * @Date: 2023-07-19 13:49:25
 * @LastEditors: Ygm
 * @LastEditTime: 2023-07-19 13:49:25
 * @Description: 表单数据
 * 注：obj_id 为唯一标识，不可重复
 */
const formData = [
  {
    obj_id: "a1",
    title: "数量",
    value: null,
    default_data: "",
    require: true,
    field: "form_num",
    placeholder: "请输入金额",
    widgets_type: "f_input",
    props: {
      readonly: false,
      maxlength: 100
    }
  },
  {
    obj_id: "a2",
    title: "性别",
    value: "",
    field: "form_xb",
    default_data: "",
    placeholder: "请选择",
    data_list: [
      {
        text: "男",
        value: 0
      },
      {
        text: "女",
        value: 1
      }
    ],
    require: true,
    widgets_type: "f_checkbox",
    props: {
      inputAlign: "right"
    }
  },
  {
    obj_id: "a2-2",
    title: "爱好",
    field: "form_ah",
    value: "",
    default_data: [2],
    placeholder: "请选择",
    data_list: [
      {
        text: "苹果",
        value: 2
      },
      {
        text: "香蕉",
        value: 3
      }
    ],
    require: true,
    widgets_type: "f_checkbox",
    props: {
      multiple: true,
      inputAlign: "right"
    }
  },
  {
    obj_id: "a3",
    title: "日历",
    value: "",
    field: "form_rl",
    default_data: "",
    data_list: [],
    visible: true,
    require: true,
    placeholder: "请选择日历",
    widgets_type: "f_calendar"
  },
  {
    obj_id: "a4",
    title: "时间",
    value: "",
    field: "form_sj",
    default_data: "",
    data_list: [],
    require: true,
    placeholder: "请选择日期",
    widgets_type: "f_datetimePicker",
    props: {
      readonly: false,
      maxlength: 100
    }
  },
  {
    obj_id: "a5",
    title: "自定义选择",
    value: "",
    field: "form_gs",
    default_data: "",
    data_list: [],
    require: false,
    placeholder: "自定义选择",
    widgets_type: "f_dataPicker",
    props: {
      readonly: false,
      maxlength: 100
    }
  },
  {
    obj_id: "last2",
    title: "备注",
    value: "",
    field: "form_bz",
    default_data: "",
    data_list: [],
    require: true,
    placeholder: "请输入备注",
    widgets_type: "f_textarea",
    props: {
      readonly: false,
      maxlength: 100
    }
  }
]

export default formData
