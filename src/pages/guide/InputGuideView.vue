<template>
  <div class="input-guide">
    <div class="container">
      <h1 class="page-title">Input 컴포넌트 가이드</h1>

      <!-- 컴포넌트 개요 -->
      <section class="section">
        <h2 class="section-title">컴포넌트 개요</h2>
        <div class="overview">
          <p>
            Input 컴포넌트는 사용자로부터 텍스트 입력을 받기 위한 기본적인 UI 요소입니다. 깔끔하고
            모던한 디자인으로 제작되었으며, 300x44px 크기의 고정된 입력 필드입니다.
          </p>
        </div>
      </section>

      <!-- 컴포넌트 예시 -->
      <section class="section">
        <h2 class="section-title">컴포넌트 예시</h2>
        <div class="input-examples">
          <div class="input-example">
            <h3>기본 Input</h3>
            <Input />
            <p class="description">기본적인 텍스트 입력 필드 (300x44px)</p>
          </div>
          <div class="input-example">
            <h3>사용자 정의 플레이스홀더</h3>
            <Input placeholder="사용자 이름을 입력하세요" />
            <p class="description">커스텀 플레이스홀더 텍스트</p>
          </div>
          <div class="input-example">
            <h3>이메일 입력</h3>
            <Input type="email" placeholder="example@email.com" />
            <p class="description">이메일 형식 입력 필드</p>
          </div>
        </div>
      </section>

      <!-- 코드 예시 -->
      <section class="section">
        <h2 class="section-title">코드 예시</h2>
        <div class="code-example">
          <h3>기본 사용법</h3>
          <pre><code>&lt;template&gt;
  &lt;Input /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import Input from '@/components/common/Input.vue'
&lt;/script&gt;</code></pre>
        </div>
        <div class="code-example">
          <h3>v-model 사용</h3>
          <pre><code>&lt;template&gt;
  &lt;Input v-model="value" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'
import Input from '@/components/common/Input.vue'

const value = ref('')
&lt;/script&gt;</code></pre>
        </div>
        <div class="code-example">
          <h3>다양한 타입 설정</h3>
          <pre><code>&lt;template&gt;
  &lt;!-- 이메일 입력 --&gt;
  &lt;Input type="email" placeholder="example@email.com" /&gt;

  &lt;!-- 비밀번호 입력 --&gt;
  &lt;Input type="password" placeholder="비밀번호를 입력하세요" /&gt;

  &lt;!-- 숫자 입력 --&gt;
  &lt;Input type="number" placeholder="나이를 입력하세요" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import Input from '@/components/common/Input.vue'
