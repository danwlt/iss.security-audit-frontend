<template>
    <div class="home">
        <LoadingScreen v-if="isLoading" />
        <div v-else>
            <div class="bg-white shadow-lg rounded-lg p-6 mx-10 my-2">
                <h1 class="mx-10 my-5 text-left text-3xl font-bold">Details:</h1>
                    <p class="text-xl font-bold mb-4">Hostname: {{ device.hostname }}</p>
                    <p class="text-xl font-bold mb-4">IP: {{ device.ip }}</p>
                    <p class="text-xl font-bold mb-4">Date: {{ device.date }}</p>
                    <ScoreCard :score="device.score" />
            </div>
            <div class="bg-white shadow-lg rounded-lg p-6 mx-10 my-2">
                <h1 class="mx-10 my-5 text-left text-3xl font-bold">Commands:</h1>
                <div v-for="command in device.commands" :key="command.command.id" class="m-16 py-24 rounded-lg shadow-xl">
                    <p class="text-lg font-bold mb-4">{{ command.command.chapter }}. - {{ command.command.description }}</p>
                    <p class="font-bold mb-4">Command: {{ command.command.command }}</p>
                    <p class="font-bold mb-8">Output: {{ command.result.output }}</p>
                    <div class="flex justify-evenly mb-4">
                        <p class="font-bold">Level: {{ command.command.level }}</p>
                        <p class="font-bold">Value: {{ command.result.value }}</p>
                        <p class="font-bold">Weight: {{ command.command.weight }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import request from '../utils/request';
import LoadingScreen from '../components/LoadingScreen.vue';
import ScoreCard from '../components/ScoreCard.vue';

export default{
    emits: ['loginEvent'],
    components: {
        LoadingScreen,
        ScoreCard
    },
    data() {
        return {
            device: {},
            isLoading: false,
        }
    },
    beforeMount() {
        this.getDeviceInfo();
    },
    methods:{
        async getDeviceInfo(){
            this.isLoading = true;
            try{
                const response = await request.authenticatedGet(`http://localhost:80/result/single/${this.$route.params.id}`, this.$cookies.get('token'));
                if (response.status !== 200) {
                    console.log(response);
                    return;
                }
                else{
                    this.device = response.data;
                }
            }
            catch (error) {
                if (error.response && error.response.status === 403) {
                    alert('Forbidden: You do not have permission to access this resource.');
                    localStorage.removeItem('username');
                    this.$emit('loginEvent');
                    this.$router.push('/login');
                    this.$cookies.remove('token');
                } else {
                    console.log(error);
                    alert('Something went wrong. Please try again later.');
                }
            }
            finally {
                this.isLoading = false;
            }
        },
    }
}

</script>