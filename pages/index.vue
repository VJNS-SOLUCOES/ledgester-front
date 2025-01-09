<script setup lang="ts">
import { loginSchema } from '~/schemas';
import api from '~/services/api';
import { useUserStore } from '~/store';
import type { LoginDto, UserDto, DefaultResponseDto, ErrorDto } from '~/types';

definePageMeta({
  layout: false,
});

const isLoading = ref(false);
const userStore = useUserStore();
const visiblePassword = ref(false);
const state = reactive<LoginDto>({
  email: '',
  password: '',
});

const onSubmit = async () => {
  try {
    isLoading.value = true;
    const { data: response } = await api.post<DefaultResponseDto<UserDto>>('/Login/WebApi/Auth', {
      email: state.email,
      senha: state.password,
    });

    userStore.setData(response.data);
    isLoading.value = false;

    navigateTo(`usuario/gen-grupo-4`);
  } catch (error: any) {
    const errors: ErrorDto = error.response?.data.errors;
    if (error.response === undefined) {
      swalError({ title: 'Oops..', text: 'Algo deu errado!' });
    } else if (errors.message !== '') {
      swalError({ title: 'Oops..', text: errors.message });
    } else {
      swalError({ title: 'Oops..', text: errors.stackTrace });
    }
    isLoading.value = false;
  }
};

onMounted(() => {
  userStore.clearData();
});
</script>
<template>
  <div class="bg-secondary_light-200 h-screen flex justify-center items-center">
    <UForm
      :state="state"
      :schema="loginSchema"
      @submit="onSubmit"
      class="bg-secondary_light flex justify-center items-center flex-col rounded-3xl shadow-card w-[500px] gap-8 p-8"
    >
      <img src="/LEDGESTER_Simbolo.png" />
      <div class="flex justify-center items-center flex-col gap-2">
        <h1 class="text-3xl font-semibold text-tertiary_light">Login</h1>
        <h2 class="text-xs font-medium text-main-300">Insira suas credenciais de acesso</h2>
      </div>
      <div class="w-full flex flex-col gap-8">
        <UFormGroup name="email">
          <UInput v-model="state.email" size="lg" placeholder="E-mail" />
        </UFormGroup>
        <UFormGroup name="password" class="relative">
          <UInput
            v-model="state.password"
            :type="visiblePassword ? 'text' : 'password'"
            size="lg"
            placeholder="Senha"
          />
          <UIcon
            v-if="!visiblePassword"
            name="i-mdi-eye-outline"
            class="w-5 h-5 text-gray-400 absolute right-3 top-[10px] cursor-pointer"
            @click="visiblePassword = true"
          />
          <UIcon
            v-else
            name="i-mdi-eye-off-outline"
            class="w-5 h-5 text-gray-400 absolute right-3 top-[10px] cursor-pointer"
            @click="visiblePassword = false"
          />
        </UFormGroup>
      </div>
      <ULink class="hover:underline self-end">Esqueci minha senha</ULink>
      <UButton
        block
        :loading="isLoading"
        size="lg"
        type="submit"
        color="main"
        class="bg-main shadow-md hover:bg-main-200"
        >Entrar</UButton
      >
    </UForm>
  </div>
</template>
