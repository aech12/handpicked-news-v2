<template>
  <div>
    <p>Hi, my name is {{ user }}</p>

    <label for="username">Username:</label>
    <input v-model="user" id="username" name="username" />

    <label for="other">Other:</label>
    <input v-model="other" id="other" name="other" data-testid="other" />

    <p data-testid="num-p">{{num}}</p>
    <button @click="num++" data-testid="num-btn">{buttonText}</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: 'Alice',
    other: 'other_val',
    num: 1,
  }),
}
</script>
