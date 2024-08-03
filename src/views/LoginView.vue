<template>
  <div>
    <form v-on:submit.prevent="doLogin()">
      <div class="container card" style="max-width: 500px">
        <div
          class="d-flex justify-content-center align-items-center full-height"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            fill="currentColor"
            class="bi bi-person-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
            />
          </svg>
        </div>

        <div class="card-body">
          <h1>Login</h1>
          <p>Por favor, preencha os dados para entrar na sua conta.</p>
          <hr />

          <label for="email"><b>E-mail</b></label>
          <input
            v-model="form.email"
            type="text"
            placeholder="exemplo@email.com"
            name="email"
            required
          />

          <label for="password"><b>Senha</b></label>
          <input
            v-model="form.password"
            type="password"
            placeholder="Digite a Senha"
            name="password"
            required
          />

          <label> <input type="checkbox" checked /> Lembrar-me </label>

          <div class="d-flex justify-content-center align-items-center">
            <button type="submit" class="btn btn-primary">Entrar</button>
          </div>
          <hr />

          <p>Não tem uma conta? <a href="register">Sign Up</a></p>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toastification";
import apiClient from "@/services/axios";

// Definir o estado reativo
const form = ref({
  email: "123",
  password: "123",
});

// Obter o roteador e a loja de autenticação e o toast
const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();

const doLogin = async () => {
  try {
    const response = await apiClient.post("/v1/users/login", {
      email: form.value.email,
      password: form.value.password,
    });
    console.log(response);

    // Exibe um informativo de login bem sucedido
    toast.success(`Login realizado com sucesso!\nBem-vindo, ${response.data.user.username}.`, {
      position: 'top-right',
      timeout: 5000,
    });

    // Salva as informações na memória do navegador
    authStore.setTokens(
      response.data.accessToken,
      response.data.refreshToken
    );

    // Redireciona para a página de tweets após o login bem-sucedido
    router.push({ name: "homePageWithTweets" });
  } catch (error) {
    console.error("Erro no login:", error);

    switch (error.response.status) {
      case 401:
        toast.warning("E-mail ou senha inválidos", {
          position: 'top-right',
          timeout: 5000,
        });
        break;
      case 500:
        toast.error("Erro de servidor. Tente novamente mais tarde.", {
          position: 'top-right',
          timeout: 5000,
        });
        break;
      default:
        toast.error("Ocorreu um erro inesperado durante o login", {
          position: 'top-right',
          timeout: 5000,
        });
        break;
    }
  }
};
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  padding-top: 60px;
  background: rgb(243, 243, 243) !important;
}

/* --- index --- */

/* --- login e SignUp --- */

.container {
  padding: 36px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 14px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.btn {
  width: 100%;
  margin-top: 10px;
}

.btn-danger {
  margin-right: 10px;
}

.plogin {
  padding-left: 14px;
}
</style>
