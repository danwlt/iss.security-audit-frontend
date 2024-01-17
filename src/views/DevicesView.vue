<template>
    <div class="home">
        <h1 class="mx-14 my-7 text-left text-3xl font-bold">Devices:</h1>
        <LoadingScreen v-if="isLoading"/>
        <div v-else>
            <div class="grid lg:grid-cols-2 gap-4">
                <DeviceCard v-for="device in devices" :key="device.id" :device="device" />
            </div>
            <PaginationComponent v-if="search_term === ''" @pageChange="changePage" :currentPage="this.page - 1" :totalPages="this.amountPages" />
        </div>
    </div>
</template>

<script>
import DeviceCard from '../components/DeviceCard.vue'
import PaginationComponent from '../components/PaginationComponent.vue';
import LoadingScreen from '../components/LoadingScreen.vue';
import request from '../utils/request';

export default {
    emits: ['loginEvent'],
    components: {
        DeviceCard,
        PaginationComponent,
        LoadingScreen
    },
    props: {
        search_term: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            devices: {},
            page: 1,
            amountPages: 1,
            isLoading: false,
        }
    },
    beforeMount() {
        this.getDevices();
        this.getPages();
    },
    methods: {
        async getDevices() {
            this.isLoading = true;
            try{
                const response = await request.authenticatedGet(`http://localhost:80/result/page/${this.page}`, this.$cookies.get('token'));
                if (response.status !== 200) {
                    console.log(response);
                    return;
                }
                else{
                    this.page++;
                    this.devices = response.data;
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
        async getPages(){
            try{
                const response = await request.authenticatedGet(`http://localhost:80/result/pages`, this.$cookies.get('token'));
                if (response.status !== 200) {
                    console.log(response);
                    return;
                }
                else{
                    this.amountPages=response.data.pages;
                }
            }
            catch (error) {
                if (error.response && error.response.status === 403) {
                    localStorage.removeItem('username');
                    this.$emit('loginEvent');
                    this.$router.push('/login');
                    this.$cookies.remove('token');
                } else {
                    console.log(error);
                    alert('Something went wrong. Please try again later.');
                }
            }
        },
        changePage(n){
            this.page = n
            this.getDevices();
        }
    },
    watch: {
        async search_term() {
            if (this.search_term === '') {
                this.getDevices();
                this.getPages();
            }
            else{
                this.isLoading = true;
                try{
                    const response = await request.authenticatedGet(`http://localhost:80/result/search/${this.search_term}`, this.$cookies.get('token'))
                    if (response.status !== 200) {
                        console.log(response);
                        return;
                    }
                    else{
                        this.devices = response.data;
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
            }
        }
    }
}
</script>