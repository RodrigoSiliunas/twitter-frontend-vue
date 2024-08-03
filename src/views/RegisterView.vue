<template>
  <form action="POST" v-on:submit.prevent="sendRegister()">
    <div class="container card" style="max-width: 500px">
      <div class="d-flex justify-content-center align-items-center full-height">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="150"
          height="150"
          fill="currentColor"
          class="bi bi-person-lines-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"
          />
        </svg>
      </div>

      <div class="card-body">
        <h1>Sign Up</h1>
        <p>Por favor, preencha os dados para criar sua conta.</p>
        <hr />

        <label for="username"><b>Username</b></label>
        <input
          v-model="form.username"
          type="text"
          placeholder="@exemplo"
          name="username"
          required
        />

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

        <p style="margin-bottom: -14px">
          Ao criar, você concorda com nossos
          <a href="#">Termos & Privacidade</a>.
        </p>
      </div>

      <div class="d-flex justify-content-center align-items-center">
        <button type="reset" class="btn btn-danger">Cancelar</button>
        <button type="submit" class="btn btn-primary">Sign Up</button>
      </div>
      <hr />

      <p class="plogin">Já tem uma conta? <a href="login">Login</a></p>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toastification";
import apiClient from "@/services/axios";

// Definir o estado reativo
const form = ref({
  username: "",
  email: "",
  password: "",
});

// Obter o roteador e a loja de autenticação e o toast
const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();

const sendRegister = () => {
  // Validar o formulário
  if (!form.value.email.trim() || !form.value.password.trim()) {
    toast.error("Por favor, preencha todos os campos.");
    return;
  }

  // Enviar a requisição de registro
  apiClient
    .post("/v1/users/register", form.value)
    .then((response) => {
      // Se a resposta for bem-sucedida, redirecionar para a página de login
      router.push({ name: "login" });

      // Toast informando o sucesso do registro
      toast.success("Novo usuário registrado com sucesso!\nVocê já pode fazer seu login.", {
        position: "top-right",
        duration: 5000,
        icon: "check",
        closeButton: false,
      })
    })
    .catch((error) => {
      // Se houver um erro, mostrar o erro na tela
      toast.error(error.response.data.message);
    });
};
</script>

<style scoped>
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
