<script setup lang="ts">
import { AxiosError } from 'axios';
import {
  funtionGroupsRequest,
  funtionTypesRequest,
  groupProfileRequest,
} from '~/services/groupProfile';
import { serviceRequest } from '~/services/permission';
import type {
  ErrorDto,
  FuntionGroup_TypeDTO,
  GroupProfileDTO,
  GroupProfileTableDTO,
} from '~/types';

const parentForm = useTemplateRef<HTMLFormElement>('parentForm');
const functionGroups = ref<FuntionGroup_TypeDTO[]>([]);
const functionTypes = ref<FuntionGroup_TypeDTO[]>([]);
const profileGroups = ref<GroupProfileTableDTO[]>([]);
const isLoading = ref<boolean>(false);

const requiredInputStyle = ref<string>('text-gray-400');

const state = ref({
  searchValue: '',
  grupoUsuarioId: undefined as number | undefined,
  tabTipofuncao_Id: undefined as number | undefined,
});

const handleInitialRequest = async (): Promise<void> => {
  const [functionGroupsResponse, functionTypesResponse] = await Promise.all([
    funtionGroupsRequest(),
    funtionTypesRequest(),
  ]);
  functionGroups.value = functionGroupsResponse.data;
  functionTypes.value = functionTypesResponse.data;
};

const submitForm = () => {
  if (parentForm.value) {
    parentForm.value.submit();
  }
};

const onSubmit = () => {
  isLoading.value = true;
  if (!state.value.grupoUsuarioId) {
    isLoading.value = false;
    return swalWarning({ title: 'Ops...', text: 'Selecione um grupo de usuário para continuar.' });
  }

  groupProfileRequest({
    grupoUsuarioId: state.value.grupoUsuarioId,
    tabTipofuncao_Id: state.value.tabTipofuncao_Id,
  })
    .then((response) => {
      profileGroups.value = response.data;
      console.log(profileGroups.value);
      isLoading.value = false;
    })
    .catch((error) => {
      if (error instanceof AxiosError) {
        const errors: ErrorDto = error.response?.data.errors;
        if (error.response === undefined) {
          swalError({ title: 'Ops..', text: 'Algo deu errado!' });
        } else if (errors.message !== '') {
          swalError({ title: 'Ops..', text: errors.message });
          if (error.response.status === 401) navigateTo('/');
        } else {
          swalWarning({ title: 'Falha', text: errors.stackTrace });
        }
      }
      isLoading.value = false;
    });
};

const columns = [
  {
    key: 'desc_Funcao',
    label: 'Função',
    sortable: true,
    class: 'w-[40%]',
  },
  {
    key: 'can_Search',
    label: 'Consulta',
  },
  {
    key: 'can_Save',
    label: 'Gravar',
  },
  {
    key: 'can_Delete',
    label: 'Excluir',
  },
  {
    key: 'particularidade',
    label: 'Exeções',
  },
];

const route = useRoute();
const permissions = ref<GroupProfileDTO | undefined>({
  permissao: { can_Delete: false, can_Save: false, can_Search: false },
  particularidade: [
    { desc_parametro: '', grupO_USUARIO_PARTICUL_ID: 0, presenca_particularidade: false },
  ],
});

