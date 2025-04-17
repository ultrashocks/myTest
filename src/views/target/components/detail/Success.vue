<template>
  <div class="step-stage">
    <div class="stage-box">
      <div class="box-content">
        <div class="inner-wrap">
          <!-- <div class="sub-title">{{ tableData.title }}</div> -->
          <div class="data-table">
            <table>
              <colgroup>
                <col width="15%" />
                <col width="35%" />
                <col width="15%" />
                <col width="35%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>성공지표명</th>
                  <td>{{ tableData.indicatorName }}</td>
                  <th>성공지표기준</th>
                  <td>
                    {{ tableData.indicatorStandard }}
                  </td>
                </tr>
                <tr>
                  <th>성공지표기준 상세</th>
                  <td colspan="3" class="no-wrap">
                    {{ tableData.indicatorDetail }}
                  </td>
                </tr>
                <tr>
                  <th>같은 그룹 상품 정보</th>
                  <td class="no-wrap" colspan="3">
                    {{ tableData.groupInfo }}
                  </td>
                </tr>
                <tr>
                  <th>보조지표명</th>
                  <td>{{ tableData.secondaryName }}</td>
                  <th>보조지표기준</th>
                  <td>{{ tableData.secondaryStandard }}</td>
                </tr>
                <tr>
                  <th>보조지표기준 상세</th>
                  <td>{{ tableData.secondaryDetail }}</td>
                  <th></th>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
const tableData = reactive({
  indicatorName: '유치성공률',
  indicatorStandard: '시도(실행)대비',
  indicatorDetail:
    'LPZ0002555 (리얼글래스) 5G 시그니처 | 금액 GROUP6: 10~11만원',
  groupInfo:
    'LPZ0002556 (리얼글래스) 5G 프리미어, LPZOOO2557 (갤럭시 워치) 5G 시그니처, LPZ0002558 (롯데카드제휴), LPZ0002556 (리얼글래스) 5G 프리미어, LPZOOO2557 (갤럭시 워치) 5G 시그니처, LPZ0002558 (롯데카드제휴)',
  secondaryName: '업셀 성공률',
  secondaryStandard: '순액증대(모바일요금제)',
  secondaryDetail: '30,000',
});

const isEll = ref([]);
const checkEllipsis = (event, index) => {
  const el = event.target;
  if (el.scrollWidth > el.clientWidth) {
    isEll.value[index] = true;
  } else {
    isEll.value[index] = false;
  }
};
</script>
