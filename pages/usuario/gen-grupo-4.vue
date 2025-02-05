<script setup lang="ts">
import { AxiosError } from 'axios';
import {
  funtionGroupsRequest,
  funtionTypesRequest,
  groupProfileRequest,
  particularitiesUpdateProfileGroupRequest,
  updateProfileGroupRequest,
} from '~/services/groupProfile';
import { serviceRequest } from '~/services/permission';
import type {
  ErrorDto,
  FuntionGroup_TypeDTO,
  GroupProfileConfigurationDTO,
  GroupProfileDTO,
  GroupProfileTableDTO,
  InputParticularitiesDTO,
  ParticularitiesDTO,
} from '~/types';

const parentForm = useTemplateRef<HTMLFormElement>('parentForm');
const functionGroups = ref<FuntionGroup_TypeDTO[]>([]);
const functionTypes = ref<FuntionGroup_TypeDTO[]>([]);
const profileGroups = ref<GroupProfileTableDTO[]>([]);
const modalData = ref<GroupProfileTableDTO>();
const updateGroupProfileConfiguration = ref<GroupProfileConfigurationDTO[]>([]);
const inputParticularities = ref<InputParticularitiesDTO[]>([]);
const isOpenModal = ref<boolean>(false);
const isLoading = ref<boolean>(false);

const requiredInputStyle = ref<string>('text-gray-400');
const searchValue = ref<string>('');

const state = ref({
  grupoUsuarioId: undefined as number | undefined,
  tabTipofuncao_Id: undefined as number | undefined,
});

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
    class: 'w-[20%]',
  },
];

const page = ref(1);
const pageCount = 10;

const filteredRows = computed(() => {
  const search = searchValue.value
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

  if (!search) {
    return profileGroups.value;
  }

  return profileGroups.value.filter((profileGroup) => {
    const descFuncao = profileGroup.desc_Funcao;

    const normalizedDescFuncao = descFuncao
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    return normalizedDescFuncao.includes(search);
  });
});

const rows = computed(() => {
  return filteredRows.value.slice((page.value - 1) * pageCount, page.value * pageCount);
});

const handleModel = (row: GroupProfileTableDTO) => {
  if (row.particularidade.length > 0) {
    modalData.value = row;
    isOpenModal.value = true;
  }
};

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
      updateGroupProfileConfiguration.value = [];
      profileGroups.value = response.data;
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

const handleUpdateProfileGroupRequest = () => {
  isLoading.value = true;
  updateProfileGroupRequest(updateGroupProfileConfiguration.value)
    .then(() => {
      updateGroupProfileConfiguration.value = [];
      isLoading.value = false;
      return swalSuccess({ title: 'Sucesso', text: 'Alterçãoes salvas!' });
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
      submitForm();
      isLoading.value = false;
    });
};

const handleParticularitiesUpdate = () => {
  isLoading.value = true;
  particularitiesUpdateProfileGroupRequest(inputParticularities.value)
    .then(() => {
      inputParticularities.value = [];
      isLoading.value = false;
      return swalSuccess({ title: 'Sucesso', text: 'Alterçãoes salvas!' });
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
      submitForm();
      isLoading.value = false;
    });
};

const route = useRoute();
const permitions = ref<GroupProfileDTO | undefined>({
  permissao: { can_Delete: false, can_Save: false, can_Search: false },
  particularidade: [
    { desc_parametro: '', grupO_USUARIO_PARTICUL_ID: 0, presenca_particularidade: false },
  ],
});

const handleParticularitiesCheckboxChange = (
  particularity: ParticularitiesDTO,
  checked: boolean,
) => {
  const { desc_parametro, ...rest } = {
    ...particularity,
    presenca_particularidade: checked,
  };

  const exists = inputParticularities.value.find(
    (item) => item.grupO_USUARIO_PARTICUL_ID === particularity.grupO_USUARIO_PARTICUL_ID,
  );
  if (exists) {
    if (particularity.presenca_particularidade === rest.presenca_particularidade) {
      inputParticularities.value = inputParticularities.value.filter(
        (item) => item.grupO_USUARIO_PARTICUL_ID !== particularity.grupO_USUARIO_PARTICUL_ID,
      );
    }

    inputParticularities.value = inputParticularities.value.map((item) =>
      item.grupO_USUARIO_PARTICUL_ID === particularity.grupO_USUARIO_PARTICUL_ID
        ? { ...exists, presenca_particularidade: checked }
        : item,
    );
  } else {
    inputParticularities.value = [...inputParticularities.value, { ...rest }];
  }
};

const handleCheckboxChange = (row: GroupProfileTableDTO, field: string, checked: boolean) => {
  const { particularidade, desc_Funcao, ...rest } = row;

  const exists = updateGroupProfileConfiguration.value.find(
    (item) => item.funcao_Id === row.funcao_Id,
  );
  if (exists) {
    const newValue = { ...exists, [field]: checked };
    const isDifferent = Object.keys(newValue)
      .slice(0, 4)
      .map((key) => {
        return newValue[key as keyof typeof newValue] !== row[key as keyof typeof row];
      });
    if (isDifferent.every((value) => value === false)) {
      updateGroupProfileConfiguration.value = updateGroupProfileConfiguration.value.filter(
        (item) => item.funcao_Id !== row.funcao_Id,
      );
    }
    updateGroupProfileConfiguration.value = updateGroupProfileConfiguration.value.map((item) =>
      item.funcao_Id === row.funcao_Id ? { ...exists, [field]: checked } : item,
    );
  } else {
    updateGroupProfileConfiguration.value = [
      ...updateGroupProfileConfiguration.value,
      { ...rest, grupoUsuarioId: state.value.grupoUsuarioId! },
    ];
  }
};

