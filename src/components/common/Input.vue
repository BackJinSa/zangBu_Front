<template>
  <div class="w-80 h-11 flex items-center justify-center bg-white p-3 box-border">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :maxlength="maxlength"
      :minlength="minlength"
      :name="name"
      :id="id"
      class="w-70 h-5 px-3 py-2 text-base leading-6 text-gray-700 bg-white border border-white outline-none font-roboto box-border placeholder:text-gray-400 placeholder:text-base disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60 focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />
  </div>
</template>

<script setup>
// Props 정의
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) =>
      ['text', 'email', 'password', 'number', 'tel', 'url', 'search'].includes(value),
  },
  placeholder: {
    type: String,
    default: '예: 김철수',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: Number,
    default: null,
  },
  minlength: {
    type: Number,
    default: null,
  },
  name: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
})

// Emits 정의
const emit = defineEmits(['update:modelValue', 'input', 'focus', 'blur', 'change'])

// 메서드들
const handleInput = (event) => {
  let value = event.target.value

  // number 타입일 때 숫자만 허용
  if (props.type === 'number') {
    value = value.replace(/[^0-9]/g, '')
    event.target.value = value
  }

  // email 타입일 때 이메일 형식만 허용
  if (props.type === 'email') {
    // 이메일 형식: 영문자, 숫자, 특수문자(@, ., -, _)만 허용
    value = value.replace(/[^a-zA-Z0-9@._-]/g, '')
    event.target.value = value
  }

  emit('update:modelValue', value)
  emit('input', event)
}

const handleFocus = (event) => {
  emit('focus', event)
}

const handleBlur = (event) => {
  emit('blur', event)
}

const handleChange = (event) => {
  emit('change', event)
}
</script>
