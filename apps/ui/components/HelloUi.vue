<script setup lang="ts">
const { myLayer } = useAppConfig();
</script>

<template>
  <div>
    <h1>Hello World!!!</h1>
    <pre>{{ myLayer }}</pre>
  </div>
  <Avatar>
    <AvatarImage src="https://github.com/nuxt.png" alt="@radix-vue" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Alert>
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
      You can add components to your app using the cli.
    </AlertDescription>
  </Alert>
</template>