onMounted(() => {
  serviceRequest(route.path.slice(-1)).then((data) => {
    permitions.value = data;
  });
  handleInitialRequest();
});
</script>
<template>
  <div class="w-full flex gap-7 flex-col h-full">
    <div class="flex flex-col gap-4">
      <UForm ref="parentForm" @submit="onSubmit" :state="state">
        <SearchBar @submitForm="submitForm" :defaultOpen="true" v-model="searchValue">
          <div class="flex w-full gap-1" :class="{ 'px-4': !state.grupoUsuarioId }">
            <UTooltip
              v-if="!state.grupoUsuarioId"
              text="O grupo de usuário é obrigatório"
              :popper="{ arrow: true, placement: 'bottom-start' }"
            >
              <UIcon class="w-5 h-5 self-center text-orange-400" name="i-ion-information-circle" />
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
              placeholder="Selecione o Grupo"
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
              placeholder="Selecione a Função"
            />
            <UDivider orientation="vertical" />
          </div>
        </SearchBar>
      </UForm>
    </div>
    <div class="justify-between bg-white flex flex-col shadow-card rounded-lg px-5 gap-5 py-5">
      <div class="gap-5 flex flex-col h-full">
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
          :rows="rows"
        >
          <template #empty-state>
            <div
              class="flex items-center min-h-96 flex-col text-gray-400 justify-center py-6 gap-2"
            >
              <UIcon class="w-8 h-8" name="i-material-symbols-light-database" />
              <p>Nada por aqui :(</p>
            </div>
          </template>

          <template #loading-state>
            <div class="gap-2 flex-col text-gray-400 flex items-center justify-center min-h-96">
              <UIcon class="w-8 h-8 animate-spin" name="i-octicon-sync-24" />
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
                  @change="(checked) => handleCheckboxChange(row, 'can_Search', checked)"
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
                  @change="(checked) => handleCheckboxChange(row, 'can_Save', checked)"
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
                  @change="(checked) => handleCheckboxChange(row, 'can_Delete', checked)"
                />
              </div>
            </div>
          </template>

          <template #particularidade-data="{ row }">
            <div class="space-y-2.5 py-1">
              <div>
                <span
                  class="block"
                  @click="handleModel(row as GroupProfileTableDTO)"
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
      </div>

      <div class="flex justify-between">
        <div class="flex gap-3">
          <div v-if="profileGroups.length > 0" class="flex gap-3">
            <UButton
              :loading="isLoading"
              @click="handleUpdateProfileGroupRequest()"
              variant="outline"
              class="text-main rounded-full hover:text-white hover:bg-main disabled:bg-gray-300 disabled:text-gray-400 disabled:hover:bg-gray-300 disabled:hover:text-gray-400"
              label="Gravar"
              :disabled="
                updateGroupProfileConfiguration.length === 0 || !permitions?.permissao.can_Save
              "
            />
            <!-- <UButton
          variant="outline"
          class="text-main rounded-full hover:text-white hover:bg-main disabled:bg-gray-300 disabled:text-gray-400 disabled:hover:bg-gray-300 disabled:hover:text-gray-400"
          label="Excluir permissão"
          :disabled="!permissions?.permissao.can_Delete"
          @click="handleUpdateProfileGroupRequest()"
          /> -->
          </div>
          <UButton
            variant="outline"
            class="text-main rounded-full hover:text-white hover:bg-main disabled:bg-gray-300 disabled:text-gray-400 disabled:hover:bg-gray-300 disabled:hover:text-gray-400"
            label="Voltar"
          />
        </div>
        <div class="flex">
          <UPagination
            v-model="page"
            :max="5"
            :page-count="pageCount"
            :total="filteredRows.length"
            :active-button="{ color: 'blue' }"
            :inactive-button="{ color: 'gray' }"
          />
        </div>
      </div>
    </div>
  </div>
  <UModal v-model="isOpenModal" prevent-close>
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-xl text-gray-600 font-semibold">Cadastro de Perfil de Grupo</h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-material-symbols-close-rounded"
            class="-my-1"
            @click="isOpenModal = false"
          />
        </div>
      </template>

      <span className="text-black/80 font-normal flex min-h-60 flex-col gap-3">
        <span>
          <p>
            Nome do Grupo:
            {{
              functionGroups.find((element) => {
                return element.id === state.grupoUsuarioId;
              })?.nome
            }}
          </p>
          <p>Nome da Função: {{ modalData?.desc_Funcao }}</p>
        </span>
        <UCheckbox
          v-for="particularity in modalData?.particularidade"
          :ui="{
            color: 'text-main dark:text-main',
          }"
          :label="particularity.desc_parametro"
          v-model="particularity.presenca_particularidade"
          @change="(checked) => handleParticularitiesCheckboxChange(particularity, checked)"
        />
      </span>

      <template #footer>
        <div className="flex gap-4">
          <UButton
            v-if="permitions?.permissao.can_Save"
            :loading="isLoading"
            variant="outline"
            class="text-main rounded-full hover:text-white hover:bg-main disabled:bg-gray-300 disabled:text-gray-400 disabled:hover:bg-gray-300 disabled:hover:text-gray-400"
            label="Gravar"
            :disabled="inputParticularities.length <= 0"
            @click="handleParticularitiesUpdate()"
          />
          <UButton
            variant="outline"
            class="text-main rounded-full hover:text-white hover:bg-main disabled:bg-gray-300 disabled:text-gray-400 disabled:hover:bg-gray-300 disabled:hover:text-gray-400"
            label="Cancelar"
            @click="isOpenModal = false"
          >
            Cancelar
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
