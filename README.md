# urlshortner

this is a simple tool that reduces the length of your URL

## tools and prerequisite needed to run the service

- node - currently i use v16.18.0
- npm - currently i have 9.4.0

## running the service

```
node app.js
```

## evaluation

- had issues with `createClient`, based on my findings i was using deprecated option for redis https://stackoverflow.com/questions/70805943/redis-redis-createclient-in-typescript

- implementation of asynchronous request handling is required to handle millions of request

- state management can help ease user experience in storing the data-memory

- in my opinion, in order to scale the project, using javascript framework for frontend side is pivotal, such as React.js, Vue, Angular etc...

- bundling modules using Vite build tool can help fasten development (HMR and fast cold boot)

 cheers, Uzair.