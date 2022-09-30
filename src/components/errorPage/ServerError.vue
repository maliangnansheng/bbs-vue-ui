<template>
    <a-result status="500" style="padding-top: 100px" title="500" :sub-title="$t('common.serverError')">
        <template #extra>
            <a-button @click="backHome" type="primary">
                {{ $t("common.backHome") }}
            </a-button>
        </template>
    </a-result>
</template>
<script>
    export default {
        methods: {
            // 跳转首页方法
            backHome() {
                this.$router.push({path: "/"});
            }
        }
    };
</script>
