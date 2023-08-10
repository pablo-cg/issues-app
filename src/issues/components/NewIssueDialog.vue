<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { useIssueMutation } from '../composables/useIssueMutation';

interface Props {
  modelValue: boolean;
  labels: string[];
}

interface Emits {
  (event: 'update:modelValue', value: boolean): void;
  (event: 'addIssue', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { createIssue, isLoading, isSuccess, resetMutation } = useIssueMutation();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const newIssue = reactive({
  title: '',
  body: '',
  labels: [] as string[],
});

watch(isSuccess, (success) => {
  if (success) {
    resetMutation();
    isOpen.value = false;
  }
});
</script>

<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="min-width: 80vw">
      <q-card-section>
        <div class="text-h6">New Issue</div>
      </q-card-section>
      <q-form
        class="col-12 col-md-6 card-section"
        @submit="createIssue(newIssue)"
      >
        <q-card-section class="q-pt-none">
          <q-input
            outlined
            v-model="newIssue.title"
            label="Title"
            :rules="[(value) => !!value || 'Title is required']"
          />
          <q-select
            outlined
            v-model="newIssue.labels"
            label="Labels"
            multiple
            :options="labels"
            use-chips
            stack-label
          />
          <md-editor
            v-model="newIssue.body"
            placeholder="# Markdown"
            language="en-US"
            previewTheme="github"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            flat
            color="dark"
            label="Cancel"
            v-close-popup
            :loading="isLoading"
          />
          <q-btn
            color="dark"
            label="Add Issue"
            type="submit"
            :loading="isLoading"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.card-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
