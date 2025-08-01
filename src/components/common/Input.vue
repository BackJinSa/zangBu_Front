<template>
  <div class="input-container">
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
      class="input-field"
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

<style scoped>
.input-container {
  width: 300px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 12px;
  box-sizing: border-box;
}

.input-field {
  width: 280px;
  height: 19px;
  padding: 8px 12px;
  font-size: 16px;
  line-height: 1.5;
  color: #374151;
  background-color: #ffffff;
  border: 1px solid #ffffff;
  outline: none;
  font-family: 'Roboto', sans-serif;
  box-sizing: border-box;
}

.input-field::placeholder {
  color: #9ca3af;
  font-size: 16px;
}

.input-field:disabled {
  background-color: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
