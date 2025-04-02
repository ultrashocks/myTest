<template>
  <div class="seg-items-page ai-page">
    <div class="ai-page-inner">
      <div class="seg-deps1">
        <div class="deps1-box-list">
          <div class="d-flex deps-row">
            <div class="deps1-box deps-box">
              <div class="deps1-box-header box-header">전체 타겟 수</div>
              <div class="deps1-box-body box-body">
                <span>30,000</span>
              </div>
            </div>

            <div class="deps-line">
              <div>asdasd</div>
            </div>
          </div>
        </div>
        <div class="seg-deps2">
          <div class="deps2-box-list">
            <!-- data에 따라 반복 생성 -->
            <div class="d-flex deps-row">
              <div class="deps2-box deps-box">
                <div class="deps2-box-header box-header"></div>
                <div class="deps2-box-body box-body"></div>
              </div>

              <div class="deps-line">
                <div>asdasd</div>
              </div>
            </div>
          </div>
          <div class="seg-deps3">
            <div class="deps3-box-list">
              <div class="d-flex deps-row">
                <div class="deps3-box deps-box">
                  <div class="deps3-box-header box-header"></div>
                  <div class="deps3-box-body box-body"></div>
                </div>

                <div class="deps-line">
                  <div>asdasd</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({});
</script>