onMounted(() => {
  serviceRequest(route.path.slice(-1)).then((data) => {
    permissions.value = data;
  });
  handleInitialRequest();
});
</script>
<template>
  <div class="w-full flex gap-7 flex-col">
    <div class="flex flex-col gap-4">
      <UForm ref="parentForm" @submit="onSubmit" :state="state">
        <SearchBar @submitForm="submitForm" :defaultOpen="true" :modelValue="state.searchValue">
          <div class="flex w-full gap-1" :class="{ 'px-4': !state.grupoUsuarioId }">
            <UTooltip
              v-if="!state.grupoUsuarioId"
              text="O grupo de usuário é obrigatório"
              :popper="{ arrow: true, placement: 'bottom-start' }"
            >
              <UIcon class="w-5 h-5 self-center text-orange-400" name="i-ep-info-filled" />
            </UTooltip>
            <USelectMenu
              :ui="{
                wrapper: 'w-1/3 relative',
                placeholder: `${requiredInputStyle} font-normal`,
                color: {
                  white: {
                    outline: 'shadow-none ring-0 text-gray-500 font-medium ',
                  },
                },
                icon: {
                  base: `${requiredInputStyle}`,
                },
                arrow: {
                  label: 'block truncate animate-shake',
                },
              }"
              v-model="state.grupoUsuarioId"
              :options="functionGroups"
              option-attribute="nome"
              value-attribute="id"
              size="lg"
              placeholder="Escolha o Grupo"
            />
            <UDivider orientation="vertical" />
            <USelectMenu
              :ui="{
                wrapper: 'w-1/3 relative',
                placeholder: 'text-gray-400 font-normal',
                color: {
                  white: {
                    outline: 'shadow-none ring-0 text-gray-500 font-medium',
                  },
                },
                icon: {
                  base: 'text-gray-500',
                },
              }"
              v-model="state.tabTipofuncao_Id"
              :options="functionTypes"
              optionAttribute="nome"
              valueAttribute="id"
              size="lg"
              placeholder="Escolha a Função"
            />
            <UDivider orientation="vertical" />
          </div>
        </SearchBar>
      </UForm>
    </div>
    <div class="bg-white flex flex-col gap-5 shadow-card rounded-lg px-5 py-5">
      <span>
        <h1 class="text-xl font-bold text-gray-600">Perfil de Grupo</h1>
        <p class="text-xs text-gray-400">Gerenciamento de perfis</p>
      </span>
      <UTable
        :ui="{
          td: { base: 'border-b border-gray-200' },
          thead: 'relative bg-gray-200',
        }"
        :loading="isLoading"
        :columns="columns"
        class="rounded-lg"
        :rows="profileGroups"
      >
        <template #empty-state>
          <div class="flex items-center min-h-96 flex-col text-gray-400 justify-center py-6 gap-2">
            <UIcon class="w-8 h-8" name="i-material-symbols-light-database" />
            <p>Nada por aqui :(</p>
          </div>
        </template>
        <template #loading-state>
          <div class="gap-2 flex-col text-gray-400 flex items-center justify-center min-h-96">
            <UIcon class="w-8 h-8 animate-spin" name="i-line-md-loading-twotone-loop" />
            <p>loading...</p>
          </div>
        </template>

        <template #can_Search-data="{ row }">
          <div class="space-y-2.5 py-1">
            <div>
              <UCheckbox
                :ui="{
                  color: 'text-main dark:text-main',
                }"
                v-model="(row as GroupProfileTableDTO).can_Search"
              />
            </div>
          </div>
        </template>
        <template #can_Save-data="{ row }">
          <div class="space-y-2.5 py-1">
            <div>
              <UCheckbox
                :ui="{
                  color: 'text-main dark:text-main',
                }"
                v-model="(row as GroupProfileTableDTO).can_Save"
                @click="console.log(row)"
              />
            </div>
          </div>
        </template>
        <template #can_Delete-data="{ row }">
          <div class="space-y-2.5 py-1">
            <div>
              <UCheckbox
                :ui="{
                  color: 'text-main dark:text-main',
                }"
                v-model="(row as GroupProfileTableDTO).can_Delete"
              />
            </div>
          </div>
        </template>

        <template #particularidade-data="{ row }">
          <div class="space-y-2.5 py-1">
            <div>
              <span
                class="block"
                :class="(row as GroupProfileTableDTO).particularidade.length !== 0 && 'font-semibold text-gray-800 hover:underline cursor-pointer'
                "
                >{{
                  (row as GroupProfileTableDTO).particularidade.length === 0
                    ? 'Não Há'
                    : 'Há Particularidades'
                }}</span
              >
            </div>
          </div>
        </template>
      </UTable>
      <div class="flex gap-3">
        <UButton
          variant="outline"
          class="text-main rounded-full hover:text-white hover:bg-main"
          label="Gravar"
        />
        <UButton
          variant="outline"
          class="text-main rounded-full hover:text-white hover:bg-main"
          label="Excluir permissão"
        />
        <UButton
          variant="outline"
          class="text-main rounded-full hover:text-white hover:bg-main"
          label="Voltar"
        />
      </div>
    </div>
  </div>
</template>