&lt;/script&gt;</code></pre>
        </div>
      </section>

      <!-- Props 문서 -->
      <section class="section">
        <h2 class="section-title">Props 문서</h2>
        <div class="table-container">
          <table class="docs-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>타입</th>
                <th>기본값</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>modelValue</td>
                <td>String, Number</td>
                <td>''</td>
                <td>입력 필드의 값 (v-model용)</td>
              </tr>
              <tr>
                <td>type</td>
                <td>String</td>
                <td>'text'</td>
                <td>입력 필드의 타입 (text, email, password, number, tel, url, search)</td>
              </tr>
              <tr>
                <td>placeholder</td>
                <td>String</td>
                <td>'예: 김철수'</td>
                <td>플레이스홀더 텍스트</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>Boolean</td>
                <td>false</td>
                <td>입력 필드 비활성화 여부</td>
              </tr>
              <tr>
                <td>required</td>
                <td>Boolean</td>
                <td>false</td>
                <td>필수 입력 여부</td>
              </tr>
              <tr>
                <td>maxlength</td>
                <td>Number</td>
                <td>null</td>
                <td>최대 입력 길이</td>
              </tr>
              <tr>
                <td>minlength</td>
                <td>Number</td>
                <td>null</td>
                <td>최소 입력 길이</td>
              </tr>
              <tr>
                <td>name</td>
                <td>String</td>
                <td>''</td>
                <td>입력 필드의 name 속성</td>
              </tr>
              <tr>
                <td>id</td>
                <td>String</td>
                <td>''</td>
                <td>입력 필드의 id 속성</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 이벤트 문서 -->
      <section class="section">
        <h2 class="section-title">이벤트 문서</h2>
        <div class="table-container">
          <table class="docs-table">
            <thead>
              <tr>
                <th>이벤트</th>
                <th>설명</th>
                <th>타입</th>
                <th>세부사항</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>input</td>
                <td>입력 값 변경</td>
                <td>Event</td>
                <td>사용자가 입력할 때마다 발생</td>
              </tr>
              <tr>
                <td>focus</td>
                <td>포커스 획득</td>
                <td>Event</td>
                <td>입력 필드에 포커스가 맞춰질 때 발생</td>
              </tr>
              <tr>
                <td>blur</td>
                <td>포커스 해제</td>
                <td>Event</td>
                <td>입력 필드에서 포커스가 해제될 때 발생</td>
              </tr>
              <tr>
                <td>change</td>
                <td>값 변경 완료</td>
                <td>Event</td>
                <td>입력 값이 변경되고 포커스가 해제될 때 발생</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 인터랙티브 데모 -->
      <section class="section">
        <h2 class="section-title">인터랙티브 데모</h2>
        <div class="demo-inputs">
          <div class="demo-input">
            <label>기본 입력:</label>
            <Input v-model="demoValue1" placeholder="여기에 입력해보세요" />
            <p class="demo-result">입력된 값: {{ demoValue1 || '(없음)' }}</p>
          </div>
          <div class="demo-input">
            <label>이메일 입력:</label>
            <Input v-model="demoValue2" type="email" placeholder="이메일을 입력하세요" />
            <p class="demo-result">입력된 값: {{ demoValue2 || '(없음)' }}</p>
          </div>
          <div class="demo-input">
            <label>숫자 입력:</label>
            <Input v-model="demoValue3" type="number" placeholder="숫자를 입력하세요" />
            <p class="demo-result">입력된 값: {{ demoValue3 || '(없음)' }}</p>
          </div>
        </div>
      </section>

      <!-- 스타일 가이드 -->
      <section class="section">
        <h2 class="section-title">스타일 가이드</h2>
        <div class="style-guide">
          <div class="style-item">
            <h3>크기</h3>
            <ul>
              <li>컨테이너: 300px × 44px</li>
              <li>입력 필드: 280px × 19px</li>
            </ul>
          </div>
          <div class="style-item">
            <h3>색상</h3>
            <ul>
              <li>배경: #ffffff (흰색)</li>
              <li>테두리: #ffffff (흰색)</li>
              <li>텍스트: #374151 (진한 회색)</li>
              <li>플레이스홀더: #9ca3af (연한 회색)</li>
            </ul>
          </div>
          <div class="style-item">
            <h3>폰트</h3>
            <ul>
              <li>폰트 패밀리: 'Roboto', sans-serif</li>
              <li>폰트 크기: 16px</li>
              <li>라인 높이: 1.5</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import Input from '@/components/common/Input.vue'
import { ref } from 'vue'

const demoValue1 = ref('')
const demoValue2 = ref('')
const demoValue3 = ref('')
</script>

<style scoped>
.input-guide {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  color: #2c3e50;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
  font-family: 'Roboto', sans-serif;
}

.section {
  margin-bottom: 60px;
}

.section-title {
  color: #2c3e50;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  font-family: 'Roboto', sans-serif;
  border-bottom: 2px solid #3498db;
  padding-bottom: 8px;
}

.overview {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.overview p {
  margin: 0;
  color: #2c3e50;
  font-size: 16px;
  line-height: 1.6;
}

.input-examples {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  justify-items: center;
}

.input-example {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 350px;
}

.input-example h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.input-example .description {
  margin-top: 12px;
  font-size: 14px;
  color: #7f8c8d;
  line-height: 1.4;
}

.table-container {
  overflow-x: auto;
  margin-bottom: 20px;
}

.docs-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.docs-table th {
  background: #3498db;
  color: white;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
}

.docs-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #ecf0f1;
  font-family: 'Roboto', sans-serif;
}

.docs-table tr:last-child td {
  border-bottom: none;
}

.docs-table tr:hover {
  background: #f8f9fa;
}

.code-example {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border-left: 4px solid #3498db;
}

.code-example h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.code-example pre {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.demo-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.demo-input {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.demo-input label {
  display: block;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 12px;
  font-family: 'Roboto', sans-serif;
}

.demo-result {
  margin-top: 12px;
  padding: 8px 12px;
  background: #e8f5e8;
  border-radius: 4px;
  color: #2c3e50;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
}

.style-guide {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.style-item {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.style-item h3 {
  color: #2c3e50;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
}

.style-item ul {
  margin: 0;
  padding-left: 20px;
  color: #7f8c8d;
  line-height: 1.6;
}

.style-item li {
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .input-guide {
    padding: 20px 16px;
  }

  .page-title {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .section-title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .input-examples {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .demo-inputs {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .style-guide {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .code-example {
    padding: 16px;
  }

  .code-example pre {
    font-size: 12px;
    padding: 12px;
  }

  .docs-table {
    font-size: 14px;
  }

  .docs-table th,
  .docs-table td {
    padding: 8px 12px;
  }
}
</style>
