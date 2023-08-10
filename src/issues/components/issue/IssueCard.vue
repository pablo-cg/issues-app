<script setup lang="ts">
import { computed } from 'vue';
import { timeSince } from 'src/shared/helpers';
import { Issue, State } from 'src/issues/models';
import MdRender from 'vue-markdown-render';
import { useIssue } from 'src/issues/composables/useIssue';

interface Props {
  issue: Issue;
  isComment?: boolean;
}

const props = defineProps<Props>();

const created = computed(() => timeSince(props.issue?.created_at));
const issueNumber = computed(() => props.issue?.number || 0);

const { setIssueCache } = useIssue(issueNumber.value, {
  autoload: false,
});
</script>

<template>
  <q-card
    class="text-black col-12 q-mb-md"
    flat
    bordered
    @mouseenter="!isComment ? setIssueCache(issue) : undefined"
  >
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="issue?.user.avatar_url" :alt="issue?.user.login" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <router-link v-if="issue.number" :to="`/issue/${issue.number}`">
            {{ issue?.title }}
          </router-link>
          <span class="text-bold" v-else>{{ issue?.user?.login }}</span>
        </q-item-label>
        <q-item-label caption> {{ created }} ago </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label class="row items-center justify-end">
          <q-item-label class="q-mr-md">
            <q-icon name="question_answer" />
            {{ issue?.comments }}
          </q-item-label>
          <q-chip
            v-if="issue?.state === State.CLOSED"
            color="positive"
            text-color="white"
            icon="check"
          >
            Closed
          </q-chip>
          <q-chip
            v-if="issue?.state === State.OPEN"
            color="negative"
            text-color="white"
            icon="bug_report"
          >
            Open
          </q-chip>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-item-section class="q-pa-md">
      <md-render :source="issue?.body || ''" />
    </q-item-section>

    <q-separator />

    <q-item-section class="q-pa-xs q-gutter-xs">
      <div>
        <q-chip
          outline
          size="1rem"
          v-for="label of issue?.labels"
          :style="{ color: `#${label.color}` }"
          :key="label.id"
          :label="label.name"
        >
        </q-chip>
      </div>
    </q-item-section>
  </q-card>
</template>

<style scoped></style>
