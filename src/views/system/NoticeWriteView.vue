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
                  <col width="264" />
                  <col width="" />
                  <col width="264" />
                  <col width="" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>제목</th>
                    <td colspan="3">
                      <div class="td-col">
                        <AppInput
                          v-model="noticeData.title"
                          style="width: 100%"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>작성자</th>
                    <td>
                      <div class="td-col">
                        {{ noticeData.user }}
                      </div>
                    </td>
                    <th>사용자 비노출</th>
                    <td>
                      <div class="td-col">
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
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>중요(메인 팝업)</th>
                    <td>
                      <div class="td-col">
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
                      </div>
                    </td>
                    <th>중요 게시기간</th>
                    <td>
                      <div class="td-col">
                        <AppDateTimeFromToPicker
                          v-model:fromDate="noticeData.period.fromDate"
                          v-model:toDate="noticeData.period.toDate"
                          style="width: 240px"
                          :disabled="!noticeData.usePopup"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4">
                      <div class="td-col">
                        <textarea
                          v-model="noticeData.content"
                          placeholder="내용 입력"
                        ></textarea>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="file-list">
              <div class="list-top">
                <div class="top-left">
                  <div class="sub-title">첨부파일</div>
                  <div class="file-count">
                    파일수 : <strong>{{ fileData.length }}</strong
                    ><span> / 5</span>
                  </div>
                  <div class="file-volume">
                    총 용량 : <strong>{{ totalFileSize }}KB</strong
                    ><span> / 50.0MB</span>
                  </div>
                </div>
                <div class="top-right">
                  <AppFileButton
                    id="file-btn"
                    label="추가"
                    @changeFile="onSelectFile"
                  />
                  <button class="btn-common del" @click="onDeleteFile">
                    삭제<i></i>
                  </button>
                </div>
              </div>
              <div class="list-body">
                <table>
                  <colgroup>
                    <col width="50" />
                    <col width="" />
                    <col width="200" />
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
                          </label>
                        </div>
                      </th>
                      <th>파일명</th>
                      <th>파일크기</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="file in fileData"
                      :key="file.id"
                      :class="{ checked: file.checked }"
                    >
                      <td>
                        <div class="custom-checkbox">
                          <label>
                            <input type="checkbox" v-model="file.checked" />
                            <i class="icon"></i>
                          </label>
                        </div>
                      </td>
                      <td class="td-left">{{ file.name }}</td>
                      <td>{{ file.size }}KB</td>
                    </tr>
                  </tbody>
                </table>
                <div
                  class="non-table__data non-scroll"
                  v-if="fileData.length === 0"
                >
                  <div class="msg-box">
                    <i class="icon"></i>
                    <div class="msg">파일을 추가해 주세요.</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="file-infos">
              <i class="icon"></i> 가능한 파일형식을 확인해 주세요. (허용 : png,
              PNG, txt, ppt, xls, xlsx, doc, docx, gif, jpg, bmp, zip, pdf)
            </div>
            <div class="bottom-btns__controls footer-button-box">
              <div class="btn-l">
                <button @click="onCancel">취소</button>
              </div>
              <div class="btn-r">
                <button class="black" @click="onSave">저장</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import AppInput from '@/components/ui/AppInput.vue';
import AppDateTimeFromToPicker from '@/components/calendar/AppDateTimeFromToPicker.vue';
import AppFileButton from '@/components/ui/AppFileButton.vue';
import { randomKey } from '@/utils/utils';
import { useUiStore } from '@/stores/ui';
import { storeToRefs } from 'pinia';
import { ref, reactive, watch, computed } from 'vue';
import { useSlider } from '@/composables/slider';
import { useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
const { setSliderStatus } = useSlider();
const { setAlertStatus } = useAlert();
const uiStore = useUiStore();
const { getSideActive } = storeToRefs(uiStore);
const router = useRouter();

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

const totalFileSize = computed(() => {
  return fileData.value.reduce((total, file) => total + parseInt(file.size), 0);
});

const onSelectFile = data => {
  console.log(data);
  const { name, size } = data;
  console.log(name, size);
  fileData.value.push({
    id: randomKey(),
    checked: false,
    name,
    size: formatFileSize(size),
  });
};

const formatFileSize = bytes => {
  if (bytes === 0) return '0';
  const kb = bytes / 1024;
  return `${Math.round(kb)}`;
};

const onDeleteFile = () => {
  if (fileData.value.some(file => file.checked)) {
    fileData.value = fileData.value.filter(file => !file.checked);
  } else {
    setAlertStatus({
      view: true,
      message: '삭제할 항목을 한개 이상 체크해주세요.',
    });
  }
};

const checkAll = ref(false);
const onCheckAll = () => {
  fileData.value.forEach(file => {
    file.checked = checkAll.value;
  });
};

const onCancel = () => {
  router.back();
};

const onSave = () => {
  setSliderStatus({
    view: true,
    message: '저장장되었습니다.',
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
