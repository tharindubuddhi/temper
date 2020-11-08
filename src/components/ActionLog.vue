<template>
    <div class="max-w-xl bg-white overflow-hidden h-10 mb-1
    transition duration-500 ease-in-out transform hover:bg-teal-100">
        <div class="flex justify-between mt-2 mr-2 ml-2">
            <div id="actionlogmessage">
                {{actionLogModel.message}}
            </div>
            <div>
                <button id="timeTravel" class="px-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded" 
                @click="timeTravelBack">Time Travel</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import ActionLogModel from '@/models/actionLog.model';
    import { Component, Vue, Prop } from 'vue-property-decorator';

    @Component({})
    export default class ActionLog extends Vue{
        @Prop() actionLogModel: ActionLogModel | undefined;

        timeTravelBack(){
            this.$store.dispatch('timeTravelPost');
        }
    }
</script>