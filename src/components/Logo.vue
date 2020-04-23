<template>
    <header id="logo-container">
        <h1>
            Story<span>teller</span>
        </h1>
    </header>
</template>

<script>
export default {
    name: "Logo",
}
</script>

<style scoped>
header h1 {
    font-size: 2rem;
    color: theme('colors.white');
    font-weight: 600
}

header h1 span {
    font-size: 2rem;
    color: theme('colors.purple');
}
</style>
