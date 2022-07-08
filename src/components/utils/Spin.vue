<template>
    <div style="text-align: center;">
        <!-- 1s之后还没有渲染出来显示Loading... -->
        <a-spin tip="Loading..." :spinning="spinning" :delay="1000" style="padding-top: 150px"/>
    </div>
</template>


<script>
export default {
    props: {
        spinning: {type: Boolean, default: false},
    },
}
</script>

<style scoped>

</style>