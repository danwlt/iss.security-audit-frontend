<template>
    <div>
        <div class="bg-white shadow-lg rounded-lg p-6 mx-10 my-2 gap-4 grid">
            <div class="flex justify-between">
                <div>
                    <h2 class="text-xl font-bold mb-4">{{ device.hostname }}</h2>
                    <div class="my-7 space-y-3">
                        <p class="text-gray-600">IP: {{ device.ip }}</p>
                        <p class="text-gray-600">Date: {{ device.date }}</p>
                    </div>
                </div>
                <div class="space-y-5">
                    <div>
                        <router-link :to="`/device/${device._id}`" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="lg"/> 
                        </router-link>
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" @click="deleteDevice(device._id)">
                            <font-awesome-icon icon="fa-solid fa-trash" size="lg"/> 
                        </button>
                    </div>
                    <ScoreCard :score="device.score" />
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ScoreCard from './ScoreCard.vue';
import request from '../utils/request';
import { RouterLink } from 'vue-router';

export default {
    emits: ['loginEvent'],
    components: {
    ScoreCard,
    RouterLink
},
    methods:{
        async deleteDevice(id) {
            try{
                const response = await request.authenticatedDelete(`http://localhost:80/result/${id}`, this.$cookies.get('token'));
            if (response.status !== 200) {
                console.log(response);
                return;
            }
            else{
                location.reload();
            }
            }
            catch (error) {
                if (error.response && error.response.status === 403) {
                    alert('Forbidden: You do not have permission to access this resource.');
                    localStorage.removeItem('username');
                    this.$emit('loginEvent');
                    this.$router.push('/login');
                    this.$cookies.remove('token');
                }
                else{
                    console.log(error);
                    alert('Something went wrong. Please try again later.');
                }
            }
        },
    },
    props: {
        device: {
            type: Object,
            required: true,
        },
    },
};
</script>
