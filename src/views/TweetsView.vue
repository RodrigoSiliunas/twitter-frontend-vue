<template>
  <!-- Container que encapsula nossa aplicação -->
  <div class="container">
    <!-- Conteúdo principal da página -->
    <div class="row">
      <!-- Área onde o usuário publicará cada tweet -->
      <div class="col-12">
        <div class="col-8 form-floating my-2">
          <form method="POST" v-on:submit.prevent="sendTweet()">
            <textarea
              v-model="tweetArea.text"
              class="form-control"
              name="textTweet"
              id="textTweet"
              placeholder="O que você está pensando?"
              style="width: 100%; resize: none"
            ></textarea>

            <button
              type="submit"
              id="sendTweet"
              class="btn btn-primary btn-block my-1"
              style="width: 100%"
            >
              Postar
            </button>
          </form>
        </div>

        <!-- Área de separação para não transpassar os trending tópics -->
        <div class="col-4"></div>
      </div>

      <!-- Área de exibição de Tweets -->
      <div class="col-8" style="padding-right: 0">
        <div class="card" style="width: 99.6%">
          <!-- Header do Card -->
          <div class="card-header" style="text-align: center">
            O que está rolando?
          </div>

          <!-- Lista que conterá todos os tweets dos usuários -->
          <ul class="list-group list-group-flush tweets-father">
            <TweetItem
              v-for="tweet in tweetsList.tweets"
              :key="tweet.id"
              :username="tweet.username"
              :text="tweet.text"
              :timestamp="tweet.timestamp"
            />
          </ul>
        </div>
      </div>

      <!-- Área de exibição dos trending topics -->
      <div class="col-4">
        <!-- Card para exibição e encapsulamento dos dados dos trending topics -->
        <div class="card" style="width: 100%">
          <!-- Header do Card -->
          <div class="card-header" style="text-align: center">
            Trending Topics - Assuntos do Momento
          </div>

          <!-- Lista que conterá todos os trending topics -->
          <ul class="list-group list-group-flush">
            <TrendingTopic
              v-for="trending in trendingTopicsList.trendings"
              :key="trending.id"
              :topic="trending.topic"
              :mentions="trending.mentions"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toastification";
import apiClient from "@/services/axios";

import TweetItem from "@/components/TweetItem.vue";
import TrendingTopic from "@/components/TrendingTopic.vue";

// Referências aos componentes
const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();

// Interceptador de requisição para adicionar o token de autenticação
apiClient.interceptors.request.use(
  (config) => {
    if (authStore.accessToken) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Carregar tweets antes de o componente ser montado
let tweetsList = ref([]);
let trendingTopicsList = ref([]);
const tweetArea = ref({
  text: "",
});

const loadTweets = async () => {
  apiClient
    .get("/v1/tweets")
    .then((response) => {
      tweetsList.value = response.data;
    })
    .catch((error) => {
      switch (error.response.status) {
        case 403:
          toast.error("Você precisa estar logado para visualizar os tweets.");
          console.error("Erro ao carregar tweets:", error);
          break;
        default:
          toast.error(
            "Erro inesperado ao tentar obter os tweets.\nTente novamente mais tarde."
          );
          console.error("Erro ao carregar tweets:", error);
      }
    });
};

const loadTrendingTopics = async () => {
  apiClient
    .get("/v1/tweets/trendings")
    .then((response) => {
      trendingTopicsList.value = response.data;
    })
    .catch((error) => {
      console.error("Erro ao carregar trending topics:", error);
    });
};

onBeforeMount(() => {
  loadTweets();
  loadTrendingTopics();
});

// Função para postar o tweet
const sendTweet = async () => {
  apiClient
    .post("/v1/tweets", { text: tweetArea.value.text })
    .then((response) => {
      toast.success("Tweet publicado com sucesso!");
      tweetArea.value.text = "";
      loadTweets();
    })
    .catch((error) => {
      tweetArea.value.text = "";

      switch (error.response.status) {
        case 403:
          toast.error("Você precisa estar logado para publicar tweets.");
          break;
        default:
          toast.error(
            "Erro inesperado ao enviar o tweet, tente novamente mais tarde."
          );
          console.error("Erro ao publicar tweet:", error);
      }
    });
};
</script>

<style scoped></style>
