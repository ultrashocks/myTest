<template>
  <div class="contents-wrap">
    <div class="contents-layout" :class="{ 'side-active': getSideActive }">
      <section class="contents-section">
        <ContentHeader />
        <div class="contents-view">
          <div class="notice-write">
            <div class="table-inputs">
              <table>
                <colgroup>
                  <col width="15%" />
                  <col width="35%" />
                  <col width="15%" />
                  <col width="" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>제목</th>
                    <td colspan="3">
                      <input type="text" v-model="noticeData.title" />
                    </td>
                  </tr>
                  <tr>
                    <th>작성자</th>
                    <td>{{ noticeData.user }}</td>
                    <th>사용자 비노출</th>
                    <td>
                      <div class="custom-checkbox">
                        <label>
                          <input
                            type="checkbox"
                            v-model="noticeData.exposure"
                          />
                          <i class="icon"></i>
                          사용 (게시물이 관리자에게만 보입니다.)
                        </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>중요(메인 팝업)</th>
                    <td>
                      <div class="custom-checkbox">
                        <label>
                          <input
                            type="checkbox"
                            v-model="noticeData.usePopup"
                          />
                          <i class="icon"></i>
                          사용 (상단고정 및 메인 팝업이 제공됩니다.)
                        </label>
                      </div>
                    </td>
                    <th>중요 게시기간</th>
                    <td>
                      <AppDateTimeFromToPicker
                        labelName="날짜선택"
                        v-model:fromDate="noticeData.period.fromDate"
                        v-model:toDate="noticeData.period.toDate"
                        style="width: 240px"
                        :disabled="true"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4">
                      <textarea v-model="noticeData.content"></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="file-list">
              <div class="list-top">
                <div class="top-left">
                  <div class="sub-title">첨부파일</div>
                  <div class="file-count">파일수 : <strong>2</strong> / 5</div>
                  <div class="file-volume">
                    총 용량 : <strong>355KB</strong> / 50.0MB
                  </div>
                </div>
                <div class="top-right">
                  <AppFileButton
                    id="file-btn"
                    label="추가"
                    @changeFile="onSelectFile"
                  />
                  <button class="btn-m" @click="onDeleteFile">삭제</button>
                </div>
              </div>
              {{ fileData }}
              <div class="list-body">
                <table>
                  <colgroup>
                    <col width="100px" />
                    <col width="" />
                    <col width="200px" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>
                        <div class="custom-checkbox">
                          <label>
                            <input
                              type="checkbox"
                              v-model="checkAll"
                              @change="onCheckAll"
                            />
                            <i class="icon"></i>
                            전체
                          </label>
                        </div>
                      </th>
                      <th>파일명</th>
                      <th>파일크기</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="file in fileData" :key="file.id">
                      <td>
                        <div class="custom-checkbox">
                          <label>
                            <input type="checkbox" v-model="file.checked" />
                            <i class="icon"></i>
                          </label>
                        </div>
                      </td>
                      <td>{{ file.name }}</td>
                      <td>{{ file.size }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="bottombtn-wrap">
              <button class="btn-info">취소</button>
              <button class="btn-info">저장</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import AppDateTimeFromToPicker from '@/components/calendar/AppDateTimeFromToPicker.vue';
import AppFileButton from '@/components/ui/AppFileButton.vue';
import { randomKey } from '@/utils/utils';
import { useUiStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';
import { ref, reactive, watch } from 'vue';
const uiStore = useUiStore();
const { getSideActive } = storeToRefs(uiStore);

const noticeData = reactive({
  title: '',
  user: '홍길동(gil-dong)',
  exposure: false,
  usePopup: false,
  content: '',
  period: {
    fromDate: new Date(),
    toDate: new Date(),
  },
});

const fileData = ref([]);

const onSelectFile = data => {
  console.log(data);
  const { name, size } = data;
  console.log(name, size);
  fileData.value.push({ id: randomKey(), checked: false, name, size });
};

const onDeleteFile = () => {
  fileData.value = fileData.value.filter(file => !file.checked);
};

const checkAll = ref(false);
const onCheckAll = () => {
  fileData.value.forEach(file => {
    file.checked = checkAll.value;
  });
};

watch(
  fileData,
  newValue => {
    checkAll.value =
      newValue.length > 0 && newValue.every(file => file.checked);
  },
  { deep: true },
);
</script>
